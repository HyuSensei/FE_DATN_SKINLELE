import React, { useEffect } from "react";
import HeaderBooking from "@components/Header/HeaderBooking";
import FooterBooking from "@components/Footer/FooterBooking";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setOpenModelAuth } from "@/redux/auth/auth.slice";
import ModalAuth from "../Modal/ModalAuth";

const LayoutBooking = ({ children }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { openModelAuth } = useSelector((state) => state.auth);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [location.pathname]);

  return (
    <div className="site-layout flex flex-col overflow-x-hidden min-h-screen">
      <ModalAuth
        {...{
          open: openModelAuth,
          onClose: () => dispatch(setOpenModelAuth(false)),
        }}
      />
      <HeaderBooking />
      <div className="min-h-screen">{children}</div>
      <FooterBooking />
    </div>
  );
};

export default LayoutBooking;
