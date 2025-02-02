import { getUser } from "@/lib/data";
import styles from "./postUser.module.css";
import Image from "next/image";

// FETCH DATA WITH AN API
// const getUserData = async (userId) => {
//   const res = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, { cache: "no-store" });
//   if (!res.ok) {
//     throw new Error("Something went wrong");
//   }

//   return res.json();
// };

const PostUser = async ({ userId }) => {
  // const user = await getUserData(userId);
  console.log(userId);
  const user = await getUser(userId);

  return (
    <div className={styles["container"]}>
      <Image
        className={styles["avatar"]}
        width={50}
        height={50}
        alt=""
        src={user?.img ? user.img : "/noavatar.png"}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
      <div className={styles["texts"]}>
        <span className={styles["title"]}>Author</span>
        <span className={styles["username"]}>{user?.username || "username"}</span>
      </div>
    </div>
  );
};

export default PostUser;
