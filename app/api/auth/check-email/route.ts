// POST /api/auth/check-email
// Body: { email: string }
// Returns 200 { exists: boolean }

import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function POST(request: Request) {
  try {
    const { email } = (await request.json()) as { email?: string };
    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Email tidak valid" },
        { status: 400 }
      );
    }

    if (!process.env.SUPABASE_SERVICE_ROLE_KEY && !process.env.SUPABASE_SERVICE_ROLE && !process.env.SUPABASE_SERVICE_KEY) {
      return NextResponse.json(
        { error: "Server belum dikonfigurasi dengan service role key" },
        { status: 500 }
      );
    }

    // Use admin API to list users and check by email
    const { data, error } = await supabaseAdmin.auth.admin.listUsers();
    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    const exists = data?.users?.some(user => user.email === email) || false;
    return NextResponse.json({ exists });
  } catch {
    return NextResponse.json({ error: "Unexpected error" }, { status: 500 });
  }
}


