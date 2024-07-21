import { z } from "zod";
import { dbService } from "@/db/db.service";
import { SvgsNameTypes } from "@/model/icons.model";
import { HighlightModel } from "@/model/highlight.model";

const HighlightValidate = z.object({
  _id: z.string().optional(),
  title: z.string(),
  description: z.string(),
  icon: z.enum(SvgsNameTypes),
});
export const saveHighlights = async (
  highlights: HighlightModel[]
): Promise<HighlightModel[]> => {
  try {
    highlights.forEach((highlight) => {
      HighlightValidate.parse(highlight);
    });

    const collection = await dbService.getCollection("highlights");

    const highlightsToSave = highlights.map((highlight) => {
      return {
        title: highlight.title,
        description: highlight.description,
        icon: highlight.icon,
      };
    });

    const results = await collection.insertMany(highlightsToSave);
    const returnedHighlights = highlightsToSave.map((highlight, index) => {
      return {
        _id: results.insertedIds[index],
        title: highlight.title,
        description: highlight.description,
        icon: highlight.icon,
      };
    });

    return returnedHighlights;
  } catch (error) {
    throw new Error(`Failed to save highlights: ${error}`);
  }
};
