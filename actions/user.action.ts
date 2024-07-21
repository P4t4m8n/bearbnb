"use server";
import { dbService } from "@/db/db.service";
import {  UserFilterModel, UserModel, userSchema } from "@/model/user.model";

export const createUser = async (user: userSchema): Promise<userSchema> => {
  const userToSave: userSchema = {
    dob: user.dob,
    email: user.email,
    firstName: user.firstName,
    isOwner: user.isOwner,
    lastName: user.lastName,
    imgUrl: user.imgUrl,
    password: user.password,
  };
  try {
    const collection = await dbService.getCollection("users");
    const newUser = await collection.insertOne(userToSave);
    return {
      ...userToSave,
      _id: newUser.insertedId,
    };
  } catch (error) {
    throw new Error(`Failed to create user: ${error}`);
  }
};

export const getUserByFilter = async (
  filter: UserFilterModel
): Promise<UserModel | null> => {
  const collection = await dbService.getCollection("users");

  const pipeline = [
    { $match: filter },
    {
      $lookup: {
        from: "likes",
        localField: "_id",
        foreignField: "userId",
        as: "likes",
      },
    },
    { $limit: 1 },
  ];

  const [user] = await collection.aggregate<UserModel>(pipeline).toArray();
  if (!user) {
    return null;
  }
  user._id = user._id.toString();
  if (user.likes?.length)
    user.likes = user.likes.map((like) => {
      return {
        _id: like._id.toString(),
        stayId: like.stayId!.toString(),

        userId: like.userId!.toString(),
        note: like.note,
      };
    });

  return user;
};
