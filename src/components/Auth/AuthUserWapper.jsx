import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAccountUser } from "@redux/auth/auth.thunk";
import { get, set } from "@storage/storage";
import Loading from "@components/Loading/Loading";
import { useLocation } from "react-router-dom";

const AuthUserWrapper = ({ children }) => {
  const dispatch = useDispatch();
  const { isLoading, isAuthenticated } = useSelector((state) => state.auth);
  const [isInitialized, setIsInitialized] = useState(false);
  const urlParams = new URLSearchParams(window.location.search);
  const { pathname } = useLocation();
  const token = urlParams.get("token");

  const initAuth = async () => {
    try {
      if (token) {
        set("ACCESS_TOKEN", token);
        await dispatch(getAccountUser()).unwrap();
        window.history.replaceState({}, "", location.pathname);
        return;
      }

      const accessToken = get("ACCESS_TOKEN");
      if (accessToken && !isAuthenticated) {
        await dispatch(getAccountUser()).unwrap();
      }
    } finally {
      setIsInitialized(true);
    }
    // const accessToken = get("ACCESS_TOKEN");
    // if (token) {
    //   set("ACCESS_TOKEN", token);
    //   window.location.href = "/";
    //   dispatch(getAccountUser());
    // }
    // if (accessToken && !isAuthenticated) {
    //   dispatch(getAccountUser());
    // }
    // setIsInitialized(true);
  };

  useEffect(() => {
    initAuth();
  }, [dispatch, token, isAuthenticated]);

  if ((!isInitialized || isLoading) && pathname !== "/auth") {
    return <Loading />;
  }

  return children;
};

export default AuthUserWrapper;
