import React, { useEffect, useState } from "react";
import { Layout } from "antd";
import { motion } from "framer-motion";
import useScreen from "@/hook/useScreen";
import HeaderAdmin from "@components/Header/HeaderAdmin";
import SiderAdmin from "@/components/Layout/SiderAdmin";
import { useDispatch, useSelector } from "react-redux";
import ChatBox from "../Chat/ChatBox";
import { ChatActions } from "@/redux/chat/chat.slice";

const { Content, Footer } = Layout;

const LayoutAdmin = ({ children, title, className = "bg-white" }) => {
  const dispatch = useDispatch();
  const [collapsed, setCollapsed] = useState(false);
  const { isMobile } = useScreen();
  const {
    openChat,
    customerConversationSelected: conversation,
    supportMessages,
  } = useSelector((state) => state.chat);
  const { socketAdmin: socket } = useSelector((state) => state.socket);
  const { isAuthenticatedAdmin, adminInfo } = useSelector(
    (state) => state.auth
  );
  const { isChatCustomer } = openChat;

  useEffect(() => {
    if (isMobile) {
      setCollapsed(true);
    } else {
      setCollapsed(false);
    }
  }, [isMobile]);

  useEffect(() => {
    if (isAuthenticatedAdmin && socket) {
      if (isChatCustomer && conversation) {
        socket.emit("getMessages", conversation.conversationId);
        socket.on("resGetMessages", (messages) => {
          dispatch(ChatActions.setSupportMessages(messages));
        });
      }

      return () => {
        socket.off("resGetMessages", (messages) => {
          dispatch(ChatActions.setSupportMessages(messages));
        });
      };
    }
  }, [isAuthenticatedAdmin, socket, conversation]);

  const onCloseChat = () => {
    dispatch(ChatActions.setOpenChat({ key: "isChatCustomer", value: false }));
    dispatch(ChatActions.setCustomerConversationSelected(null));
    dispatch(ChatActions.setSupportMessages([]));
  };

  const handleSendMessage = (message) => {
    if (!isAuthenticatedAdmin) return;

    if (socket && message) {
      socket.emit("createMessage", JSON.stringify(message));
    }
  };

  return (
    <Layout className="min-h-screen">
      <SiderAdmin {...{ collapsed, setCollapsed }} />
      <Layout className="site-layout">
        <HeaderAdmin {...{ collapsed, setCollapsed }} />
        <Content
          className={`m-2 p-2 md:m-4 md:p-4 rounded-lg shadow-md ${className}`}
        >
          <motion.div
            className="w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="font-bold text-xl">{title}</div>
            {children}
          </motion.div>
          {isChatCustomer && conversation && (
            <ChatBox
              socket={socket}
              isOpen={isChatCustomer}
              typeMessage="User_Admin"
              conversation={conversation}
              onClose={onCloseChat}
              messages={supportMessages}
              sender={{
                _id: adminInfo._id,
                role: "Admin",
              }}
              receiver={{
                _id: conversation._id,
                role: "User",
              }}
              onSubmit={handleSendMessage}
            />
          )}
        </Content>
        <Footer className="text-center bg-gray-100">
          <strong>Admin</strong> ©{new Date().getFullYear()} Created with
          SkinLeLe ❤️
        </Footer>
      </Layout>
    </Layout>
  );
};

export default LayoutAdmin;
