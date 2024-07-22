"use server";
import "server-only";
import { dbService } from "@/db/db.service";
import { HighlightModel } from "@/model/highlight.model";
import { highlightValidate } from "@/db/dataValidation/validation";


export const saveHighlights = async (
  highlights: HighlightModel[]
): Promise<HighlightModel[]> => {
  try {
    highlights.forEach((highlight) => {
      highlightValidate.parse(highlight);
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
