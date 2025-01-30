"use client";

import { addPost, editPost } from "@/lib/action";
import styles from "./adminPostForm.module.css";
import { useFormState } from "react-dom";
import { useRef } from "react";
import { usePathname } from "next/navigation";
// import Image from "next/image";


interface IAdminPostForm {
  userId?: number
  post: any
}

const AdminPostForm = ({ userId, post }: IAdminPostForm) => {
  const [addState, formActionForAdd] = useFormState(addPost, undefined);
  const [editState, formActionForEdit] = useFormState(editPost, undefined);
  const pathname = usePathname()
  const isEditPost = pathname.includes("edit")
  console.log(editState)
  const titleValueRef = useRef();
  // useEffect(() => {
  //     console.log(titleValueRef?.current?.value)
  // },[titleValueRef?.current?.value])

  return (
    <div>
      {!isEditPost ?
        <form action={formActionForAdd} className={styles["container"]}>
          <h1>{isEditPost ? "Edit" : "Add"}</h1>
          <input type="hidden" placeholder="title" name="userId" value={userId} />
          <input type="hidden" placeholder="title" name="postId" value={post?._id} />
          <input ref={titleValueRef} type="text" placeholder="title" name="title" />
          {/* <input type="text" placeholder="slug" name="slug"  /> */}
          <input type="text" placeholder="img" name="img" value={post?.img} />
          <textarea placeholder="desc" name="desc" rows={10} />
          <button type="submit">{isEditPost ? "Edit" : "Add"}</button>
          {addState && addState.error}
        </form>

        : <form action={formActionForEdit} className={styles["container"]}>
          <h1>{"Edit"}</h1>
          {/* <input type="hidden" placeholder="title" name="userId" value={userId} /> */}
          <input type="hidden" placeholder="title" name="postId" value={post?._id} />
          {/* <Image src={post.img || "/noAvatar.png"} alt={post.title} width={200} height={200} /> */}
          <input type="text" placeholder={post?.title} name="title" />
          {/* <input type="text" placeholder="slug" name="slug"  /> */}
          <input type="text" placeholder={post?.img} name="img" />
          <textarea placeholder={post?.desc} name="desc" rows={10} />
          <button type="submit">{isEditPost ? "Edit" : "Add"}</button>
          {editState && editState.error}
        </form>
      }
    </div>
  );
};

export default AdminPostForm;
