import styles from "./Spiner.module.css";

export default function Spiner() {
  return (
    <div className={styles.spinner}>
      <div className={styles.rect1}></div>
      <div className={styles.rect2}></div>
      <div className={styles.rect3}></div>
      <div className={styles.rect4}></div>
      <div className={styles.rect5}></div>
    </div>
  );
}
