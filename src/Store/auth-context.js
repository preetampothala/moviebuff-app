import React from "react";
import { useState, useEffect } from "react";
import {
  removeToken,
  removeUserId,
  writeUserId,
  writeToken,
  fetchUser,
} from "../Services/Auth.service";
import { getAuthToken, getUserId } from "../Utils/auth";

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
  const [username, setUsername] = useState(null);
  const userIsLoggedIn = !!token;

  useEffect(() => {
    const storedToken = getAuthToken();
    const storedUserId = getUserId();
    storedToken.then((token) => {
      if (token) {
        setToken(token);
      }
    });

    storedUserId.then((userId) => {
      if (userId) {
        setUserid(userId);
      }
    });
    fetchUser(userid).then((snapshot) => {
      let data = snapshot.val();
      if (data) {
        setUsername(data.username);
        setEmailid(data.email);
      }
    });
  }, [userid]);

  const loginHandler = (token, email, localId, username) => {
    setToken(token);
    setUserid(localId);
    setEmailid(email);
    setUsername(username);
    writeToken(token);
    writeUserId(localId);
  };
  const logoutHandler = () => {
    setToken(null);
    setUserid(null);
    setEmailid(null);
    setUsername(null);
    removeToken(token);
    removeUserId(userid);
  };

  const contextValue = {
    userid: userid,
    emailid: emailid,
    token: token,
    username: username,
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
export const consumeAuth = () => {
  return AuthContext;
};
