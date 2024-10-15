import LoginForm from "@/components/loginForm/loginForm";
import { handleGithubLogin } from "@/lib/action";
import styles from "./login.module.css";

const LoginPage = () => {
  return (
    <div className={styles["container"]}>
      <div className={styles["wrapper"]}>
        <form action={handleGithubLogin}>
          <button className={styles["github"]} type="submit">
            Login with GitHub
          </button>
        </form>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
