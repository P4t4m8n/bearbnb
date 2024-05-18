"use server";

import { UserSmallModel } from "@/model/user.model";
import { prisma } from "@/prisma/prisma";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function getSmallLoggedInUser(): Promise<UserSmallModel | null> {
  const supabase = createServerActionClient({
    cookies,
  });
  const { data } = await supabase.auth.getUser();
  if (!data || !data.user) return null;
  const profile = await prisma.profile.findUnique({
    where: { supabaseId: data.user.id },
    include: {
      likes: true,
    },
  });

  if (!profile) throw new Error("no profile");

  const { isOwner, id, lastName, firstName, imgUrl, likes, supabaseId } =
    profile;
  const user = {
    isOwner: isOwner,
    id: id,
    lastName: lastName,
    firstName: firstName,
    email: data.user.email || "",
    imgUrl: imgUrl,
    likes,
    authId: supabaseId,
  };

  return user;
}

// export async function getLoggedInUser(): Promise<UserModel> {
//   const supabase = createServerActionClient({
//     cookies,
//   });
//   const { data } = await supabase.auth.getUser();

//   if (!data || !data.user) throw new Error("no user");

//   const profile = await prisma.profile.findUnique({
//     where: { supabaseId: data.user.id },
//     include: {
//       likes: true,
//       bookings: {
//         select: {
//           stay: {
//             select: {
//               id: true,
//               name: true,
//               images: true,
//               location: true,
//               type: true,
//               price: true,
//               reviews: true,
//             },
//           },
//           user: {
//             select: {
//               id: true,
//               firstName: true,
//               lastName: true,
//               isOwner: true,
//               imgUrl: true,
//             },
//           },
//           host: {
//             select: {
//               id: true,
//               firstName: true,
//               lastName: true,
//               isOwner: true,
//               imgUrl: true,
//             },
//           },
//         },
//       },
//       stays: {
//         select: {
//           images: {
//             take: 5,
//             select: {
//               id: true,
//               url: true,
//             },
//           },
//           host: {
//             select: {
//               id: true,
//               isOwner: true,
//               firstName: true,
//               lastName: true,
//               imgUrl: true,
//             },
//           },
//           amenities: {
//             select: {
//               name: true,
//             },
//           },
//           labels: {
//             select: {
//               name: true,
//             },
//           },

//           location: true,
//           reviews: {
//             select: {
//               id: true,
//               rate: true,
//               text: true,
//               userId: true,
//               stayId: true,
//             },
//           },
//           likes: true,
//           bedrooms: {
//             select: {
//               beds: true,
//               images: true,
//             },
//           },
//           booking: {
//             select: {
//               id: true,
//               checkIn: true,
//               checkOut: true,
//             },
//           },
//           highlights: {
//             select: {
//               id: true,
//               title: true,
//               description: true,
//               icon: true,
//             },
//           },
//         },
//       },
//       review: {
//         select: {
//           id: true,
//           rate: true,
//           text: true,
//           userId: true,
//           stayId: true,
//         },
//       },
//       hosting: {
//         select: {
//           stay: {
//             select: {
//               id: true,
//               name: true,
//               images: true,
//               location: true,
//               type: true,
//               price: true,
//               reviews: true,
//             },
//           },
//           user: {
//             select: {
//               id: true,
//               firstName: true,
//               lastName: true,
//               isOwner: true,
//               imgUrl: true,
//             },
//           },
//           host: {
//             select: {
//               id: true,
//               firstName: true,
//               lastName: true,
//               isOwner: true,
//               imgUrl: true,
//             },
//           },
//         },
//       },
//     },
//   });
//   if (!profile) throw new Error("no profile");

//   const { stays, review, bookings } = profile;
//   const userStays: StaySmallModel[] = stays.map((stay): StaySmallModel => {
//     return {
//       type:stay.
//     };
//   });

//   const user: UserModel = {
//     ...profile,
//     email: data.user.email || "",
//   };

//   return user;
// }
