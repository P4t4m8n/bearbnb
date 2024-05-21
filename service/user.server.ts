"use server";

import { UserSmallModel } from "@/model/user.model";
import { prisma } from "@/prisma/prisma";
import { getCache, setCache } from "@/util/redis.util";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function getSmallLoggedInUser(): Promise<UserSmallModel | null> {
  "use server";
  const supabase = createServerActionClient({
    cookies,
  });
  const { data } = await supabase.auth.getUser();
  if (!data || !data.user) return null;

  let user = await getCache(data.user.id);
  if (user) return user;

  const profile = await prisma.profile.findUnique({
    where: { supabaseId: data.user.id },
    include: {
      likes: true,
    },
  });

  if (!profile) throw new Error("no profile");

  const { isOwner, id, lastName, firstName, imgUrl, likes, supabaseId } =
    profile;

  user = {
    isOwner: isOwner,
    id: id,
    lastName: lastName,
    firstName: firstName,
    email: data.user.email || "",
    imgUrl: imgUrl,
    likes,
    authId: supabaseId,
  };

  await setCache(data.user.id, user);

  return user;
}
