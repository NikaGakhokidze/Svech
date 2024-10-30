import Link from "next/link";
import Links from "./links/Links";
import styles from "./navbar.module.css";
import { auth } from "@/lib/auth";
import Image from "next/image";

const Navbar = async () => {
  const session = await auth();
  // console.log(session);
  return (
    <div className={styles["container"]}>
      <Link href="/" className={styles["logo"]}>
        LOGO
      </Link>
      <div>
        <Links session={session} />
      </div>
      {session ? (
        <div>
          <h3>{session.user?.name}</h3>
          <Image src={session.user?.image} alt="User Image" width={50} height={50} />
        </div>
      ) : (
        <div style={{ display: "none" }}></div>
      )}
    </div>
  );
};

export default Navbar;
