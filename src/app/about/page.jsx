import styles from "./about.module.css";
import Image from "next/image";

export const metadata = {
  title: "About Page",
  description: "Svechebi About Page Description",
};

const AboutPage = () => {
  return (
    <div className={styles["container"]}>
      <div className={styles["textContainer"]}>
        <h2 className={styles["subTitle"]}>About Agency</h2>
        <h1 className={styles["title"]}>აალების სანთლები</h1>
        <p className={styles["desc"]}>
          აალების სანთლების პრობლემები განსაკუთრებით თავს იჩენს ცივ ამინდში. პრობლემის პირველი
          ნიშანია მანქანის დაქოქვის დროს ძრავის ვიბრაცია. ეს მოწყობილობა მნიშვნელოვანი ელემენტია
          შიდა წვის ძრავის მუშაობაში. მის გარეშე ძნელი წარმოსადგენია სითბოს ძრავა და მათ შორის,
          ბენზინის ძრავის მუშაობაც.
        </p>
        <div className={styles["boxes"]}>
          <div className={styles["box"]}>
            <h1>20ლ</h1>
            <p>Iridiumia brat</p>
          </div>
          <div className={styles["box"]}>
            <h1>15ლ</h1>
            <p>Platiniumia brat</p>
          </div>
          <div className={styles["box"]}>
            <h1>10ლ</h1>
            <p>ტაქსისტებისთვის ნიკელი</p>
          </div>
        </div>
      </div>
      <div className={styles["imgContainer"]}>
        <Image
          src="/about.png"
          alt=""
          className={styles["img"]}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
    </div>
  );
};

export default AboutPage;
