"use server";

import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";

export async function addItemToFavorite(
  favoriteId: number,
  itemId: string,
  itemTitle: string,
) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  if (!userId) {
    throw new Error("ログインが必要です");
  }

  const favorite = await prisma.favorite.findFirst({
    where: { id: favoriteId, userId },
  });

  if (!favorite) {
    throw new Error("フォルダが見つかりません");
  }

  await prisma.favoriteItem.create({
    data: {
      favoriteId,
      itemId,
      itemTitle,
    },
  });
}
