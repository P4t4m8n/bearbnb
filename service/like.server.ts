"use server";

import { LikeModel, WishListModel } from "@/model/like.model";
import { prisma } from "@/prisma/prisma";
import { getRating } from "./stay.service";

// Retrieve the like data from the database, including the stay and user details.
export const getLike = async (
  userId: string,
  stayId: string
): Promise<LikeModel> => {
  try {
    return await prisma.like.findFirstOrThrow({
      where: {
        userId,
        stayId,
      },
    });
  } catch (error) {
    throw new Error("Failed to get like");
  }
};
// Retrieve the list of likes by user from the database, including the stay details.
export const getLikesByUser = async (
  userId: string
): Promise<WishListModel[]> => {
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
              select: {
                url: true,
              },
            },
          },
        },
      },
    });
    // Map the retrieved data to the WishListModel structure.
    likes = data.map((like) => {
      return {
        id: like.id,
        notes: like.notes || "",
        stay: {
          id: like.stay.id,
          name: like.stay.name,
          type: like.stay.type,
          images: like.stay.images,
          location: like.stay.location,
          bedrooms: like.stay.bedrooms.flatMap((bedroom) => bedroom.beds),
          description: like.stay.description || "No description",
          rating: getRating(like.stay.reviews),
        },
      };
    });

    return likes;
  } catch (error) {
    throw new Error("Failed to get likes by user");
  }
};
// Update the notes for a like in the database.
export const updateLikeNotes = async (
  likeId: string,
  txt: string
): Promise<LikeModel> => {
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
// Add or remove a like from the database based on the input.
export const updateLike = async (
  likeId: string | null | undefined,
  stayId?: string,
  userId?: string
): Promise<LikeModel | null> => {
  if (likeId) return await _deleteLike(likeId);
  if (stayId && userId) return await _addLike(userId, stayId);
  // If the input is invalid, throw an error.
  throw new Error("Invalid input");
};

//**********private functions**********//

// Delete a like from the database.
const _deleteLike = async (likeId: string): Promise<null> => {
  try {
    await prisma.like.delete({
      where: {
        id: likeId,
      },
    });
    // Return null if the like is successfully deleted.
    return null;
  } catch (error) {
    throw new Error("Failed to delete like");
  }
};
// Add a like to the database.
const _addLike = async (userId: string, stayId: string): Promise<LikeModel> => {
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
