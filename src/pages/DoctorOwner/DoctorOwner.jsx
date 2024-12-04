import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card } from "antd";
import SidebarMenu from "./SidebarMenu/SidebarMenu";
import ManageStatistic from "./ContentOwner/ManageStatistic";
import ManageBooking from "./ContentOwner/ManageBooking";
import ManageProfile from "./ContentOwner/ManageProfile";
import ManageReview from "./ContentOwner/ManageReview";
import ManageSchedule from "./ContentOwner/ManageSchedule";

const DoctorOwner = () => {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState("statistics");
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
    <div className="mt-24 p-4 md:p-6 min-h-screen">
      <div className="flex flex-col lg:flex-row max-w-[1900px] mx-auto gap-6">
        {/* Sticky Sidebar */}
        <div className="w-full lg:w-80 lg:sticky lg:top-20">
          <SidebarMenu
            activeMenu={activeMenu}
            onMenuSelect={handleSelectedMenu}
          />
        </div>

        {/* Content Area */}
        <div className="flex-1 min-w-0 order-2">
          <Card
            className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 shadow-lg border-2"
            bordered={false}
          >
            <div className="m-0 text-gray-800 flex items-center gap-2 uppercase text-2xl font-bold">
              {title}
            </div>
            {activeMenu === "statistics" && <ManageStatistic />}
            {activeMenu === "bookings" && <ManageBooking />}
            {activeMenu === "profile" && <ManageProfile />}
            {activeMenu === "reviews" && <ManageReview />}
            {activeMenu === "schedules" && <ManageSchedule />}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DoctorOwner;
