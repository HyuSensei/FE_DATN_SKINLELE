import { capitalizeFirstLetter } from "@/helpers/formatDate";
import { ChatActions } from "@/redux/chat/chat.slice";
import dayjs from "@utils/dayjsTz";
import { Avatar, Badge } from "antd";
import React from "react";
import { FaCircleDot } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";

const SupportItem = ({ admin, conversation }) => {
  const dispatch = useDispatch();
  const { userOnlines } = useSelector((state) => state.socket);
  const { userInfo } = useSelector((state) => state.auth)

  const isOwner = admin._id === userInfo._id
  const isOnline = userOnlines?.some((item) => item === admin._id);
  const isReadOwner = conversation?.lastMessage?.sender === userInfo?._id

  const handleSelectConversation = (admin) => {
    dispatch(ChatActions.setSupportConversationSelected(admin));
    dispatch(ChatActions.setOpenChat({ key: "isChatSupport", value: true }));
    dispatch(
      ChatActions.setOpenChat({ key: "isConversationSupport", value: false })
    );
  };
  
  return (
    <div
      className={`p-4 hover:bg-gray-200 transition-colors cursor-pointer ${
        conversation && !isReadOwner ? "bg-gray-100" : ""
      }`}
      onClick={() =>
        handleSelectConversation({
          ...admin,
          conversationId: conversation ? conversation._id : "",
        })
      }
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Badge dot status={isOnline ? "success" : "warning"}>
              <Avatar
                src={admin.avatar.url}
                size={48}
                className="bg-gradient-to-r from-blue-500 to-blue-600"
              />
            </Badge>
          </div>
          <div>
            <h4 className="font-medium text-gray-900">{admin.name}</h4>
            <p className="text-sm text-gray-500">
              {admin.role === "ADMIN" ? "Quản trị viên" : "Nhân viên hỗ trợ"}
            </p>
          </div>
        </div>

        {conversation && conversation.lastMessage && !isReadOwner && (
          <FaCircleDot className="animate-ping text-sky-400" />
        )}
      </div>

      {conversation && conversation.lastMessage && (
        <div className="mt-2 ml-[60px]">
          <p
            className={`text-sm line-clamp-1 truncate ${
              !isReadOwner ? "text-gray-600 font-medium" : "text-gray-500 "
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
  );
};

export default SupportItem;
