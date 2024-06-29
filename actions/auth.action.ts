"use server";

import { UserCreateModel, UserModel } from "@/model/user.model";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import { createUser, getUserByFilter } from "./user.action";
import { createSession, removeSession } from "./session.action";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";

export const login = async (formData: FormData): Promise<any> => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  if (!email || !password) {
    throw new Error("Username and password are required");
  }

  const user = await getUserByFilter({ email: email });
  if (!user || !user.password) {
    throw new Error("User not found");
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw new Error("Invalid password");
  }

  delete user.password;
  const sessionToken = await createSession(user._id.toString());
  cookies().set("session", sessionToken, {
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 1),
    httpOnly: true,
    sameSite: "strict",
  });
  return user;
};

export const signup = async (formData: FormData): Promise<UserModel> => {
  const saltRounds = 10;
  const userToCreate: UserCreateModel = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    firstName: formData.get("firstName") as string,
    lastName: formData.get("lastName") as string,
    dob: new Date(formData.get("dob") as string),
  };

  if (!userToCreate.email || !userToCreate.password) {
    throw new Error("Username and password are required");
  }

  const existingUser = await getUserByFilter({ email: userToCreate.email });
  if (existingUser) {
    throw new Error("User already exists");
  }

  const hash = await bcrypt.hash(userToCreate.password, saltRounds);

  const savedUser = await createUser({ ...userToCreate, password: hash });
  const user = await login(formData);
  return user;
};

export const logout = async () => {
  const session = cookies().get("session");
  if (!session) {
    throw new Error("No session found");
  }
  await removeSession(session.value);
  cookies().set("session", "", {
    expires: new Date(0),
  });
};

export const getSessionUser = async (): Promise<UserModel | null> => {
  "use server";
  const token = cookies().get("session");
  if (!token) {
    return null;
  }

  try {
    const decoded = jwt.decode(token.value) as { userId: string };
    if (!decoded || !decoded.userId) return null;
    const user = await getUserByFilter({ _id: new ObjectId(decoded.userId) });

    if (!user) {
      throw new Error("User not found");
    }
    delete user.password;
    return { ...user };
  } catch (err) {
    throw new Error(`Error fetching session user: ${err}`);
  }
};
