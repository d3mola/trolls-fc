'use server'

import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

import { PlayerCards } from "../components/player-cards";
import { redirect } from "next/navigation";

export type PlayerAttribute = {
  title: string;
  rating: number;
};

export type Player = {
  id: string;
  name: string;
  attributes: Array<PlayerAttribute>;
  position: string;
  image?: {
    src: string;
    alt: string;
  };
};

function getAttributes({ shooting, passing, defending, dribbling }: any) {
  return [
    {
      title: "Shooting",
      rating: shooting,
    },
    {
      title: "Passing",
      rating: passing,
    },
    {
      title: "Defending",
      rating: defending,
    },
    {
      title: "Dribbling",
      rating: dribbling,
    },
  ];
}

// export async function updateRating({ playerId, attribute, rating }: { playerId: number, attribute: string, rating: number}) {
//   'use server'
//   const cookieStore = cookies();
//   const supabase = createClient(cookieStore);
//   await supabase.from("players").update({ [attribute.toLowerCase()]: rating }).eq('id', playerId).select();
//   redirect('/');
// }

export default async function Home() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { error, data: players_ } = await supabase.from("players").select().order('name', { ascending: true });

  if (error) {
    return <div>Something went wrong</div>;
  }

  let players = players_.map((player) => {
    const { id, name, position } = player;
    return {
      id: id.toString(),
      name,
      position,
      attributes: getAttributes(player),
    };
  });

  return <PlayerCards players={players} />;
}
