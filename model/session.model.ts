export interface SessionModel {
  _id: string;
  userId: string;
  expiresAt: Date;
  createAt: Date;
}
