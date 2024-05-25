import { faker } from "@faker-js/faker";
import { prisma } from "./prisma";
import { Amenities } from "@prisma/client";
import { RandomUser } from "./seed.model";

async function main() {
  const host = { id: "e467a3cd-0c7e-4c5f-abeb-d9369addfe94" };
  const user = { id: "b44de659-a4e0-4639-938d-2796a56809e2" };

  const amenities = await prisma.amenity.findMany();
  const svgs = await prisma.svgIcon.findMany();

  

  
  for (let i = 0; i < 50; i++) {
    await delay(1);
    const response = await fetch("https://randomuser.me/api/");
    const data = await response.json();
    const _user = data.results[0] as RandomUser;
    const _location = _user.location;
    const coordinates = {
      type: "Point",
      coordinates: [
        _location.coordinates.longitude,
        _location.coordinates.latitude,
      ],
    };
    const location = await prisma.location.create({
      data: {
        country: _location.country,
        countryCode: faker.location.countryCode(),
        city: _location.city,
        address: `${_location.street.name} ${_location.street.number}`,
        coordinates: coordinates,
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
        bedroomsAmount: faker.number.int({ min: 1, max: 5 }),
        totalBeds: faker.number.int({ min: 1, max: 5 }),
        images: Array.from(
          { length: 15 },
          (_, i) =>
            `https://source.unsplash.com/random/?home,apartment,house&sig=${Date.now()}${i}`
        ),

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
