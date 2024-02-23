import Image from "next/image";
import styles from "./singlePost.module.css";
import PostUser from "@/components/postUser/postUser";
import { Suspense } from "react";
import { getPost } from "@/lib/data";

// const getData = async (slug) => {
//   const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${slug}`);
//   if (!res.ok) {
//     throw new Error("Something went wrong");
//   }

//   return res.json();
// };

const SinglePostPage = async ({ params }) => {
  const { slug } = params;
  // const post = await getData(slug);
  const post = await getPost(slug);
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
        <h1 className={styles["title"]}>{post?.title}</h1>
        <div className={styles["detail"]}>
          <Image
            className={styles["avatar"]}
            width={50}
            height={50}
            alt=""
            src="https://images.pexels.com/photos/19204363/pexels-photo-19204363/free-photo-of-close-up-of-the-front-of-a-vintage-mercedes-car.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          />
          {post && (
            <Suspense fallback={<div>Loading...</div>}>
              <PostUser userId={post.userId} />
            </Suspense>
          )}
          <div className={styles["detailText"]}>
            <span className={styles["detailTitle"]}>Author</span>
            <span className={styles["detailValue"]}>02.22.2024</span>
          </div>
        </div>
        <div className={styles["content"]}>{post?.body}</div>
      </div>
    </div>
  );
};

export default SinglePostPage;
