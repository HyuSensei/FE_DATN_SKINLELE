import React, { useEffect, useState } from "react";
import { Rate, Tabs, Tag, Avatar, Card, Empty } from "antd";
import {
  UserOutlined,
  PhoneOutlined,
  MailOutlined,
  DollarOutlined,
  StarOutlined,
  MedicineBoxOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import DoctorSchedule from "./DoctorSchedule";
import DoctorReview from "./DoctorReview";
import CustomButton from "@/components/CustomButton";
import { MdVerified } from "react-icons/md";
import { useParams } from "react-router-dom";
import { useGetDoctorDetailQuery } from "@/redux/doctor/doctor.query";
import { formatPrice } from "@/helpers/formatPrice";
import { RiMapPinFill } from "react-icons/ri";
import useScrollToSection from "@/hook/useScrollToSection";
import StarReview from "@/components/StarReview";
import LoadingClinic from "@/components/Loading/LoadingClinic";
import { useDispatch, useSelector } from "react-redux";
import { FaFacebookMessenger } from "react-icons/fa6";
import { TbBrandBooking } from "react-icons/tb";
import { ChatActions } from "@/redux/chat/chat.slice";
import { setOpenModelAuth } from "@/redux/auth/auth.slice";

const Doctor = () => {
  const dispatch = useDispatch();
  const { slug } = useParams();
  const [activeTab, setActiveTab] = useState("1");
  const sectionRef = useScrollToSection();
  const { socketCustomer: socket, usersOnline } = useSelector(
    (state) => state.socket
  );
  const { openChat, doctorConversationSelected: conversation } = useSelector(
    (state) => state.chat
  );
  const { isAuthenticated, userInfo } = useSelector((state) => state.auth);

  const handleGetConversation = (res) => {
    if (res) {
      dispatch(
        ChatActions.setDoctorConversationSelected({
          ...doctor,
          conversationId: res._id,
        })
      );
    }
  };

  const {
    data: doctor,
    isLoading,
    error,
    refetch,
  } = useGetDoctorDetailQuery({ slug }, { skip: !slug });

  useEffect(() => {
    if (socket && conversation?._id === doctor?._id) {
      socket.on("resConversation", handleGetConversation);
      return () => socket.off("resConversation", handleGetConversation);
    }
  }, [socket, conversation?._id, doctor?._id]);

  if (error)
    return (
      <Empty
        className="mt-40"
        description="Có lỗi xảy ra khi lấy thông tin bác sĩ"
      />
    );

  if (isLoading) return <LoadingClinic />;

  if (!doctor)
    return (
      <Empty className="mt-40" description="Không tìm thấy thông tin bác sĩ" />
    );

  const { clinic } = doctor;
  const isOnline = usersOnline?.includes(doctor?._id);

  const handleStartChat = () => {
    if (!isAuthenticated) {
      dispatch(setOpenModelAuth(true));
      return;
    }
    if (socket) {
      socket.emit(
        "getConversation",
        JSON.stringify([doctor._id, userInfo?._id])
      );
      dispatch(ChatActions.setDoctorConversationSelected(doctor));
      dispatch(
        ChatActions.setOpenChatAll({
          ...openChat,
          isChatDoctor: true,
          isConversationDoctor: false,
        })
      );
    }
  };

  return (
    <div className="mx-auto lg:px-16 mt-28 mb-10">
      {/* Doctor Profile Card */}
      <div className="p-6 min-h-screen">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Column - Avatar & Quick Info */}
          <div className="w-full md:w-1/4">
            <div className="sticky top-24">
              <div className="relative mb-6">
                <Avatar
                  src={doctor.avatar.url}
                  size={240}
                  className="w-full rounded-full shadow-lg border-4 border-[#b4dfeb]"
                />
                {isOnline && (
                  <span className="absolute top-4 right-4 bg-green-500 w-4 h-4 rounded-full shadow-lg ring-2 ring-white"></span>
                )}
              </div>

              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center">
                    <StarOutlined className="text-yellow-500" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Đánh giá</p>
                    <Rate
                      value={doctor?.statistics?.averageRating}
                      disabled
                      allowHalf
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                    <MedicineBoxOutlined className="text-green-500" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Chuyên khoa</p>
                    <p className="font-medium">{doctor.specialty}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Main Content */}
          <div className="w-full md:w-3/4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                    BS. {doctor.name}
                  </h1>
                  <MdVerified className="text-blue-500 text-2xl" />
                </div>
                <div className="flex flex-wrap gap-2 mb-3">
                  <Tag color="blue" className="rounded-full px-3 py-1">
                    {doctor.specialty}
                  </Tag>
                  <Tag color="green" className="rounded-full px-3 py-1">
                    {doctor.experience} năm kinh nghiệm
                  </Tag>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <CustomButton
                  onClick={handleStartChat}
                  icon={
                    <FaFacebookMessenger className="text-xl text-gray-500 mr-0.5" />
                  }
                  className="mt-4 md:mt-0 px-6 py-2 text-lg"
                >
                  Liên hệ
                </CustomButton>
                <CustomButton
                  icon={<TbBrandBooking className="text-xl" />}
                  onClick={() => {
                    setActiveTab("1");
                    sectionRef.scrollToSection();
                  }}
                  variant="primary"
                  className="mt-4 md:mt-0 px-6 py-2 text-lg"
                >
                  Đặt lịch khám
                </CustomButton>
              </div>
            </div>
            <Card className="mb-8">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <Avatar
                  src={clinic.logo.url}
                  size={80}
                  className="border-2 border-blue-100"
                />
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                      <h2 className="text-xl font-bold text-gray-800 mb-2">
                        {clinic.name}
                      </h2>
                      <div className="flex flex-wrap gap-4 text-gray-500 text-sm mb-2">
                        <span className="flex items-center gap-2">
                          <PhoneOutlined /> {clinic.phone}
                        </span>
                        <span className="flex items-center gap-2">
                          <MailOutlined /> {clinic.email}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-500 text-sm">
                        <RiMapPinFill />
                        <p
                          dangerouslySetInnerHTML={{
                            __html: clinic.address,
                          }}
                        />
                      </div>
                    </div>
                    <Link
                      to={`/clinic-detail/${clinic.slug}`}
                      className="inline-flex items-center gap-2 text-blue-500 hover:text-blue-600 font-medium min-w-[200px]"
                    >
                      Xem chi tiết phòng khám
                      <ArrowRightOutlined />
                    </Link>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {clinic.specialties.slice(0, 3).map((specialty, index) => (
                      <Tag key={index} color="blue" className="rounded-full">
                        {specialty}
                      </Tag>
                    ))}
                    {clinic.specialties.length > 3 && (
                      <Tag color="default" className="rounded-full">
                        +{clinic.specialties.length - 3}
                      </Tag>
                    )}
                  </div>
                </div>
              </div>
            </Card>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <PhoneOutlined className="text-blue-600 text-xl" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Điện thoại</p>
                  <p className="font-medium text-lg">{doctor.phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-green-50 rounded-lg">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                  <MailOutlined className="text-green-600 text-xl" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Email</p>
                  <p className="font-medium text-lg">{doctor.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-purple-50 rounded-lg">
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                  <UserOutlined className="text-purple-600 text-xl" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Kinh nghiệm</p>
                  <p className="font-medium text-lg">{doctor.experience} năm</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-orange-50 rounded-lg">
                <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                  <DollarOutlined className="text-orange-600 text-xl" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Phí khám</p>
                  <p className="font-medium text-lg">
                    {formatPrice(doctor.fees)} VNĐ
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">
                Giới thiệu
              </h3>
              <div
                className="prose prose-blue max-w-none text-gray-600"
                dangerouslySetInnerHTML={{ __html: doctor.about }}
              />
            </div>

            <div
              className="bg-white rounded-lg shadow-lg overflow-hidden"
              ref={sectionRef.ref}
            >
              <Tabs
                activeKey={activeTab}
                onChange={setActiveTab}
                items={[
                  {
                    key: "1",
                    label: (
                      <span className="flex items-center gap-2">Lịch khám</span>
                    ),
                    children: <DoctorSchedule {...{ doctor }} />,
                  },
                  {
                    key: "2",
                    label: (
                      <span className="flex items-center gap-2">Đánh giá</span>
                    ),
                    children: (
                      <DoctorReview doctor={doctor} refetchDoctor={refetch} />
                    ),
                  },
                ]}
                className="p-4"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Doctor;
