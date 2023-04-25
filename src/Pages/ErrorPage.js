import React from "react";
import TopNav from "../Components/Layout/TopNav";
import styles from "./ErrorPage.module.css";
const ErrorPage = () => {
  return (
    <>
      <TopNav />
      <main className={styles.main}>
        <h1>An error occurred</h1>
        <p>Could not find this page!</p>
      </main>
    </>
  );
};
export default ErrorPage;
