import React, { useState, useEffect, useCallback } from "react";

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token, expiryTime) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem("token");
  const initialExpiryTime = localStorage.getItem("tokenExpiryTime");

  const [token, setToken] = useState(initialToken);
  const [tokenExpiryTime, setTokenExpiryTime] = useState(initialExpiryTime);

  const isUserLoggedIn = !!token && new Date().getTime() < +initialExpiryTime;

  const logoutHandler = useCallback(() => {
    setToken(null);
    setTokenExpiryTime(null);
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpiryTime");
  }, []);

  const loginHandler = (token, expiryTime) => {
    setToken(token);
    setTokenExpiryTime(expiryTime);
    localStorage.setItem("token", token);
    localStorage.setItem("tokenExpiryTime", expiryTime);
  };

  useEffect(() => {
    if (token && tokenExpiryTime) {
      const remainingTime = +tokenExpiryTime - new Date().getTime();
      if (remainingTime <= 0) {
        logoutHandler();
      }
      const timer = setTimeout(logoutHandler, remainingTime);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [token, tokenExpiryTime, logoutHandler]);

  const contextValue = {
    token: token,
    isLoggedIn: isUserLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;