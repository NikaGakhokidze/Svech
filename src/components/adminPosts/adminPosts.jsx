import { getPosts } from "@/lib/data";
import styles from "./adminPosts.module.css";
import Image from "next/image";
import DeletePostButton from "./deleteAdminPost";
import EditPostButton from "./editAdminPost";

const AdminPosts = async () => {
  const posts = await getPosts();

  //   const deletePostWithId = async (id) => {
  //     "use server";
  //     return deletePost.bind(null, id);
  //   };

  return (
    <div className={styles["container"]}>
      <h1>Posts</h1>
      {posts.map((post) => {
       return <div className={styles["post"]} key={post.id}>
          <div className={styles["detail"]}>
            <Image src={post.img || "/noAvatar.png"} alt={post.title} width={80} height={80} />
            <span className={styles["postTitle"]}>{post.title}</span>
          </div>

            <DeletePostButton postId={post.id} />  
            <EditPostButton slug={post.slug} />
            {/* WE CAN SEPERATE SERVER AND CLIENT LOGIC BY PASSING ID AS AN PROP LIKE IN THIS COMPONENT */}
            <input type="hidden" placeholder="id" name="id" value={post.id} />
            {/*type is hidden because this input is only for getting post.id purpose */}
            
        </div>
      })}
    </div>
  );
};

export default AdminPosts;
