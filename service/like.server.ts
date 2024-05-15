"use server";

import { Like } from "@/model/stay.model";
import { prisma } from "@/prisma/prisma";
// import { getCache, setCache } from "./cache";
import { set } from "zod";
import { WishListModel } from "@/model/like.model";

export const getLike = async (
  userId: string,
  stayId: string
): Promise<Like | null> => {
  try {
    return await prisma.like.findFirst({
      where: {
        userId,
        stayId,
      },
    });
  } catch (error) {
    throw new Error("Failed to get like");
  }
};

export const getLikesByUser = async (
  userId: string
): Promise<WishListModel[]> => {
  // let likes = await getCache(`likes-${userId}`);
  // if (likes && likes.length) return likes;
  let likes;
  try {
    const data = await prisma.like.findMany({
      where: {
        userId,
      },
      select: {
        id: true,
        notes: true,
        stay: {
          select: {
            id: true,
            name: true,
            description: true,
            type: true,
            reviews: true,
            bedrooms: {
              select: {
                beds: true,
              },
            },
            capacity: true,
            location: {
              select: {
                city: true,
                country: true,
              },
            },
            images: {
              take: 1,
              select: {
                url: true,
              },
            },
          },
        },
      },
    });

    likes = data.map((like) => {
      return {
        id: like.id,
        notes: like.notes || "",
        stay: {
          stayId: like.stay.id,
          name: like.stay.name,
          type: like.stay.type,
          image: like.stay.images[0]?.url || "",
          location: like.stay.location,
          bedrooms: like.stay.bedrooms,
          description: like.stay.description || "No description",
          rating:
            like.stay.reviews && like.stay.reviews.length > 0
              ? like.stay.reviews.reduce((acc, curr) => acc + curr.rate, 0) /
                like.stay.reviews.length
              : 0,
        },
      };
    });

    // setCache(`likes-${userId}`, likes);
    return likes;
  } catch (error) {
    throw new Error("Failed to get likes by user");
  }
};

export const updateLikeNotes = async (likeId: string, txt: string) => {
  try {
    return await prisma.like.update({
      where: {
        id: likeId,
      },
      data: {
        notes: txt,
      },
    });
  } catch (error) {
    throw new Error("Failed to update like notes");
  }
};

export const updateLike = async (
  likeId: string | null | undefined,
  stayId?: string,
  userId?: string
): Promise<Like | null> => {
  if (likeId) return await _deleteLike(likeId);

  if (stayId && userId) return await _addLike(userId, stayId);

  throw new Error("Invalid input");
};

const _deleteLike = async (likeId: string): Promise<null> => {
  try {
    await prisma.like.delete({
      where: {
        id: likeId,
      },
    });
    return null;
  } catch (error) {
    throw new Error("Failed to delete like");
  }
};

const _addLike = async (
  userId: string,
  stayId: string
): Promise<Like | null> => {
  try {
    return await prisma.like.create({
      data: {
        user: {
          connect: {
            id: userId,
          },
        },
        stay: {
          connect: {
            id: stayId,
          },
        },
      },
    });
  } catch (error) {
    throw new Error("Failed to add like");
  }
};
