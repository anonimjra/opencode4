"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { ActionResponse } from "@/types";
import type { BookingStatus } from "@/types/database";

export async function updateBookingStatus(
  id: string,
  status: BookingStatus,
): Promise<ActionResponse> {
  const supabase = await createClient();
  const { error } = await supabase
    .from("rental_bookings")
    .update({ status })
    .eq("id", id);

  if (error) {
    return { success: false, error: `Gagal memperbarui status: ${error.message}` };
  }

  revalidatePath("/admin/bookings");
  revalidatePath("/admin");
  return { success: true };
}

export async function deleteBooking(id: string): Promise<ActionResponse> {
  const supabase = await createClient();
  const { error } = await supabase
    .from("rental_bookings")
    .delete()
    .eq("id", id);

  if (error) {
    return { success: false, error: `Gagal menghapus booking: ${error.message}` };
  }

  revalidatePath("/admin/bookings");
  revalidatePath("/admin");
  return { success: true };
}
