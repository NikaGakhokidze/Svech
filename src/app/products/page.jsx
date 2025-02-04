import PostCard from "@/components/postCard/postCard";
import styles from "./products.module.css";
import { getPosts } from "@/lib/data";

// FETCH DATA WITH AN API
const getData = async () => {
  const res = await fetch("http://localhost:3000/api/blog", { next: { revalidate: 3600 } }); //refetches every 1 hour. 3600 seconds mean 1 hour
  if (!res.ok) {
    throw new Error("Something went wrong");
  }

  return res.json();
};

const ProductsPage = async () => {
  const posts = await getData();
  // const posts = await getPosts();

  return (
    <div className={styles["container"]}>
      {posts.map((post, _length) => (
        <div className={styles["post"]} key={_length}>
          <PostCard post={post} />
        </div>
      ))}
    </div>
  );
};

export default ProductsPage;
