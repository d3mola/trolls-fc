'use server'

import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// Updates a player's rating for a given attribute
export async function updateRating({ playerId, attribute, rating }: { playerId: number, attribute: string, rating: number }) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  await supabase.from("players").update({ [attribute.toLowerCase()]: rating }).eq('id', playerId).select();
  redirect('/');
}

// Fetches all players from the database
export async function getPlayers() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { error, data } = await supabase.from("players").select().order('name', { ascending: true });
  return { error, data };
}
