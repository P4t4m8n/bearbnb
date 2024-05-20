import { faker } from "@faker-js/faker";
import { prisma } from "./prisma";
import { Amenities } from "@prisma/client";

async function main() {
  
  const host = { id: "94983507-c553-4681-8edf-064d9b226a88" };
  const user = { id: "ad13184a-0f8b-418c-8dde-5029cb41a6af" };

  const amenities = await prisma.amenity.findMany();
  const svgs = await prisma.svgIcon.findMany();

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
        entireHome: Math.random() > 0.5,
        locationId: location.id,
        images: {
          create: Array.from({ length: 15 }, (_, i) => ({
            url: `https://source.unsplash.com/random/?home,apartment,house&sig=${Date.now()}${i}`,
          })),
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

    const reviews = Array(2)
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

 
  //   .fill(null)
  //   .map(() => ({
  //     userId: user.id,
  //     stayId: stay.id,
  //   }));
  // await prisma.like.createMany({
  //   data: likes,
  // });

  // const startDate = new Date();
  // const bookings = Array(3)
  //   .fill(null)
  //   .map((_, index) => {
  //     const checkIn = new Date(
  //       startDate.getTime() + index * (4 * 24 * 60 * 60 * 1000)
  //     ); // 4 days in milliseconds
  //     const checkOut = new Date(checkIn.getTime() + 4 * 24 * 60 * 60 * 1000);
  //     return {
  //       userId: user.id,
  //       hostId: host.id,
  //       stayId: stay.id,
  //       price: 100,
  //       adults: 2,
  //       checkIn: checkIn,
  //       checkOut: checkOut,
  //       bookingTime: new Date(),
  //     };
  //   });
  // await prisma.booking.createMany({
  //   data: bookings,
  // });

    const highlights = Array(3)
      .fill(null)
      .map((_, idx) => ({
        title: faker.commerce.product(),
        description: faker.commerce.product(),
        iconId: svgs[idx].id,
        stayId: stay.id,
      }));
    await prisma.highlight.createMany({ data: highlights });
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

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
