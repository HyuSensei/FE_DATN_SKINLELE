import { capitalizeFirstLetter } from "@/helpers/formatDate";
import { ChatActions } from "@/redux/chat/chat.slice";
import dayjs from "@utils/dayjsTz";
import { Avatar, Badge } from "antd";
import React from "react";
import { FaCircleDot } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";

const Support = ({ admin, conversation }) => {
  const dispatch = useDispatch();
  const { userOnlines } = useSelector((state) => state.socket);

  const isOnline = (userId) => {
    return userOnlines?.some((item) => item === userId);
  };

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
        conversation && !conversation.lastMessage.isRead ? "bg-gray-100" : ""
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
            <Badge dot status={isOnline(admin._id) ? "success" : "warning"}>
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

        {conversation &&
          conversation.lastMessage &&
          !conversation.lastMessage.isRead && (
            <FaCircleDot className="animate-ping text-sky-400" />
          )}
      </div>

      {conversation && conversation.lastMessage && (
        <div className="mt-2 ml-[60px]">
          <p className="text-sm text-gray-500 line-clamp-1 truncate">
            {conversation.lastMessage.content}
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

export default Support;
