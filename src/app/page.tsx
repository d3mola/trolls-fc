'use server'

import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

import { PlayerCards } from "../components/player-cards";
import { getPlayers } from "../utils/supabase/players";

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

function getAttributes({ shooting, passing, defending, dribbling, physicality }: any) {
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
    {
      title: "Physicality",
      rating: physicality,
    },
  ];
}

export default async function Home() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { error, data } = await getPlayers();

  if (error || !data) {
    return <div>Something went wrong</div>;
  }

  const players = data.map((player) => {
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
