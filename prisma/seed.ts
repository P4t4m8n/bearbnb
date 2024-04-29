import { faker } from "@faker-js/faker";
import { prisma } from "./prisma";
import { Beds } from "@prisma/client";

async function main() {
  for (let i = 0; i < 10; i++) {
    const user = await prisma.profile.create({
      data: {
        fullname: faker.person.fullName(),
        email: faker.internet.email(),
        imgUrl: "https://source.unsplash.com/random/?profile",
        isOwner: true,
        ownerSince: new Date(faker.date.past({ years: 5 })),
      },
    });

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
        amenities: {
          create: [{ name: "Wi-Fi" }, { name: "Air Conditioning" }],
        },
        labels: {
          create: [{ name: "New" }, { name: "Sale" }],
        },
      },
    });

    for (let i = 0; i < 5; i++) {
      await prisma.bedRoom.create({
        data: {
          beds: {
            create: [{ type: Beds.double }, { type: Beds.single }],
          },
          images: {
            create: [
              { url: "https://source.unsplash.com/random/?bedroom,sleep" },
            ],
          },
          stayId: stay.id,
        },
      });
    }

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
