'use server'

import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function updateRating({ playerId, attribute, rating }: { playerId: number, attribute: string, rating: number }) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  await supabase.from("players").update({ [attribute.toLowerCase()]: rating }).eq('id', playerId).select();
  redirect('/');
}
