import styles from "./MyStayListSkeleton.module.scss";
export default function MyStayListSkeleton() {
  const skeletonCount = 8;

  return (
    <ul className={styles.skeleton}>
      <li>
        <h4>#</h4>
        <h4>Name</h4>
        <h4>Price</h4>
        <h4>Location</h4>
        <h4>Rating</h4>
        <h4>Type</h4>
        <h4>Actions</h4>
      </li>
      {Array.from({ length: skeletonCount }, (_, index) => (
        <li key={index}>
          <div className={styles.noChild} />
          <div className={styles.name}>
            <span></span>
            <span></span>
          </div>
          <div className={styles.noChild} />
          <div className={styles.noChild} />
          <div className={styles.noChild} />
          <div className={styles.noChild} />
          <div className={styles.action}>
            <span></span>
            <span></span>
          </div>
        </li>
      ))}
    </ul>
  );
}
