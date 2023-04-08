import React from "react";
import { useState } from "react";
const AuthContext = React.createContext({
  emailid: "",
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
  userid: "",
});
export default AuthContext;

export const AuthContextProvider = (props) => {
  const [token, setToken] = useState(null);
  const [userid, setUserid] = useState(null);
  const userIsLoggedIn = !!token;
  const loginHandler = (token, email) => {
    let userid = email.split("@")[0];
    setToken(token);
    setUserid(userid);
  };
  const logoutHandler = () => {
    setToken(null);
  };
  const contextValue = {
    userid: userid,
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};
