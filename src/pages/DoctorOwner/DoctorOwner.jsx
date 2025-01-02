import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card } from "antd";
import SidebarMenu from "./SidebarMenu/SidebarMenu";
import ManageStatistic from "./ContentOwner/ManageStatistic";
import ManageBooking from "./ContentOwner/ManageBooking";
import ManageProfile from "./ContentOwner/ManageProfile";
import ManageReview from "./ContentOwner/ManageReview";
import ManageSchedule from "./ContentOwner/ManageSchedule";
import ManageChat from "./ContentOwner/ManageChat";

const DoctorOwner = () => {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState("");
  const [title, setTitle] = useState("");
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const tab = queryParams.get("tab") || "statistics";

  const getTitleByTab = (tab) => {
    switch (tab) {
      case "statistics":
        return "Thống kê";
      case "bookings":
        return "Quản lý lịch khám";
      case "profile":
        return "Thông tin chung";
      case "reviews":
        return "Danh sách đánh giá";
      case "schedules":
        return "Lịch làm việc";
      case "messages":
        return "";
      default:
        return "";
    }
  };

  const handleSelectedMenu = (id) => {
    const newTitle = getTitleByTab(id);
    setTitle(newTitle);
    setActiveMenu(id);
    navigate(`/doctor-owner?tab=${id}`);
  };

  useEffect(() => {
    setActiveMenu(tab);
    setTitle(getTitleByTab(tab));

    if (!queryParams.get("tab")) {
      navigate("/doctor-owner?tab=statistics");
    }
  }, [navigate]);

  return (
    <div className=" bg-slate-50 p-4 md:p-6 lg:pt-20">
      <div className="flex flex-col lg:flex-row max-w-[1900px] mx-auto h-full gap-6 mt-6">
        <div className="w-full lg:w-80 lg:h-full lg:sticky lg:top-[72px]">
          <SidebarMenu
            activeMenu={activeMenu}
            onMenuSelect={handleSelectedMenu}
          />
        </div>
        <div className="flex-1">
          <div className="flex flex-col w-full h-full min-h-screen">
            <div className="m-0 text-gray-800 flex items-center gap-2 uppercase text-2xl font-bold">
              {title}
            </div>
            {activeMenu === "statistics" && (
              <ManageStatistic {...{ activeMenu }} />
            )}
            {activeMenu === "bookings" && (
              <ManageBooking {...{ activeMenu }} />
            )}
            {activeMenu === "profile" && <ManageProfile />}
            {activeMenu === "reviews" && <ManageReview {...{ activeMenu }} />}
            {activeMenu === "schedules" && <ManageSchedule />}
            {activeMenu === "messages" && <ManageChat />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorOwner;
