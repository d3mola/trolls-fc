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

// let players: Array<Player> = [
//   {
//     id: "1",
//     name: "Ademola",
//     position: "Defender",
//     attributes: [
//       {
//         title: "Shooting",
//         rating: 1,
//       },
//       {
//         title: "Passing",
//         rating: 2,
//       },
//       {
//         title: "Defending",
//         rating: 3,
//       },
//       {
//         title: "Dribbling",
//         rating: 4,
//       },
//     ],
//   },
//   {
//     id: "2",
//     name: "Jide Tella",
//     position: "Attacker",
//     attributes: [
//       {
//         title: "Shooting",
//         rating: 4,
//       },
//       {
//         title: "Passing",
//         rating: 4,
//       },
//       {
//         title: "Defending",
//         rating: 1,
//       },
//       {
//         title: "Dribbling",
//         rating: 5,
//       },
//     ],
//   },
// ];

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

export async function updateRating({ playerId, attribute, rating }: { playerId: number, attribute: string, rating: number}) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  await supabase.from("players").update({ [attribute.toLowerCase()]: rating }).eq('id', playerId).select();
  redirect('/');
}

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
