//SEEDING AMNETIES
// const amenities = [
  //   "Wifi",
  //   "Heating",
  //   "AirConditioning",
  //   "Washer",
  //   "Dryer",
  //   "Iron",
  //   "Essentials",
  //   "HotWater",
  //   "TV",
  //   "Refrigerator",
  //   "Microwave",
  //   "CoffeeMaker",
  //   "CookingBasics",
  //   "Oven",
  //   "Stove",
  //   "Dishwasher",
  //   "DishesAndSilverware",
  //   "Kitchen",
  //   "SmokeAlarm",
  //   "CarbonMonoxideAlarm",
  //   "FirstAidKit",
  //   "FireExtinguisher",
  //   "BedroomLock",
  //   "HighChair",
  //   "BabySafetyGates",
  //   "BabysitterRecommendations",
  //   "FreeParkingOnPremises",
  //   "PaidParkingOffPremises",
  //   "PaidParkingOnPremises",
  //   "Elevator",
  //   "WheelchairAccessible",
  //   "BbqGrill",
  //   "PatioOrBalcony",
  //   "GardenOrBackyard",
  //   "PrivateEntrance",
  //   "Gym",
  //   "Pool",
  //   "HotTub",
  //   "Sauna",
  //   "LongTermStaysAllowed",
  //   "LuggageDropoffAllowed",
  //   "CleaningBeforeCheckout",
  //   "PetsAllowed",
  //   "BoardGames",
  //   "BooksAndReadingMaterial",
  //   "SmartTV",
  //   "DedicatedWorkspace",
  // ];
  // for (const amenity of amenities) {
  //   try {
  //     const result = await prisma.amenity.create({
  //       data: { name: amenity as Amenities },
  //     });
  //     console.log('Created amenity:', result);
  //   } catch (error) {
  //     console.error('Error creating amenity:', amenity, error);
  //   }
  // }