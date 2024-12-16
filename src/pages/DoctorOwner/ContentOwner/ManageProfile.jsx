import React, { useEffect, useState } from "react";
import { Tag, Badge, Card } from "antd";
import {
  PhoneOutlined,
  MailOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import { formatPrice } from "@/helpers/formatPrice";
import { isEmpty } from "lodash";
import { useSelector } from "react-redux";
import EditInfor from "./Action/EditInfor";
import CustomButton from "@/components/CustomButton";
import { GoShieldLock } from "react-icons/go";

const ManageProfile = () => {
  const { doctorInfo } = useSelector((state) => state.auth);
  const [isEdit, setIsEdit] = useState(false);
  const {
    name,
    email,
    about,
    avatar,
    fees,
    specialty,
    phone,
    experience,
    duration,
    clinic = {},
  } = doctorInfo;

  return (
    <div className="space-y-6 mt-4">
      {/* Profile Info */}
      {!isEdit ? (
        <>
          <Card className="shadow-sm">
            <div className="flex flex-col md:flex-row gap-6">
              <img
                src={avatar.url}
                alt={name}
                className="w-32 h-32 rounded-full object-cover shadow-md border-4 border-[#e6f0ff]"
              />
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-800">{name}</h2>
                <Badge color="blue" text={specialty} className="mt-2" />
                <div className="flex flex-wrap gap-2 mt-3 w-full">
                  <Tag color="blue" className="text-sm rounded-full p-2">
                    {experience} năm kinh nghiệm
                  </Tag>
                  <Tag color="green" className="text-sm rounded-full p-2">
                    Giá khám: {formatPrice(fees)} VND
                  </Tag>
                  <Tag color="yellow" className="text-sm rounded-full p-2">
                    Thời gian: {duration} phút
                  </Tag>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center gap-3 text-gray-700">
                    <PhoneOutlined className="text-blue-500" />
                    <span>{phone}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <MailOutlined className="text-blue-500" />
                    <span>{email}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <CustomButton
                onClick={() => setIsEdit(true)}
                icon={<GoShieldLock size={20} />}
              >
                Chỉnh sửa và bảo mật
              </CustomButton>
            </div>
          </Card>
          {/* About */}
          <Card className="shadow-sm">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Giới thiệu</h3>
            <div
              className="text-gray-600 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: about }}
            />
          </Card>
        </>
      ) : (
        <EditInfor {...{ setIsEdit }} />
      )}

      {/* Clinic Info */}
      {!isEmpty(clinic) && (
        <Card className="shadow-sm">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            Thông tin phòng khám
          </h3>
          <div className="flex flex-col md:flex-row gap-6">
            <img
              src={clinic.logo.url}
              alt={clinic.name}
              className="w-24 h-24 rounded-lg object-cover"
            />
            <div className="space-y-4 flex-1">
              <div>
                <h4 className="text-lg font-semibold">{clinic.name}</h4>
                <div className="flex items-center gap-2 text-gray-600 mt-1">
                  <EnvironmentOutlined />
                  <span
                    className="text-gray-600 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: clinic.address }}
                  />
                </div>
              </div>
              <div>
                <div className="font-medium mb-2">Chuyên khoa:</div>
                <div className="flex flex-wrap gap-2">
                  {clinic.specialties.map((specialty, index) => (
                    <Tag key={index} color="blue">
                      {specialty}
                    </Tag>
                  ))}
                </div>
              </div>
              <div
                className="text-gray-600"
                dangerouslySetInnerHTML={{ __html: clinic.description }}
              />
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default ManageProfile;
