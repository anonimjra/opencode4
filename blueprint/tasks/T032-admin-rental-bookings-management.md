# T032 - Admin Kelola Antrean Booking Sewa Masuk

**Depends on:** T015, T024
**Estimasi:** sedang

## Tujuan
Membangun modul manajemen antrean booking sewa di `/admin/bookings` beserta antarmuka tabel (`components/admin/RentalBookingsTable.tsx`) untuk memantau data penyewa, alat yang disewa, tanggal ambil/kembali, durasi sewa, total estimasi biaya, mengubah status verifikasi, dan shortcut export Excel.

## Baca dulu
- AGENTS.md
- blueprint/06-DATA-MODEL.md
- blueprint/05-CONVENTIONS.md

## File yang dibuat / diubah
- `app/admin/bookings/page.tsx` : Halaman daftar antrean booking sewa
- `components/admin/RentalBookingsTable.tsx` : Tabel interaktif antrean booking
- `app/actions/bookings.ts` : Server Actions update status booking & delete

## Langkah
1. Buat atau perbarui `app/actions/bookings.ts`:
   - Deklarasikan `'use server'`.
   - `updateBookingStatus(id: string, status: BookingStatus): Promise<ActionResponse>`:
     - Update kolom `status` pada tabel `rental_bookings`.
     - Revalidasi path `/admin/bookings` dan `/admin`.
   - `deleteBooking(id: string): Promise<ActionResponse>`:
     - Hapus baris dari database dan revalidasi path.
2. Buat `components/admin/RentalBookingsTable.tsx`:
   - Tandai dengan `'use client'`.
   - Terima props `bookings: RentalBooking[]`.
   - Filter Tab: "Semua Booking", "Pending Verifikasi", "Terverifikasi", "Sedang Berjalan (Active)", "Selesai (Completed)", "Batal".
   - Kolom Tabel:
     1. Tanggal Booking
     2. Nama Penyewa & Nomor WhatsApp (dengan tombol cepat "Chat WA Penyewa")
     3. Alat / Paket yang Disewa
     4. Jadwal Ambil & Jadwal Kembali
     5. Durasi Sewa (Hari) & Tipe (12h/24h)
     6. Estimasi Total Biaya (Rupiah)
     7. Status (Dropdown seleksi status)
     8. Aksi (Detail Modal, Tombol Hapus dengan konfirmasi)
   - Tombol "Chat WA Penyewa": Membuka chat WA dengan template:
     *"Halo kak {nama}, kami dari Lensa Nusantara Rental ingin mengonfirmasi permohonan booking sewa {alat} untuk tanggal {jadwal}..."*
3. Buat `app/admin/bookings/page.tsx`:
   - Server Component pemanggil `rental_bookings` dari Supabase diurutkan `created_at DESC`.
   - Header: Judul "Antrean Booking Sewa", keterangan jumlah booking pending, dan tombol "Export Excel Rekap".
   - Render `RentalBookingsTable`.

## Kriteria selesai
- [ ] Admin dapat melihat daftar antrean booking sewa lengkap dengan tanggal dan total biaya.
- [ ] Status booking dapat diubah secara langsung dari tabel.
- [ ] Tombol chat WA mengarahkan langsung ke WhatsApp penyewa.

## Verifikasi
`npx tsc --noEmit`

## Catatan / jebakan
- Standarisasi format nomor WhatsApp penyewa (62...) sebelum membuat tautan chat.
