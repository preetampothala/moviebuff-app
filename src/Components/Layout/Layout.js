import { Fragment } from "react";
import TopNav from "./TopNav";
import styles from "./Layout.module.css";
import { Outlet, useNavigation, useRouteLoaderData } from "react-router-dom";
import Loader from "../UI/Loader";

const Layout = (props) => {
  const token = useRouteLoaderData("root");
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
// const token = useRouteLoaderData("root");
// console.log(token);
// if (token) {
//   console.log("token exists");
//   return (
//     <Fragment>
//       <TopNav />
//       <main className={styles.main}>
//         <Outlet />
//       </main>
//     </Fragment>
//   );
// } else if (!token) {
//   console.log("token does not exist");
//   return (
//     <Fragment>
//       <TopNav />
//       <main className={styles.main}>
//         <Auth />
//       </main>
//     </Fragment>
//   );
// }
