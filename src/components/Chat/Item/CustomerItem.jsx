import { capitalizeFirstLetter } from "@/helpers/formatDate";
import { ChatActions } from "@/redux/chat/chat.slice";
import { Avatar, Badge } from "antd";
import dayjs from "@utils/dayjsTz";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaCircleDot } from "react-icons/fa6";

const CustomerItem = ({ customer, conversation }) => {
  const { userOnlines, socketAdmin: socket } = useSelector(
    (state) => state.socket
  );
  const { adminInfo } = useSelector((state) => state.auth);
  const { openChat } = useSelector((state) => state.chat);
  const dispatch = useDispatch();
  const isOnline = (userId) => {
    return userOnlines?.some((item) => item === userId);
  };
  const isOwner = conversation?.lastMessage?.sender === adminInfo._id;
  const lastMessage = conversation?.lastMessage;
  const isOwnerRead =
    (lastMessage?.receiver === adminInfo._id && lastMessage?.isRead) ||
    lastMessage?.sender === adminInfo._id;

  const handleSelectConversation = () => {
    if (socket && conversation) {
      const {
        lastMessage,
        sender,
        receiver,
        _id: conversationId,
      } = conversation;
      if (lastMessage.receiver === adminInfo._id && !lastMessage.isRead)
        socket.emit(
          "seenMessage",
          JSON.stringify({
            conversationId,
            sender: sender._id,
            receiver: receiver._id,
          })
        );
    }
    dispatch(
      ChatActions.setCustomerConversationSelected({
        ...customer,
        conversationId: conversation?._id || "",
      })
    );
    dispatch(
      ChatActions.setOpenChatAll({
        ...openChat,
        isChatCustomer: true,
        isConversationCustomer: false,
      })
    );
  };

  return (
    <div
      className={`flex justify-between hover:bg-gray-50 hover:rounded-md cursor-pointer ${
        conversation && !isOwnerRead ? "bg-gray-100" : ""
      } px-4 py-6`}
      onClick={handleSelectConversation}
    >
      <div className="flex items-center space-x-3 w-full">
        <div className="relative">
          <Badge dot status={isOnline(customer._id) ? "success" : "warning"}>
            <Avatar
              src={customer.avatar.url}
              size={48}
              className="bg-gradient-to-r from-blue-500 to-blue-600"
            />
          </Badge>
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-center">
            <span className="font-medium">{customer.name}</span>
          </div>
          {!conversation && (
            <div className="text-gray-400">Chưa có tin nhắn !</div>
          )}
          {conversation && conversation.lastMessage && (
            <div className="py-1 ">
              <p
                className={`text-sm line-clamp-1 truncate ${
                  isOwnerRead ? "text-gray-500 " : "text-gray-600 font-medium"
                }`}
              >
                {isOwner ? "Bạn:" : ""}{" "}
                {!conversation.lastMessage.content &&
                conversation.lastMessage.attachments.length > 0
                  ? "Đã gửi 1 phương tiện"
                  : conversation.lastMessage.content}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                {capitalizeFirstLetter(
                  dayjs(conversation.lastMessage.createdAt).fromNow()
                )}
              </p>
            </div>
          )}
        </div>
      </div>
      {conversation && !isOwnerRead && (
        <FaCircleDot className="animate-ping text-sky-400 pr-1 text-lg" />
      )}
    </div>
  );
};

export default CustomerItem;
