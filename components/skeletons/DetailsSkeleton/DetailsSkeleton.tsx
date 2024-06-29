import styles from "./DetailsSkeleton.module.scss";
export default function DetailsSkeleton() {
  return (
    <section className={styles.detailsSkeleton}>
      <div className={styles.header}></div>
      <ul className={styles.imageList}>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
      <div className={styles.con}>
        <div className={styles.detailsInfo}>
          <div></div>
          <div></div>
        </div>
        <div className={styles.bookingSkeleton}>
          <span></span>
          <span></span>
        </div>
      </div>
    </section>
  );
}
