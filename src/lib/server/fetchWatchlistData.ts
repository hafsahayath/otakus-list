import { prisma } from "../db";

export const fetchWatchlistData = async () => {
  const res = await prisma.animeList.findMany();
  return res;
};
