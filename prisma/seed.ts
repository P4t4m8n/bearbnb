import { faker } from "@faker-js/faker";
import { prisma } from "./prisma";
import { Amenities } from "@prisma/client";

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  const amenities = await prisma.amenity.findMany();
  const host = { id: "26e34c90-561c-4ef6-80b7-bdc12915606f" };
  const user = { id: "e6b1bd84-5d83-4a7a-bf1a-76d49f12edd5" };
  for (let i = 0; i < 50; i++) {
    await delay(1);
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
        hostId: host.id,
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

    const reviews = Array(10)
      .fill(null)
      .map(() => ({
        text: faker.lorem.sentence(),
        rate: faker.number.int({ min: 1, max: 5 }),
        userId: user.id,
        stayId: stay.id,
      }));

    await prisma.review.createMany({
      data: reviews,
    });

    const likes = Array(10)
      .fill(null)
      .map(() => ({
        userId: user.id,
        stayId: stay.id,
      }));

    await prisma.like.createMany({
      data: likes,
    });

    const startDate = new Date();
    const bookings = Array(10)
      .fill(null)
      .map((_, index) => {
        const checkIn = new Date(
          startDate.getTime() + index * (4 * 24 * 60 * 60 * 1000)
        ); // 4 days in milliseconds
        const checkOut = new Date(checkIn.getTime() + 4 * 24 * 60 * 60 * 1000);

        return {
          userId: user.id,
          hostId: host.id,
          stayId: stay.id,
          price: 100,
          adults: 2, 
          checkIn: checkIn,
          checkOut: checkOut,
          bookingTime: new Date(), 
        };
      });

    await prisma.booking.createMany({
      data: bookings,
    });
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
