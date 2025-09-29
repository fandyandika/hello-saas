// AI Generation API Route
// TODO: Add your OpenAI/Claude API key to environment variables

import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { prompt, tone = 'professional', length = 'normal', clientModel, usedExamples = false } = await request.json();

    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      );
    }

    // Check if API key is available
    const apiKey = process.env.OPENAI_API_KEY;

    // Map client model to server-safe model ids
    const normalizeModel = (m?: string): string => {
      if (!m) return process.env.OPENAI_MODEL ?? 'gpt-5-mini';
      const lower = String(m).toLowerCase();
      if (lower.includes('gpt-5')) return 'gpt-5-mini';
      if (lower.includes('gpt-4')) return 'gpt-4o-mini';
      return 'gpt-3.5-turbo';
    };

    // Server-selected model with fallback to env default
    const model = normalizeModel(clientModel) || (process.env.OPENAI_MODEL ?? 'gpt-5-mini');
    
    console.log('API Key exists:', !!apiKey);
    console.log('Model:', model);
    console.log('API Key length:', apiKey?.length || 0);
    console.log('API Key starts with:', apiKey?.substring(0, 10));
    
    if (!apiKey) {
      console.error('OpenAI API key not configured');
      return NextResponse.json(
        { error: 'API key OpenAI belum dikonfigurasi. Silakan tambahkan OPENAI_API_KEY ke file .env.local.' },
        { status: 400 }
      );
    }
    
    // Test if API key is valid format
    if (!apiKey.startsWith('sk-')) {
      console.error('Invalid API key format');
      return NextResponse.json(
        { error: 'Format API key tidak valid. API key harus dimulai dengan "sk-".' },
        { status: 400 }
      );
    }

    // Build system prompt (tone + length + anti-filler rules)
    const baseSystem = 'You are a helpful AI assistant. Always respond in Indonesian. Be clear and concise. Adapt your tone based on the provided preference.';
    const toneMap: Record<string, string> = {
      normal: 'Use clear, straightforward, and natural tone.',
      professional: 'Use professional, business-like tone.',
      friendly: 'Use warm, friendly, conversational tone.',
      casual: 'Use casual, relaxed tone.',
      formal: 'Use formal, precise tone.',
      creative: 'Use creative, engaging tone.',
      funny: 'Use witty, humorous tone that is light, tasteful, and concise.'
    };
    const antiFiller = 'Do NOT include generic intros/outros (e.g., "Tentu", "berikut", "diharapkan", "Semoga membantu"). Avoid hedging. Start directly with the substance. No apologies. No meta commentary. No closing remarks.';

    const toneStyleGuides: Record<string, string> = {
      normal: 'Write in plain Indonesian, concise sentences (10-18 words), neutral word choice, no exclamation unless necessary.',
      formal: 'Use formal diction, precise terms, passive allowed sparingly, avoid colloquialisms, no emojis.',
      friendly: 'Use warm and approachable language, second person (Anda/kamu) consistently, contractions allowed, light emojis optional (max 1 per paragraph).',
      casual: 'Use relaxed, conversational tone, everyday words, short sentences (8-14 words), allow colloquial expressions lightly, no emojis by default.',
      funny: 'Use tasteful humor, light wordplay, keep it concise, avoid sarcasm that could offend, no emojis.',
      storytelling: 'Use narrative flow with a clear arc (hook → setup → mini-conflict → resolution). Keep paragraphs short. Use vivid but economical imagery. No moralizing endings.'
    };

    const systemPrompt = `${baseSystem} ${(toneMap[tone] ?? toneMap.normal)} ${toneStyleGuides[tone] ?? toneStyleGuides.normal} ${antiFiller}`;

    // Log the request for debugging
    console.log('Making OpenAI API request with model:', model);
    console.log('API Key starts with:', apiKey?.substring(0, 10));
    
    // Prepare request body based on model and length
    const isGpt5Mini = model.includes('gpt-5-mini');
    const maxByLength = (isReasoning: boolean) => {
      if (isReasoning) {
        if (length === 'short') return 300;
        if (length === 'long') return 700;
        return 450;
      } else {
        if (length === 'short') return 700;
        if (length === 'long') return 1400;
        return 1000;
      }
    };

    type RequestBody = {
      model: string;
      messages: Array<{ role: 'system' | 'user'; content: string }>;
      n: number;
      max_completion_tokens?: number;
      response_format?: { type: 'text' };
      max_tokens?: number;
      temperature?: number;
      top_p?: number;
    };

    const requestBody: RequestBody = {
      model,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: prompt }
      ],
      n: 1,
      ...(isGpt5Mini 
        ? { 
            max_completion_tokens: maxByLength(true),
            temperature: 1,
            response_format: { type: 'text' }
          }
        : { 
            max_tokens: maxByLength(false),
            temperature: (() => {
              let base = 0.5;
              if (tone === 'normal' || tone === 'formal') base = 0.4;
              if (tone === 'friendly' || tone === 'casual') base = 0.6;
              if (tone === 'funny' || tone === 'creative' || tone === 'storytelling') base = 0.75;
              if (model.includes('gpt-4')) base = Math.min(base + 0.1, 0.85);
              if (usedExamples) base = Math.min(base + 0.1, 0.7);
              return base;
            })(),
            top_p: 0.9
          }
      )
    };
    
    // Call OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('OpenAI API error:', {
        status: response.status,
        statusText: response.statusText,
        error: errorData,
        model: model
      });
      
      // Check if it's a model availability issue
      if (errorData.error?.code === 'model_not_found' || errorData.error?.message?.includes('model')) {
        return NextResponse.json(
          { error: `Model ${model} tidak tersedia. Silakan periksa akses akun OpenAI Anda atau coba model lain.` },
          { status: 400 }
        );
      }
      
      // Check if it's an API key issue
      if (errorData.error?.code === 'invalid_api_key' || errorData.error?.message?.includes('api key')) {
        return NextResponse.json(
          { error: 'API key OpenAI tidak valid. Silakan periksa konfigurasi OPENAI_API_KEY di file .env.local.' },
          { status: 400 }
        );
      }
      
      // Check if it's a quota/billing issue
      if (errorData.error?.code === 'insufficient_quota' || errorData.error?.message?.includes('quota')) {
        return NextResponse.json(
          { error: 'Quota OpenAI habis atau tidak ada kredit. Silakan periksa billing account Anda.' },
          { status: 400 }
        );
      }
      
      throw new Error(`OpenAI API error: ${response.status} - ${errorData.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    
    // Check if response was truncated due to length
    const choice = data.choices?.[0];
    const finishReason = choice?.finish_reason;
    const message = choice?.message;
    
    console.log('OpenAI Response:', data);
    console.log('Finish reason:', finishReason);
    console.log('Message object:', message);
    
    let aiResponse = 'No response generated';
    
    interface MetadataUsage {
      prompt_tokens?: number;
      completion_tokens?: number;
      total_tokens?: number;
    }
    interface Metadata {
      modelUsed: string;
      fallbackUsed: boolean;
      finishReason?: string;
      usage?: MetadataUsage;
    }

    const buildResponse = (result: string, meta: Metadata) => {
      return NextResponse.json({
        result,
        success: true,
        metadata: meta
      });
    };

    if (message?.content) {
      aiResponse = message.content;
      if (finishReason === 'length') {
        aiResponse += '\n\n[Response terpotong karena mencapai batas token maksimal]';
      }
      return buildResponse(aiResponse, { modelUsed: model, fallbackUsed: false, finishReason, usage: data.usage });
    }

    if (finishReason === 'length') {
      if (isGpt5Mini) {
        // Try fallback with gpt-4o-mini
        const fallbackModel = 'gpt-4o-mini';
        const fallbackSystem = `${systemPrompt} Keep the answer very concise. Aim for 120-180 words.`;
        const fallbackBody: RequestBody = {
          model: fallbackModel,
          messages: [
            { role: 'system', content: fallbackSystem },
            { role: 'user', content: prompt }
          ],
          n: 1,
          max_tokens: 400,
          temperature: 0.7,
          top_p: 0.9
        };

        const fallbackResp = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(fallbackBody),
        });

        if (fallbackResp.ok) {
          const fbData = await fallbackResp.json();
          const fbChoice = fbData.choices?.[0];
          const fbMessage = fbChoice?.message;
          const fbFinish = fbChoice?.finish_reason;
          const fbContent = fbMessage?.content || 'No response generated';
          return buildResponse(
            fbContent,
            { modelUsed: fallbackModel, fallbackUsed: true, finishReason: fbFinish, usage: fbData.usage }
          );
        }
      }

      // Non-fallback or fallback failed
      if (isGpt5Mini && data.usage?.completion_tokens_details?.reasoning_tokens === requestBody.max_completion_tokens) {
        aiResponse = 'Model gpt-5-mini menggunakan semua token untuk reasoning internal. Silakan gunakan model lain (gpt-3.5-turbo) atau kurangi kompleksitas prompt.';
      } else {
        aiResponse = `Response terlalu panjang dan terpotong karena mencapai batas token maksimal (${isGpt5Mini ? requestBody.max_completion_tokens : requestBody.max_tokens} tokens). Silakan coba dengan prompt yang lebih pendek atau kurangi examples.`;
      }
      return buildResponse(aiResponse, { modelUsed: model, fallbackUsed: false, finishReason, usage: data.usage });
    }

    if (finishReason === 'stop') {
      aiResponse = 'Response berhasil dihasilkan.';
      return buildResponse(aiResponse, { modelUsed: model, fallbackUsed: false, finishReason, usage: data.usage });
    }

    // Fallback: check alternative fields
    if (data.choices?.[0]?.message?.text) {
      aiResponse = data.choices[0].message.text;
    } else if (data.choices?.[0]?.text) {
      aiResponse = data.choices[0].text;
    } else {
      aiResponse = `Response tidak dapat diproses. Finish reason: ${finishReason}`;
    }
    return buildResponse(aiResponse, { modelUsed: model, fallbackUsed: false, finishReason, usage: data.usage });

  } catch (error) {
    console.error('AI generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate AI response' },
      { status: 500 }
    );
  }
}

