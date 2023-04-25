import React from "react";
import { Outlet } from "react-router-dom";
import AuthContext from "../../Store/auth-context";
const AuthLayout = () => {
  const authCtx = React.useContext(AuthContext);
  if (authCtx.isLoggedIn) {
    return <Outlet />;
  }
};
export default AuthLayout;
