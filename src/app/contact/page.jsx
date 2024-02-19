import Image from "next/image";
import styles from "./contact.module.css";

const ContactPage = () => {
  return (
    <div className={styles["container"]}>
      <div className={styles["imgContainer"]}>
        <Image src="/contact.png" alt="" className={styles["img"]} fill />
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
