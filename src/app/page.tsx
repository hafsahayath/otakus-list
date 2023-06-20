import Card from "@/components/Card";
import { getTopAnimeList } from "@/lib/server/fetchTopAnimeList";

export default async function Home() {
  const data = await getTopAnimeList();

  return (
    <div>
      <h1 className="uppercase font-bold my-8 text-xl">Must watch</h1>
      <div className="flex flex-wrap justify-center gap-6">
        {data.map((anime) => {
          return (
            <Card
              key={anime.mal_id}
              id={`${anime.mal_id}`}
              title={anime.title}
              image_url={anime.images.webp.image_url}
              genre={anime.genres}
              status={anime.status}
              addedToWatchList={anime.alreadyAddedToWatchlist || false}
              score={anime.score}
              type={anime.type}
              synopsis={anime.synopsis}
              year={anime.year}
              url={anime.url}
            />
          );
        })}
      </div>
    </div>
  );
}
