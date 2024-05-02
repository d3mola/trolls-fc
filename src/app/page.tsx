import Image from "next/image";
import { PlayerCards } from "../components/player-cards";

export type Player = {
  id: string;
  name: string;
  position: string;
  shooting: string;
  passing: string;
  dribbling: string;
  defending: string;
  image? : {
    src: string;
    alt: string;
  }
};

export const players: Array<Player> = [
  {
    id: "1",
    name: "Ademola",
    position: "Defender",
    shooting: "4",
    defending: "3",
    dribbling: "2",
    passing: "2",
  },
  {
    id: "2",
    name: "Jide Tella",
    position: "Attcaker",
    shooting: "4",
    defending: "2",
    dribbling: "4",
    passing: "4",
  },
];

export default function Home() {
  return (
    <PlayerCards players={players} />
  );
}
