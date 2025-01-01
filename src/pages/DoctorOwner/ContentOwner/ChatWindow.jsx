import React from "react";
import { Input, Avatar, Badge, Empty } from "antd";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { IoSend } from "react-icons/io5";

dayjs.extend(relativeTime);

const ChatWindow = ({ conversation, messages }) => {
  if (!conversation) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-50 border-l-2">
        <Empty description="Chọn một cuộc trò chuyện để bắt đầu" />
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-gray-50 border-l-2">
      <div className="p-4 border-b bg-white">
        <div className="flex items-center gap-3">
          <Badge dot status={conversation.online ? "success" : "default"}>
            <Avatar src={conversation.avatar} size={40} />
          </Badge>
          <div>
            <h3 className="font-medium text-gray-900">{conversation.name}</h3>
            <span className="text-sm text-gray-500">
              {conversation.online ? "Đang hoạt động" : "Không hoạt động"}
            </span>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.senderId === "doctor" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                  msg.senderId === "doctor"
                    ? "bg-blue-500 text-white rounded-tr-none"
                    : "bg-white text-gray-800 rounded-tl-none"
                } shadow-sm`}
              >
                <p className="text-sm">{msg.content}</p>
                <span className="text-xs opacity-70">
                  {msg.timestamp.format("HH:mm")}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 bg-white border-t">
        <div className="flex items-center gap-2">
          <Input.TextArea
            placeholder="Nhập tin nhắn..."
            autoSize={{ minRows: 1, maxRows: 4 }}
            className="rounded-xl"
          />
          <button className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors">
            <IoSend size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
