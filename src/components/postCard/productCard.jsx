import Image from "next/image";
import styles from "./productCard.module.css";
import Link from "next/link";

const ProductCard = ({ post }) => {
  return (
    <div className={styles["container"]}>
      <div className={styles["top"]}>
        {post.img && (
          <div className={styles["imgContainer"]}>
            <Link href={`/products/${post.slug}`}>
            <Image
              src={post?.img}
              alt=""
              className={styles["img"]}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            </Link>
          </div>
        )}
        <span className={styles["date"]}>19.02.2024</span>
      </div>
      <div className={styles["bottom"]}>
        <h3 className={styles["title"]}>{post.title}</h3>
        <h2 className={styles["price"]}>
          {`${post?.price || 0}₾`}
        </h2>
      </div>
    </div>
  );
};

export default ProductCard;
