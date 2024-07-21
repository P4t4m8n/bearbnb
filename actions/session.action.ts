"use server";

import { dbService } from "@/db/db.service";
import { SessionModel } from "@/model/session.model";
import { cryptr } from "@/service/auth.service";
import { DeleteResult, ObjectId } from "mongodb";
import jwt from "jsonwebtoken";

const ONE_DAY_IN_SECONDS = 24 * 60 * 60;
const secretKey = process.env.JWT_SECRET;

export const createSession = async (userId: string): Promise<string> => {
  const collection = await dbService.getCollection("sessions");

  const expiresAt = Math.floor(Date.now() / 1000) + ONE_DAY_IN_SECONDS;
  const token = jwt.sign({ userId }, secretKey!, {
    expiresIn: ONE_DAY_IN_SECONDS,
  });

  const session = await collection.insertOne({
    userId: new ObjectId(userId),
    expiresAt: new Date(expiresAt * 1000),
    token,
  });

  return token;
};

export const validateSession = async (
  token: string
): Promise<SessionModel | null> => {
  const decrypted = cryptr.decrypt(token);
  const sessionData = JSON.parse(decrypted);

  const collection = await dbService.getCollection("sessions");
  const session = (await collection.findOne({
    _id: sessionData._id,
  })) as unknown as SessionModel;

  if (!session) return null;
  if (session.expiresAt < new Date()) {
    await removeSession(token);
    return null;
  }

  return session;
};

export const removeSession = async (token: string): Promise<DeleteResult> => {
  const collection = await dbService.getCollection("sessions");
  return await collection.deleteOne({
    token,
  });
};
