import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  if (!userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const favoritesWithItems = await prisma.favorite.findMany({
    where: { userId },
    include: {
      items: {
        orderBy: { createdAt: "desc" },
      },
    },
    orderBy: {
      createAt: "desc",
    },
  });

  return NextResponse.json(favoritesWithItems);
}
