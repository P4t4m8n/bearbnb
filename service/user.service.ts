import { prisma } from "@/prisma/prisma";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { getCache, setCache } from "./cache";

export async function getLoggedInUser() {
  'use server'
  let user;

  const supabase = createServerActionClient({
    cookies,
  });
  const { data } = await supabase.auth.getUser();

  if (data && data.user) {
    const cacheKey: string = "userData";
    let profile = await getCache(cacheKey);
    if (!profile)
      profile = await prisma.profile.findUnique({
        where: { supabaseId: data.user.id },
      });
    if (!profile) throw new Error("no profile");
    setCache(cacheKey, profile);
    user = {
      isOwner: profile.isOwner,
      id: profile.id,
      lastName: profile.lastName,
      firstName: profile.firstName,
      email: data.user.email || "",
      imgUrl: profile.imgUrl,
      likes: [],
    };
  }

  return user;
}
