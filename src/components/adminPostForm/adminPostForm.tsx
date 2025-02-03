"use client";

import { addPost, editPost } from "@/lib/action";
import styles from "./adminPostForm.module.css";
import { useFormState } from "react-dom";
import { usePathname } from "next/navigation";
import { useState } from "react";
// import Image from "next/image";


interface IAdminPostForm {
  userId?: number
  post: any
}

const AdminPostForm = ({ userId, post }: IAdminPostForm) => {
  const [addState, formActionForAdd] = useFormState(addPost, undefined);
  const [editState, formActionForEdit] = useFormState(editPost, undefined);
  const pathname = usePathname();
  const isEditPost = pathname.includes("edit");

  // State for validation errors
  const [errors, setErrors] = useState<{
    title?: string;
    img?: string;
    desc?: string;
  }>({});

  // Validate individual fields
  const validateField = (name: string, value: string) => {
    switch (name) {
      case 'title':
        if (!value) return 'Title is required';
        if (value.length < 5) return 'Title must be at least 5 characters';
        return '';
      case 'img':
        if (!value) return 'Image URL is required';
        return '';
      case 'desc':
        if (!value) return 'Description is required';
        if (value.length < 5) return 'Description must be at least 5 characters';
        return '';
      default:
        return '';
    }
  };

  // Handle input changes with validation
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  return (
    <div>
      {!isEditPost ? (
        <form action={formActionForAdd} className={styles["container"]}>
          <h1>Add Post</h1>
          <input type="hidden" name="userId" value={userId} />
          <input type="hidden" name="postId" value={post?._id} />

          <div className={styles["form-group"]}>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Title"
              required
              minLength={5}
              onChange={handleInputChange}
              onBlur={handleInputChange}
            />
            {errors.title && <span className={styles.error}>{errors.title}</span>}
          </div>

          <div className={styles["form-group"]}>
            <label htmlFor="img">Image URL</label>
            <input
              type="url"
              id="img"
              name="img"
              placeholder="Image URL"
              required
              value={post?.img}
              onChange={handleInputChange}
              onBlur={handleInputChange}
            />
            {errors.img && <span className={styles.error}>{errors.img}</span>}
          </div>

          <div className={styles["form-group"]}>
            <label htmlFor="desc">Description</label>
            <textarea
              id="desc"
              name="desc"
              placeholder="Description"
              required
              minLength={5}
              rows={10}
              onChange={handleInputChange}
              onBlur={handleInputChange}
            />
            {errors.desc && <span className={styles.error}>{errors.desc}</span>}
          </div>

          <button type="submit" disabled={Object.values(errors).some(e => e)}>
            Add Post
          </button>
          {addState?.error && <div className={styles.error}>{addState.error}</div>}
        </form>
      ) : (
        <form action={formActionForEdit} className={styles["container"]}>
          <h1>Edit Post</h1>
          <input type="hidden" name="postId" value={post?._id} />

          {/* Repeat similar structure for edit form */}
          <div className={styles["form-group"]}>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder={post?.title}
              required
              minLength={5}
              onChange={handleInputChange}
              onBlur={handleInputChange}
            />
            {errors.title && <span className={styles.error}>{errors.title}</span>}
          </div>

          <div className={styles["form-group"]}>
            <label htmlFor="img">Image URL</label>
            <input
              type="url"
              id="img"
              name="img"
              placeholder={post?.img}
              required
              onChange={handleInputChange}
              onBlur={handleInputChange}
            />
            {errors.img && <span className={styles.error}>{errors.img}</span>}
          </div>

          <div className={styles["form-group"]}>
            <label htmlFor="desc">Description</label>
            <textarea
              id="desc"
              name="desc"
              placeholder={post?.desc}
              required
              minLength={5}
              rows={10}
              onChange={handleInputChange}
              onBlur={handleInputChange}
            />
            {errors.desc && <span className={styles.error}>{errors.desc}</span>}
          </div>

          <button type="submit" disabled={Object.values(errors).some(e => e)}>
            Update Post
          </button>
          {editState?.error && <div className={styles.error}>{editState.error}</div>}
        </form>
      )}
    </div>
  );
};

export default AdminPostForm;