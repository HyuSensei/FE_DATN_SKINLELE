import { useGetAllNotiStoreByUserQuery } from "@/redux/notification/notification.query";
import { Badge, Button, Dropdown, Empty, Skeleton, Tooltip } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { IoIosNotifications } from "react-icons/io";
import { IoNotificationsOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "@utils/dayjsTz";
import {
  markAllNotificationsAsRead,
  markNotificationAsRead,
} from "@/redux/notification/notification.thunk";
import { useNavigate } from "react-router-dom";

const NotificationDrop = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { socketCustomer: socket } = useSelector((state) => state.socket);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [paginate, setPaginate] = useState({
    page: 1,
    limit: 10,
  });
  const { data, isLoading, isFetching, refetch } =
    useGetAllNotiStoreByUserQuery(
      {
        ...paginate,
        type: "STORE",
      },
      { skip: !isAuthenticated }
    );
  const [notifications, setNotifications] = useState(data?.notifications || []);
  const [unreadCount, setUnreadCount] = useState(0);

  const handleNewNotification = (notification) => {
    setNotifications((prev) => [notification, ...prev]);
    setUnreadCount((prev) => prev + 1);
  };

  useEffect(() => {
    if (isAuthenticated && socket) {
      socket.on("resNewNotiFromStore", handleNewNotification);

      return () => {
        socket.off("resNewNotiFromStore", handleNewNotification);
      };
    }
  }, [isAuthenticated, socket]);

  useEffect(() => {
    if (data?.notifications) {
      if (paginate.page === 1) {
        setNotifications(data?.notifications);
        setUnreadCount(data?.unreadCount);
      } else {
        setNotifications((prev) => {
          const existingIds = new Set(prev.map((noti) => noti._id));
          const newNotifications = data.notifications.filter(
            (noti) => !existingIds.has(noti._id)
          );
          return [...prev, ...newNotifications];
        });
      }
    }
  }, [data?.notifications, paginate.page]);

  const handleSeeMore = useCallback(() => {
    if (data?.hasMore) {
      setPaginate((prev) => ({
        ...prev,
        page: prev.page + 1,
      }));
    }
  }, [data?.hasMore]);

  const { hasMore = false } = data || {};

  const handleClickNofi = async (notification, isNavigate = false) => {
    if (notification.isRead && !isNavigate) return;

    if (notification.metadata?.link) {
      navigate(notification.metadata.link);
    }

    try {
      // Đánh dấu thông báo là đã đọc
      
    } catch (error) {
      console.error("Failed to mark notification as read:", error);
    }
  };

  const handleMarkAllNoti = async () => {
    const res = await dispatch(
      markAllNotificationsAsRead({
        type: "STORE",
      })
    ).unwrap();

    if (res.success) {
      refetch();
    }
  };

  const notificationList = (
    <div className="w-[420px] bg-white shadow-2xl">
      <div className="p-4 rounded-t-xl  bg-gradient-to-r from-rose-300 to-rose-400 flex justify-between items-center">
        <div className="text-white">
          <h3 className="font-semibold text-lg flex items-center gap-2">
            <IoIosNotifications className="text-xl" /> Thông báo
          </h3>
          <p className="text-sm">{`Bạn có ${unreadCount} thông báo chưa đọc`}</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleMarkAllNoti}
            className="text-white hover:text-slate-50 hover:underline text-sm"
          >
            Đánh dấu tất cả đã đọc
          </button>
        </div>
      </div>
      <div className="max-h-[460px] overflow-auto">
        {isLoading ||
          (isFetching && (
            <div className="space-y-4">
              <Skeleton />
              <Skeleton />
            </div>
          ))}
        {!isLoading && !isFetching && notifications.length === 0 ? (
          <Empty
            description="Không có thông báo mới"
            className="py-12"
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          />
        ) : (
          <>
            <div className="divide-y divide-gray-100">
              {notifications.map((notification) => (
                <div
                  onClick={() => handleClickNofi(notification, true)}
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
                          <span className="w-[6px] h-[6px] rounded-full bg-blue-600 mt-2 animate-ping" />
                        )}
                      </div>
                      <Tooltip title={notification.content}>
                        <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                          {notification.content}
                        </p>
                      </Tooltip>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-gray-400 text-xs">
                          {dayjs(notification.createdAt).format(
                            "DD/MM/YYYY HH:mm:ss"
                          )}
                        </span>
                        {!notification.isRead && (
                          <Button
                            type="link"
                            onClick={() => handleClickNofi(notification)}
                          >
                            Đánh dấu đã đọc
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {hasMore && (
              <div className="flex items-center justify-center p-4">
                <Button
                  type="link"
                  onClick={handleSeeMore}
                  disabled={isLoading || isFetching}
                  loading={isLoading || isFetching}
                >
                  {isLoading || isFetching
                    ? "Đang tải..."
                    : "Xem thêm thông báo"}
                </Button>
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
      <Badge color="#e28585" count={unreadCount}>
        <IoNotificationsOutline className="text-3xl cursor-pointer" />
      </Badge>
    </Dropdown>
  );
};

export default NotificationDrop;
