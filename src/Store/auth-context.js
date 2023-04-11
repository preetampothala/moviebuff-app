import React from "react";
import { useState } from "react";
const AuthContext = React.createContext({
  emailid: "",
  token: "",
  isLoggedIn: false,
  login: (token, email, localId) => {},
  logout: () => {},
  signup: (token, email, localId) => {},
  userid: "",
});
export default AuthContext;

export const AuthContextProvider = (props) => {
  const [token, setToken] = useState(null);
  const [userid, setUserid] = useState(null);
  const [emailid, setEmailid] = useState(null);
  const userIsLoggedIn = !!token;
  const loginHandler = (token, email, localId) => {
    setToken(token);
    setUserid(localId);
    setEmailid(email);
  };
  const logoutHandler = () => {
    setToken(null);
    setUserid(null);
    setEmailid(null);
  };

  const contextValue = {
    userid: userid,
    emailid: emailid,
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
