"use server";

import { dbService } from "@/db/db.service";
import { LikeModel } from "@/model/Like.model";
import { ObjectId } from "mongodb";

export const getLike = async (
  userId: string,
  stayId: string
): Promise<LikeModel | null> => {
  const collection = await dbService.getCollection("likes");
  const like = (await collection.findOne({
    userId,
    stayId,
  })) as unknown as LikeModel;
  return like;
};

export const getLikesByUser = async (userId: string): Promise<LikeModel[]> => {
  const collection = await dbService.getCollection("likes");
  const likes = (await collection
    .find({ userId })
    .toArray()) as unknown as LikeModel[];

  return likes;
};

export const saveLike = async (
  likeId: string,
  userId: string,
  stayId: string
): Promise<string | null> => {
  if (likeId) return await _remove(likeId);
  if (userId && stayId) return await _create(userId, stayId);

  return null;
};

////////////////// Private functions //////////////////
const _create = async (userId: string, stayId: string): Promise<string> => {
  const collection = await dbService.getCollection("likes");
  const data = await collection.insertOne({
    userId: new ObjectId(userId),
    stayId: new ObjectId(stayId),
  });

  return data.insertedId.toString();
};

const _remove = async (likeId: string): Promise<null> => {
  const collection = await dbService.getCollection("likes");
  await collection.deleteOne({ _id: new ObjectId(likeId) });
  return null;
};
