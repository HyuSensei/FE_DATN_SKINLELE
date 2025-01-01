import React, { useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import ConversationList from "./ConversationList";
import ChatWindow from "./ChatWindow";

dayjs.extend(relativeTime);

// Mock data for conversations
const mockConversations = [
  {
    id: 1,
    name: "Nguyễn Văn A",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=1",
    lastMessage: "Bác sĩ ơi, tôi muốn đặt lịch khám",
    timestamp: dayjs().subtract(5, "minute"),
    unread: 3,
    online: true,
  },
  {
    id: 2,
    name: "Trần Thị B",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=2",
    lastMessage: "Cảm ơn bác sĩ đã tư vấn",
    timestamp: dayjs().subtract(1, "hour"),
    unread: 0,
    online: false,
  },
  // Add more mock conversations...
];

// Mock messages for a conversation
const mockMessages = [
  {
    id: 1,
    senderId: 1,
    content: "Bác sĩ ơi, tôi muốn đặt lịch khám",
    timestamp: dayjs().subtract(5, "minute"),
  },
  {
    id: 2,
    senderId: "doctor",
    content: "Chào bạn, bạn có thể cho mình biết triệu chứng của bạn không?",
    timestamp: dayjs().subtract(4, "minute"),
  },
  // Add more mock messages...
];

const ManageChat = () => {
  const [selectedId, setSelectedId] = useState(null);
  const selectedConversation = mockConversations.find(
    (c) => c.id === selectedId
  );

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-3 gap-6 h-[calc(100vh-200px)] bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="md:col-span-1">
        <ConversationList
          conversations={mockConversations}
          selectedId={selectedId}
          onSelect={setSelectedId}
        />
      </div>
      <div className="md:col-span-2">
        <ChatWindow
          conversation={selectedConversation}
          messages={mockMessages}
        />
      </div>
    </div>
  );
};

export default ManageChat;
