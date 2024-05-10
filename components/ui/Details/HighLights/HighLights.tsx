import { HighLightsModel } from "@/model/stay.model";
import styles from "./HighLights.module.scss";
import { DynamicSVG } from "../../svgs/svgs";

interface Props {
  highlights: HighLightsModel[];
}
export default function HighLights({ highlights }: Props) {
  return (
    <ul className={styles.highlights}>
      {highlights.map((highlight, idx) => (
        <li key={idx}>
          <DynamicSVG
            path={highlight.icon.path}
            viewBox={highlight.icon.viewBox}
          />
          <p>{highlight.title}</p>
          <p>{highlight.description}</p>
        </li>
      ))}
    </ul>
  );
}
