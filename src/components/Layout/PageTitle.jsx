import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import { SocketActions } from "@redux/socket/socket.slice";

const SOCKET_SERVER_URL = import.meta.env.VITE_APP_API_BASE_URL;

const PageTitle = ({ title, children }) => {
  const dispatch = useDispatch();
  const { isAuthenticated, isAuthenticatedAdmin, userInfo, adminInfo } =
    useSelector((state) => state.auth);

  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => {
    if (isAuthenticated && userInfo._id) {
      const socketConnect = io(SOCKET_SERVER_URL, {
        query: {
          userId: userInfo._id,
          userType: "customer",
        },
      });

      dispatch(SocketActions.setSocketCustomer(socketConnect));

      return () => {
        socketConnect.disconnect();
        dispatch(SocketActions.setSocketCustomer(null));
      };
    }
  }, [isAuthenticated, userInfo]);

  useEffect(() => {
    if (isAuthenticatedAdmin && adminInfo._id) {
      const socketConnect = io(SOCKET_SERVER_URL, {
        query: {
          userId: adminInfo._id,
          userType: "admin",
        },
      });

      dispatch(SocketActions.setSocketAdmin(socketConnect));

      return () => {
        socketConnect.disconnect();
        dispatch(SocketActions.setSocketAdmin(null));
      };
    }
  }, [isAuthenticatedAdmin, adminInfo]);

  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      {children}
    </>
  );
};

export default PageTitle;
