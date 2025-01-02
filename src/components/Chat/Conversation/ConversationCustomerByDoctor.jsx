import React, { useEffect, useState } from "react";
import { Input, Tabs, Empty } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { ChatActions } from "@/redux/chat/chat.slice";
import CustomerItemByDoctor from "../Item/CustomerItemByDoctor";
import { LoadingConversation } from "../Loading";
const ConversationCustomerByDoctor = () => {
  const dispatch = useDispatch();
  const { socketDoctor: socket } = useSelector((state) => state.socket);
  const { isAuthenticatedDoctor, doctorInfo } = useSelector((state) => state.auth);
  const {
    customerList,
  } = useSelector((state) => state.chat);
  const [isLoading, setIsLoading] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const handleGetAllCustomer = (conversations) => {
    dispatch(ChatActions.setCustomerList(conversations));
  };

  useEffect(() => {
    if (isAuthenticatedDoctor && socket) {
      socket.emit("getAllCustomer", doctorInfo?._id);
      socket.on("resGetAllCustomer", handleGetAllCustomer);

      return () => {
        socket.off("resGetAllCustomer", handleGetAllCustomer);
      };
    }
  }, [isAuthenticatedDoctor, socket, doctorInfo]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 space-y-4">
        <div className="text-xl font-medium text-gray-900">Cuộc trò chuyện</div>
        <Input
          size="middle"
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
      <div className="flex-1 overflow-y-auto hide-scrollbar-custom">
        {isLoading ? (
          <div className="px-2">
            <LoadingConversation />
          </div>
        ) : customerList.length > 0 ? (
          customerList.map(({ customer, conversation }) => (
            <CustomerItemByDoctor
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
  )
};

export default ConversationCustomerByDoctor;

