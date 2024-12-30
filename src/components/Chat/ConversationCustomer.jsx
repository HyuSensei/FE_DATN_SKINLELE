import React, { useState, useEffect, useRef } from "react";
import { Avatar, Badge, Button, Empty, Input, List, Popover } from "antd";
import { MessageOutlined, SearchOutlined } from "@ant-design/icons";
import { BsCircleFill } from "react-icons/bs";
import ChatBox from "./ChatBox";
import { useDispatch, useSelector } from "react-redux";
import { ChatActions } from "@/redux/chat/chat.slice";

const mockupCustomers = [
  {
    customer: {
      _id: "user1",
      name: "Nguyễn Văn A",
      email: "nguyenvana@gmail.com",
      avatar: {
        url: "https://avatar.iran.liara.run/username?username=user1",
      },
      isActive: true,
    },
    conversation: {
      _id: "conv1",
      lastMessage: {
        content: "Tôi cần tư vấn về sản phẩm",
        createdAt: new Date(),
        isRead: false,
      },
    },
  },
  {
    customer: {
      _id: "user2",
      name: "Trần Thị B",
      email: "tranthib@gmail.com",
      avatar: {
        url: "https://avatar.iran.liara.run/username?username=user2",
      },
      isActive: false,
    },
    conversation: {
      _id: "conv2",
      lastMessage: {
        content: "Cảm ơn bạn đã hỗ trợ",
        createdAt: new Date(Date.now() - 3600000),
        isRead: true,
      },
    },
  },
];

const ConversationCustomer = () => {
  const dispatch = useDispatch();
  const {
    openChat,
    customerConversationSelected,
    supportMessages,
    customerList,
  } = useSelector((state) => state.chat);
  const { isConversationCustomer } = openChat;
  const popoverRef = useRef(null);
  const { socketAdmin: socket } = useSelector((state) => state.socket);
  const { isAuthenticatedAdmin, adminInfo } = useSelector(
    (state) => state.auth
  );
  const [isLoading, setIsLoading] = useState(true);

  const customerConversations = customerList?.filter(
    (item) => item.conversation
  );
  const unReadCount =
    customerConversations?.filter((item) => {
      const lastMessage = item.conversation?.lastMessage;
      return (
        lastMessage?.receiver._id === adminInfo._id && !lastMessage?.isRead
      );
    }).length || 0;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        dispatch(
          ChatActions.setOpenChat({
            key: "isConversationCustomer",
            value: false,
          })
        );
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dispatch]);

  const content = (
    <div ref={popoverRef} className="w-96 max-h-96 overflow-y-auto">
      <div className="p-3 border-b space-y-2">
        <h3 className="text-lg font-semibold">Cuộc trò chuyện</h3>
        <Input
          className="rounded-lg bg-gray-50"
          placeholder="Tìm kiếm..."
          prefix={<SearchOutlined />}
        />
      </div>
      {mockupCustomers.length > 0 ? (
        <List
          className="divide-y"
          dataSource={mockupCustomers}
          renderItem={({ customer, conversation }) => (
            <List.Item
              className="cursor-pointer hover:bg-gray-50 p-3"
              onClick={() =>
                dispatch(ChatActions.setCustomerConversationSelected(customer))
              }
            >
              <div className="flex items-center space-x-3 w-full">
                <div className="relative">
                  <Avatar src={customer.avatar.url} size={40} />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{customer.name}</span>
                  </div>
                  <div className="text-sm text-gray-500 truncate">
                    {conversation?.lastMessage?.content || "Chưa có tin nhắn !"}
                  </div>
                </div>
              </div>
            </List.Item>
          )}
        />
      ) : (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="Không có cuộc trò chuyện"
        />
      )}
    </div>
  );

  return (
    <>
      <Popover
        content={content}
        trigger="click"
        open={isConversationCustomer}
        onOpenChange={(open) =>
          dispatch(
            ChatActions.setOpenChat({
              key: "isConversationCustomer",
              value: open,
            })
          )
        }
        placement="bottomRight"
        arrow={false}
      >
        <Badge
          color={"#65bebc"}
          count={unReadCount}
          className="mr-4"
          offset={[-5, 5]}
        >
          <Button icon={<MessageOutlined />} shape="circle" size="large" />
        </Badge>
      </Popover>

      {customerConversationSelected && (
        <ChatBox
          conversation={customerConversationSelected}
          onClose={() =>
            dispatch(ChatActions.setCustomerConversationSelected(null))
          }
          mockupData={{
            messages: [
              {
                id: 1,
                content: "Xin chào admin",
                sender: customerConversationSelected,
                createdAt: new Date(Date.now() - 300000),
                isRead: true,
              },
              {
                id: 2,
                content: "Tôi có thể giúp gì cho bạn?",
                sender: {
                  _id: "admin1",
                  name: "Admin",
                  role: "Admin",
                  avatar: {
                    url: "https://avatar.iran.liara.run/username?username=admin",
                  },
                },
                createdAt: new Date(Date.now() - 240000),
                isRead: true,
              },
            ],
          }}
        />
      )}
    </>
  );
};

export default ConversationCustomer;
