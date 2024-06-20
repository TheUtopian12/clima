import styles from "./Alert.module.css";
interface Props {
  children: React.ReactNode;
}
export default function Alert({ children }: Props) {
  return <div className={styles.alert}>{children}</div>;
}
