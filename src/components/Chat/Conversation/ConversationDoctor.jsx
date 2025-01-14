import { ChatActions } from "@/redux/chat/chat.slice";
import { Badge, Empty, Input, Dropdown, Tabs } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SearchOutlined } from "@ant-design/icons";
import { LoadingConversation } from "../Loading";
import DoctorItem from "../Item/DoctorItem";
import { LiaFacebookMessenger } from "react-icons/lia";

const ConversationDoctor = () => {
  const dispatch = useDispatch();
  const {
    openChat,
    doctorConversationSelected: conversation,
    doctorList,
    doctorMessages,
  } = useSelector((state) => state.chat);
  const { isConversationDoctor } = openChat;
  const { socketCustomer: socket } = useSelector((state) => state.socket);
  const { isAuthenticated, userInfo } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const doctorConversations = doctorList?.filter((item) => item.conversation);
  const unReadCount = isAuthenticated
    ? doctorConversations?.filter((item) => {
        const lastMessage = item?.conversation?.lastMessage;
        return lastMessage?.receiver === userInfo?._id && !lastMessage?.isRead;
      }).length || 0
    : 0;

  const handleGetAllDoctor = (conversations) => {
    dispatch(ChatActions.setDoctorList(conversations));
  };

  const handleGetMessages = (messages) => {
    dispatch(ChatActions.setDoctorMessages(messages));
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isAuthenticated && socket) {
      socket.emit("getAllDoctor", userInfo?._id);
      socket.on("resGetAllDoctor", handleGetAllDoctor);

      return () => {
        socket.off("resGetAllDoctor", handleGetAllDoctor);
      };
    }
  }, [isAuthenticated, socket, doctorMessages]);

  useEffect(() => {
    if (isAuthenticated && socket) {
      socket.emit("getMessages", conversation?.conversationId);
      socket.on("resGetMessages", handleGetMessages);

      return () => {
        socket.off("resGetMessages", handleGetMessages);
      };
    }
  }, [isAuthenticated, socket, conversation]);

  const filteredDoctorList = doctorList.filter(({ doctor, conversation }) => {
    const lastMessage = conversation?.lastMessage;

    if (searchValue) {
      const matchesSearch =
        doctor.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        doctor.email.toLowerCase().includes(searchValue.toLowerCase());
      if (!matchesSearch) return false;
    }

    if (activeTab === "unread") {
      return lastMessage?.receiver === userInfo?._id && !lastMessage?.isRead;
    }
    if (activeTab === "read") {
      return lastMessage?.receiver === userInfo?._id && lastMessage?.isRead;
    }

    return true;
  });

  const dropdownContent = (
    <div className="w-[350px] lg:w-[450px] p-3 bg-white rounded-lg shadow-lg mr-4 mt-4">
      <h3 className="text-lg font-semibold">Cuộc trò chuyện</h3>
      <div className="space-y-2 mt-2">
        <Input
          size="middle"
          className="rounded-lg bg-gray-50"
          placeholder="Tìm kiếm cuộc trò chuyện"
          prefix={<SearchOutlined />}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          items={[
            { label: "Tất cả", key: "all" },
            { label: "Chưa đọc", key: "unread" },
            { label: "Đã đọc", key: "read" },
          ]}
        />
      </div>
      <div className="max-h-96 overflow-y-auto hide-scrollbar-custom">
        {isLoading ? (
          <LoadingConversation />
        ) : filteredDoctorList.length > 0 ? (
          filteredDoctorList.map(({ doctor, conversation }) => (
            <DoctorItem
              key={doctor._id}
              doctor={doctor}
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
    <Dropdown
      dropdownRender={() => dropdownContent}
      trigger={["click"]}
      placement="bottom"
      open={isConversationDoctor}
      onOpenChange={(open) =>
        dispatch(
          ChatActions.setOpenChat({
            key: "isConversationDoctor",
            value: open,
          })
        )
      }
    >
      <Badge count={unReadCount} offset={[-9, 4]} color="cyan">
        <div className="h-10 w-10 bg-slate-50 hover:bg-slate-100 rounded-full flex items-center justify-center cursor-pointer">
          <LiaFacebookMessenger className="text-slate-500 text-2xl" />
        </div>
      </Badge>
    </Dropdown>
  );
};

export default ConversationDoctor;
