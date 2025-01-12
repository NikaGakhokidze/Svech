"use client";

import { addPost } from "@/lib/action";
import styles from "./adminPostForm.module.css";
import { useFormState } from "react-dom";
import { useRef } from "react";

const AdminPostForm = ({ userId }) => {
  const [state, formAction] = useFormState(addPost, undefined);
  const titleValueRef = useRef();

  // useEffect(() => {
  //     console.log(titleValueRef?.current?.value)
  // },[titleValueRef?.current?.value])

  return (
    <form action={formAction} className={styles["container"]}>
      <h1>Add New Post</h1>
      <input type="hidden" placeholder="title" name="userId" value={userId} />
      <input ref={titleValueRef} type="text" placeholder="title" name="title" />
      {/* <input type="text" placeholder="slug" name="slug"  /> */}
      <input type="text" placeholder="img" name="img"  />
      <textarea type="text" placeholder="desc" name="desc" rows={10} />
      <button type="submit">Add</button>
      {state && state.error}
    </form>
  );
};

export default AdminPostForm;
