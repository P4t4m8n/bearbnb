import { SvgsNameTypes } from "@/model/icons.model";
import { z } from "zod";

export const locationValidate = z.object({
  _id: z.string().optional(),
  lat: z.number(),
  lng: z.number(),
  country: z.string(),
  city: z.string(),
  countryCode: z.string(),
  streetAddress: z.string(),
  postalCode: z.string().optional(),
  entrance: z.string().optional(),
  apt: z.string().optional(),
  house: z.string().optional(),
});

export const userValidate = z.object({
  email: z.string().email(),
  password: z.string().min(4),
  firstName: z.string(),
  lastName: z.string(),
  dob: z.date(),
  isOwner: z.boolean(),
});

export const bookingValidation = z
  .object({
    id: z.string().optional(),
    stayId: z.string(),
    userId: z.string(),
    hostId: z.string(),
    status: z.enum(["pending", "confirmed", "canceled", "completed"]),
    price: z
      .number()
      .min(0, { message: "Price must be a non-negative number." }),
    adults: z
      .number()
      .min(1, { message: "At least one adult must be specified." }),
    children: z.number().min(0).default(0),
    infants: z.number().min(0).default(0),
    pets: z.number().min(0).default(0),
    checkIn: z.date(),
    checkOut: z.date(),
  })
  .refine((data) => data.checkIn < data.checkOut, {
    message: "Check-in date must be before check-out date.",
  });

export const highlightValidate = z.object({
  _id: z.string().optional(),
  title: z.string(),
  description: z.string(),
  icon: z.enum(SvgsNameTypes),
});
