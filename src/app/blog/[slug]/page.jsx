import Image from "next/image";
import styles from "./singlePost.module.css";

const SinglePostPage = ({ params }) => {
  console.log(params);

  return (
    <div className={styles["container"]}>
      <div className={styles["imgContainer"]}>
        <Image
          className={styles["img"]}
          fill
          alt=""
          src="https://images.pexels.com/photos/19204363/pexels-photo-19204363/free-photo-of-close-up-of-the-front-of-a-vintage-mercedes-car.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        />
      </div>
      <div className={styles["textContainer"]}>
        <h1 className={styles["title"]}>Title</h1>
        <div className={styles["detail"]}>
          <Image
            className={styles["avatar"]}
            width={50}
            height={50}
            alt=""
            src="https://images.pexels.com/photos/19204363/pexels-photo-19204363/free-photo-of-close-up-of-the-front-of-a-vintage-mercedes-car.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          />
          <div className={styles["detailText"]}>
            <span className={styles["detailTitle"]}>Author</span>
            <span className={styles["detailValue"]}>Terry Jeferson</span>
          </div>
          <div className={styles["detailText"]}>
            <span className={styles["detailTitle"]}>Author</span>
            <span className={styles["detailValue"]}>02.22.2024</span>
          </div>
        </div>
        <div className={styles["content"]}>Random big sentence goes here so tradadadadadadada</div>
      </div>
    </div>
  );
};

export default SinglePostPage;
