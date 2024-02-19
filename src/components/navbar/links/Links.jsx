"use client";

import styles from "./links.module.css";
import NavLink from "./navLink/navLink";
import { useState } from "react";

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

const Links = () => {
  const [open, setOpen] = useState(false);

  const session = true;
  const isAdmin = true;

  return (
    <div className={styles["container"]}>
      <div className={styles["links"]}>
        {LINKS.map((link) => (
          <NavLink item={link} key={link.title} />
        ))}

        {session ? (
          <>
            {isAdmin && <NavLink item={{ title: "Admin", path: "/admin" }} />}

            <button className={styles["logout"]}>Logout</button>
          </>
        ) : (
          <NavLink item={{ title: "Login", path: "/login" }} />
        )}
      </div>
      <button className={styles["menuButton"]} onClick={() => setOpen((prevValue) => !prevValue)}>
        Menu
      </button>
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
