import React from "react";
import { Card, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

const UserInfo = ({ user }) => (
  <Card className="shadow-md rounded-lg mb-6 overflow-hidden">
    <div className="flex flex-col items-center space-y-3 bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-md">
      <Avatar
        size={100}
        icon={<UserOutlined />}
        className="mb-2 border-4 border-white shadow-lg"
        src={user?.avatar?.url}
      />
      <div className="m-0 text-lg font-bold">{user?.name}</div>
      <div className="text-gray-500 text-sm">{user?.email}</div>
    </div>
  </Card>
);

export default UserInfo;
