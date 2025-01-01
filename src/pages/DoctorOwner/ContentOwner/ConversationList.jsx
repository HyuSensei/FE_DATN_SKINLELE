import React from "react";
import { Input, Avatar, Badge, Tabs } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const ConversationList = ({ conversations, selectedId, onSelect }) => (
  <div className="h-full flex flex-col">
    <div className="p-4 space-y-4">
      <div className="text-xl font-medium text-gray-900">Cuộc trò chuyện</div>
      <Input
        size="large"
        prefix={<SearchOutlined className="text-gray-400" />}
        placeholder="Tìm kiếm cuộc trò chuyện..."
        className="rounded-lg"
      />
      <Tabs
        defaultActiveKey="all"
        className="px-4 pt-2"
        items={[
          { label: "Tất cả", key: "all" },
          { label: "Chưa đọc", key: "unread" },
          { label: "Đã đọc", key: "read" },
        ]}
      />
    </div>
    <div className="flex-1 overflow-y-auto">
      {conversations.map((conv) => (
        <div
          key={conv.id}
          className={`p-4 flex items-center gap-3 cursor-pointer hover:bg-gray-50 transition-colors duration-200 ${
            selectedId === conv.id ? "bg-blue-50" : ""
          }`}
          onClick={() => onSelect(conv.id)}
        >
          <div className="relative">
            <Badge
              dot
              status={conv.online ? "success" : "default"}
              offset={[-6, 6]}
            >
              <Avatar src={conv.avatar} size={48} />
            </Badge>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-center">
              <h3 className="font-medium text-gray-900 truncate">
                {conv.name}
              </h3>
              <span className="text-xs text-gray-500">
                {conv.timestamp.fromNow()}
              </span>
            </div>
            <p className="text-sm text-gray-500 truncate">{conv.lastMessage}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default ConversationList;
