"use server";
import { dbService } from "@/db/db.service";
import { UserModel } from "@/model/user.model";

export const createUser = async (
  user: Partial<UserModel>
): Promise<UserModel> => {
  const collection = await dbService.getCollection("users");
  const newUser = (await collection.insertOne(user)) as unknown as UserModel;

  return newUser;
};
export const getUserByEmail = async (
  email: string
): Promise<UserModel | null> => {
  const collection = await dbService.getCollection("users");
  const user = (await collection.findOne({ email })) as UserModel | null;
  return user;
};
