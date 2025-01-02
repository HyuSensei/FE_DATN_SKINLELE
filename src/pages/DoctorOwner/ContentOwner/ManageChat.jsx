import React, { useEffect } from "react";
import ConversationCustomerByDoctor from "../../../components/Chat/Conversation/ConversationCustomerByDoctor";
import ChatWindow from "../../../components/Chat/ChatWindow";
import { useDispatch, useSelector } from "react-redux";
import { Empty } from "antd";
import { ChatActions } from "@/redux/chat/chat.slice";

const ManageChat = () => {
  const dispatch = useDispatch();
  const { socketDoctor: socket } = useSelector((state) => state.socket);
  const { doctorMessages, customerConversationSelected: conversation } = useSelector(
    (state) => state.chat
  );
  const { isAuthenticatedDoctor: isAuth, doctorInfo } = useSelector(
    (state) => state.auth
  );

  const handleGetMessages = (messages) => {
    dispatch(ChatActions.setDoctorMessages(messages));
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
    <div className="h-[calc(100vh-100px)] flex flex-col overflow-hidden bg-white rounded-xl shadow-lg">
      <div className="flex-1 flex min-h-0"> {/* min-h-0 để flex container co giãn đúng */}
        <div className="w-1/3 border-r border-gray-200 overflow-hidden flex flex-col">
          <ConversationCustomerByDoctor />
        </div>

        <div className="w-2/3 flex flex-col overflow-hidden">
          {!conversation ? (
            <div className="h-full flex items-center justify-center">
              <Empty description="Chọn một cuộc trò chuyện để bắt đầu" />
            </div>
          ) : (
            <ChatWindow
              typeMessage={"User_Doctor"}
              conversation={conversation}
              messages={doctorMessages}
              onSubmit={handleSendMessage}
              sender={{
                _id: doctorInfo?._id,
                role: "Doctor"
              }}
              receiver={{
                _id: conversation?._id,
                role: "User"
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageChat;
