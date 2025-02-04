import Image from "next/image";
import styles from "./singlePost.module.css";
import PostUser from "@/components/postUser/postUser";
import { Suspense } from "react";
import { getPost } from "@/lib/data";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
//FETCH DATA WITH AN API
const getData = async (slug) => {
  const res = await fetch(`http://localhost:3000/api/blog/${slug}`);
  if (!res.ok) {
    throw new Error("Something went wrong");
  }

  return res.json();
};

// DELETE SINGLE POST WITH AN API
// const deleteData = async (slug) => {
//   const res = await fetch(`http://localhost:3000/api/blog/${slug}`, { method: "DELETE" });
//   if (!res.ok) {
//     throw new Error("Something went wrong");
//   }

//   return res.json();
// };

export const generateMetadata = async ({ params }) => {
  const { slug } = params;

  const post = await getPost(slug);

  return {
    title: post.title,
    description: post.desc,
  };
};

const SinglePostPage = async ({ params }) => {
  const { slug } = params;
  const post = await getData(slug);
  // const post = await getPost(slug);
  console.log(post)
  return (
    <div className={styles["container"]}>
      {post.img && (
        <div className={styles["imgContainer"]}>
          <Image
            className={styles["img"]}
            fill
            alt=""
            src={post.img}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}
      <div className={styles["textContainer"]}>
        <h1 className={styles["title"]}>{post?.title}</h1>
        <div className={styles["detail"]}>
          {post && (
            <ErrorBoundary>
              <Suspense fallback={<div>Loading...</div>}>
                <PostUser userId={post.userId} />
              </Suspense>
            </ErrorBoundary>
          )}
          <div className={styles["detailText"]}>
            <span className={styles["detailTitle"]}>Published</span>
            <span className={styles["detailValue"]}>{post?.createdAt.toString().slice(4, 16)}</span>
          </div>
        </div>
        <div className={styles["content"]}>{post?.desc}</div>
      </div>
    </div>
  );
};

export default SinglePostPage;
