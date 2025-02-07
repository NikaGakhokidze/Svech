"use client";

import { deletePost } from "@/lib/action";
import styles from "./adminPosts.module.css"

const DeletePostButton = ({ postId }) => {
  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await deletePost(postId);
      // You can add additional handling here, such as refreshing the page or state
    } catch (error) {
      console.error("Failed to delete post:", error);
    }
  };

  return (
    <button onClick={handleDelete} type="button" className={styles["deleteButton"]}>
      Delete
    </button>
  );
};

export default DeletePostButton;
