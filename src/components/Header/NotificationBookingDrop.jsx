import {
  useGetAllNotiBookingByDoctorQuery,
  useGetAllNotiStoreByUserQuery,
} from "@/redux/notification/notification.query";
import { Badge, Button, Dropdown, Empty, Skeleton, Tooltip } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { IoNotificationsOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "@utils/dayjsTz";
import { useLocation, useNavigate } from "react-router-dom";
import {
  markAllNotificationsAsRead,
  markNotificationAsRead,
} from "@/redux/notification/notification.thunk";

const NotificationBookingDrop = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [paginate, setPaginate] = useState({
    page: 1,
    limit: 10,
  });
  const { socketCustomer, socketDoctor } = useSelector((state) => state.socket);
  const { isAuthenticated, isAuthenticatedDoctor, userInfo, doctorInfo } =
    useSelector((state) => state.auth);
  const [unreadCount, setUnreadCount] = useState(0);
  const path = location.pathname;
  const currentUser = path !== "/doctor-owner" ? userInfo : doctorInfo;

  const handleNewNotification = (notification) => {
    if (currentUser?._id === notification.recipient) {
      setNotifications((prev) => [notification, ...prev]);
      setUnreadCount((prev) => prev + 1);
    }
  };

  const {
    data: dataCustomer,
    isLoading: isLoadingCustomer,
    isFetching: isFetchingCustomer,
    refetch: refetchCustomer,
  } = useGetAllNotiStoreByUserQuery(
    {
      ...paginate,
      type: "BOOKING",
    },
    { skip: !isAuthenticated || path === "/doctor-owner" }
  );
  const {
    data: dataDoctor,
    isLoading: isLoadingDoctor,
    isFetching: isFetchingDoctor,
    refetch: refetchDoctor,
  } = useGetAllNotiBookingByDoctorQuery(
    {
      ...paginate,
      type: "BOOKING",
    },
    {
      skip: !isAuthenticatedDoctor || path !== "/doctor-owner",
    }
  );

  const [notifications, setNotifications] = useState([]);

  const { hasMore: hasMoreCustomer = false } = dataCustomer || {};
  const { hasMore: hasMoreDoctor = false } = dataDoctor || {};

  useEffect(() => {
    if (isAuthenticated) {
      refetchCustomer();
    }
  }, [location.pathname, isAuthenticated]);

  useEffect(() => {
    if (socketCustomer && isAuthenticated) {
      socketCustomer.on("resNewNotiFromBooking", handleNewNotification);

      return () => {
        socketCustomer.off("resNewNotiFromBooking", handleNewNotification);
      };
    }
  }, [socketCustomer, isAuthenticated]);

  useEffect(() => {
    if (socketDoctor && isAuthenticatedDoctor) {
      socketDoctor.on("resNewNotiFromBooking", handleNewNotification);

      return () => {
        socketDoctor.off("resNewNotiFromBooking", handleNewNotification);
      };
    }
  }, [socketDoctor, isAuthenticatedDoctor]);

  useEffect(() => {
    if (dataCustomer?.notifications && path !== "/doctor-owner") {
      if (paginate.page === 1) {
        setNotifications(dataCustomer?.notifications);
        setUnreadCount(dataCustomer?.unreadCount);
      } else {
        setNotifications((prev) => {
          const existingIds = new Set(prev.map((noti) => noti._id));
          const newNotifications = dataCustomer.notifications.filter(
            (noti) => !existingIds.has(noti._id)
          );
          return [...prev, ...newNotifications];
        });
      }
    }
  }, [dataCustomer?.notifications, paginate.page, path]);

  useEffect(() => {
    if (dataDoctor?.notifications && path === "/doctor-owner") {
      if (paginate.page === 1) {
        setNotifications(dataDoctor?.notifications);
        setUnreadCount(dataDoctor?.unreadCount);
      } else {
        setNotifications((prev) => {
          const existingIds = new Set(prev.map((noti) => noti._id));
          const newNotifications = dataDoctor.notifications.filter(
            (noti) => !existingIds.has(noti._id)
          );
          return [...prev, ...newNotifications];
        });
      }
    }
  }, [dataDoctor?.notifications, paginate.page, path]);

  const handleSeeMoreCustomer = useCallback(() => {
    if (dataCustomer?.hasMore) {
      setPaginate((prev) => ({
        ...prev,
        page: prev.page + 1,
      }));
    }
  }, [dataCustomer?.hasMore]);

  const handleSeeMoreDoctor = useCallback(() => {
    if (dataDoctor?.hasMore) {
      setPaginate((prev) => ({
        ...prev,
        page: prev.page + 1,
      }));
    }
  }, [dataDoctor?.hasMore]);

  const handleClickNofi = async (notification, isNavigate = false) => {
    if (notification.isRead && !isNavigate) return;

    const payload =
      path !== "/doctor-owner"
        ? {
            id: notification._id,
            recipient: notification.recipient,
          }
        : {
            id: notification._id,
            recipient: notification.recipient,
            path: "mark-as-read-doctor",
          };

    const res = await dispatch(markNotificationAsRead(payload)).unwrap();

    if (res.success) {
      path === "/doctor-owner" ? refetchDoctor() : refetchCustomer();
      if (isNavigate && notification.metadata?.link) {
        navigate(notification.metadata.link);
      }
    }
  };

  const handleMarkAllNoti = async () => {
    const payload =
      path !== "/doctor-owner"
        ? {
            type: "BOOKING",
          }
        : {
            type: "BOOKING",
            path: "mark-all-as-read-doctor",
          };
    const res = await dispatch(markAllNotificationsAsRead(payload)).unwrap();

    if (res.success) {
      path === "/doctor-owner" ? refetchDoctor() : refetchCustomer();
    }
  };

  const notificationList = (
    <div className="w-[350px] lg:w-[420px] bg-white rounded-xl shadow-2xl mr-4 mt-2">
      <div className="p-4 border-b border-gray-100 flex justify-between items-center">
        <div>
          <h3 className="font-semibold text-base text-gray-800">
            📢 Thông báo
          </h3>
          <p className="text-gray-500 text-xs lg:text-sm">
            Bạn có {unreadCount} thông báo chưa đọc
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            onClick={handleMarkAllNoti}
            type="link"
            className="text-xs underline lg:text-sm"
          >
            Đánh dấu tất cả đã đọc
          </Button>
        </div>
      </div>

      <div className="max-h-[460px] overflow-auto">
        {isLoadingCustomer ||
          (isLoadingDoctor && (
            <div className="space-y-4">
              <Skeleton />
              <Skeleton />
            </div>
          ))}
        {(!isLoadingCustomer || !isLoadingDoctor) &&
        notifications.length === 0 ? (
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
                          <span className="w-[6px] h-[6px] rounded-full bg-blue-600 mt-2" />
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
                            onClick={() => handleClickNofi(notification)}
                            type="link"
                          >
                            {" "}
                            Đánh dấu đã đọc
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {(hasMoreCustomer || hasMoreDoctor) && (
              <div className="p-4 text-center border-t border-gray-100">
                <button
                  onClick={
                    path === "/doctor-owner"
                      ? handleSeeMoreDoctor
                      : handleSeeMoreCustomer
                  }
                  disabled={isLoadingCustomer}
                  className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700
                    transition-colors duration-200 text-sm font-medium disabled:opacity-70"
                >
                  {isLoadingCustomer ||
                  isFetchingCustomer ||
                  isLoadingDoctor ||
                  isFetchingDoctor
                    ? "Đang tải..."
                    : "Xem thêm thông báo"}
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
      placement="bottom"
      trigger={["click"]}
      arrow={{ pointAtCenter: true }}
      open={dropdownOpen}
      onOpenChange={setDropdownOpen}
    >
      <Badge count={unreadCount} offset={[-9, 4]} color="cyan">
        <div className="h-10 w-10 bg-slate-50 hover:bg-slate-100 rounded-full flex items-center justify-center cursor-pointer">
          <IoNotificationsOutline className="text-slate-500 text-2xl" />
        </div>
      </Badge>
    </Dropdown>
  );
};

export default NotificationBookingDrop;
