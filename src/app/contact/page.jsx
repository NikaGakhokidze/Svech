import Image from "next/image";
import styles from "./contact.module.css";

export const metadata = {
  title: "Contact Page",
  description: "Svechebi Contact Page Description",
};

const ContactPage = () => {
  return (
    <div className={styles["container"]}>
      <div className={styles["imgContainer"]}>
        <Image
          src="/contact.png"
          alt=""
          className={styles["img"]}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className={styles["formContainer"]}>
        <form action="" className={styles["form"]}>
          <input placeholder="Name and surname" />
          <input placeholder="Email Address" />
          <input placeholder="Phone Number (Optional)" />
          <textarea placeholder="Message" name="" id="" cols="30" rows="10"></textarea>
          <button>Send</button>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
