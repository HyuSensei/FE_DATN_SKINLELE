import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import HeaderUser from "@components/Header/HeaderUser";
import FooterUser from "@components/Footer/FooterUser";
import PopupClinic from "./PopupClinic";
import PopupPromotional from "./PopupConfetti";
import ConversationSupport from "../Chat/Conversation/ConversationSupport";
import CherryBlossomEffect from "./CherryBlossomEffect";
import ModalAuth from "../Modal/ModalAuth";
import { useDispatch, useSelector } from "react-redux";
import { setOpenModelAuth } from "@/redux/auth/auth.slice";

const LayoutUser = ({ children }) => {
  const dispatch = useDispatch();
  const { openModelAuth } = useSelector((state) => state.auth);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <ModalAuth
        {...{
          open: openModelAuth,
          onClose: () => dispatch(setOpenModelAuth(false)),
        }}
      />
      <HeaderUser />
      <main className="flex-grow px-4 lg:px-16 py-2">{children}</main>
      <PopupClinic />
      {/* <PopupPromotional /> */}
      <ConversationSupport />
      {/* <CherryBlossomEffect /> */}
      <FooterUser />
    </div>
  );
};

export default LayoutUser;
