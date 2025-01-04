import React, { useEffect } from "react";
import HeaderBooking from "@components/Header/HeaderBooking";
import FooterBooking from "@components/Footer/FooterBooking";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setOpenModelAuth } from "@/redux/auth/auth.slice";
import ModalAuth from "../Modal/ModalAuth";
import ChatBox from "../Chat/ChatBox";
import { ChatActions } from "@/redux/chat/chat.slice";

const LayoutBooking = ({ children }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { openModelAuth, userInfo, isAuthenticated } = useSelector(
    (state) => state.auth
  );
  const {
    openChat,
    doctorConversationSelected: conversation,
    doctorMessages,
  } = useSelector((state) => state.chat);
  const { socketCustomer: socket } = useSelector((state) => state.socket);
  const { isChatDoctor } = openChat;

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [location.pathname]);

  const onCloseChat = () => {
    dispatch(ChatActions.setOpenChat({ key: "isChatDoctor", value: false }));
    dispatch(ChatActions.setDoctorConversationSelected(null));
    dispatch(ChatActions.setDoctorMessages([]));
  };

  const handleGetMessages = (messages) => {
    if (!messages.length) {
      dispatch(ChatActions.setDoctorMessages(messages));
      return;
    }
    if (
      conversation &&
      ((messages[0].sender._id === conversation._id &&
        messages[0].receiver._id === userInfo?._id) ||
        (messages[0].sender._id === userInfo?._id &&
          messages[0].receiver._id === conversation._id))
    ) {
      dispatch(ChatActions.setDoctorMessages(messages));
    }
  };

  useEffect(() => {
    if (isAuthenticated && socket) {
      socket.emit("getMessages", conversation?.conversationId);
      socket.on("resGetMessages", handleGetMessages);

      return () => {
        socket.off("resGetMessages", handleGetMessages);
      };
    }
  }, [isAuthenticated, socket, conversation]);

  const handleSendMessage = (message) => {
    if (!isAuthenticated) return;

    if (socket && message) {
      socket.emit("createMessage", JSON.stringify(message));
    }
  };

  return (
    <div className="site-layout flex flex-col min-h-screen">
      <ModalAuth
        {...{
          open: openModelAuth,
          onClose: () => dispatch(setOpenModelAuth(false)),
        }}
      />
      <HeaderBooking />
      <div className="min-h-screen">
        {children}
        {isChatDoctor && conversation && (
          <ChatBox
            socket={socket}
            isOpen={isChatDoctor}
            typeMessage="User_Doctor"
            conversation={conversation}
            messages={doctorMessages}
            isClinic={true}
            onClose={onCloseChat}
            sender={{
              _id: userInfo?._id,
              role: "User",
            }}
            receiver={{
              _id: conversation?._id,
              role: "Doctor",
            }}
            onSubmit={handleSendMessage}
          />
        )}
      </div>
      <FooterBooking />
    </div>
  );
};

export default LayoutBooking;
