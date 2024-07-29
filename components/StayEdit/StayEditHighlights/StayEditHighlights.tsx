import { HighlightModel } from "@/model/highlight.model";
import styles from "./StayEditHighlights.module.scss";
import StayEditHighlightsModel from "./StayEditHighlightsModel/StayEditHighlightsModel";
import { getEmptyHighlight } from "@/service/highlight.service";
import { PlusSVG } from "@/components/svgs/svgs";

interface Props {
  highlights: HighlightModel[];
  handleHighlights: (
    highlights: HighlightModel,
    isAdd: boolean,
    idx?: number
  ) => void;
}
export default function StayEditHighlights({
  highlights,
  handleHighlights,
}: Props) {
  const emptyHighlight = getEmptyHighlight();
  return (
    <section className={styles.editHighlight}>
      <div className={styles.header}>
        <h1>Add highlight unique features for you asset</h1>
        <p>You can add highlight also after you publish your listing</p>
      </div>
      <ul className={styles.highlightList}>
        <button
          onClick={() => handleHighlights(emptyHighlight, true)}
          className={styles.add}
        >
          <PlusSVG />
          <h1>Add highlight</h1>
        </button>
        {highlights.length > 0 &&
          highlights.map((highlight, idx) => (
            <StayEditHighlightsModel
              key={idx}
              highlight={highlight}
              idx={idx}
              handleHighlights={handleHighlights}
            />
          ))}
      </ul>
    </section>
  );
}
