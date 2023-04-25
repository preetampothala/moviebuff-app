import AuthForm from "../Components/AuthForm/AuthForm";
import styles from "./Auth.module.css";
const Auth = () => {
  return (
    <>
      <div className={styles.authpage}>
        <AuthForm />
      </div>
    </>
  );
};
export default Auth;
