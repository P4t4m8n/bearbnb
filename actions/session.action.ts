"use server";


import { dbService } from "@/db/db.service";
import { SessionModel } from "@/model/session.model";
import { cryptr } from "@/service/auth.service";
import { ObjectId } from "mongodb";

const ON_DAY_SESSION_EXPIRY = 1000 * 60 * 60 * 24;

export const createSession = async (userId: string) => {
  const collection = await dbService.getCollection("sessions");
  const session = (await collection.insertOne({
    userId,
    expiresAt: new Date(Date.now() + ON_DAY_SESSION_EXPIRY),
  })) as unknown as SessionModel;

  return cryptr.encrypt(JSON.stringify(session));
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

export const removeSession = async (token: string) => {
  const decrypted = cryptr.decrypt(token);
  const sessionData = JSON.parse(decrypted);
  const collection = await dbService.getCollection("sessions");

  await collection.deleteOne({
    _id: sessionData._id,
  });
};
