"use client";

import { login } from "@/lib/action";
import styles from "./loginForm.module.css";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import Link from "next/link";

const LoginForm = () => {
  const [state, formAction] = useFormState(login, undefined);

  const router = useRouter();

  //   useEffect(() => {
  //     state?.success && router.push("/login");
  //   }, [state?.success, router]);

  return (
    <form className={styles["form"]} action={formAction}>
      <input type="text" placeholder="username" name="username" />
      <input type="password" placeholder="password" name="password" />
      <button>Login</button>
      {state?.error}
      {" Don't have an account?"}
      <Link href="/register">
        <b>Register</b>
      </Link>
    </form>
  );
};

export default LoginForm;
