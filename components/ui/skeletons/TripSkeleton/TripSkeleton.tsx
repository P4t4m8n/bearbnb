import styles from "./TripSkeleton.module.scss";

export default function TripSkeleton() {
  const skeletonCount = 8;

  return (
    <ul className={styles.tripSkeleton}>
      {Array.from({ length: skeletonCount }, (_, index) => (
        <li  key={index}>
          <div></div>
          <div>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </li>
      ))}
    </ul>
  );
}
