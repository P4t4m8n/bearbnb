import { prisma } from "@/prisma/prisma";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { getCache, setCache } from "./cache";
import { User, UserSmall } from "@/model/stay.model";

export async function getSmallLoggedInUser(): Promise<UserSmall | undefined> {
  "use server";
  let user;

  const supabase = createServerActionClient({
    cookies,
  });
  const { data } = await supabase.auth.getUser();

  if (data && data.user) {

    // const cacheKey: string = "userData";
    // let profile = await getCache(cacheKey);
    let profile = null;
    if (!profile)
      profile = await prisma.profile.findUnique({
        where: { supabaseId: data.user.id },
        include: {
          likes: true,
        },
      });
    if (!profile) throw new Error("no profile");
    // setCache(cacheKey, profile);
    const { isOwner, id, lastName, firstName, imgUrl, likes,supabaseId } = profile;
    user = {
      isOwner: isOwner,
      id: id,
      lastName: lastName,
      firstName: firstName,
      email: data.user.email || "",
      imgUrl: imgUrl,
      likes,
      authId:supabaseId
    };
  }

  return user;
}

export async function getLoggedInUser(): Promise<User | undefined> {
  "use server";
  let user;

  const supabase = createServerActionClient({
    cookies,
  });
  const { data } = await supabase.auth.getUser();
  
  if (!data || !data.user) throw new Error("no user");
  
  let profile = await getCache("userData");
  if (!profile) {
    profile = await prisma.profile.findUnique({
      where: { supabaseId: data.user.id },
      include: {
        likes: true,
        bookings: true,
        stays: true,
        review: true,
        hosting: true,
      },
    });
    if (!profile) throw new Error("no profile");
    setCache("userData", profile);
  }
  user = {
    isOwner: profile.isOwner,
    id: profile.id,
    lastName: profile.lastName,
    firstName: profile.firstName,
    email: data.user.email || "",
    imgUrl: profile.imgUrl,
    likes: profile.likes,
    reviews: null,
    stays: null,
    bookings: null,
    hosting: null,
  };

  return user;
}

