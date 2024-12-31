import React, { useEffect, useState } from "react";
import { Badge, Button } from "antd";
import { BsFillChatFill } from "react-icons/bs";
import ChatBox from "../ChatBox";
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { ChatActions } from "@/redux/chat/chat.slice";
import { Link } from "react-router-dom";
import { LoadingConversation } from "../Loading";
import SupportItem from "../Item/SupportItem";

const ConversationSupport = () => {
  const dispatch = useDispatch();
  const {
    openChat,
    supportList,
    supportMessages,
    supportConversationSelected: conversation,
  } = useSelector((state) => state.chat);
  const { isChatSupport, isConversationSupport } = openChat;
  const [isShaking, setIsShaking] = useState(false);
  const { socketCustomer: socket } = useSelector((state) => state.socket);
  const { isAuthenticated, userInfo } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(true);

  const isUserAuthenticated = isAuthenticated && userInfo._id;
  const supportConversations = supportList?.filter((item) => item.conversation);

  const unReadCount = isUserAuthenticated
    ? supportConversations?.filter(
        (item) =>
          item?.conversation?.lastMessage?.receiver === userInfo?._id &&
          !item?.conversation?.lastMessage?.isRead
      ).length || 0
    : 0;

  const handleGetAllSupport = (conversations) => {
    dispatch(ChatActions.setSupportList(conversations));
  };

  const handleGetMessages = (messages) => {
    if (!conversation) {
      socket.emit("getAllSupport", userInfo?._id);
    }

    if (
      messages.length > 0 &&
      conversation &&
      ((messages[0].sender._id === conversation._id &&
        messages[0].receiver._id === userInfo._id) ||
        (messages[0].sender._id === userInfo._id &&
          messages[0].receiver._id === conversation._id))
    ) {
      dispatch(ChatActions.setSupportMessages(messages));
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, [isConversationSupport]);

  useEffect(() => {
    const shakeInterval = setInterval(() => {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 1000);
    }, 5000);

    return () => clearInterval(shakeInterval);
  }, []);

  useEffect(() => {
    if (isAuthenticated && socket) {
      socket.emit("getAllSupport", userInfo._id);
      socket.on("resGetAllSupport", handleGetAllSupport);

      socket.emit("getMessages", conversation?.conversationId);
      socket.on("resGetMessages", handleGetMessages);

      return () => {
        socket.off("resGetAllSupport", handleGetAllSupport);
        socket.off("resGetMessages", handleGetMessages);
      };
    }
  }, [isAuthenticated, socket, conversation, supportMessages]);

  const handleClickChatIcon = () => {
    if (isChatSupport) {
      dispatch(ChatActions.setOpenChat({ key: "isChatSupport", value: false }));
      dispatch(ChatActions.setSupportConversationSelected(null));
    } else {
      dispatch(
        ChatActions.setOpenChat({ key: "isConversationSupport", value: true })
      );
    }
  };

  const onCloseChat = () => {
    dispatch(ChatActions.setOpenChat({ key: "isChatSupport", value: false }));
    dispatch(ChatActions.setSupportConversationSelected(null));
    dispatch(
      ChatActions.setOpenChat({
        key: "isConversationSupport",
        value: true,
      })
    );
    dispatch(ChatActions.setSupportMessages([]));
  };

  const handleSendMessage = (message) => {
    if (!isAuthenticated) return;

    if (socket && message) {
      socket.emit("createMessage", JSON.stringify(message));
    }
  };

  return (
    <div
      className={`fixed ${
        isConversationSupport || isChatSupport ? " bottom-8" : " bottom-20"
      } right-8 z-50`}
    >
      {/* Chat Icon */}
      {!isConversationSupport && !isChatSupport && (
        <div
          className="relative animate-bounce cursor-pointer"
          onClick={handleClickChatIcon}
        >
          <Button
            type="primary"
            shape="circle"
            size="large"
            className={`w-16 h-16 flex items-center justify-center bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 border-none shadow-lg transition-all duration-300 hover:scale-110
                ${isShaking ? "animate-shake" : ""}`}
          >
            <Badge count={unReadCount} color="#e55c76">
              <BsFillChatFill className="text-4xl text-white" />
            </Badge>
          </Button>
          <div className="absolute inset-0 rounded-full bg-blue-500 animate-ping opacity-25"></div>
        </div>
      )}

      {/* Support List */}
      {isConversationSupport && (
        <div className="w-[350px] bg-white rounded-xl shadow-2xl overflow-hidden animate-slideIn">
          <div className="p-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white flex justify-between">
            <div className="flex flex-col gap-1">
              <h3 className="font-bold text-sm flex items-center gap-2">
                <BsFillChatFill /> Nhân viên hỗ trợ SkinLeLe 🎧
              </h3>
              {isAuthenticated && (
                <p className="text-xs text-blue-100">
                  Chọn một nhân viên để bắt đầu nhận hỗ trợ
                </p>
              )}
              {!isAuthenticated && (
                <p className="text-sm text-blue-100">
                  Vui lòng{" "}
                  <Link to="/auth" className="font-semibold hover:underline">
                    Đăng nhập
                  </Link>{" "}
                  để bắt đầu nhận hỗ trợ
                </p>
              )}
            </div>
            <Button
              onClick={() =>
                dispatch(
                  ChatActions.setOpenChat({
                    key: "isConversationSupport",
                    value: false,
                  })
                )
              }
              type="text"
              className="text-white hover:text-gray-200 hover:rotate-90 transition-all duration-300"
              icon={<IoClose className="text-2xl hover:text-gray-200" />}
            />
          </div>

          <div className="divide-y divide-gray-100 max-h-[400px] overflow-y-auto hide-scrollbar-custom">
            {isLoading ? (
              <LoadingConversation />
            ) : (
              supportList.length > 0 &&
              supportList.map(({ admin, conversation }) => (
                <SupportItem
                  key={admin._id}
                  admin={admin}
                  conversation={conversation}
                />
              ))
            )}
          </div>
        </div>
      )}

      {/* Chat Box */}
      {isChatSupport && (
        <ChatBox
          conversation={conversation}
          onClose={onCloseChat}
          messages={supportMessages}
          onSubmit={handleSendMessage}
          typeMessage="User_Admin"
          sender={{
            _id: userInfo._id,
            role: "User",
          }}
          receiver={{
            _id: conversation._id,
            role: "Admin",
          }}
          isAuth={isAuthenticated}
        />
      )}
    </div>
  );
};

export default ConversationSupport;
