"use client";

/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/oies5WSYoq1
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */

/** Add fonts into your Next.js project:

import { Inter } from 'next/font/google'

inter({
  subsets: ['latin'],
  display: 'swap',
})

To read more about using these font, please visit the Next.js documentation:
- App Directory: https://nextjs.org/docs/app/building-your-application/optimizing/fonts
- Pages Directory: https://nextjs.org/docs/pages/building-your-application/optimizing/fonts
**/
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Player, type PlayerAttribute } from "../app/page";
import { updateRating } from "../utils/supabase/players";

type PlayerCardsProps = {
  players: Array<Player>;
};

export function PlayerCards({ players }: PlayerCardsProps) {
  return (
    <div className="flex flex-col h-screen">
      <header className="bg-gray-900 text-white py-4 px-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Trolls FC</h1>
        <Button size="sm" variant="outline">
          <PlusIcon className="h-4 w-4" />
          Add Player
        </Button>
      </header>
      <main className="flex-1 overflow-y-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {players.map((player) => {
            return <PlayerCard key={player.id} player={player} />;
          })}
        </div>
      </main>
    </div>
  );
}

type PlayerAttributeProps = {
  id: string;
  attribute: PlayerAttribute;
};
function PlayerAttribute({ id, attribute }: PlayerAttributeProps) {
  const { title, rating } = attribute;
  return (
    <div className="flex items-center justify-between">
      <span className="text-gray-500">{title}</span>
      <Rating rating={rating} playerId={id} attribute={attribute} />
    </div>
  );
}

type PlayerCardProps = {
  player: Player;
};
function PlayerCard(props: PlayerCardProps) {
  const { player } = props;
  const { name, position, image, attributes } = player;
  return (
    <Card className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="flex items-center p-4 border-b">
        <img
          alt={image?.alt || "Player Avatar"}
          className="rounded-full mr-4"
          height={48}
          src={image?.src || "/placeholder.svg"}
          style={{
            aspectRatio: "48/48",
            objectFit: "cover",
          }}
          width={48}
        />
        <div>
          <h2 className="text-lg font-bold">{name}</h2>
          <p className="text-gray-500 capitalize">{position}</p>
        </div>
      </div>
      <div className="p-4 space-y-2">
        {attributes.map((att) => {
          return (
            <PlayerAttribute id={player.id} key={att.title} attribute={att} />
          );
        })}
      </div>
    </Card>
  );
}

function PlusIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}

function Rating({
  rating,
  playerId,
  attribute,
}: {
  rating: number;
  playerId: string;
  attribute: PlayerAttribute;
}) {
  // const [stars, setStars] = useState(rating);
  return (
    <div className="flex items-center">
      {[0, 1, 2, 3, 4].map((id) => {
        return (
          <StarIcon
            key={`player_${playerId}_${id}`}
            id={id}
            starPos={id+1}
            stars={rating}
            // setStars={setStars}
            playerId={playerId}
            attribute={attribute}
          />
        );
      })}
    </div>
  );
}

function StarIcon({ playerId, attribute, stars: rating, starPos, ...props }: any) {
  let filled = starPos <= rating
  const ratingIsUnchaged = rating === starPos;
  return (
    <button
      aria-label="Set shooting rating to 1"
      className="text-yellow-500 hover:text-yellow-600 focus:outline-none"
      onClick={() => {
        updateRating({
          playerId: Number(playerId),
          attribute: attribute.title,
          rating: ratingIsUnchaged ? starPos - 1 : starPos,
        });
      }}
    >
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill={filled ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
      >
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    </button>
  );
}
