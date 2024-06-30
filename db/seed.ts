import { ObjectId } from "mongodb";
import { signup } from "../actions/auth.action";
import { dbService } from "./db.service";
const imgUrls = [
  "https://res.cloudinary.com/dpnevk8db/image/upload/v1716540628/samples/bearbnb/aaron-huber-G7sE2S4Lab4-unsplash_qmi18k.jpg",
  "https://res.cloudinary.com/dpnevk8db/image/upload/v1716540628/samples/bearbnb/alan-alves-yZDC3jE6TP8-unsplash_ad9t89.jpg",
  "https://res.cloudinary.com/dpnevk8db/image/upload/v1716540629/samples/bearbnb/alexandra-gorn-W5dsm9n6e3g-unsplash_1_cvjszl.jpg",
  "https://res.cloudinary.com/dpnevk8db/image/upload/v1716540629/samples/bearbnb/avery-klein-JaXs8Tk5Iww-unsplash_tjmrcl.jpg",
  "https://res.cloudinary.com/dpnevk8db/image/upload/v1716540629/samples/bearbnb/bailey-anselme-Bkp3gLygyeA-unsplash_qvvtmh.jpg",
  "https://res.cloudinary.com/dpnevk8db/image/upload/v1716540629/samples/bearbnb/beazy-60SnthS09Ao-unsplash_hfrvht.jpg",
  "https://res.cloudinary.com/dpnevk8db/image/upload/v1716540629/samples/bearbnb/beazy-aX1TTOuq83M-unsplash_n4xjvs.jpg",
  "https://res.cloudinary.com/dpnevk8db/image/upload/v1716540630/samples/bearbnb/bench-accounting-nvzvOPQW0gc-unsplash_bkmisp.jpg",
  "https://res.cloudinary.com/dpnevk8db/image/upload/v1716540630/samples/bearbnb/brian-babb-XbwHrt87mQ0-unsplash_uhqpqt.jpg",
  "https://res.cloudinary.com/dpnevk8db/image/upload/v1716540630/samples/bearbnb/brina-blum-nWX4pKwzLoE-unsplash_aqqnh3.jpg",
  "https://res.cloudinary.com/dpnevk8db/image/upload/v1716540630/samples/bearbnb/christian-koch-D_4R9CcYZOk-unsplash_xy6ix9.jpg",
  "https://res.cloudinary.com/dpnevk8db/image/upload/v1716540631/samples/bearbnb/christin-hume-Hcfwew744z4-unsplash_wysl5o.jpg",
  "https://res.cloudinary.com/dpnevk8db/image/upload/v1716540631/samples/bearbnb/collov-home-design-H-1j_s0dhCw-unsplash_zflks9.jpg",
  "https://res.cloudinary.com/dpnevk8db/image/upload/v1716540631/samples/bearbnb/collov-home-design-HmHArS-HvNw-unsplash_l7jwgk.jpg",
  "https://res.cloudinary.com/dpnevk8db/image/upload/v1716540632/samples/bearbnb/dillon-kydd-XGvwt544g8k-unsplash_qlvuq7.jpg",
  "https://res.cloudinary.com/dpnevk8db/image/upload/v1716540631/samples/bearbnb/douglas-sheppard-9rYfG8sWRVo-unsplash_oafrxz.jpg",
  "https://res.cloudinary.com/dpnevk8db/image/upload/v1716540632/samples/bearbnb/frames-for-your-heart-2d4lAQAlbDA-unsplash_zlvxpd.jpg",
  "https://res.cloudinary.com/dpnevk8db/image/upload/v1716540632/samples/bearbnb/frames-for-your-heart-mR1CIDduGLc-unsplash_ahmnqy.jpg",
  "https://res.cloudinary.com/dpnevk8db/image/upload/v1716540633/samples/bearbnb/good-days-digital-Vra_DPrrBlE-unsplash_kulpvx.jpg",
  "https://res.cloudinary.com/dpnevk8db/image/upload/v1716540632/samples/bearbnb/hutomo-abrianto-X5BWooeO4Cw-unsplash_yqheca.jpg",
  "https://res.cloudinary.com/dpnevk8db/image/upload/v1716540633/samples/bearbnb/inside-weather-Uxqlfigh6oE-unsplash_lunru1.jpg",
  "https://res.cloudinary.com/dpnevk8db/image/upload/v1716540633/samples/bearbnb/ionut-vlad-idXQEOxhmvU-unsplash_wanb9j.jpg",
  "https://res.cloudinary.com/dpnevk8db/image/upload/v1716540619/samples/bearbnb/jake-lee-6J3RnrTf1HM-unsplash_po6bzh.jpg",
  "https://res.cloudinary.com/dpnevk8db/image/upload/v1716540619/samples/bearbnb/jarek-ceborski-jn7uVeCdf6U-unsplash_aynkg7.jpg",
  "https://res.cloudinary.com/dpnevk8db/image/upload/v1716540619/samples/bearbnb/jason-briscoe-AQl-J19ocWE-unsplash_jt3gy1.jpg",
  "https://res.cloudinary.com/dpnevk8db/image/upload/v1716540619/samples/bearbnb/jason-briscoe-UV81E0oXXWQ-unsplash_ft7pyk.jpg",
  "https://res.cloudinary.com/dpnevk8db/image/upload/v1716540621/samples/bearbnb/jonathan-borba-YdomJdFdbDo-unsplash_fgsmlk.jpg",
  "https://res.cloudinary.com/dpnevk8db/image/upload/v1716540620/samples/bearbnb/jonny-caspari-KuudDjBHIlA-unsplash_ymx7so.jpg",
  "https://res.cloudinary.com/dpnevk8db/image/upload/v1716540620/samples/bearbnb/josh-hemsley-qPZWOXjUPtI-unsplash_azc7bd.jpg",
  "https://res.cloudinary.com/dpnevk8db/image/upload/v1716540620/samples/bearbnb/julian-gentilezza-ctUWE7BUEzE-unsplash_1_mfmsco.jpg",
  "https://res.cloudinary.com/dpnevk8db/image/upload/v1716540622/samples/bearbnb/kam-idris-_HqHX3LBN18-unsplash_rfuruo.jpg",
  "https://res.cloudinary.com/dpnevk8db/image/upload/v1716540624/samples/bearbnb/kara-eads-L7EwHkq1B2s-unsplash_m4zhsk.jpg",
  "https://res.cloudinary.com/dpnevk8db/image/upload/v1716540622/samples/bearbnb/karl-hedin-AGA9wDyIiek-unsplash_if91vw.jpg",
  "https://res.cloudinary.com/dpnevk8db/image/upload/v1716540619/samples/bearbnb/kenny-eliason-mGZX2MOPR-s-unsplash_buhkxn.jpg",
  "https://res.cloudinary.com/dpnevk8db/image/upload/v1716540619/samples/bearbnb/kirill-9uH-hM0VwPg-unsplash_gcuioa.jpg",
  "https://res.cloudinary.com/dpnevk8db/image/upload/v1716540620/samples/bearbnb/lotus-design-n-print-1vMz2_MclrM-unsplash_j0o1yj.jpg",
  "https://res.cloudinary.com/dpnevk8db/image/upload/v1716540621/samples/bearbnb/luke-stackpoole-eWqOgJ-lfiI-unsplash_hxkkhp.jpg",
  "https://res.cloudinary.com/dpnevk8db/image/upload/v1716540622/samples/bearbnb/minh-pham-7pCFUybP_P8-unsplash_za8bua.jpg",
  "https://res.cloudinary.com/dpnevk8db/image/upload/v1716540622/samples/bearbnb/minh-pham-OtXADkUh3-I-unsplash_ofjqyp.jpg",
  "https://res.cloudinary.com/dpnevk8db/image/upload/v1716540622/samples/bearbnb/minh-pham-YAPZt8wxMO4-unsplash_hpvpaw.jpg",
  "https://res.cloudinary.com/dpnevk8db/image/upload/v1716540622/samples/bearbnb/naomi-hebert-MP0bgaS_d1c-unsplash_a2nkwo.jpg",
  "https://res.cloudinary.com/dpnevk8db/image/upload/v1716540623/samples/bearbnb/nathan-fertig-FBXuXp57eM0-unsplash_xdlryf.jpg",
  "https://res.cloudinary.com/dpnevk8db/image/upload/v1716540623/samples/bearbnb/outsite-co-R-LK3sqLiBw-unsplash_uirwea.jpg",
  "https://res.cloudinary.com/dpnevk8db/image/upload/v1716540623/samples/bearbnb/patrick-perkins-3wylDrjxH-E-unsplash_kb6c1f.jpg",
  "https://res.cloudinary.com/dpnevk8db/image/upload/v1716540623/samples/bearbnb/phil-5i0GnoTTjSE-unsplash_foosme.jpg",
  "https://res.cloudinary.com/dpnevk8db/image/upload/v1716540624/samples/bearbnb/pixasquare-4ojhpgKpS68-unsplash_vsc8sw.jpg",
  "https://res.cloudinary.com/dpnevk8db/image/upload/v1716540624/samples/bearbnb/r-architecture-2gDwlIim3Uw-unsplash_b3neo7.jpg",
  "https://res.cloudinary.com/dpnevk8db/image/upload/v1716540624/samples/bearbnb/r-architecture-CCjAPxoQWgQ-unsplash_emdpps.jpg",
  "https://res.cloudinary.com/dpnevk8db/image/upload/v1716540625/samples/bearbnb/r-architecture-TRCJ-87Yoh0-unsplash_czcmhi.jpg",
  "https://res.cloudinary.com/dpnevk8db/image/upload/v1716540625/samples/bearbnb/roberto-nickson-FqHU6aeVwf8-unsplash_ph7t8y.jpg",
  "https://res.cloudinary.com/dpnevk8db/image/upload/v1716540626/samples/bearbnb/roberto-nickson-q9nZUFC1nTw-unsplash_h3f2pj.jpg",
  "https://res.cloudinary.com/dpnevk8db/image/upload/v1716540626/samples/bearbnb/rowan-heuvel-bjej8BY1JYQ-unsplash_rh58yd.jpg",
  "https://res.cloudinary.com/dpnevk8db/image/upload/v1716540626/samples/bearbnb/scott-webb-1ddol8rgUH8-unsplash_qrmjjy.jpg",
  "https://res.cloudinary.com/dpnevk8db/image/upload/v1716540626/samples/bearbnb/sieuwert-otterloo-aren8nutd1Q-unsplash_ajiymr.jpg",
  "https://res.cloudinary.com/dpnevk8db/image/upload/v1716540626/samples/bearbnb/soroush-karimi-Mx5kwvzeGC0-unsplash_dc2trb.jpg",
  "https://res.cloudinary.com/dpnevk8db/image/upload/v1716540626/samples/bearbnb/spacejoy-IH7wPsjwomc-unsplash_urgjqs.jpg",
  "https://res.cloudinary.com/dpnevk8db/image/upload/v1716540627/samples/bearbnb/spacejoy-umAXneH4GhA-unsplash_llftfg.jpg",
  "https://res.cloudinary.com/dpnevk8db/image/upload/v1716540627/samples/bearbnb/stephan-bechert-yFV39g6AZ5o-unsplash_soy1kp.jpg",
  "https://res.cloudinary.com/dpnevk8db/image/upload/v1716540627/samples/bearbnb/tierra-mallorca-rgJ1J8SDEAY-unsplash_cppttu.jpg",
  "https://res.cloudinary.com/dpnevk8db/image/upload/v1716540628/samples/bearbnb/tina-witherspoon-fpKrFJUiPA8-unsplash_mywnxd.jpg",
  "https://res.cloudinary.com/dpnevk8db/image/upload/v1716540630/samples/bearbnb/todd-kent-178j8tJrNlc-unsplash_z8emz8.jpg",
  "https://res.cloudinary.com/dpnevk8db/image/upload/v1716540627/samples/bearbnb/vu-anh-TiVPTYCG_3E-unsplash_kanuam.jpg",
  "https://res.cloudinary.com/dpnevk8db/image/upload/v1716540628/samples/bearbnb/webaliser-_TPTXZd9mOo-unsplash_kmnstp.jpg",
];
export async function seed() {
  const collectionL = await dbService.getCollection("locations");
  const locations = await collectionL.find().toArray();

  for (let i = 0; i < 50; i++) {
    const imgIdx = i % (imgUrls.length - 10);

    const random = randomNumber(1, 5);
    const amenities = [
      "Wifi",
      "Heating",
      "AirConditioning",
      "Washer",
      "Dryer",
      "Iron",
      "Essentials",
      "HotWater",
      "TV",
      "Refrigerator",
      "Microwave",
      "CoffeeMaker",
      "CookingBasics",
      "Oven",
      "Stove",
      "Dishwasher",
      "DishesAndSilverware",
      "Kitchen",
      "SmokeAlarm",
      "CarbonMonoxideAlarm",
      "FirstAidKit",
      "FireExtinguisher",
      "BedroomLock",
      "HighChair",
      "BabySafetyGates",
      "BabysitterRecommendations",
      "FreeParkingOnPremises",
      "PaidParkingOffPremises",
      "PaidParkingOnPremises",
      "Elevator",
      "WheelchairAccessible",
      "BbqGrill",
      "PatioOrBalcony",
      "GardenOrBackyard",
      "PrivateEntrance",
      "Gym",
      "Pool",
      "HotTub",
      "Sauna",
      "LongTermStaysAllowed",
      "LuggageDropoffAllowed",
      "CleaningBeforeCheckout",
      "PetsAllowed",
      "BoardGames",
      "BooksAndReadingMaterial",
      "SmartTV",
      "DedicatedWorkspace",
    ];

    const labels = [
      "",
      "amazing_views",
      "icons",
      "OMG!",
      "beachfront",
      "islands",
      "surfing",
      "amazing_pools",
      "countryside",
      "castles",
      "cabins",
      "trending",
      "off_the_grid",
      "farms",
      "lakefront",
      "design",
      "lake",
      "tiny_homes",
      "treehouses",
      "mansions",
      "luxe",
      "national_parks",
      "top_of_the_world",
      "tropical",
      "play",
      "historical_homes",
      "boats",
      "new",
      "earth_homes",
      "caves",
      "desert",
      "chef's_kitchens",
      "vineyards",
      "bed_&_breakfasts",
      "skiing",
      "camping",
      "a_frames",
      "domes",
      "towers",
      "yurts",
      "ryokans",
      "ski_in_out",
      "houseboats",
      "creative_spaces",
      "arctic",
      "cycladic_homes",
      "top_cities",
      "trulli",
      "grand_pianos",
      "rooms",
      "containers",
      "windmills",
      "dammusi",
      "casas_particulares",
      "shepherd_s_huts",
      "minsus",
      "campers",
      "golfing",
      "hanoks",
      "barns",
      "adapted",
      "riads",
      "beach",
    ];

    let bedrooms = [
      { beds: ["double", "single"], image: imgUrls[imgIdx] },
      { beds: ["double", "single"], image: imgUrls[imgIdx] },
      { beds: ["double", "crib"], image: imgUrls[imgIdx] },
      { beds: ["double", "crib"], image: imgUrls[imgIdx] },
      { beds: ["single", "crib"], image: imgUrls[imgIdx] },
    ];

    const highLights = [
      {
        title: "Self check-in",
        description: "Check yourself in with the lockbox",
        icon: "door",
      },
      {
        title: "Great location",
        description: "95% of recent guests gave the location a 5-star rating.",
        icon: "key",
      },
      {
        title: "Great check-in experience",
        description:
          "100% of recent guests gave the check-in process a 5-star rating.",
        icon: "calendar",
      },
    ];

    const collectionH = await dbService.getCollection("highlights");
    const result = await collectionH.insertMany(highLights);
    const insertedIds: ObjectId[] = Object.values(result.insertedIds).map((id) => {
      return id
    
  })
  console.log("insertedIds:", insertedIds)

    const collectionS = await dbService.getCollection("stays");
    try {
      const data = await collectionS.insertOne({
        name: "John Doe",
        type: "Apartment",
        entireHome: true,
        capacity: randomNumber(1, 10),
        images: imgUrls.slice(imgIdx, imgIdx + 10),
        price: randomNumber(50, 2000),
        summary: "Cozy apartment in the city center",
        bedRooms: bedrooms,
        description:
          "This apartment is located in the heart of the city, close to all amenities.",
        baths: 2,
        highlights: insertedIds,
        hostId: new ObjectId("667d23b8d71c9238f15ac90d"),
        locationId: new ObjectId(locations[i]._id),
        amenities: amenities,
        labels: labels.slice(
          randomNumber(1, 10),
          randomNumber(15, labels.length - 1)
        ),
      });

      console.log(`Stay created for iteration ${i + 1}`);
    } catch (error) {
      console.error("Error creating stay:", error);
    }
  }
}

// export async function seedUsers() {
//   const users = [
//     {
//       firstName: "host",
//       lastName: "host",
//       email: "host@host.com",
//       dob: new Date(),
//       password: "admin",
//     },
//     {
//       firstName: "user",
//       lastName: "user",
//       email: "user@user.com",
//       dob: new Date(),
//       password: "user",
//     },
//   ];

//   users.map(async (user) => {
//     const fromData = new FormData();
//     fromData.append("firstName", user.firstName);
//     fromData.append("lastName", user.lastName);
//     fromData.append("email", user.email);
//     fromData.append("dob", user.dob.toDateString());
//     fromData.append("password", user.password);
//     return await signup(null, fromData);
//   });

//   console.log("Users seeded");
// }

// export async function seedAmenity() {
//   const amenities = [
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

//   amenities.map(async (amenity) => {
//     return await Amenity.create({ name: amenity });
//   });

//   console.log("Amenities seeded");
// }

// export async function seedSVGS() {
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

//   svgs.map(async (svg) => {
//     return await SvgIcon.create(svg);
//   });

//   console.log("SVGs seeded");
// }

// export async function seedLocations() {
//   const locations = [
//     {
//       country: "United States",
//       countryCode: "US",
//       city: "Custer",
//       address: "11149 U.S. Hwy. 16, Building B12, Custer, SD 57730",
//       location: { type: "Point", coordinates: [-103.6069, 43.7305] },
//     },
//     {
//       country: "United States",
//       countryCode: "US",
//       city: "Guadalupe Mountains",
//       address: "Carlsbad Cavern, Guadalupe Mountains, NM",
//       location: { type: "Point", coordinates: [-104.3646, 32.1478] },
//     },
//     {
//       country: "United States",
//       countryCode: "US",
//       city: "Yellowstone National Park",
//       address: "Yellowstone National Park, WY",
//       location: { type: "Point", coordinates: [-110.5885, 44.428] },
//     },
//     {
//       country: "Canada",
//       countryCode: "CA",
//       city: "Banff",
//       address: "Banff National Park, AB",
//       location: { type: "Point", coordinates: [-115.5708, 51.1784] },
//     },
//     {
//       country: "Russia",
//       countryCode: "RU",
//       city: "Kronotsky",
//       address: "Kronotsky Nature Reserve, Kamchatka",
//       location: { type: "Point", coordinates: [160.5167, 54.75] },
//     },
//     {
//       country: "United States",
//       countryCode: "US",
//       city: "Bighorn River Area",
//       address: "Bighorn Cavern, WY",
//       location: { type: "Point", coordinates: [-107.8617, 44.5463] },
//     },
//     {
//       country: "United States",
//       countryCode: "US",
//       city: "Jewel Cave",
//       address: "Jewel Cave National Monument, SD",
//       location: { type: "Point", coordinates: [-103.8296, 43.7306] },
//     },
//     {
//       country: "Norway",
//       countryCode: "NO",
//       city: "Svalbard",
//       address: "Svalbard Nature Reserve",
//       location: { type: "Point", coordinates: [15.6333, 78.0] },
//     },
//     {
//       country: "United States",
//       countryCode: "US",
//       city: "Katmai",
//       address: "Katmai National Park, AK",
//       location: { type: "Point", coordinates: [-154.9628, 58.6194] },
//     },
//     {
//       country: "United States",
//       countryCode: "US",
//       city: "Glacier",
//       address: "Glacier National Park, MT",
//       location: { type: "Point", coordinates: [-113.7183, 48.6966] },
//     },
//     {
//       country: "Russia",
//       countryCode: "RU",
//       city: "Stolby",
//       address: "Stolby Nature Reserve, Krasnoyarsk",
//       location: { type: "Point", coordinates: [92.7933, 55.9811] },
//     },
//     {
//       country: "United States",
//       countryCode: "US",
//       city: "Denali",
//       address: "Denali National Park, AK",
//       location: { type: "Point", coordinates: [-150.4936, 63.1148] },
//     },
//     {
//       country: "Japan",
//       countryCode: "JP",
//       city: "Shiretoko",
//       address: "Shiretoko National Park, Hokkaido",
//       location: { type: "Point", coordinates: [144.973, 44.1167] },
//     },
//     {
//       country: "Romania",
//       countryCode: "RO",
//       city: "Brasov",
//       address: "Carpathian Mountains",
//       location: { type: "Point", coordinates: [25.5902, 45.6437] },
//     },
//     {
//       country: "India",
//       countryCode: "IN",
//       city: "Jim Corbett",
//       address: "Jim Corbett National Park, Uttarakhand",
//       location: { type: "Point", coordinates: [78.9398, 29.53] },
//     },
//     {
//       country: "China",
//       countryCode: "CN",
//       city: "Sichuan",
//       address: "Sichuan Giant Panda Sanctuaries",
//       location: { type: "Point", coordinates: [102.4442, 31.214] },
//     },
//     {
//       country: "Nepal",
//       countryCode: "NP",
//       city: "Chitwan",
//       address: "Chitwan National Park",
//       location: { type: "Point", coordinates: [84.09, 27.529] },
//     },
//     {
//       country: "United States",
//       countryCode: "US",
//       city: "Olympic",
//       address: "Olympic National Park, WA",
//       location: { type: "Point", coordinates: [-123.4992, 47.8021] },
//     },
//     {
//       country: "Spain",
//       countryCode: "ES",
//       city: "Picos de Europa",
//       address: "Picos de Europa National Park",
//       location: { type: "Point", coordinates: [-4.8333, 43.1667] },
//     },
//     {
//       country: "Slovenia",
//       countryCode: "SI",
//       city: "Triglav",
//       address: "Triglav National Park",
//       location: { type: "Point", coordinates: [13.85, 46.3833] },
//     },
//     {
//       country: "Canada",
//       countryCode: "CA",
//       city: "Yukon",
//       address: "Kluane National Park and Reserve",
//       location: { type: "Point", coordinates: [-139.5292, 60.7503] },
//     },
//     {
//       country: "United States",
//       countryCode: "US",
//       city: "Adirondacks",
//       address: "Adirondack Park, NY",
//       location: { type: "Point", coordinates: [-74.0507, 44.1125] },
//     },
//     {
//       country: "Finland",
//       countryCode: "FI",
//       city: "Oulanka",
//       address: "Oulanka National Park",
//       location: { type: "Point", coordinates: [29.3333, 66.3667] },
//     },
//     {
//       country: "Germany",
//       countryCode: "DE",
//       city: "Bavaria",
//       address: "Bavarian Forest National Park",
//       location: { type: "Point", coordinates: [13.35, 49.05] },
//     },
//     {
//       country: "Italy",
//       countryCode: "IT",
//       city: "Abruzzo",
//       address: "Abruzzo, Lazio and Molise National Park",
//       location: { type: "Point", coordinates: [13.7717, 41.8] },
//     },
//     {
//       country: "Russia",
//       countryCode: "RU",
//       city: "Altai",
//       address: "Altai Mountains",
//       location: { type: "Point", coordinates: [85.0, 50.0] },
//     },
//     {
//       country: "Poland",
//       countryCode: "PL",
//       city: "Białowieża",
//       address: "Białowieża Forest",
//       location: { type: "Point", coordinates: [23.8333, 52.7] },
//     },
//     {
//       country: "Romania",
//       countryCode: "RO",
//       city: "Maramureș",
//       address: "Rodna National Park",
//       location: { type: "Point", coordinates: [24.9, 47.6] },
//     },
//     {
//       country: "Sweden",
//       countryCode: "SE",
//       city: "Sarek",
//       address: "Sarek National Park",
//       location: { type: "Point", coordinates: [17.6, 67.3833] },
//     },
//     {
//       country: "United States",
//       countryCode: "US",
//       city: "Great Smoky Mountains",
//       address: "Great Smoky Mountains National Park, TN/NC",
//       location: { type: "Point", coordinates: [-83.5082, 35.6118] },
//     },
//     {
//       country: "United States",
//       countryCode: "US",
//       city: "Tongass",
//       address: "Tongass National Forest, AK",
//       location: { type: "Point", coordinates: [-135.3107, 57.7241] },
//     },
//     {
//       country: "Kazakhstan",
//       countryCode: "KZ",
//       city: "Altai",
//       address: "Katon-Karagay National Park",
//       location: { type: "Point", coordinates: [85.6667, 49.0] },
//     },
//     {
//       country: "Norway",
//       countryCode: "NO",
//       city: "Rondane",
//       address: "Rondane National Park",
//       location: { type: "Point", coordinates: [9.9333, 61.85] },
//     },
//     {
//       country: "France",
//       countryCode: "FR",
//       city: "Pyrenees",
//       address: "Pyrenees National Park",
//       location: { type: "Point", coordinates: [0.0, 42.8] },
//     },
//     {
//       country: "Mongolia",
//       countryCode: "MN",
//       city: "Khovsgol",
//       address: "Khovsgol Nuur National Park",
//       location: { type: "Point", coordinates: [100.15, 51.0] },
//     },
//     {
//       country: "Turkey",
//       countryCode: "TR",
//       city: "Artvin",
//       address: "Karagöl-Sahara National Park",
//       location: { type: "Point", coordinates: [42.0, 41.1833] },
//     },
//     {
//       country: "United States",
//       countryCode: "US",
//       city: "Sequoia",
//       address: "Sequoia National Park, CA",
//       location: { type: "Point", coordinates: [-118.5551, 36.4864] },
//     },
//     {
//       country: "Australia",
//       countryCode: "AU",
//       city: "Tasmania",
//       address: "Tasmanian Wilderness World Heritage Area",
//       location: { type: "Point", coordinates: [146.6257, -42.0833] },
//     },
//     {
//       country: "United States",
//       countryCode: "US",
//       city: "North Cascades",
//       address: "North Cascades National Park, WA",
//       location: { type: "Point", coordinates: [-121.2065, 48.7718] },
//     },
//     {
//       country: "India",
//       countryCode: "IN",
//       city: "Kaziranga",
//       address: "Kaziranga National Park, Assam",
//       location: { type: "Point", coordinates: [93.3619, 26.5775] },
//     },
//     {
//       country: "Bhutan",
//       countryCode: "BT",
//       city: "Jigme Dorji",
//       address: "Jigme Dorji National Park",
//       location: { type: "Point", coordinates: [89.6333, 27.8333] },
//     },
//     {
//       country: "South Korea",
//       countryCode: "KR",
//       city: "Seoraksan",
//       address: "Seoraksan National Park",
//       location: { type: "Point", coordinates: [128.4656, 38.1194] },
//     },
//     {
//       country: "United States",
//       countryCode: "US",
//       city: "Yosemite",
//       address: "Yosemite National Park, CA",
//       location: { type: "Point", coordinates: [-119.5383, 37.8651] },
//     },
//     {
//       country: "Malaysia",
//       countryCode: "MY",
//       city: "Kinabalu",
//       address: "Kinabalu National Park",
//       location: { type: "Point", coordinates: [116.5583, 6.0833] },
//     },
//     {
//       country: "Pakistan",
//       countryCode: "PK",
//       city: "Gilgit-Baltistan",
//       address: "Khunjerab National Park",
//       location: { type: "Point", coordinates: [75.4167, 36.8667] },
//     },
//     {
//       country: "United States",
//       countryCode: "US",
//       city: "Shenandoah",
//       address: "Shenandoah National Park, VA",
//       location: { type: "Point", coordinates: [-78.3497, 38.5347] },
//     },
//     {
//       country: "Austria",
//       countryCode: "AT",
//       city: "Hohe Tauern",
//       address: "Hohe Tauern National Park",
//       location: { type: "Point", coordinates: [12.75, 47.0833] },
//     },
//     {
//       country: "Switzerland",
//       countryCode: "CH",
//       city: "Swiss National Park",
//       address: "Swiss National Park",
//       location: { type: "Point", coordinates: [10.2667, 46.65] },
//     },
//     {
//       country: "Canada",
//       countryCode: "CA",
//       city: "Jasper",
//       address: "Jasper National Park, AB",
//       location: { type: "Point", coordinates: [-118.0806, 52.8734] },
//     },
//     {
//       country: "United States",
//       countryCode: "US",
//       city: "Redwood",
//       address: "Redwood National and State Parks, CA",
//       location: { type: "Point", coordinates: [-123.8667, 41.3] },
//     },
//   ];

//   locations.forEach(async (location) => {
//     return await Location.create(location);
//   });
// }

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function randomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min) + min);
}
