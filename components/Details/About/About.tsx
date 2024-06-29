import { ScrollBySVG } from "../../svgs/svgs";
import styles from "./About.module.scss";
interface Props {
  description: string;
}

export default function About({ description }: Props) {
  return (
    <div className={styles.about}>
      <h1>About this place</h1>
      <p className="description">{description}</p>
      <button>
        <span>Show more</span>
        <ScrollBySVG />
      </button>
    </div>
  );
}
