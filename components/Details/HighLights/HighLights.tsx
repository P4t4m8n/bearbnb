import { DynamicSVGByName } from "@/components/svgs/svgs";
import styles from "./HighLights.module.scss";
import { HighlightModel } from "@/model/highlight.model";

interface Props {
  highlights: HighlightModel[];
}
export default function HighLights({ highlights }: Props) {
  return (
    <ul className={styles.highlights}>
      {highlights.map((highlight, idx) => (
        <li key={idx}>
          <DynamicSVGByName name={highlight.icon} />
          <p>{highlight.title}</p>
          <p>{highlight.description}</p>
        </li>
      ))}
    </ul>
  );
}
