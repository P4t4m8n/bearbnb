"use server";

import { Like } from "@/model/stay.model";
import { prisma } from "@/prisma/prisma";

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

export const updateLIke = async (
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
