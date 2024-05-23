// //SEEDING
// const amenities = [
//     "Wifi",
//     "Heating",
//     "AirConditioning",
//     "Washer",
//     "Dryer",
//     "Iron",
//     "Essentials",
//     "HotWater",
//     "TV",
//     "Refrigerator",
//     "Microwave",
//     "CoffeeMaker",
//     "CookingBasics",
//     "Oven",
//     "Stove",
//     "Dishwasher",
//     "DishesAndSilverware",
//     "Kitchen",
//     "SmokeAlarm",
//     "CarbonMonoxideAlarm",
//     "FirstAidKit",
//     "FireExtinguisher",
//     "BedroomLock",
//     "HighChair",
//     "BabySafetyGates",
//     "BabysitterRecommendations",
//     "FreeParkingOnPremises",
//     "PaidParkingOffPremises",
//     "PaidParkingOnPremises",
//     "Elevator",
//     "WheelchairAccessible",
//     "BbqGrill",
//     "PatioOrBalcony",
//     "GardenOrBackyard",
//     "PrivateEntrance",
//     "Gym",
//     "Pool",
//     "HotTub",
//     "Sauna",
//     "LongTermStaysAllowed",
//     "LuggageDropoffAllowed",
//     "CleaningBeforeCheckout",
//     "PetsAllowed",
//     "BoardGames",
//     "BooksAndReadingMaterial",
//     "SmartTV",
//     "DedicatedWorkspace",
//   ];
//   for (const amenity of amenities) {
//     try {
//       const result = await prisma.amenity.create({
//         data: { name: amenity as Amenities },
//       });
//     } catch (error) {
//       console.error("Error creating amenity:", amenity, error);
//     }
//   }

//   const svgs = [
//     {
//       name: "door",
//       viewBox: "0 0 32 32",
//       path: "M24.33 1.67a2 2 0 0 1 2 1.85v24.81h3v2H2.67v-2h3V3.67a2 2 0 0 1 1.85-2h.15zm-4 2H7.67v24.66h12.66zm4 0h-2v24.66h2zm-7 11a1.33 1.33 0 1 1 0 2.66 1.33 1.33 0 0 1 0-2.66z",
//     },
//     {
//       name: "key",
//       viewBox: "0 0 32 32",
//       path: "M16.84 27.16v-3.4l-.26.09c-.98.32-2.03.51-3.11.55h-.7A11.34 11.34 0 0 1 1.72 13.36v-.59A11.34 11.34 0 0 1 12.77 1.72h.59c6.03.16 10.89 5.02 11.04 11.05V13.45a11.3 11.3 0 0 1-.9 4.04l-.13.3 7.91 7.9v5.6H25.7l-4.13-4.13zM10.31 7.22a3.1 3.1 0 1 1 0 6.19 3.1 3.1 0 0 1 0-6.2zm0 2.06a1.03 1.03 0 1 0 0 2.06 1.03 1.03 0 0 0 0-2.06zM22.43 25.1l4.12 4.13h2.67v-2.67l-8.37-8.37.37-.68.16-.3c.56-1.15.9-2.42.96-3.77v-.64a9.28 9.28 0 0 0-9-9h-.55a9.28 9.28 0 0 0-9 9v.54a9.28 9.28 0 0 0 13.3 8.1l.3-.16 1.52-.8v4.62z",
//     },
//     {
//       name: "calendar",
//       viewBox: "0 0 32 32",
//       path: "M11.67 0v1.67h8.66V0h2v1.67h6a2 2 0 0 1 2 1.85v16.07a2 2 0 0 1-.46 1.28l-.12.13L21 29.75a2 2 0 0 1-1.24.58H6.67a5 5 0 0 1-5-4.78V3.67a2 2 0 0 1 1.85-2h6.15V0zm16.66 11.67H3.67v13.66a3 3 0 0 0 2.82 3h11.18v-5.66a5 5 0 0 1 4.78-5h5.88zm-.08 8h-5.58a3 3 0 0 0-3 2.82v5.76zm-18.58-16h-6v6h24.66v-6h-6v1.66h-2V3.67h-8.66v1.66h-2z",
//     },
//   ];

//   for (const svg of svgs) {
//     try {
//       const result = await prisma.svgIcon.create({
//         data: { path: svg.path, viewBox: svg.viewBox, name: svg.name },
//       });
//     } catch (error) {
//       console.error("Error creating amenity:", svg, error);
//     }
//   }

//   await prisma.profile.create({
//     data: {
//       isOwner: false,
//       supabaseId: "df9aa7d0-92cc-493e-84e0-e88aef9e5653",
//       firstName: "host",
//       lastName: "host",
//       dob: new Date(),
//       imgUrl: faker.image.avatar(),
//     },
//   });
//   await prisma.profile.create({
//     data: {
//       isOwner: false,
//       supabaseId: "f709ee76-5922-44bc-af93-daaeda507b93",
//       firstName: "user",
//       lastName: "user",
//       dob: new Date(),
//       imgUrl: faker.image.avatar(),
//     },
//   });



// const getSmallStaysData = async (
//   searchBy?: FilterByModel,
//   page: number = 1 // Default page number is 0 if not provided
// ): Promise<QueryStay[]> => {
//   try {
//     // Build the query filters using the helper function
//     const queryFilters = buildQueryFilters(searchBy);

//     // Execute the Prisma query to fetch stays with the specified filters and pagination
// const stays = await prisma.stay.findMany({
//   skip: page * NUMBER_PER_PAGE, // Skip records based on the page number and items per page
//   take: NUMBER_PER_PAGE, // Limit the number of records fetched to the items per page
//   where: queryFilters, // Apply the constructed query filters
//   select: {
//     // Select specific fields to return
//     id: true,
//     type: true,
//     name: true,
//     images: {
//       take: 1, // Take only the first image
//       select: {
//         url: true,
//       },
//     },
//     labels: true,
//     price: true,
//     locationId: true,
//     location: true,
//     reviews: {
//       select: {
//         rate: true,
//         id: true,
//         text: true,
//         userId: true,
//         stayId: true,
//       },
//     },
//     booking: {
//       select: {
//         checkIn: true,
//         checkOut: true,
//       },
//     },
//   },
// });

//     return stays;
//   } catch (error) {
//     throw new Error(`Failed to fetch stays: ${error}`);
//   }
// };