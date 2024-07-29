import { HighlightModel } from "@/model/highlight.model";

export const getEmptyHighlight = (): HighlightModel => {
  return {
    title: "",
    description: "",
    icon: "placeholder",
  };
};
