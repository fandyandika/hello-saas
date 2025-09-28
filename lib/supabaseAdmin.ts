// Server-only Supabase admin client
// Uses service role key; NEVER expose to the client
import "server-only";

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.SUPABASE_SERVICE_ROLE ||
  process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl) {
  throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL env var");
}

if (!supabaseServiceKey) {
  // We intentionally don't throw in production runtime to allow the app to boot
  // but the API routes that use this client will fail fast with a clear error.
  console.warn(
    "[supabaseAdmin] SUPABASE_SERVICE_ROLE_KEY is not set. Admin features will not work."
  );
}

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey || "dummy-key-for-build", {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});


