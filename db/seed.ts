import { ObjectId } from "mongodb";
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

  const collocationA = await dbService.getCollection("amenities");
  const amenitiesData = await collocationA.find().toArray();
  for (let i = 0; i < locations.length; i++) {
    const imgIdx = i % (imgUrls.length - 10);

    const random = randomNumber(1, 5);

    const randomAmenities = getRandomAmenities(amenitiesData);
    const amenitiesIds = randomAmenities.map((amenity) => {
      return amenity._id;
    });
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
    const insertedIds: ObjectId[] = Object.values(result.insertedIds).map(
      (id) => {
        return id;
      }
    );

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
        amenities: amenitiesIds,
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

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function randomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min) + min);
}
function getRandomAmenities(amenitiesData: any[]): any[] {
  const shuffledAmenities = amenitiesData.sort(() => 0.5 - Math.random());
  return shuffledAmenities.slice(0, 20);
}
