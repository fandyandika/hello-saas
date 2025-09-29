# Environment Setup Guide

## Setup Environment Variables

Buat file `.env.local` di root project dengan konfigurasi berikut:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here

# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key_here
OPENAI_MODEL=gpt-3.5-turbo

# Model Options:
# - gpt-3.5-turbo (recommended, stable, uses max_tokens)
# - gpt-4o-mini (uses max_tokens)
# - gpt-5-mini (NOT recommended - uses reasoning tokens, often produces empty content)
```

## Cara Mendapatkan API Keys

### 1. Supabase
1. Buka [supabase.com](https://supabase.com)
2. Login ke akun Anda
3. Pilih project Anda
4. Pergi ke Settings > API
5. Copy `Project URL` dan `anon public` key

### 2. OpenAI
1. Buka [platform.openai.com](https://platform.openai.com)
2. Login ke akun Anda
3. Pergi ke API Keys
4. Buat API key baru
5. Copy API key (dimulai dengan `sk-`)

## Response Style Options

Aplikasi mendukung berbagai response style:

- **Normal** (default) - Clear, straightforward, natural tone
- **Professional** - Business-like, formal tone
- **Friendly** - Warm, conversational tone
- **Casual** - Relaxed, informal tone
- **Formal** - Precise, academic tone
- **Creative** - Engaging, imaginative tone

## Desired Length

Anda dapat memilih panjang output:
- **Short**: ~120-180 kata
- **Normal**: ~250-400 kata
- **Long**: ~600+ kata (berisiko truncation pada beberapa model)

Backend menyesuaikan token limit secara dinamis berdasarkan pilihan ini dan model yang digunakan.

## Automatic Fallback

Jika menggunakan `gpt-5-mini` dan respons kosong/terpotong (finish_reason=length), sistem akan otomatis fallback ke `gpt-3.5-turbo` dengan instruksi ringkas agar tetap menampilkan output.

Metadata respons (modelUsed, fallbackUsed, usage tokens) akan ditampilkan di UI.

## Troubleshooting Error 400 Bad Request

Error ini biasanya terjadi karena:

1. **API key tidak dikonfigurasi** - Pastikan file `.env.local` ada dan berisi `OPENAI_API_KEY`
2. **API key tidak valid** - Pastikan API key dimulai dengan `sk-`
3. **Model tidak tersedia** - Gunakan `gpt-3.5-turbo` (default) atau model yang tersedia di akun Anda
4. **Quota habis** - Periksa billing account OpenAI Anda
5. **Format API key salah** - Pastikan tidak ada spasi atau karakter tambahan

## Testing

Setelah setup, test dengan:
1. Restart development server: `npm run dev`
2. Buka `/dashboard/ai`
3. Pilih Response Style dan Desired Length
4. (Opsional) Enable examples dan pilih 0-2 examples
5. Generate dan amati metadata (model, fallback, tokens)
