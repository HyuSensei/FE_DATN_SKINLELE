import React, { useState, useEffect, useRef } from "react";
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
    customerConversationSelected,
    supportMessages,
    customerList,
  } = useSelector((state) => state.chat);
  const { isConversationCustomer, isChatCustomer } = openChat;
  const popoverRef = useRef(null);
  const { socketAdmin: socket } = useSelector((state) => state.socket);
  const { isAuthenticatedAdmin, adminInfo } = useSelector(
    (state) => state.auth
  );
  const [isLoading, setIsLoading] = useState(true);

  const customerConversations = customerList?.filter(
    (item) => item.conversation
  );
  const unReadCount = isAuthenticatedAdmin
    ? customerConversations?.filter((item) => (item?.conversation?.lastMessage?.receiver === adminInfo?._id && !item?.conversation?.lastMessage?.isRead)).length || 0
    : 0;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isAuthenticatedAdmin && socket) {
      socket.emit("getAllCustomer", adminInfo?._id);
      socket.on("resGetAllCustomer", (conversations) => {
        dispatch(ChatActions.setCustomerList(conversations));
      });

      if (
        isConversationCustomer &&
        customerConversationSelected
      ) {
        socket.emit("getMessages", customerConversationSelected.conversationId);
        socket.on("resGetMessages", (messages) => {
          dispatch(ChatActions.setSupportMessages(messages));
        });
      }

      return () => {
        socket.off("resGetAllCustomer", (conversations) => {
          dispatch(ChatActions.setSupportList(conversations));
        });

        socket.off("resGetMessages", (messages) => {
          dispatch(ChatActions.setSupportMessages(messages));
        });
      };
    }
  }, [isAuthenticatedAdmin, socket, customerConversationSelected, adminInfo]);

  const content = (
    <div ref={popoverRef} className="w-96">
      <div className="p-3 border-b space-y-2">
        <h3 className="text-lg font-semibold">Cuộc trò chuyện</h3>
        <Input
          className="rounded-lg bg-gray-50"
          placeholder="Tìm kiếm..."
          prefix={<SearchOutlined />}
        />
      </div>
      <div className="divide-y max-h-96 overflow-y-auto hide-scrollbar-custom">
        {
          isLoading ? (<LoadingConversation />) :
            (customerList.length > 0 ?
              (customerList.map(({ customer, conversation }) => (
                <CustomerItem key={customer._id} customer={customer} conversation={conversation} />
              )))
              : (<Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description="Không có cuộc trò chuyện"
              />
              ))
        }
      </div>
    </div>
  );

  const onCloseChat = () => {
    dispatch(ChatActions.setOpenChat({ key: "isChatCustomer", value: false }));
    dispatch(ChatActions.setCustomerConversationSelected(null))
    dispatch(ChatActions.setSupportMessages([]));
  };

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

      {isChatCustomer && (
        <ChatBox
          conversation={customerConversationSelected}
          onClose={onCloseChat}
          messages={supportMessages}
        />
      )}
    </>
  );
};

export default ConversationCustomer;
