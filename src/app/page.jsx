import Image from "next/image";
import styles from "./home.module.css";

const Home = () => {
  return (
    <div className={styles["container"]}>
      <div className={styles["textContainer"]}>
        <h1 className={styles["title"]}>სვეჩები შენს ხელთაა, რაღას უცდი ეძგერე</h1>
        <p className={styles["desc"]}>
          ორიგინალი სვეჩები ჩამოტანილი ამერიკიდან, 100% ნატურალური და დატესტილი ელიავას სვეჩებს ნუ შეადრით ბატონო
        </p>
        <div className={styles["buttons"]}>
          <button className={styles["button"]}>Learn More</button>
          <button className={styles["button"]}>Contact</button>
        </div>
        <div className={styles["brands"]}>
          <Image src="/brands.png" alt="" className={styles["brandImage"]} fill />
        </div>
      </div>
      <div className={styles["imgContainer"]}>
        <Image src="/hero.gif" alt="" className={styles["heroImg"]} fill />
      </div>
    </div>
  );
};

export default Home;
