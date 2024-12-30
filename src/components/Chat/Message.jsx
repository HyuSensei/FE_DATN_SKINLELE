import React from "react";
import dayjs from "@utils/dayjsTz";
import { Avatar } from "antd";
import { capitalizeFirstLetter } from "@/helpers/formatDate";

const Message = ({ message, sender = null }) => {
  const isSender = sender && message.sender._id === sender._id ? true : false;
  const timeAgo = capitalizeFirstLetter(dayjs(message.createdAt).fromNow());

  const renderAttachment = (att, index) => {
    switch (att.type) {
      case "image":
        return (
          <img
            onClick={(e) => {
              e.preventDefault();
              window.open(att.url, "_blank", "noopener,noreferrer");
            }}
            key={index}
            src={att.url}
            alt="Image-Attachment"
            className="rounded-lg shadow-md cursor-pointer hover:opacity-80 transition-opacity"
          />
        );

      case "video":
        return (
          <video
            key={index}
            src={att.url}
            className="rounded-lg w-full cursor-pointer hover:opacity-80 transition-opacity"
            controls
          />
        );

      case "audio":
        return (
          <video
            key={index}
            src={att.url}
            className="w-full cursor-pointer"
            controls
          />
        );

      default:
        return null;
    }
  };

  return (
    <div
      className={`flex items-start gap-3 ${
        !isSender ? "" : "flex-row-reverse"
      } animate-fadeIn`}
    >
      <Avatar
        src={message.sender.avatar.url}
        alt={message.sender.name}
        className={`w-10 h-10 ${
          !isSender
            ? "bg-gradient-to-r from-blue-500 to-blue-600"
            : "bg-gradient-to-r from-green-500 to-green-600"
        }`}
      />
      <div
        className={`flex flex-col gap-1 max-w-[80%] ${
          !isSender ? "items-start" : "items-end"
        }`}
      >
        {message.attachments.length > 0 && (
          <div className="max-w-xs mb-2 space-y-2">
            {message.attachments.map((att, index) =>
              renderAttachment(att, index)
            )}
          </div>
        )}
        {message.content && (
          <div
            className={`${
              !isSender
                ? "bg-white rounded-2xl rounded-tl-none"
                : "bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl rounded-tr-none"
            } p-4 shadow-md break-words`}
          >
            <p className={!isSender ? "text-gray-800" : "text-white"}>
              {message.content}
            </p>
          </div>
        )}
        <span className="text-xs text-gray-400">{timeAgo}</span>
      </div>
    </div>
  );
};

export default Message;
