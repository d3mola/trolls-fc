import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

import { PlayerCards } from "../components/player-cards";

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

export default async function Home() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { error, data: players_ } = await supabase.from("players").select();

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

  console.log(players_[0]);

  return <PlayerCards players={players} />;
}
