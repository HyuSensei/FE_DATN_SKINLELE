import { Badge, Button, Dropdown, Empty } from "antd";
import React, { useState } from "react";
import { IoNotificationsOutline } from "react-icons/io5";

const mockNotifications = [
  {
    _id: "1",
    title: "Đơn hàng mới",
    content:
      "Đơn hàng SK-II Facial Treatment Essence #123 đã được đặt thành công",
    createdAt: "2024-01-09T10:30:00Z",
    isRead: false,
    type: "order",
  },
  {
    _id: "2",
    title: "Xác nhận thanh toán",
    content:
      "Thanh toán đơn hàng Sulwhasoo First Care Activating Serum EX #124 đã được xác nhận",
    createdAt: "2024-01-09T09:15:00Z",
    isRead: true,
    type: "payment",
  },
  {
    _id: "3",
    title: "Khuyến mãi đặc biệt",
    content: "Ưu đãi 25% cho bộ sản phẩm La Mer trong tuần này",
    createdAt: "2024-01-09T08:00:00Z",
    isRead: false,
    type: "promotion",
  },
];

const NotificationDrop = () => {
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const loadMore = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setHasMore(false);
    }, 1000);
  };

  const notificationList = (
    <div className="w-[420px] bg-white rounded-xl shadow-2xl">
      <div className="p-4 border-b border-gray-100 flex justify-between items-center">
        <div>
          <h3 className="font-semibold text-lg text-gray-800">Thông báo</h3>
          <p className="text-gray-500 text-sm">Bạn có 2 thông báo chưa đọc</p>
        </div>
        <div className="flex gap-3">
          <Button type="link">Đánh dấu tất cả đã đọc</Button>
        </div>
      </div>

      <div className="max-h-[460px] overflow-auto">
        {mockNotifications.length === 0 ? (
          <Empty
            description="Không có thông báo mới"
            className="py-12"
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          />
        ) : (
          <>
            <div className="divide-y divide-gray-100">
              {mockNotifications.map((notification) => (
                <div
                  key={notification._id}
                  className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors duration-200
                    ${!notification.isRead ? "bg-blue-50/40" : ""}
                  `}
                >
                  <div className="flex gap-3">
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium text-gray-900">
                          {notification.title}
                        </h4>
                        {!notification.isRead && (
                          <span className="w-[6px] h-[6px] rounded-full bg-blue-600 mt-2" />
                        )}
                      </div>
                      <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                        {notification.content}
                      </p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-gray-400 text-xs">
                          {new Date(notification.createdAt).toLocaleString()}
                        </span>
                        {!notification.isRead && (
                          <Button type="link"> Đánh dấu đã đọc</Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {hasMore && (
              <div className="p-4 text-center border-t border-gray-100">
                <button
                  onClick={loadMore}
                  disabled={loading}
                  className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 
                    transition-colors duration-200 text-sm font-medium disabled:opacity-70"
                >
                  {loading ? "Đang tải..." : "Xem thêm thông báo"}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );

  return (
    <Dropdown
      dropdownRender={() => notificationList}
      placement="bottomRight"
      trigger={["click"]}
      arrow={{ pointAtCenter: true }}
      open={dropdownOpen}
      onOpenChange={setDropdownOpen}
    >
      <Badge color="#e28585" count={2}>
        <IoNotificationsOutline className="text-3xl cursor-pointer" />
      </Badge>
    </Dropdown>
  );
};

export default NotificationDrop;
