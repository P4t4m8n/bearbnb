import { faker } from "@faker-js/faker";
import { prisma } from "./prisma";
import { Amenities } from "@prisma/client";

async function main() {
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
  //   } catch (error) {
  //     console.error("Error creating amenity:", amenity, error);
  //   }
  // }
  // const svgs = [
  //   {
  //     name: "door",
  //     viewBox: "0 0 32 32",
  //     path: "M24.33 1.67a2 2 0 0 1 2 1.85v24.81h3v2H2.67v-2h3V3.67a2 2 0 0 1 1.85-2h.15zm-4 2H7.67v24.66h12.66zm4 0h-2v24.66h2zm-7 11a1.33 1.33 0 1 1 0 2.66 1.33 1.33 0 0 1 0-2.66z",
  //   },
  //   {
  //     name: "key",
  //     viewBox: "0 0 32 32",
  //     path: "M16.84 27.16v-3.4l-.26.09c-.98.32-2.03.51-3.11.55h-.7A11.34 11.34 0 0 1 1.72 13.36v-.59A11.34 11.34 0 0 1 12.77 1.72h.59c6.03.16 10.89 5.02 11.04 11.05V13.45a11.3 11.3 0 0 1-.9 4.04l-.13.3 7.91 7.9v5.6H25.7l-4.13-4.13zM10.31 7.22a3.1 3.1 0 1 1 0 6.19 3.1 3.1 0 0 1 0-6.2zm0 2.06a1.03 1.03 0 1 0 0 2.06 1.03 1.03 0 0 0 0-2.06zM22.43 25.1l4.12 4.13h2.67v-2.67l-8.37-8.37.37-.68.16-.3c.56-1.15.9-2.42.96-3.77v-.64a9.28 9.28 0 0 0-9-9h-.55a9.28 9.28 0 0 0-9 9v.54a9.28 9.28 0 0 0 13.3 8.1l.3-.16 1.52-.8v4.62z",
  //   },
  //   {
  //     name: "calendar",
  //     viewBox: "0 0 32 32",
  //     path: "M11.67 0v1.67h8.66V0h2v1.67h6a2 2 0 0 1 2 1.85v16.07a2 2 0 0 1-.46 1.28l-.12.13L21 29.75a2 2 0 0 1-1.24.58H6.67a5 5 0 0 1-5-4.78V3.67a2 2 0 0 1 1.85-2h6.15V0zm16.66 11.67H3.67v13.66a3 3 0 0 0 2.82 3h11.18v-5.66a5 5 0 0 1 4.78-5h5.88zm-.08 8h-5.58a3 3 0 0 0-3 2.82v5.76zm-18.58-16h-6v6h24.66v-6h-6v1.66h-2V3.67h-8.66v1.66h-2z",
  //   },
  // ];
  // for (const svg of svgs) {
  //   try {
  //     const result = await prisma.svgIcon.create({
  //       data: { path: svg.path, viewBox: svg.viewBox, name: svg.name },
  //     });
  //   } catch (error) {
  //     console.error("Error creating amenity:", svg, error);
  //   }
  // }
  // await prisma.profile.create({
  //   data: {
  //     isOwner: true,
  //     ownerSince: new Date(),
  //     supabaseId: "df9aa7d0-92cc-493e-84e0-e88aef9e5653",
  //     firstName: "host",
  //     lastName: "host",
  //     dob: new Date(),
  //     imgUrl: faker.image.avatar(),
  //   },
  // });
  // await prisma.profile.create({
  //   data: {
  //     isOwner: false,
  //     supabaseId: "f709ee76-5922-44bc-af93-daaeda507b93",
  //     firstName: "user",
  //     lastName: "user",
  //     dob: new Date(),
  //     imgUrl: faker.image.avatar(),
  //   },
  // });
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
  const locations = [
    {
      country: "Japan",
      countryCode: "JP",
      city: "Tokyo",
      address:
        "The Ritz-Carlton, Tokyo, Tokyo Midtown 9-7-1 Akasaka, Minato-ku, Tokyo 107-6245, Japan",
      lat: 35.6654,
      lng: 139.7297,
    },
    {
      country: "Japan",
      countryCode: "JP",
      city: "Tokyo",
      address:
        "Park Hyatt Tokyo, 3-7-1-2 Nishishinjuku, Shinjuku-ku, Tokyo 163-1055, Japan",
      lat: 35.6851,
      lng: 139.6917,
    },
    {
      country: "Japan",
      countryCode: "JP",
      city: "Tokyo",
      address:
        "Mandarin Oriental, Tokyo, 2-1-1 Nihonbashi Muromachi, Chuo-ku, Tokyo 103-8328, Japan",
      lat: 35.687,
      lng: 139.7737,
    },
    {
      country: "Japan",
      countryCode: "JP",
      city: "Tokyo",
      address:
        "Imperial Hotel Tokyo, 1-1-1 Uchisaiwaicho, Chiyoda-ku, Tokyo 100-8558, Japan",
      lat: 35.6763,
      lng: 139.761,
    },
    {
      country: "Japan",
      countryCode: "JP",
      city: "Tokyo",
      address:
        "Shangri-La Hotel, Tokyo, Marunouchi Trust Tower Main, 1-8-3 Marunouchi, Chiyoda-ku, Tokyo 100-8283, Japan",
      lat: 35.6824,
      lng: 139.7716,
    },
    {
      country: "Japan",
      countryCode: "JP",
      city: "Tokyo",
      address:
        "The Peninsula Tokyo, 1-8-1 Yurakucho, Chiyoda-ku, Tokyo 100-0006, Japan",
      lat: 35.6762,
      lng: 139.7618,
    },
    {
      country: "Japan",
      countryCode: "JP",
      city: "Tokyo",
      address:
        "Four Seasons Hotel Tokyo at Marunouchi, Pacific Century Place, 1-11-1 Marunouchi, Chiyoda-ku, Tokyo 100-6277, Japan",
      lat: 35.6818,
      lng: 139.7671,
    },
    {
      country: "Japan",
      countryCode: "JP",
      city: "Tokyo",
      address:
        "Conrad Tokyo, 1-9-1 Higashi-Shinbashi, Minato-ku, Tokyo 105-7337, Japan",
      lat: 35.6613,
      lng: 139.7624,
    },
    {
      country: "Japan",
      countryCode: "JP",
      city: "Tokyo",
      address:
        "Hilton Tokyo, 6-6-2 Nishi-Shinjuku, Shinjuku-ku, Tokyo 160-0023, Japan",
      lat: 35.6934,
      lng: 139.698,
    },
    {
      country: "Japan",
      countryCode: "JP",
      city: "Tokyo",
      address:
        "Grand Hyatt Tokyo, 6-10-3 Roppongi, Minato-ku, Tokyo 106-0032, Japan",
      lat: 35.662,
      lng: 139.7294,
    },
    {
      country: "Israel",
      countryCode: "IL",
      city: "Jerusalem",
      address:
        "The King David Hotel, 23 King David St, Jerusalem, 94101, Israel",
      lat: 31.7767,
      lng: 35.2222,
    },
    {
      country: "Israel",
      countryCode: "IL",
      city: "Jerusalem",
      address:
        "Waldorf Astoria Jerusalem, 26-28 Agron St, Jerusalem, 9419008, Israel",
      lat: 31.7778,
      lng: 35.2225,
    },
    {
      country: "Israel",
      countryCode: "IL",
      city: "Jerusalem",
      address: "Mamilla Hotel, 11 King Solomon St, Jerusalem, 94182, Israel",
      lat: 31.7766,
      lng: 35.2267,
    },
    {
      country: "Israel",
      countryCode: "IL",
      city: "Tel Aviv",
      address:
        "The Norman Tel Aviv, 23-25 Nachmani St, Tel Aviv-Yafo, 6579441, Israel",
      lat: 32.0662,
      lng: 34.7761,
    },
    {
      country: "Israel",
      countryCode: "IL",
      city: "Tel Aviv",
      address:
        "The Setai Tel Aviv, David Razi'el St 22, Tel Aviv-Yafo, 6802919, Israel",
      lat: 32.067,
      lng: 34.764,
    },
    {
      country: "Israel",
      countryCode: "IL",
      city: "Tel Aviv",
      address:
        "David InterContinental Tel Aviv, 12 Kaufmann St, Tel Aviv-Yafo, 61501, Israel",
      lat: 32.065,
      lng: 34.7642,
    },
    {
      country: "Israel",
      countryCode: "IL",
      city: "Tel Aviv",
      address:
        "Royal Beach Tel Aviv, Ha-Yarkon St 19, Tel Aviv-Yafo, 68011, Israel",
      lat: 32.0715,
      lng: 34.7674,
    },
    {
      country: "Israel",
      countryCode: "IL",
      city: "Tel Aviv",
      address:
        "Carlton Tel Aviv, Eliezer Peri St 10, Tel Aviv-Yafo, 63573, Israel",
      lat: 32.084,
      lng: 34.7696,
    },
    {
      country: "Israel",
      countryCode: "IL",
      city: "Eilat",
      address: "Dan Eilat Hotel, North Beach, Eilat, 88101, Israel",
      lat: 29.55,
      lng: 34.9519,
    },
    {
      country: "Israel",
      countryCode: "IL",
      city: "Haifa",
      address:
        "Dan Carmel Haifa Hotel, 85-87 Hanassi Ave, Haifa, 34642, Israel",
      lat: 32.8093,
      lng: 34.9851,
    },
    {
      country: "United States",
      countryCode: "US",
      city: "New York",
      address: "Hilton New York Midtown, 1335 6th Ave, New York, NY 10019, USA",
      lat: 40.7625,
      lng: -73.978,
    },
    {
      country: "United States",
      countryCode: "US",
      city: "New York",
      address: "The Plaza Hotel, 768 Fifth Avenue, New York, NY 10019, USA",
      lat: 40.7644,
      lng: -73.9746,
    },
    {
      country: "United States",
      countryCode: "US",
      city: "New York",
      address:
        "The Ritz-Carlton New York, Central Park, 50 Central Park S, New York, NY 10019, USA",
      lat: 40.766,
      lng: -73.9773,
    },
    {
      country: "United States",
      countryCode: "US",
      city: "New York",
      address:
        "The Langham, New York, Fifth Avenue, 400 Fifth Ave, New York, NY 10018, USA",
      lat: 40.7511,
      lng: -73.9823,
    },
    {
      country: "United States",
      countryCode: "US",
      city: "New York",
      address: "Park Hyatt New York, 153 W 57th St, New York, NY 10019, USA",
      lat: 40.764,
      lng: -73.9788,
    },
    {
      country: "United States",
      countryCode: "US",
      city: "New York",
      address:
        "Conrad New York Downtown, 102 North End Ave, New York, NY 10282, USA",
      lat: 40.7157,
      lng: -74.0156,
    },
    {
      country: "United States",
      countryCode: "US",
      city: "New York",
      address: "The Peninsula New York, 700 5th Ave, New York, NY 10019, USA",
      lat: 40.7624,
      lng: -73.9748,
    },
    {
      country: "United States",
      countryCode: "US",
      city: "New York",
      address:
        "The Knickerbocker Hotel, 6 Times Square, New York, NY 10036, USA",
      lat: 40.7553,
      lng: -73.9866,
    },
    {
      country: "United States",
      countryCode: "US",
      city: "New York",
      address:
        "The New Yorker, A Wyndham Hotel, 481 8th Ave, New York, NY 10001, USA",
      lat: 40.7528,
      lng: -73.9936,
    },
    {
      country: "United States",
      countryCode: "US",
      city: "New York",
      address:
        "Mandarin Oriental, New York, 80 Columbus Circle, New York, NY 10023, USA",
      lat: 40.7685,
      lng: -73.983,
    },
    {
      country: "United Kingdom",
      countryCode: "GB",
      city: "London",
      address:
        "The Ritz London, 150 Piccadilly, St. James's, London W1J 9BR, UK",
      lat: 51.5074,
      lng: -0.141,
    },
    {
      country: "United Kingdom",
      countryCode: "GB",
      city: "London",
      address: "The Savoy, Strand, London WC2R 0EZ, UK",
      lat: 51.51,
      lng: -0.12,
    },
    {
      country: "United Kingdom",
      countryCode: "GB",
      city: "London",
      address: "Claridge's, Brook St, Mayfair, London W1K 4HR, UK",
      lat: 51.5125,
      lng: -0.1482,
    },
    {
      country: "United Kingdom",
      countryCode: "GB",
      city: "London",
      address:
        "The Langham, London, 1C Portland Pl, Marylebone, London W1B 1JA, UK",
      lat: 51.5175,
      lng: -0.1426,
    },
    {
      country: "United Kingdom",
      countryCode: "GB",
      city: "London",
      address:
        "Shangri-La Hotel, At The Shard, 31 St Thomas St, London SE1 9QU, UK",
      lat: 51.5045,
      lng: -0.0865,
    },
    {
      country: "United Kingdom",
      countryCode: "GB",
      city: "London",
      address: "The Connaught, Carlos Pl, Mayfair, London W1K 2AL, UK",
      lat: 51.5104,
      lng: -0.1492,
    },
    {
      country: "United Kingdom",
      countryCode: "GB",
      city: "London",
      address: "The Berkeley, Wilton Pl, Knightsbridge, London SW1X 7RL, UK",
      lat: 51.5017,
      lng: -0.1564,
    },
    {
      country: "United Kingdom",
      countryCode: "GB",
      city: "London",
      address: "The Lanesborough, Hyde Park Corner, London SW1X 7TA, UK",
      lat: 51.5025,
      lng: -0.1526,
    },
    {
      country: "United Kingdom",
      countryCode: "GB",
      city: "London",
      address: "The Dorchester, 53 Park Ln, Mayfair, London W1K 1QA, UK",
      lat: 51.5071,
      lng: -0.1504,
    },
    {
      country: "United Kingdom",
      countryCode: "GB",
      city: "London",
      address: "Hotel Café Royal, 68 Regent St, Soho, London W1B 4DY, UK",
      lat: 51.5101,
      lng: -0.1385,
    },
    {
      country: "France",
      countryCode: "FR",
      city: "Paris",
      address: "Hôtel Ritz Paris, 15 Place Vendôme, 75001 Paris, France",
      lat: 48.8687,
      lng: 2.3295,
    },
    {
      country: "France",
      countryCode: "FR",
      city: "Paris",
      address: "Le Meurice, 228 Rue de Rivoli, 75001 Paris, France",
      lat: 48.8656,
      lng: 2.3275,
    },
    {
      country: "France",
      countryCode: "FR",
      city: "Paris",
      address:
        "Four Seasons Hotel George V, 31 Avenue George V, 75008 Paris, France",
      lat: 48.8674,
      lng: 2.3002,
    },
    {
      country: "France",
      countryCode: "FR",
      city: "Paris",
      address: "Shangri-La Hotel Paris, 10 Avenue d'Iéna, 75116 Paris, France",
      lat: 48.8648,
      lng: 2.2942,
    },
    {
      country: "France",
      countryCode: "FR",
      city: "Paris",
      address: "Hôtel de Crillon, 10 Place de la Concorde, 75008 Paris, France",
      lat: 48.8681,
      lng: 2.3215,
    },
    {
      country: "France",
      countryCode: "FR",
      city: "Paris",
      address:
        "Mandarin Oriental, Paris, 251 Rue Saint-Honoré, 75001 Paris, France",
      lat: 48.8663,
      lng: 2.3281,
    },
    {
      country: "France",
      countryCode: "FR",
      city: "Paris",
      address:
        "Le Bristol Paris, 112 Rue du Faubourg Saint-Honoré, 75008 Paris, France",
      lat: 48.8722,
      lng: 2.3095,
    },
  ];
  const host = { id: "319eaf18-9328-4bbb-ab67-c6a6a064063c" };
  const user = { id: "4532b4ef-80ec-46a9-87c1-b0c356f373fc" };
  const amenities = await prisma.amenity.findMany();
  const svgs = await prisma.svgIcon.findMany();
  for (let i = 0; i < locations.length; i++) {
    await delay(1);
    const location = await prisma.location.create({
      data: {
        ...locations[i],
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
          (_, i) => imgUrls[Math.floor(Math.random() * imgUrls.length)]
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
    // const reviews = Array(2)
    //   .fill(null)
    //   .map(() => ({
    //     text: faker.lorem.sentence(),
    //     overallRating: faker.number.int({ min: 1, max: 5 }),
    //     cleanliness: faker.number.int({ min: 1, max: 5 }),
    //     accuracy: faker.number.int({ min: 1, max: 5 }),
    //     checkIn: faker.number.int({ min: 1, max: 5 }),
    //     communication: faker.number.int({ min: 1, max: 5 }),
    //     location: faker.number.int({ min: 1, max: 5 }),
    //     value: faker.number.int({ min: 1, max: 5 }),
    //     userId: user.id,
    //     stayId: stay.id,
    //     createdAt: faker.date.past(),
    //     updatedAt: faker.date.recent(),
    //   }));
    // await prisma.review.createMany({
    //   data: reviews,
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

const svgs = [
  {
    name: "door",
    viewBox: "0 0 32 32",
    path: "M24.33 1.67a2 2 0 0 1 2 1.85v24.81h3v2H2.67v-2h3V3.67a2 2 0 0 1 1.85-2h.15zm-4 2H7.67v24.66h12.66zm4 0h-2v24.66h2zm-7 11a1.33 1.33 0 1 1 0 2.66 1.33 1.33 0 0 1 0-2.66z",
  },
  {
    name: "key",
    viewBox: "0 0 32 32",
    path: "M16.84 27.16v-3.4l-.26.09c-.98.32-2.03.51-3.11.55h-.7A11.34 11.34 0 0 1 1.72 13.36v-.59A11.34 11.34 0 0 1 12.77 1.72h.59c6.03.16 10.89 5.02 11.04 11.05V13.45a11.3 11.3 0 0 1-.9 4.04l-.13.3 7.91 7.9v5.6H25.7l-4.13-4.13zM10.31 7.22a3.1 3.1 0 1 1 0 6.19 3.1 3.1 0 0 1 0-6.2zm0 2.06a1.03 1.03 0 1 0 0 2.06 1.03 1.03 0 0 0 0-2.06zM22.43 25.1l4.12 4.13h2.67v-2.67l-8.37-8.37.37-.68.16-.3c.56-1.15.9-2.42.96-3.77v-.64a9.28 9.28 0 0 0-9-9h-.55a9.28 9.28 0 0 0-9 9v.54a9.28 9.28 0 0 0 13.3 8.1l.3-.16 1.52-.8v4.62z",
  },
  {
    name: "calendar",
    viewBox: "0 0 32 32",
    path: "M11.67 0v1.67h8.66V0h2v1.67h6a2 2 0 0 1 2 1.85v16.07a2 2 0 0 1-.46 1.28l-.12.13L21 29.75a2 2 0 0 1-1.24.58H6.67a5 5 0 0 1-5-4.78V3.67a2 2 0 0 1 1.85-2h6.15V0zm16.66 11.67H3.67v13.66a3 3 0 0 0 2.82 3h11.18v-5.66a5 5 0 0 1 4.78-5h5.88zm-.08 8h-5.58a3 3 0 0 0-3 2.82v5.76zm-18.58-16h-6v6h24.66v-6h-6v1.66h-2V3.67h-8.66v1.66h-2z",
  },
];

const locations = [
  {
    country: "Japan",
    countryCode: "JP",
    city: "Tokyo",
    address:
      "The Ritz-Carlton, Tokyo, Tokyo Midtown 9-7-1 Akasaka, Minato-ku, Tokyo 107-6245, Japan",
    lat: 35.6654,
    lng: 139.7297,
  },
  {
    country: "Japan",
    countryCode: "JP",
    city: "Tokyo",
    address:
      "Park Hyatt Tokyo, 3-7-1-2 Nishishinjuku, Shinjuku-ku, Tokyo 163-1055, Japan",
    lat: 35.6851,
    lng: 139.6917,
  },
  {
    country: "Japan",
    countryCode: "JP",
    city: "Tokyo",
    address:
      "Mandarin Oriental, Tokyo, 2-1-1 Nihonbashi Muromachi, Chuo-ku, Tokyo 103-8328, Japan",
    lat: 35.687,
    lng: 139.7737,
  },
  {
    country: "Japan",
    countryCode: "JP",
    city: "Tokyo",
    address:
      "Imperial Hotel Tokyo, 1-1-1 Uchisaiwaicho, Chiyoda-ku, Tokyo 100-8558, Japan",
    lat: 35.6763,
    lng: 139.761,
  },
  {
    country: "Japan",
    countryCode: "JP",
    city: "Tokyo",
    address:
      "Shangri-La Hotel, Tokyo, Marunouchi Trust Tower Main, 1-8-3 Marunouchi, Chiyoda-ku, Tokyo 100-8283, Japan",
    lat: 35.6824,
    lng: 139.7716,
  },
  {
    country: "Japan",
    countryCode: "JP",
    city: "Tokyo",
    address:
      "The Peninsula Tokyo, 1-8-1 Yurakucho, Chiyoda-ku, Tokyo 100-0006, Japan",
    lat: 35.6762,
    lng: 139.7618,
  },
  {
    country: "Japan",
    countryCode: "JP",
    city: "Tokyo",
    address:
      "Four Seasons Hotel Tokyo at Marunouchi, Pacific Century Place, 1-11-1 Marunouchi, Chiyoda-ku, Tokyo 100-6277, Japan",
    lat: 35.6818,
    lng: 139.7671,
  },
  {
    country: "Japan",
    countryCode: "JP",
    city: "Tokyo",
    address:
      "Conrad Tokyo, 1-9-1 Higashi-Shinbashi, Minato-ku, Tokyo 105-7337, Japan",
    lat: 35.6613,
    lng: 139.7624,
  },
  {
    country: "Japan",
    countryCode: "JP",
    city: "Tokyo",
    address:
      "Hilton Tokyo, 6-6-2 Nishi-Shinjuku, Shinjuku-ku, Tokyo 160-0023, Japan",
    lat: 35.6934,
    lng: 139.698,
  },
  {
    country: "Japan",
    countryCode: "JP",
    city: "Tokyo",
    address:
      "Grand Hyatt Tokyo, 6-10-3 Roppongi, Minato-ku, Tokyo 106-0032, Japan",
    lat: 35.662,
    lng: 139.7294,
  },
  {
    country: "Israel",
    countryCode: "IL",
    city: "Jerusalem",
    address: "The King David Hotel, 23 King David St, Jerusalem, 94101, Israel",
    lat: 31.7767,
    lng: 35.2222,
  },
  {
    country: "Israel",
    countryCode: "IL",
    city: "Jerusalem",
    address:
      "Waldorf Astoria Jerusalem, 26-28 Agron St, Jerusalem, 9419008, Israel",
    lat: 31.7778,
    lng: 35.2225,
  },
  {
    country: "Israel",
    countryCode: "IL",
    city: "Jerusalem",
    address: "Mamilla Hotel, 11 King Solomon St, Jerusalem, 94182, Israel",
    lat: 31.7766,
    lng: 35.2267,
  },
  {
    country: "Israel",
    countryCode: "IL",
    city: "Tel Aviv",
    address:
      "The Norman Tel Aviv, 23-25 Nachmani St, Tel Aviv-Yafo, 6579441, Israel",
    lat: 32.0662,
    lng: 34.7761,
  },
  {
    country: "Israel",
    countryCode: "IL",
    city: "Tel Aviv",
    address:
      "The Setai Tel Aviv, David Razi'el St 22, Tel Aviv-Yafo, 6802919, Israel",
    lat: 32.067,
    lng: 34.764,
  },
  {
    country: "Israel",
    countryCode: "IL",
    city: "Tel Aviv",
    address:
      "David InterContinental Tel Aviv, 12 Kaufmann St, Tel Aviv-Yafo, 61501, Israel",
    lat: 32.065,
    lng: 34.7642,
  },
  {
    country: "Israel",
    countryCode: "IL",
    city: "Tel Aviv",
    address:
      "Royal Beach Tel Aviv, Ha-Yarkon St 19, Tel Aviv-Yafo, 68011, Israel",
    lat: 32.0715,
    lng: 34.7674,
  },
  {
    country: "Israel",
    countryCode: "IL",
    city: "Tel Aviv",
    address:
      "Carlton Tel Aviv, Eliezer Peri St 10, Tel Aviv-Yafo, 63573, Israel",
    lat: 32.084,
    lng: 34.7696,
  },
  {
    country: "Israel",
    countryCode: "IL",
    city: "Eilat",
    address: "Dan Eilat Hotel, North Beach, Eilat, 88101, Israel",
    lat: 29.55,
    lng: 34.9519,
  },
  {
    country: "Israel",
    countryCode: "IL",
    city: "Haifa",
    address: "Dan Carmel Haifa Hotel, 85-87 Hanassi Ave, Haifa, 34642, Israel",
    lat: 32.8093,
    lng: 34.9851,
  },
  {
    country: "United States",
    countryCode: "US",
    city: "New York",
    address: "Hilton New York Midtown, 1335 6th Ave, New York, NY 10019, USA",
    lat: 40.7625,
    lng: -73.978,
  },
  {
    country: "United States",
    countryCode: "US",
    city: "New York",
    address: "The Plaza Hotel, 768 Fifth Avenue, New York, NY 10019, USA",
    lat: 40.7644,
    lng: -73.9746,
  },
  {
    country: "United States",
    countryCode: "US",
    city: "New York",
    address:
      "The Ritz-Carlton New York, Central Park, 50 Central Park S, New York, NY 10019, USA",
    lat: 40.766,
    lng: -73.9773,
  },
  {
    country: "United States",
    countryCode: "US",
    city: "New York",
    address:
      "The Langham, New York, Fifth Avenue, 400 Fifth Ave, New York, NY 10018, USA",
    lat: 40.7511,
    lng: -73.9823,
  },
  {
    country: "United States",
    countryCode: "US",
    city: "New York",
    address: "Park Hyatt New York, 153 W 57th St, New York, NY 10019, USA",
    lat: 40.764,
    lng: -73.9788,
  },
  {
    country: "United States",
    countryCode: "US",
    city: "New York",
    address:
      "Conrad New York Downtown, 102 North End Ave, New York, NY 10282, USA",
    lat: 40.7157,
    lng: -74.0156,
  },
  {
    country: "United States",
    countryCode: "US",
    city: "New York",
    address: "The Peninsula New York, 700 5th Ave, New York, NY 10019, USA",
    lat: 40.7624,
    lng: -73.9748,
  },
  {
    country: "United States",
    countryCode: "US",
    city: "New York",
    address: "The Knickerbocker Hotel, 6 Times Square, New York, NY 10036, USA",
    lat: 40.7553,
    lng: -73.9866,
  },
  {
    country: "United States",
    countryCode: "US",
    city: "New York",
    address:
      "The New Yorker, A Wyndham Hotel, 481 8th Ave, New York, NY 10001, USA",
    lat: 40.7528,
    lng: -73.9936,
  },
  {
    country: "United States",
    countryCode: "US",
    city: "New York",
    address:
      "Mandarin Oriental, New York, 80 Columbus Circle, New York, NY 10023, USA",
    lat: 40.7685,
    lng: -73.983,
  },
  {
    country: "United Kingdom",
    countryCode: "GB",
    city: "London",
    address: "The Ritz London, 150 Piccadilly, St. James's, London W1J 9BR, UK",
    lat: 51.5074,
    lng: -0.141,
  },
  {
    country: "United Kingdom",
    countryCode: "GB",
    city: "London",
    address: "The Savoy, Strand, London WC2R 0EZ, UK",
    lat: 51.51,
    lng: -0.12,
  },
  {
    country: "United Kingdom",
    countryCode: "GB",
    city: "London",
    address: "Claridge's, Brook St, Mayfair, London W1K 4HR, UK",
    lat: 51.5125,
    lng: -0.1482,
  },
  {
    country: "United Kingdom",
    countryCode: "GB",
    city: "London",
    address:
      "The Langham, London, 1C Portland Pl, Marylebone, London W1B 1JA, UK",
    lat: 51.5175,
    lng: -0.1426,
  },
  {
    country: "United Kingdom",
    countryCode: "GB",
    city: "London",
    address:
      "Shangri-La Hotel, At The Shard, 31 St Thomas St, London SE1 9QU, UK",
    lat: 51.5045,
    lng: -0.0865,
  },
  {
    country: "United Kingdom",
    countryCode: "GB",
    city: "London",
    address: "The Connaught, Carlos Pl, Mayfair, London W1K 2AL, UK",
    lat: 51.5104,
    lng: -0.1492,
  },
  {
    country: "United Kingdom",
    countryCode: "GB",
    city: "London",
    address: "The Berkeley, Wilton Pl, Knightsbridge, London SW1X 7RL, UK",
    lat: 51.5017,
    lng: -0.1564,
  },
  {
    country: "United Kingdom",
    countryCode: "GB",
    city: "London",
    address: "The Lanesborough, Hyde Park Corner, London SW1X 7TA, UK",
    lat: 51.5025,
    lng: -0.1526,
  },
  {
    country: "United Kingdom",
    countryCode: "GB",
    city: "London",
    address: "The Dorchester, 53 Park Ln, Mayfair, London W1K 1QA, UK",
    lat: 51.5071,
    lng: -0.1504,
  },
  {
    country: "United Kingdom",
    countryCode: "GB",
    city: "London",
    address: "Hotel Café Royal, 68 Regent St, Soho, London W1B 4DY, UK",
    lat: 51.5101,
    lng: -0.1385,
  },
  {
    country: "France",
    countryCode: "FR",
    city: "Paris",
    address: "Hôtel Ritz Paris, 15 Place Vendôme, 75001 Paris, France",
    lat: 48.8687,
    lng: 2.3295,
  },
  {
    country: "France",
    countryCode: "FR",
    city: "Paris",
    address: "Le Meurice, 228 Rue de Rivoli, 75001 Paris, France",
    lat: 48.8656,
    lng: 2.3275,
  },
  {
    country: "France",
    countryCode: "FR",
    city: "Paris",
    address:
      "Four Seasons Hotel George V, 31 Avenue George V, 75008 Paris, France",
    lat: 48.8674,
    lng: 2.3002,
  },
  {
    country: "France",
    countryCode: "FR",
    city: "Paris",
    address: "Shangri-La Hotel Paris, 10 Avenue d'Iéna, 75116 Paris, France",
    lat: 48.8648,
    lng: 2.2942,
  },
  {
    country: "France",
    countryCode: "FR",
    city: "Paris",
    address: "Hôtel de Crillon, 10 Place de la Concorde, 75008 Paris, France",
    lat: 48.8681,
    lng: 2.3215,
  },
  {
    country: "France",
    countryCode: "FR",
    city: "Paris",
    address:
      "Mandarin Oriental, Paris, 251 Rue Saint-Honoré, 75001 Paris, France",
    lat: 48.8663,
    lng: 2.3281,
  },
  {
    country: "France",
    countryCode: "FR",
    city: "Paris",
    address:
      "Le Bristol Paris, 112 Rue du Faubourg Saint-Honoré, 75008 Paris, France",
    lat: 48.8722,
    lng: 2.3095,
  },
];
