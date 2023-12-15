import { AnimeList, WatchStatus } from "@prisma/client";
import { TopAnimeResponse } from "./types/jikan-top.types";
import { SearchAnimeResponse, StatusValues } from "./types/jikan-search.types";

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

export const ClientWatchStatusEnum = {
  IN_PROGRESS: "In Progress",
  NOT_STARTED: "Not Started",
  COMPLETED: "Completed",
} as const;

export type ClientWatchStatusValues =
  (typeof ClientWatchStatusEnum)[keyof typeof ClientWatchStatusEnum];

export const getWatchStatusValue = (status: WatchStatus) => {
  return ClientWatchStatusEnum[status];
};

export const sendAppropriateStatus = (status: ClientWatchStatusValues) => {
  const entry = Object.entries(ClientWatchStatusEnum).find(
    ([_, value]) => value === status
  );
  return entry![0] as keyof typeof ClientWatchStatusEnum;
};
