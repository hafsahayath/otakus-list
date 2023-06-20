"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "../db";
import { WatchStatus } from "@prisma/client";

export const addToWatchlist = async (
  title: string,
  id: string,
  genres?: string,
  year?: number,
  type?: string
) => {
  await prisma.animeList.create({
    data: {
      id,
      title,
      watch_status: "NOT_STARTED",
      genres,
      year,
      type,
    },
  });
  revalidatePath("/");
};

export const removeFromWatchlist = async (id: string) => {
  await prisma.animeList.delete({
    where: { id },
  });
  revalidatePath("/");
};

export const updateWatchStatus = async (
  id: string,
  animeWatchStatus: WatchStatus
) => {
  await prisma.animeList.update({
    where: { id },
    data: { watch_status: animeWatchStatus },
  });
  revalidatePath("/watchlist");
};
