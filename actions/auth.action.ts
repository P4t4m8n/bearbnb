"use server";

import { UserModel } from "@/model/user.model";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import { createUser, getUserByEmail } from "./user.action";
import { createSession, removeSession } from "./session.action";


export const login = async (state: any, formData: FormData): Promise<UserModel> => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  if (!email || !password) {
    throw new Error("Username and password are required");
  }

  const user = await getUserByEmail(email);
  if (!user || !user.password) {
    throw new Error("User not found");
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw new Error("Invalid password");
  }

  delete user.password;
  const sessionToken = await createSession(user._id);
  cookies().set("session", sessionToken, {
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    httpOnly: true,
  });
  return user;
};

export const signup = async (state: any, formData: FormData): Promise<UserModel> => {
  const saltRounds = 10;
  const user: Partial<UserModel> = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    firstName: formData.get("firstName") as string,
    lastName: formData.get("lastName") as string,
    dob: new Date(formData.get("dob") as string),
  };

  if (!user.email || !user.password) {
    throw new Error("Username and password are required");
  }

  const existingUser = await getUserByEmail(user.email);
  if (existingUser) {
    throw new Error("User already exists");
  }

  const hash = await bcrypt.hash(user.password, saltRounds);

  const savedUser = await createUser({ ...user, password: hash });
  delete savedUser.password;
  return savedUser;
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


