import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

export const prisma = new PrismaClient();
async function main() {
  for (let i = 0; i < 10; i++) {
    const user = await prisma.user.create({
      data: {
        fullname: faker.person.fullName(),
        email: faker.internet.email(),
        imgUrl: faker.image.avatar(),
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
        capacity: faker.number.int({ min: 1, max: 12 }),
        rating: faker.number.float({ min: 0, max: 5 }),
        hostId: user.id,
        locationId: location.id,
        images: {
          create: [
            { url: faker.image.urlLoremFlickr({ category: "apartment" }) },
            { url: faker.image.urlLoremFlickr({ category: "apartment" }) },
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

    const review = await prisma.review.create({
      data: {
        text: faker.lorem.sentence(),
        rate: faker.number.int({ min: 1, max: 5 }),
        userId: user.id,
        stayId: stay.id,
      },
    });

    const like = await prisma.like.create({
      data: {
        userId: user.id,
        stayId: stay.id,
      },
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
