import { AnimeList } from "@prisma/client";
import { TopAnimeResponse } from "./types/jikan-top.types";
import { SearchAnimeResponse } from "./types/jikan-search.types";

export function modifyTrendingArray(
  arrayX: TopAnimeResponse["data"] | SearchAnimeResponse["data"],
  arrayY: AnimeList[]
): void {
  const idSet = new Set<string>();

  // Create a set of unique IDs from arrayY for efficient lookup
  for (const obj of arrayY) {
    idSet.add(obj.id);
  }

  // Iterate over arrayX and modify objects if their IDs are found in arrayY
  for (const obj of arrayX) {
    if (idSet.has(`${obj.mal_id}`)) {
      obj.alreadyAddedToWatchlist = true;
    }
  }
}

export function shortenString(str: string) {
  const newlineIndex = str.indexOf("\n");
  if (newlineIndex !== -1) {
    return str.substring(0, newlineIndex);
  }
  return str;
}