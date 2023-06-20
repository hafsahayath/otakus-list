import Card from "@/components/Card";
import { fetchWatchlistData } from "@/lib/server/fetchWatchlistData";
import { SearchAnimeResponse } from "@/lib/types/jikan-search.types";
import { modifyTrendingArray } from "@/lib/utils";

const getSearchedAnime = async ({
  name,
}: {
  name: string;
}): Promise<SearchAnimeResponse> => {
  const response = await fetch(`https://api.jikan.moe/v4/anime?q=${name}`);
  return await response.json();
};

type SearchPageParams = {
  searchParams: {
    name: string;
  };
};

const SearchPage = async ({ searchParams: { name } }: SearchPageParams) => {
  const { data } = await getSearchedAnime({ name });
  const watchListData = await fetchWatchlistData();
  modifyTrendingArray(data, watchListData);

  return (
    <div className="flex flex-wrap justify-center gap-6 pt-8">
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
  );
};

export default SearchPage;
