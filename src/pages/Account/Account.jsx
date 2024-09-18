import {
  Breadcrumb,
  Avatar,
  Tabs,
  Card,
  Button,
  Typography,
  Badge,
} from "antd";
import React from "react";
import {
  ShoppingCartOutlined,
  UnorderedListOutlined,
  UserOutlined,
  HeartOutlined,
  GiftOutlined,
  CarOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  ClockCircleOutlined,
  SyncOutlined,
} from "@ant-design/icons";

const { TabPane } = Tabs;
const { Title } = Typography;

const Account = () => {
  return (
    <div className="container mx-auto mt-8">
      <Breadcrumb items={[{ title: "Trang chủ" }, { title: "Tài khoản" }]} />

      <div className="flex mt-8">
        {/* Menu */}
        <div className="w-1/4">
          <Card className="shadow-lg rounded-lg">
            <div className="flex flex-col items-center space-y-4">
              <Avatar size={120} icon={<UserOutlined />} className="mb-4" />
              <Title level={4}>John Doe</Title>
              <p className="text-gray-500">johndoe@example.com</p>
              <Button type="primary" shape="round" icon={<GiftOutlined />}>
                Điểm thưởng: 1500
              </Button>
            </div>
          </Card>
          <Card className="shadow-lg rounded-lg mt-8">
            <ul className="space-y-6">
              <li>
                <a
                  href="#"
                  className="flex items-center text-gray-600 hover:text-blue-600 text-lg font-semibold"
                >
                  <Badge count={5} className="mr-2">
                    <ShoppingCartOutlined className="text-2xl" />
                  </Badge>
                  Giỏ hàng
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center text-gray-600 hover:text-blue-600 text-lg font-semibold"
                >
                  <UnorderedListOutlined className="text-2xl mr-2" />
                  Đơn hàng
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center text-gray-600 hover:text-blue-600 text-lg font-semibold"
                >
                  <UserOutlined className="text-2xl mr-2" />
                  Tài khoản
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center text-gray-600 hover:text-blue-600 text-lg font-semibold"
                >
                  <HeartOutlined className="text-2xl mr-2" />
                  Yêu thích
                </a>
              </li>
            </ul>
          </Card>
        </div>

        {/* Nội dung */}
        <div className="w-3/4 ml-8">
          <Card className="shadow-lg rounded-lg">
            <Tabs defaultActiveKey="1">
              <TabPane
                key="1"
                tab={
                  <div className="flex items-center space-x-2">
                    <UnorderedListOutlined className="text-xl" />
                    <span className="text-lg font-semibold">Tất cả</span>
                  </div>
                }
              >
                {/* Nội dung tab Tất cả */}
              </TabPane>
              <TabPane
                key="2"
                tab={
                  <div className="flex items-center space-x-2">
                    <ClockCircleOutlined className="text-xl" />
                    <span className="text-lg font-semibold">Chờ xác nhận</span>
                    <Badge count={2} className="ml-2" />
                  </div>
                }
              >
                {/* Nội dung tab Chờ xác nhận */}
              </TabPane>
              <TabPane
                key="3"
                tab={
                  <div className="flex items-center space-x-2">
                    <SyncOutlined className="text-xl" />
                    <span className="text-lg font-semibold">Đang xử lý</span>
                    <Badge count={1} className="ml-2" />
                  </div>
                }
              >
                {/* Nội dung tab Đang xử lý */}
              </TabPane>
              <TabPane
                key="4"
                tab={
                  <div className="flex items-center space-x-2">
                    <CarOutlined className="text-xl" />
                    <span className="text-lg font-semibold">Đang giao</span>
                    <Badge count={3} className="ml-2" />
                  </div>
                }
              >
                {/* Nội dung tab Đang giao */}
              </TabPane>
              <TabPane
                key="5"
                tab={
                  <div className="flex items-center space-x-2">
                    <CheckCircleOutlined className="text-xl" />
                    <span className="text-lg font-semibold">Đã giao</span>
                  </div>
                }
              >
                {/* Nội dung tab Đã giao */}
              </TabPane>
              <TabPane
                key="6"
                tab={
                  <div className="flex items-center space-x-2">
                    <CloseCircleOutlined className="text-xl" />
                    <span className="text-lg font-semibold">Đã hủy</span>
                  </div>
                }
              >
                {/* Nội dung tab Đã hủy */}
              </TabPane>
            </Tabs>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Account;
