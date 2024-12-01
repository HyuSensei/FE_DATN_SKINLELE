import React from "react";
import {
  Empty,
  Card,
  Descriptions,
  Avatar,
  Button,
  Tag,
  Row,
  Col,
  Timeline,
} from "antd";
import { IoMdMail, IoMdCall, IoMdCreate, IoMdAdd } from "react-icons/io";
import { IoBusiness, IoLocationSharp } from "react-icons/io5";
import CustomButton from "@components/CustomButton/CustomButton";
import { useGetClinicDetailByAdminQuery } from "@/redux/clinic/clinic.query";

const ClinicInfo = ({ setAction }) => {
  const {
    data: clinic,
    isLoading,
    error,
    refetch,
  } = useGetClinicDetailByAdminQuery();

  if (!clinic) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <Empty
          description={
            <div className="text-center">
              <p className="text-gray-500 mb-4">Chưa có thông tin phòng khám</p>
              <Button
                type="primary"
                icon={<IoMdAdd className="w-5 h-5" />}
                size="large"
                className="bg-blue-500"
              >
                Tạo thông tin phòng khám
              </Button>
            </div>
          }
        />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Avatar
            src={clinic.logo?.url}
            size={64}
            className="border-2 border-gray-200"
          />
          <div>
            <h1 className="text-2xl font-bold text-gray-800 uppercase">
              {clinic.name}
            </h1>
          </div>
        </div>
        <CustomButton variant="primary" icon={<IoMdCreate />}>
          Chỉnh sửa thông tin
        </CustomButton>
      </div>

      {/* Main Content */}
      <Row gutter={16}>
        <Col xs={24} lg={16}>
          <Card title="Thông tin chi tiết" className="shadow-sm">
            <Descriptions column={1} className="mb-4">
              <Descriptions.Item
                label={
                  <div className="flex items-center">
                    <IoMdMail className="mr-2" />
                    Email
                  </div>
                }
              >
                {clinic.email}
              </Descriptions.Item>
              <Descriptions.Item
                label={
                  <div className="flex items-center">
                    <IoMdCall className="mr-2" />
                    Số điện thoại
                  </div>
                }
              >
                {clinic.phone}
              </Descriptions.Item>
              <Descriptions.Item
                label={
                  <div className="flex items-center">
                    <IoLocationSharp className="mr-2" />
                    Địa chỉ
                  </div>
                }
              >
                <div dangerouslySetInnerHTML={{ __html: clinic.address }} />
              </Descriptions.Item>
              <Descriptions.Item
                label={
                  <div className="flex items-center">
                    <IoBusiness className="mr-2" />
                    Mô tả
                  </div>
                }
              >
                <div dangerouslySetInnerHTML={{ __html: clinic.description }} />
              </Descriptions.Item>
            </Descriptions>

            <div className="mb-4">
              <h4 className="font-medium mb-2">Chuyên khoa:</h4>
              <div className="flex flex-wrap gap-2">
                {clinic.specialties.map((specialty, index) => (
                  <Tag
                    key={index}
                    color="blue"
                    className="px-3 py-1 rounded-full"
                  >
                    {specialty}
                  </Tag>
                ))}
              </div>
            </div>
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          <Card title="Lịch làm việc" className="shadow-sm">
            <Timeline
              items={clinic.workingHours.map((hours) => ({
                color: hours.isOpen ? "blue" : "gray",
                children: (
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{hours.dayOfWeek}</span>
                    <span className="text-gray-600">
                      {hours.isOpen
                        ? `${hours.startTime} - ${hours.endTime}`
                        : "Đóng cửa"}
                    </span>
                  </div>
                ),
              }))}
            />
          </Card>
        </Col>
      </Row>

      {/* Gallery */}
      <Card title="Hình ảnh phòng khám" className="shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {clinic.images.map((image, index) => (
            <div
              key={index}
              className="relative aspect-video rounded-lg overflow-hidden"
            >
              <img
                src={image.url}
                alt={`Clinic image ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default ClinicInfo;
