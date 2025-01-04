import React, { useEffect } from "react";
import ConversationCustomerByDoctor from "@components/Chat/Conversation/ConversationCustomerByDoctor";
import ChatWindow from "@components/Chat/ChatWindow";
import { useDispatch, useSelector } from "react-redux";
import { Empty } from "antd";
import { ChatActions } from "@/redux/chat/chat.slice";

const ManageChat = () => {
  const dispatch = useDispatch();
  const { socketDoctor: socket } = useSelector((state) => state.socket);
  const { doctorMessages, customerConversationSelected: conversation } =
    useSelector((state) => state.chat);
  const { isAuthenticatedDoctor: isAuth, doctorInfo } = useSelector(
    (state) => state.auth
  );

  const handleGetMessages = (messages) => {
    if (
      messages.length > 0 &&
      conversation &&
      ((messages[0].sender._id === conversation._id &&
        messages[0].receiver._id === doctorInfo._id) ||
        (messages[0].sender._id === doctorInfo._id &&
          messages[0].receiver._id === conversation._id))
    ) {
      dispatch(ChatActions.setDoctorMessages(messages));
    } else {
      socket.emit("getAllCustomer", doctorInfo?._id);
    }
  };

  useEffect(() => {
    if (isAuth && socket) {
      socket.emit("getMessages", conversation?.conversationId);
      socket.on("resGetMessages", handleGetMessages);

      return () => {
        socket.off("resGetMessages", handleGetMessages);
      };
    }
  }, [isAuth, socket, conversation]);

  const handleSendMessage = (message) => {
    if (!isAuth) return;

    if (socket && message) {
      socket.emit("createMessage", JSON.stringify(message));
    }
  };

  return (
    <div className="h-[calc(100vh-100px)] flex flex-col bg-white rounded-xl shadow-lg">
      <div className="flex-1 flex overflow-hidden ">
        <div className="w-1/3 border-r-2 border-gray-200">
          <ConversationCustomerByDoctor />
        </div>
        <div className="w-2/3 overflow-hidden rounded-r-xl">
          {!conversation ? (
            <div className="h-full flex items-center justify-center">
              <Empty description="Chọn một cuộc trò chuyện để bắt đầu" />
            </div>
          ) : (
            <ChatWindow
              socket={socket}
              typeMessage={"User_Doctor"}
              conversation={conversation}
              messages={doctorMessages}
              onSubmit={handleSendMessage}
              sender={{
                _id: doctorInfo?._id,
                role: "Doctor",
              }}
              receiver={{
                _id: conversation?._id,
                role: "User",
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageChat;
