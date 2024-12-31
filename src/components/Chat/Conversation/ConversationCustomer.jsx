import React, { useState, useEffect } from "react";
import { Badge, Button, Empty, Input, Popover } from "antd";
import { MessageOutlined, SearchOutlined } from "@ant-design/icons";
import ChatBox from "../ChatBox";
import { useDispatch, useSelector } from "react-redux";
import { ChatActions } from "@/redux/chat/chat.slice";
import { LoadingConversation } from "../Loading";
import CustomerItem from "../Item/CustomerItem";

const ConversationCustomer = () => {
  const dispatch = useDispatch();
  const {
    openChat,
    customerConversationSelected: conversation,
    customerList,
    supportMessages,
  } = useSelector((state) => state.chat);
  const { isConversationCustomer } = openChat;
  const { socketAdmin: socket } = useSelector((state) => state.socket);
  const { isAuthenticatedAdmin, adminInfo } = useSelector(
    (state) => state.auth
  );
  const [isLoading, setIsLoading] = useState(true);
  const [searchValue, setSearchValue] = useState("");

  const customerConversations = customerList?.filter(
    (item) => item.conversation
  );
  const unReadCount = isAuthenticatedAdmin
    ? customerConversations?.filter((item) => {
        const lastMessage = item?.conversation?.lastMessage;
        return lastMessage?.receiver === adminInfo?._id && !lastMessage?.isRead;
      }).length || 0
    : 0;

  const handleGetAllCustomer = (conversations) => {
    dispatch(ChatActions.setCustomerList(conversations));
  };

  const handleGetMessages = (messages) => {
    dispatch(ChatActions.setSupportMessages(messages));
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isAuthenticatedAdmin && socket) {
      socket.emit("getAllCustomer", adminInfo?._id);
      socket.on("resGetAllCustomer", handleGetAllCustomer);

      socket.emit("getMessages", conversation?.conversationId);
      socket.on("resGetMessages", handleGetMessages);

      return () => {
        socket.off("resGetAllCustomer", handleGetAllCustomer);
        socket.off("resGetMessages", handleGetMessages);
      };
    }
  }, [isAuthenticatedAdmin, socket, conversation, supportMessages]);

  const filteredCustomerList = customerList.filter(({ customer }) => {
    if (!searchValue) return true;

    return (
      customer.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchValue.toLowerCase())
    );
  });

  const content = (
    <div className="w-96">
      <div className="p-3 border-b space-y-2">
        <h3 className="text-lg font-semibold">Cuộc trò chuyện</h3>
        <Input
          className="rounded-lg bg-gray-50"
          placeholder="Tìm kiếm..."
          prefix={<SearchOutlined />}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>
      <div className="max-h-96 overflow-y-auto hide-scrollbar-custom">
        {isLoading ? (
          <LoadingConversation />
        ) : filteredCustomerList.length > 0 ? (
          filteredCustomerList.map(({ customer, conversation }) => (
            <CustomerItem
              key={customer._id}
              customer={customer}
              conversation={conversation}
            />
          ))
        ) : (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={
              searchValue
                ? "Không tìm thấy kết quả"
                : "Không có cuộc trò chuyện"
            }
          />
        )}
      </div>
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
    </>
  );
};

export default ConversationCustomer;
