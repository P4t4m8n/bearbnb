import { faker } from "@faker-js/faker";
import { prisma } from "./prisma";
import { Amenities } from "@prisma/client";

async function main() {
  const amenities = await prisma.amenity.findMany();
  const user = await prisma.profile.create({
    data: {
      isOwner: true,
      ownerSince: new Date(faker.date.past({ years: 5 })),
      supabaseId: "7d8442ae-dfd6-4d0e-b1ed-6ac0f8b500df",
    },
  });
  for (let i = 0; i < 2; i++) {

    const location = await prisma.location.create({
      data: {
        country: faker.location.country(),
        countryCode: faker.location.countryCode(),
        city: faker.location.city(),
        address: faker.location.streetAddress(),
        lat: faker.location.latitude(),
        lng: faker.location.longitude(),
      },
    });

    const stay = await prisma.stay.create({
      data: {
        name: faker.commerce.productName(),
        type: "Apartment",
        price: parseFloat(faker.commerce.price()),
        summary: faker.commerce.productDescription(),
        description: faker.lorem.paragraphs(10),
        capacity: faker.number.int({ min: 1, max: 12 }),
        hostId: user.id,
        locationId: location.id,
        images: {
          create: [
            { url: "https://source.unsplash.com/random/?home,apartment" },
            { url: "https://source.unsplash.com/random/?home,apartment" },
            { url: "https://source.unsplash.com/random/?home,apartment" },
            { url: "https://source.unsplash.com/random/?home,apartment" },
            { url: "https://source.unsplash.com/random/?home,apartment" },
            { url: "https://source.unsplash.com/random/?home,apartment" },
            { url: "https://source.unsplash.com/random/?home,apartment" },
            { url: "https://source.unsplash.com/random/?home,apartment" },
            { url: "https://source.unsplash.com/random/?home,apartment" },
            { url: "https://source.unsplash.com/random/?home,apartment" },
            { url: "https://source.unsplash.com/random/?home,apartment" },
            { url: "https://source.unsplash.com/random/?home,apartment" },
            { url: "https://source.unsplash.com/random/?home,apartment" },
            { url: "https://source.unsplash.com/random/?home,apartment" },
            { url: "https://source.unsplash.com/random/?home,apartment" },
          ],
        },
        bedrooms: {
          create: [
            {
              beds: ["double", "single"],
            },
            { beds: ["double", "single", "double"] },
          ],
        },
        amenities: {
          connect: [...amenities],
        },
      },
    });

    for (let i = 0; i < 10; i++) {
      await prisma.review.create({
        data: {
          text: faker.lorem.sentence(),
          rate: faker.number.int({ min: 1, max: 5 }),
          userId: user.id,
          stayId: stay.id,
        },
      });
    }

    for (let i = 0; i < 10; i++) {
      await prisma.like.create({
        data: {
          userId: user.id,
          stayId: stay.id,
        },
      });
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
