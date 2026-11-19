# AGENTS.md

## Mode kerja
- Kerjakan semua task di `blueprint/tasks/` secara berurutan (T001, T002, ... sampai T042), tanpa meminta konfirmasi kepada user.
- Sebelum mulai tiap task: baca file task tersebut dan semua file yang dicantumkan pada bagian "Baca dulu".
- Setelah menyelesaikan tiap task: jalankan perintah pada bagian "Verifikasi", centang semua kriteria selesai di file task, lalu perbarui `blueprint/PROGRESS.md` (ubah status `[ ]` menjadi `[x]`).
- Buat commit git untuk setiap task yang selesai dengan format pesan: `T001: <judul task>`.

## Kalau terhambat (Error / Blocker)
- Jangan berhenti dan jangan meminta konfirmasi kepada user.
- Catat hambatan di `blueprint/BLOCKERS.md` (format: ID task, deskripsi masalah teknis, tindakan yang sudah dicoba, keputusan mitigasi yang diambil).
- Ambil keputusan teknik paling aman dan stabil, lalu lanjutkan eksekusi ke task berikutnya.
- Jika task A terblokir fatal dan task B memiliki dependensi langsung pada A, tandai status task B di `blueprint/BLOCKERS.md` lalu lewati ke task berikutnya yang independen.

## Batasan keras (Hard Constraints)
- Hanya buat, ubah, atau hapus file di dalam direktori project ini (`opencode4`).
- Dilarang keras menyentuh atau memodifikasi file di luar folder project ini (misalnya `opencode1`, `opencode2`, atau `opencode3`).
- Jangan menghapus file apa pun di luar daftar file yang secara eksplisit diperintahkan dalam instruksi task.
- Dilarang keras mengubah isi file dalam folder `blueprint/`, KECUALI file `blueprint/PROGRESS.md` dan `blueprint/BLOCKERS.md`.
- Jangan menginstal dependensi/library npm di luar daftar resmi yang telah ditentukan di `blueprint/04-TECH-STACK.md`.
- Dilarang menjalankan perintah berbahaya atau destruktif (`rm -rf`, `git reset --hard`, `git push --force`, drop database tanpa skrip migrasi).
- Seluruh spesifikasi rental kamera wajib mematuhi skema data rental (tarif 12/24 jam, nomor seri alat, kelengkapan tas/baterai, status unit: ready/rented/maintenance, tanggal sewa).

## Konvensi Kode & Standar Kualitas
- Ikuti seluruh pedoman arsitektur, struktur file, dan penamaan di `blueprint/05-CONVENTIONS.md`.
- Wajib TypeScript strict mode (`noImplicitAny`, strict null checks). Tidak boleh menggunakan `any` tanpa alasan ekstrem.
- Gunakan Next.js App Router (Server Components sebagai default, pasang `'use client'` hanya saat dibutuhkan interaktivitas/state).

## Selesai
- Setelah seluruh task T001 s.d. T042 selesai dieksekusi, jalankan seluruh item verifikasi di `blueprint/99-FINAL-CHECKLIST.md`.
- Tulis ringkasan laporan hasil eksekusi (status build, route check, linting, migration check) di bagian akhir file `blueprint/PROGRESS.md`.
