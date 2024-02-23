import Image from "next/image";
import styles from "./postCard.module.css";
import Link from "next/link";

const PostCard = ({ post }) => {
  return (
    <div className={styles["container"]}>
      <div className={styles["top"]}>
        <div className={styles["imgContainer"]}>
          <Image
            src="https://images.pexels.com/photos/19204363/pexels-photo-19204363/free-photo-of-close-up-of-the-front-of-a-vintage-mercedes-car.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt=""
            className={styles["img"]}
            fill
          />
        </div>
        <span className={styles["date"]}>19.02.2024</span>
      </div>
      <div className={styles["bottom"]}>
        <h1 className={styles["title"]}>{post.title}</h1>
        <p className={styles["desc"]}>{post.body}</p>
        <Link className={styles["link"]} href={`/blog/${post.id}`}>
          Read more
        </Link>
      </div>
    </div>
  );
};

export default PostCard;
