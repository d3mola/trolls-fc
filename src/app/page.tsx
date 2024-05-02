import Image from "next/image";
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

export const players: Array<Player> = [
  {
    id: "1",
    name: "Ademola",
    position: "Defender",
    attributes: [
      {
        title: 'Shooting',
        rating: 1,
      },
      {
        title: 'Passing',
        rating: 2,
      },
      {
        title: 'Defending',
        rating: 3,
      },
      {
        title: 'Dribbling',
        rating: 4,
      },
    ],
  },
  {
    id: "2",
    name: "Jide Tella",
    position: "Attacker",
    attributes: [
      {
        title: 'Shooting',
        rating: 4,
      },
      {
        title: 'Passing',
        rating: 4,
      },
      {
        title: 'Defending',
        rating: 1,
      },
      {
        title: 'Dribbling',
        rating: 5,
      },
    ],
  },
];

export default function Home() {
  return <PlayerCards players={players} />;
}
