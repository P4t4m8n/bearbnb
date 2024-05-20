import { LabelsType } from "@/model/labels.type";

export const filenames = [
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

// Function to create an array of objects from an array of filename strings.
export function createPresentableObjects(
  array: string[]
): { filename: LabelsType; PresentableTxt: string }[] {
  // Map each item in the input array to a new object.
  return array.map((item) => {
    // Replace all underscores in the string with spaces for readability.
    const presentableText = item.replace(/_/g, " ");
    // Capitalize the first character of the resulting string and append the rest of the string as is.
    const capitalizedText =
      presentableText.charAt(0).toUpperCase() + presentableText.slice(1);
    // Return a new object for each item, containing the original filename and the formatted text.
    return {
      filename: item as LabelsType, // Original filename as it was in the input array.
      PresentableTxt: capitalizedText, // Nicely formatted text for display.
    };
  });
}
