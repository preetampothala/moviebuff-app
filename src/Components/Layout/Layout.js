import { Fragment } from "react";
import TopNav from "./TopNav";
import styles from "./Layout.module.css";
import { Outlet, useNavigation } from "react-router-dom";
import Loader from "../UI/Loader";

const Layout = (props) => {
  const navigation = useNavigation();
  return (
    <Fragment>
      <TopNav />
      <main className={styles.main}>
        {navigation.isLoading && <Loader />}
        <Outlet />
      </main>
    </Fragment>
  );
};

export default Layout;
