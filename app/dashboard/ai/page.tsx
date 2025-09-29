'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Alert from '@/app/(components)/Alert';
import { ExamplesService } from '@/lib/examples';
import type { Example } from '@/types/database';

interface AlertState {
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
}

interface ResponseMeta {
  modelUsed?: string;
  fallbackUsed?: boolean;
  finishReason?: string;
  promptTokens?: number;
  completionTokens?: number;
  totalTokens?: number;
}

export default function DashboardAIPage() {
  const router = useRouter();
  const [prompt, setPrompt] = useState<string>('');
  const [output, setOutput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [alert, setAlert] = useState<AlertState | null>(null);
  const [examples, setExamples] = useState<Example[]>([]);
  const [examplesLoading, setExamplesLoading] = useState<boolean>(true);
  const [selectedExamples, setSelectedExamples] = useState<string[]>([]);
  const [selectedTone, setSelectedTone] = useState<string>('normal');
  const [useExamples, setUseExamples] = useState<boolean>(false);
  const [selectedLength, setSelectedLength] = useState<string>('normal');
  const [meta, setMeta] = useState<ResponseMeta | null>(null);
  const [selectedModel, setSelectedModel] = useState<string>('gpt-5');
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const toneOptions = [
    { value: 'normal', label: 'Normal' },
    { value: 'formal', label: 'Formal' },
    { value: 'friendly', label: 'Friendly' },
    { value: 'casual', label: 'Casual' },
    { value: 'funny', label: 'Funny' },
    { value: 'storytelling', label: 'Storytelling' }
  ];

  const simpleToneOptions = [
    { value: 'normal', label: 'Normal' },
    { value: 'formal', label: 'Formal' },
    { value: 'friendly', label: 'Friendly' },
    { value: 'casual', label: 'Casual' },
    { value: 'funny', label: 'Funny' },
    { value: 'storytelling', label: 'Storytelling' }
  ];

  const lengthOptions = [
    { value: 'short', label: 'Short (~120-180 kata)' },
    { value: 'normal', label: 'Normal (~250-400 kata)' },
    { value: 'long', label: 'Long (~600+ kata)' }
  ];

  const modelOptions = [
    { value: 'gpt-5', label: 'GPT‑5' },
    { value: 'gpt-4', label: 'GPT‑4' },
    { value: 'gpt-3.5-turbo', label: 'GPT‑3.5 Turbo' }
  ];

  const isValidPrompt = prompt.trim().length >= 1;
  
  // Calculate estimated token usage based on current selection
  const getChosenExamples = () => {
    if (!useExamples) return [];
    return selectedExamples.length
      ? examples.filter(ex => selectedExamples.includes(ex.id)).slice(0, 2)
      : examples.slice(0, 1); // Fallback to 1 example if enabled but none selected
  };
  
  const estimatedTokens = () => {
    const chosen = getChosenExamples();
    const promptTokens = prompt.length / 4; // Rough estimate
    const exampleTokens = chosen.length * 200 / 4; // 200 chars per example
    return Math.round(promptTokens + exampleTokens + 100); // +100 for system prompt
  };

  // Fetch user's examples on component mount
  useEffect(() => {
    const fetchExamples = async () => {
      setExamplesLoading(true);
      try {
        const { data, error } = await ExamplesService.getExamples();
        if (error) {
          console.error('Error fetching examples:', error);
        } else {
          setExamples(data ?? []);
        }
      } catch (error) {
        console.error('Unexpected error fetching examples:', error);
      } finally {
        setExamplesLoading(false);
      }
    };

    fetchExamples();
  }, []);

  const truncateExample = (text: string, maxLength: number = 400) => {
    if (text.length <= maxLength) return text;
    const truncated = text.substring(0, maxLength);
    const lastSentence = truncated.lastIndexOf('.');
    return lastSentence > maxLength * 0.6
      ? truncated.substring(0, lastSentence + 1)
      : truncated + '...';
  };

  const handleGenerate = async () => {
    if (!isValidPrompt) return;
    
    setLoading(true);
    setAlert(null);
    setOutput('');
    setMeta(null);
    
    try {
      // Collect user input
      const userInput = prompt.trim();

      // Get selected examples based on user preference
      const chosen = getChosenExamples();

      // Compose prompt with examples (truncate each to manage token usage)
      const composedPrompt = chosen.length
        ? `Examples:\n${chosen
            .map(ex => truncateExample(ex.content, 200)) // Reduced from 400 to 200
            .join('\n\n---\n\n')}\n\nTask: ${userInput}`
        : userInput;
      
      // Call AI API
      const response = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: composedPrompt,
          tone: selectedTone,
          length: selectedLength,
          clientModel: selectedModel,
          usedExamples: useExamples && getChosenExamples().length > 0
        }),
      });
      
      if (!response.ok) {
        throw new Error(`API request failed: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      
      console.log('API Response:', data); // Debug logging
      
      if (data.error) {
        throw new Error(data.error);
      }
      
      console.log('Setting output:', data.result); // Debug logging
      setOutput(data.result || 'No response generated');
      if (data.metadata) {
        setMeta({
          modelUsed: data.metadata.modelUsed,
          fallbackUsed: data.metadata.fallbackUsed,
          finishReason: data.metadata.finishReason,
          promptTokens: data.metadata.usage?.prompt_tokens,
          completionTokens: data.metadata.usage?.completion_tokens,
          totalTokens: data.metadata.usage?.total_tokens,
        });
      }
      setAlert({ type: 'success', message: 'AI response generated successfully!' });
    } catch (error) {
      setAlert({ 
        type: 'error', 
        message: error instanceof Error ? error.message : 'Failed to generate AI response' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-2xl mx-auto px-4 py-6 sm:py-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="relative">
              <div className="h-8 w-8 bg-gradient-to-br from-indigo-500 via-violet-500 to-purple-600 rounded-lg shadow-lg" />
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-lg opacity-20 blur-sm" />
              <div className="absolute inset-0 flex items-center justify-center">
                <svg className="w-4 h-4 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6a2 2 0 012 2v5a4 4 0 11-8 0V9a2 2 0 012-2zm3-4v3m5 2h1m-12 0H5" />
                </svg>
              </div>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Asisten AI</h1>
          </div>
          <p className="text-sm text-gray-500 mt-1">Tulis prompt, pilih style, lalu Generate.</p>
        </div>

        {alert && (
          <div className="mb-4">
            <Alert 
              type={alert.type} 
              message={alert.message} 
              onClose={() => setAlert(null)} 
            />
          </div>
        )}

        {/* Input Card */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-5 shadow-sm">
          <div className="space-y-4">
            {/* Minimal Controls (always visible) */}
            <div className="flex flex-wrap gap-2">
              {simpleToneOptions.map(opt => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setSelectedTone(opt.value)}
                  className={`px-3 py-2 text-sm rounded-full border transition-colors ${selectedTone === opt.value ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}`}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            {/* Prompt */}
            <div>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="w-full px-3 sm:px-4 py-3 border border-gray-300 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 resize-none text-sm"
                placeholder="Tulis kebutuhanmu di sini..."
                rows={6}
                required
              />
              {!isValidPrompt && prompt.length > 0 && (
                <p className="text-red-500 text-xs mt-1">Prompt wajib diisi</p>
              )}
            </div>

            {/* Examples (simple toggle) */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Panjang</label>
                <select 
                  value={selectedLength} 
                  onChange={(e) => setSelectedLength(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="short">Pendek</option>
                  <option value="normal">Sedang</option>
                  <option value="long">Panjang</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Contoh</label>
                <div className="flex items-center h-[38px]">
                  <label className="flex items-center gap-2 text-sm text-gray-700">
                    <input
                      type="checkbox"
                      checked={useExamples}
                      onChange={(e) => setUseExamples(e.target.checked)}
                      className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                    />
                    Gunakan contoh
                  </label>
                </div>
              </div>
            </div>

            {/* Advanced (hidden by default) */}
            <div>
              <button
                type="button"
                onClick={() => setShowAdvanced(v => !v)}
                className="text-xs text-gray-500 hover:text-gray-700"
              >
                {showAdvanced ? 'Sembunyikan opsi lanjutan' : 'Tampilkan opsi lanjutan'}
              </button>
              {showAdvanced && (
                <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Model</label>
                    <select 
                      value={selectedModel} 
                      onChange={(e) => setSelectedModel(e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      {modelOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Style detail</label>
                    <select 
                      value={selectedTone} 
                      onChange={(e) => setSelectedTone(e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      {toneOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={handleGenerate}
                disabled={loading || !isValidPrompt}
                className={`flex-1 bg-gray-900 hover:bg-black text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 ${loading || !isValidPrompt ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Generating...
                  </div>
                ) : (
                  'Generate'
                )}
              </button>
              {output && (
                <button
                  onClick={() => {
                    setOutput('');
                    setPrompt('');
                    setAlert(null);
                    setMeta(null);
                  }}
                  className="px-4 py-3 rounded-xl border text-gray-700 hover:bg-gray-50"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Output */}
        <div className="mt-6 sm:mt-8 bg-white border border-gray-200 rounded-xl p-4 sm:p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900">Hasil</h3>
            <button
              onClick={async () => {
                if (!output) return;
                await navigator.clipboard.writeText(output);
                setCopied(true);
                setTimeout(() => setCopied(false), 1200);
              }}
              disabled={!output}
              className={`text-sm px-3 py-2 rounded-lg border ${output ? 'hover:bg-gray-50 text-gray-700' : 'opacity-50 cursor-not-allowed text-gray-400'}`}
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
          {output ? (
            <div className="bg-gray-50 rounded-lg p-4 border">
              <pre className="text-sm sm:text-[15px] text-gray-900 whitespace-pre-wrap break-words leading-relaxed">
                {output}
              </pre>
              {meta && (
                <div className="mt-3 text-xs text-gray-500 grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div><span className="font-medium">Model:</span> {meta.modelUsed || '-'}</div>
                  <div><span className="font-medium">Fallback:</span> {meta.fallbackUsed ? 'Yes' : 'No'}</div>
                  <div><span className="font-medium">Finish:</span> {meta.finishReason || '-'}</div>
                  <div>
                    <span className="font-medium">Tokens:</span> {meta.promptTokens ?? 0} • {meta.completionTokens ?? 0} • {meta.totalTokens ?? 0}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-10 sm:py-12 text-gray-400 text-sm">
              Hasil akan tampil di sini.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
