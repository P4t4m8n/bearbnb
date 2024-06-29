"use server";
import { dbService } from "@/db/db.service";
import { UserCreateModel, UserModel } from "@/model/user.model";

export const createUser = async (user: UserCreateModel): Promise<UserModel> => {
  const collection = await dbService.getCollection("users");
  const newUser = (await collection.insertOne(user)) as unknown as UserModel;

  return newUser;
};
export const getUserByFilter = async (
  filter: Partial<UserModel>
): Promise<UserModel | null> => {
  console.log("filter:", filter)
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

  return user;
};
