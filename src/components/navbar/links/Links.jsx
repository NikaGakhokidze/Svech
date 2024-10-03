"use client";

import Image from "next/image";
import styles from "./links.module.css";
import NavLink from "./navLink/navLink";
import { useState } from "react";
import { handleLogout } from "@/lib/action";

const LINKS = [
  {
    title: "Homepage",
    path: "/",
  },
  {
    title: "About",
    path: "/about",
  },
  {
    title: "Contact",
    path: "/contact",
  },
  {
    title: "Blog",
    path: "/blog",
  },
];

const Links = ({ session }) => {
  const [open, setOpen] = useState(false);
  const isAdmin = session?.user.isAdmin;

  return (
    <div className={styles["container"]}>
      <div className={styles["links"]}>
        {LINKS.map((link) => (
          <NavLink item={link} key={link.title} />
        ))}

        {session?.user ? (
          <>
            {isAdmin && <NavLink item={{ title: "Admin", path: "/admin" }} />}
            <form action={handleLogout}>
              <button className={styles["logout"]}>Logout</button>
            </form>
          </>
        ) : (
          <NavLink item={{ title: "Login", path: "/login" }} />
        )}
      </div>
      <Image
        src="/menu.png"
        alt=""
        width={30}
        height={30}
        onClick={() => setOpen((prevValue) => !prevValue)}
        className={styles["menuButton"]}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
      {open && (
        <div className={styles["mobileLinks"]}>
          {LINKS.map((link) => (
            <NavLink item={link} key={link.title} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Links;
