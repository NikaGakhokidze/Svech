import { getUsers } from "@/lib/data";
import styles from "./adminUsers.module.css";
import Image from "next/image";
import { deleteUser } from "@/lib/action";

const AdminUsers = async () => {
  const users = await getUsers();

  // console.log(users);

  return (
    <div className={styles["container"]}>
      <h1>Users</h1>
      {users.map((user) => (
        <div className={styles["user"]} key={user.id}>
          <div className={styles["detail"]}>
            <Image
              src={user.img || "/noAvatar.png"}
              alt={user.title ?? ""}
              width={50}
              height={50}
            />
            <span className={styles["username"]}>{user?.username || "username"}</span>
          </div>

          <form action={deleteUser}>
            <input type="hidden" placeholder="id" name="id" value={user.id} />
            {/*type is hidden because this input is only for getting user.id purpose */}
            <button className={styles["userButton"]} type="submit">
              Delete
            </button>
          </form>
        </div>
      ))}
    </div>
  );
};

export default AdminUsers;
