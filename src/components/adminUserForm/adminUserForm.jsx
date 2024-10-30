"use client";

import { addUser } from "@/lib/action";
import styles from "./adminUserForm.module.css";
import { useFormState } from "react-dom";

const AdminUserForm = () => {
  const [state, formAction] = useFormState(addUser, undefined);

  return (
    <form action={formAction} className={styles["container"]}>
      <h1>Add New User</h1>
      <input type="text" placeholder="username" name="username" />
      <input type="email" placeholder="email" name="email" />
      <input type="password" placeholder="password" name="password" />
      <input type="text" placeholder="img" name="img" />
      <select name="isAdmin">
        <option value="true">User</option>
        <option value="false">Admin</option>
      </select>
      <button type="submit">Add</button>
      {state && state.error}
    </form>
  );
};

export default AdminUserForm;
