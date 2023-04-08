import { Fragment } from "react";
import TopNav from "./TopNav";
import styles from "./Layout.module.css";
import { Outlet } from "react-router-dom";
const Layout = (props) => {
  return (
    <Fragment>
      <TopNav />
      <main className={styles.main}>
        <Outlet />
      </main>
    </Fragment>
  );
};

export default Layout;
