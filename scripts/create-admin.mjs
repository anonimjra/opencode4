// Skrip pembuatan akun admin awal menggunakan Supabase Service Role Key.
// Jalankan: node scripts/create-admin.mjs <email> <password>
//
// PENTING: Set SUPABASE_SERVICE_ROLE_KEY dan NEXT_PUBLIC_SUPABASE_URL
// pada environment sebelum menjalankan skrip ini. Jangan commit kunci rahasia.

import { createClient } from "@supabase/supabase-js";

const [, , email, password] = process.argv;

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceKey) {
  console.error(
    "NEXT_PUBLIC_SUPABASE_URL dan SUPABASE_SERVICE_ROLE_KEY wajib diset.",
  );
  process.exit(1);
}

if (!email || !password) {
  console.error("Penggunaan: node scripts/create-admin.mjs <email> <password>");
  process.exit(1);
}

const supabase = createClient(url, serviceKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const { data, error } = await supabase.auth.admin.createUser({
  email,
  password,
  email_confirm: true,
});

if (error) {
  console.error("Gagal membuat admin:", error.message);
  process.exit(1);
}

console.log("Akun admin berhasil dibuat:", data.user?.email);
