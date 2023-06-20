import { TopAnimeResponse } from "../types/jikan-top.types";

export const fetchTopAnime = async () => {
  const res = await fetch("https://api.jikan.moe/v4/top/anime");
  const result: TopAnimeResponse = await res.json();

  return result.data;
};
