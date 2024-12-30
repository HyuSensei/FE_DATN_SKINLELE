import React, { useEffect, useState } from "react";
import { Badge, Button } from "antd";
import { BsFillChatFill } from "react-icons/bs";
import ChatBox from "./ChatBox";
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { ChatActions } from "@/redux/chat/chat.slice";
import { Link } from "react-router-dom";
import Support from "./Support";

const ConversationSupport = () => {
  const dispatch = useDispatch();
  const {
    openChat,
    supportList,
    supportMessages,
    supportConversationSelected,
  } = useSelector((state) => state.chat);
  const { isChatSupport, isConversationSupport } = openChat;
  const [isShaking, setIsShaking] = useState(false);
  const { socketCustomer: socket } = useSelector((state) => state.socket);
  const { isAuthenticated, userInfo } = useSelector((state) => state.auth);

  const isUserAuthenticated = isAuthenticated && userInfo._id;
  const supportConversations = supportList?.filter(item => item.conversation);

  const unReadCount = isUserAuthenticated
    ? supportConversations?.filter(item => {
      const lastMessage = item.conversation?.lastMessage;
      return lastMessage?.receiver._id === userInfo._id && !lastMessage?.isRead;
    }).length || 0
    : 0;

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
      socket.on("resGetAllSupport", (conversations) => {
        dispatch(ChatActions.setSupportList(conversations));
      });

      if (isChatSupport && supportConversationSelected && supportConversationSelected.conversationId) {
        socket.emit("getMessages", supportConversationSelected.conversationId);
        socket.on("resGetMessages", (messages) => {
          dispatch(ChatActions.setSupportMessages(messages));
        });
      }

      return () => {
        socket.off("resGetAllSupport", (conversations) => {
          dispatch(ChatActions.setSupportList(conversations));
        });
        socket.off("resGetMessages", (messages) => {
          dispatch(ChatActions.setSupportMessages(messages));
        });
      };
    }
  }, [
    isAuthenticated,
    socket,
    supportConversationSelected,
    userInfo
  ]);

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
      className={`fixed ${isConversationSupport || isChatSupport ? " bottom-8" : " bottom-20"
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
            {supportList.length > 0 &&
              supportList.map(({ admin, conversation }) => (
                <Support
                  key={admin._id}
                  admin={admin}
                  conversation={conversation}
                />
              ))}
          </div>
        </div>
      )}

      {/* Chat Box */}
      {isChatSupport && (
        <ChatBox
          conversation={supportConversationSelected}
          onClose={onCloseChat}
          messages={supportMessages}
          onSubmit={handleSendMessage}
        />
      )}
    </div>
  );
};

export default ConversationSupport;
