import styles from "./footer.module.css";

const Footer = () => {
  return (
    <div className={styles["container"]}>
      <div className={styles["logo"]}>Svech</div>
      <div className={styles["text"]}>@ All rights Reserved</div>
    </div>
  );
};

export default Footer;
