import styles from "./StayPreviewSkeleton.module.scss";

export default function StayPreviewSkeleton() {
  return (
    <li className={styles.skeleton}>
      <div className={styles.skeletonImg}></div>
      <div className={styles.skeletonTextLong}></div>
      <div className={styles.skeletonDates}></div>
      <div className={styles.skeletonPrice}></div>
    </li>
  );
}
