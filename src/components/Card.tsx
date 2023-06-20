import Image from "next/image";
import { Genre, StatusValues } from "@/lib/types/jikan-search.types";
import Synopsis from "./Synopsis";
import { addToWatchlist, removeFromWatchlist } from "@/lib/server/actions";

const Card = ({
  title,
  image_url,
  genre,
  status,
  id,
  addedToWatchList,
  score,
  type,
  synopsis,
  year,
  url,
}: {
  title: string;
  image_url: string;
  status: StatusValues;
  genre: Genre[];
  id: string;
  addedToWatchList: boolean;
  score: number;
  type: string;
  synopsis: string;
  year?: number;
  url: string;
}) => {
  const genres = genre?.map((ele) => ele.name).join(", ");
  const titleWithYear = title.includes(`${year}`);

  const BadgeStatusColorsEnum = {
    "Finished Airing": "badge-info",
    "Not yet aired": "bg-base-300",
    "Currently Airing": "badge-success",
  } as const;

  const getBadgeStyles = (status: StatusValues) => {
    return BadgeStatusColorsEnum[status];
  };

  return (
    <div className="w-full flex border-b border-base-300 pb-4">
      <div className="avatar indicator">
        {addedToWatchList ? (
          <span className="indicator-item indicator-bottom indicator-center badge bg-green-400">
            watchlisted
          </span>
        ) : null}
        <div className="w-32 relative">
          <Image
            src={image_url}
            alt={title}
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </div>
      <div className="card-body justify-between p-2">
        <div className="flex flex-col">
          <h2 className="card-title text-base">
            {title} {year && !titleWithYear ? `(${year})` : null}
          </h2>
          {genres ? <p className="text-sm mb-2">Genres: {genres}</p> : null}
          <div className={`card-actions ${!genres && "mt-2"}`}>
            {score ? (
              <div className={`badge bg-yellow-500 badge-sm`}>{score}</div>
            ) : null}
            {type ? (
              <div className={`badge bg-red-500 text-white badge-sm`}>
                {type}
              </div>
            ) : null}
            <div className={`badge badge-sm ${getBadgeStyles(status)}`}>
              {status}
            </div>
          </div>
          <Synopsis content={synopsis} url={url} />
        </div>
        <form className={`flex justify-end`}>
          {addedToWatchList ? (
            <button
              className="btn btn-xs btn-outline"
              formAction={async () => {
                "use server";
                await removeFromWatchlist(id);
              }}
            >
              - watchlist
            </button>
          ) : (
            <button
              className="btn btn-xs btn-outline"
              formAction={async () => {
                "use server";
                await addToWatchlist(title, id, genres, year, type);
              }}
            >
              + watchlist
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default Card;
