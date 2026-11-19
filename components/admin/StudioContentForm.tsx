"use client";

import { useState, useTransition } from "react";
import { AlertCircle, Save, CheckCircle2 } from "lucide-react";
import Button from "@/components/ui/Button";
import { updateStudioContent } from "@/app/actions/content";
import type { SiteSettings } from "@/types/database";

type StudioContentFormProps = {
  settings: SiteSettings;
};

function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <fieldset className="rounded-2xl border border-[#1F2937] bg-[#111827] p-5">
      <legend className="px-1 text-sm font-semibold text-white">{title}</legend>
      <div className="mt-3 space-y-3">{children}</div>
    </fieldset>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm text-gray-300">{label}</label>
      {children}
    </div>
  );
}

const inputClass =
  "w-full rounded-xl border border-gray-700 bg-[#0B0F17] px-3 py-2.5 text-sm text-white focus:border-primary focus:outline-none";

export default function StudioContentForm({
  settings,
}: StudioContentFormProps) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const visitingHoursText = settings.visiting_hours
    .map((hour) => `${hour.day} | ${hour.time}`)
    .join("\n");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSuccess(false);
    const formData = new FormData(event.currentTarget);
    startTransition(async () => {
      const result = await updateStudioContent(formData);
      if (result.success) {
        setSuccess(true);
      } else {
        setError(result.error ?? "Terjadi kesalahan.");
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error ? (
        <div className="flex items-start gap-2 rounded-xl border border-[#991B1B] bg-[#450A0A] px-4 py-3 text-sm text-[#F87171]">
          <AlertCircle className="mt-0.5 h-4 w-4 flex-none" />
          <span>{error}</span>
        </div>
      ) : null}
      {success ? (
        <div className="flex items-center gap-2 rounded-xl border border-[#166534] bg-[#052E16] px-4 py-3 text-sm text-[#4ADE80]">
          <CheckCircle2 className="h-4 w-4" />
          Pengaturan konten berhasil disimpan.
        </div>
      ) : null}

      <Card title="1. Banner Hero & Headline">
        <Field label="Judul Hero">
          <input
            name="hero_title"
            defaultValue={settings.hero_title}
            className={inputClass}
          />
        </Field>
        <Field label="Subjudul Hero">
          <textarea
            name="hero_subtitle"
            defaultValue={settings.hero_subtitle}
            rows={3}
            className={inputClass}
          />
        </Field>
      </Card>

      <Card title="2. Standar Perawatan & Profil Studio">
        <Field label="Judul Profil Studio">
          <input
            name="studio_title"
            defaultValue={settings.studio_title}
            className={inputClass}
          />
        </Field>
        <Field label="Deskripsi Profil Studio">
          <textarea
            name="studio_description"
            defaultValue={settings.studio_description}
            rows={4}
            className={inputClass}
          />
        </Field>
      </Card>

      <Card title="3. Syarat & Ketentuan Jaminan Sewa">
        <Field label="Teks Syarat Jaminan (pisahkan per baris)">
          <textarea
            name="rental_terms"
            defaultValue={settings.rental_terms}
            rows={6}
            className={inputClass}
          />
        </Field>
      </Card>

      <Card title="4. Alamat Studio & Jam Buka Operasional">
        <Field label="Alamat Studio Pick-up">
          <textarea
            name="studio_address"
            defaultValue={settings.studio_address}
            rows={2}
            className={inputClass}
          />
        </Field>
        <Field label="URL Google Maps Embed">
          <input
            name="google_maps_embed_url"
            defaultValue={settings.google_maps_embed_url ?? ""}
            className={inputClass}
          />
        </Field>
        <Field label="Jam Kunjungan (format: Hari | Jam per baris)">
          <textarea
            name="visiting_hours"
            defaultValue={visitingHoursText}
            rows={3}
            className={inputClass}
          />
        </Field>
      </Card>

      <Card title="5. Nomor WhatsApp & Media Sosial">
        <Field label="Nomor WhatsApp Rental (62...)">
          <input
            name="whatsapp_number"
            defaultValue={settings.whatsapp_number}
            className={inputClass}
          />
        </Field>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <Field label="Instagram">
            <input
              name="instagram_url"
              defaultValue={settings.instagram_url ?? ""}
              className={inputClass}
            />
          </Field>
          <Field label="TikTok">
            <input
              name="tiktok_url"
              defaultValue={settings.tiktok_url ?? ""}
              className={inputClass}
            />
          </Field>
          <Field label="Facebook">
            <input
              name="facebook_url"
              defaultValue={settings.facebook_url ?? ""}
              className={inputClass}
            />
          </Field>
        </div>
      </Card>

      <div className="flex justify-end">
        <Button type="submit" isLoading={isPending}>
          <Save className="h-4 w-4" />
          Simpan Seluruh Pengaturan Konten
        </Button>
      </div>
    </form>
  );
}
