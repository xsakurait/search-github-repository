import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth-options";

export async function getSession() {
  return getServerSession(authOptions);
}

export async function getCurrentUserId(): Promise<number | null> {
  const session = await getSession();
  return session?.user?.id ?? null;
}

export async function requireUserId(): Promise<number> {
  const userId = await getCurrentUserId();
  if (!userId) {
    throw new Error("UNAUTHORIZED");
  }
  return userId;
}
