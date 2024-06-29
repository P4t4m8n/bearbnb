export interface AuditLogModel {
  createdAt: Date;
  action: string;
  bookingId: string; // ObjectId as string
  userId: string; // ObjectId as string
}
