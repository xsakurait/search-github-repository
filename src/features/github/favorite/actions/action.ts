"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache"; 

export async function FavoriteAction(
  favoriteId: number,
  itemId: number,
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


  // 1. すでにこのアイテムがお気に入り（FavoriteItem）に登録されているか調べる
  const existingItem = await prisma.favoriteItem.findUnique({
    where: {
      favoriteId_itemId: {
        favoriteId,
        itemId,
      },
    },
  });

  if (existingItem) {
    await prisma.favoriteItem.delete({
      where: {
        id: existingItem.id,
      },
    });
  } else {
    await prisma.favoriteItem.create({
      data: {
        favoriteId,
        itemId,
        itemTitle,
      },
    });
  }

  revalidatePath("/favorites");
}