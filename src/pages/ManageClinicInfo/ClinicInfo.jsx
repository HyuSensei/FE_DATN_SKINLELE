import React, { useEffect, useState } from "react";
import { Empty, Card, Descriptions, Tag, Timeline, Carousel, Select } from "antd";
import { IoMdMail, IoMdCall, IoMdCreate, IoMdAdd } from "react-icons/io";
import { IoBusiness, IoLocationSharp } from "react-icons/io5";
import CustomButton from "@/components/CustomButton";
import { useGetClinicDetailByAdminQuery } from "@/redux/clinic/clinic.query";
import LoadingAdmin from "@/components/Loading/LoadingAdmin";
import { MdDone } from "react-icons/md";
import EditBanner from "./Edit/EditBanner";
import EditInfo from "./Edit/EditInfor";
import EditImages from "./Edit/EditImages";
import EditSchedule from "./Edit/EditSchedule";
import dayjs from "dayjs";
import "dayjs/locale/vi";
import { updateClinicByOwner } from "@/redux/clinic/clinic.thunk";
import { useDispatch } from "react-redux";
import moment from "@utils/monentTz";

const ClinicInfo = ({ setAction }) => {
  const dispatch = useDispatch()
  const {
    data: clinic,
    isLoading,
    error,
    refetch,
  } = useGetClinicDetailByAdminQuery();
  const [isEdit, setIsEdit] = useState({
    edit: false,
    banners: false,
    info: false,
    schedule: false,
    images: false,
  });
  const [currentDate, setCurrentDate] = useState(dayjs().locale("vi"));

  useEffect(() => {
    dayjs.locale("vi");
    setCurrentDate(dayjs().locale("vi"));
  }, []);

  const months = dayjs
    .months()
    .map((month) => month.charAt(0).toUpperCase() + month.slice(1));
  const years = Array.from({ length: 21 }, (_, i) => dayjs().year() + i);
  const daysOfWeek = dayjs.weekdaysShort();
  const today = dayjs();

  const daysInMonth = currentDate.daysInMonth();
  const startOfMonth = currentDate.startOf("month").day();
  const monthDays = Array.from({ length: daysInMonth }, (_, i) =>
    currentDate.date(i + 1).format("YYYY-MM-DD")
  );

  const handleMonthChange = (value) => setCurrentDate(currentDate.month(value));
  const handleYearChange = (value) => setCurrentDate(currentDate.year(value));

  const holidays = clinic ? clinic.holidays : []

  const isHoliday = (date) => {
    return holidays.some(
      (holiday) =>
        dayjs(holiday).format("YYYY-MM-DD") === dayjs(date).format("YYYY-MM-DD")
    );
  };

  const handleChangeEdit = (key, value) => {
    setIsEdit((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  if (isLoading) {
    return <LoadingAdmin />;
  }

  if (!clinic || error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <Empty
          description={
            <div className="text-center">
              <p className="text-gray-500 mb-4">Chưa có thông tin phòng khám</p>
              <CustomButton
                variant="primary"
                icon={<IoMdAdd />}
                onClick={() => setAction("create")}
              >
                Tạo thông tin phòng khám
              </CustomButton>
            </div>
          }
        />
      </div>
    );
  }

  const EditButton = ({ onClick }) => (
    <CustomButton
      variant="primary"
      icon={<IoMdCreate />}
      onClick={onClick}
      size="middle"
    >
      Chỉnh sửa
    </CustomButton>
  );

  const handleUpdateHolidays = async (date) => {
    const newHolidays = holidays.some((h) =>
      moment(h).startOf("day").isSame(moment(date).startOf("day"))
    )
      ? holidays.filter(
        (h) => !moment(h).startOf("day").isSame(moment(date).startOf("day"))
      )
      : [...holidays, date];

    const res = await dispatch(
      updateClinicByOwner({ holidays: newHolidays })
    ).unwrap();

    if (res.success) {
      refetch()
    }

  };

  return (
    <div className="p-6 space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-center flex-wrap gap-2">
        <div className="flex items-center space-x-4">
          <img
            src={clinic.logo.url}
            className="border-2 border-gray-200 rounded-full w-28 h-28"
          />
          <div>
            <h1 className="text-2xl font-bold text-gray-800 uppercase">
              {clinic.name}
            </h1>
          </div>
        </div>
        <div className="flex gap-2 items-center">
          {isEdit.edit ? (
            <CustomButton
              variant="default"
              icon={<MdDone />}
              onClick={(prev) =>
                setIsEdit({
                  ...prev,
                  edit: false,
                  banners: false,
                  info: false,
                  schedule: false,
                  images: false,
                })
              }
            >
              Xong
            </CustomButton>
          ) : (
            <CustomButton
              variant="primary"
              icon={<IoMdCreate />}
              onClick={() => {
                setIsEdit((prev) => ({
                  ...prev,
                  edit: true,
                }));
              }}
            >
              Chỉnh sửa thông tin
            </CustomButton>
          )}
        </div>
      </div>

      {/* Banner Section */}
      {isEdit.banners ? (
        <EditBanner
          {...{
            banners: clinic.banners,
            handleChangeEdit,
            refetch,
          }}
        />
      ) : (
        <Card
          title="Ảnh nền phòng khám"
          className="shadow-sm"
          extra={
            isEdit.edit && (
              <EditButton onClick={() => handleChangeEdit("banners", true)} />
            )
          }
        >
          {!clinic.banners.length ? (
            <Empty />
          ) : (
            <Carousel autoplay dots={false} arrows>
              {clinic.banners.map((banner, index) => (
                <div key={index} className="max-h-96">
                  <img
                    src={banner.url}
                    alt={`Banner ${index + 1}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              ))}
            </Carousel>
          )}
        </Card>
      )}

      {/* Main Content */}
      {isEdit.info ? (
        <EditInfo {...{ clinic, handleChangeEdit, refetch }} />
      ) : (
        <Card
          title="Thông tin chi tiết"
          className="shadow-sm"
          extra={
            isEdit.edit && (
              <EditButton onClick={() => handleChangeEdit("info", true)} />
            )
          }
        >
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
      )}
      {isEdit.schedule ? (
        <EditSchedule
          {...{ workingHours: clinic.workingHours, handleChangeEdit, refetch }}
        />
      ) : (
        <Card
          title="Lịch làm việc"
          className="shadow-sm"
          extra={
            isEdit.edit && (
              <EditButton onClick={() => handleChangeEdit("schedule", true)} />
            )
          }
        >
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
          {/* Calendar Section */}
          <div className="mb-4">
            <h3 className="text-lg font-medium">Ngày nghỉ</h3>
            <div className="text-sm text-gray-400">💡Thông tin ngày nghỉ được đánh dấu đỏ</div>
          </div>
          <div className="flex justify-between items-center mb-6 flex-wrap gap-2">
            <Select
              className="w-full lg:w-36"
              size="middle"
              value={currentDate.month()}
              onChange={handleMonthChange}
            >
              {months.map((month, index) => (
                <Select.Option key={index} value={index}>
                  {month}
                </Select.Option>
              ))}
            </Select>
            <Select
              className="w-full lg:w-36"
              size="middle"
              value={currentDate.year()}
              onChange={handleYearChange}
            >
              {years.map((year) => (
                <Select.Option key={year} value={year}>
                  {year}
                </Select.Option>
              ))}
            </Select>
          </div>

          <div className="grid grid-cols-7 gap-2 text-center mb-4">
            {daysOfWeek.map((day) => (
              <div
                key={day}
                className="text-xs md:text-sm py-2 rounded-lg bg-blue-50 text-blue-600 font-medium"
              >
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: startOfMonth }).map((_, i) => (
              <div key={`empty-${i}`} className="h-14"></div>
            ))}
            {monthDays.map((date) => {
              const isPast = dayjs(date).isBefore(today, "day");
              const holiday = isHoliday(date);
              return (
                <div
                  onClick={() => handleUpdateHolidays(date)}
                  key={date}
                  className={`h-14 flex flex-col items-center justify-center rounded-lg border-2 transition-all shadow-md cursor-pointer
                    ${holiday
                      ? "border-red-300 bg-red-50 text-red-800"
                      : "bg-white hover:bg-blue-50 border border-gray-200"
                    } ${isPast ? "opacity-50" : "hover:border-rose-400 hover:bg-rose-100 hover:shadow-md"}`}
                >
                  <span className="text-xs font-medium text-gray-500">
                    {dayjs(date).format("ddd")}
                  </span>
                  <span className="text-lg font-semibold">
                    {dayjs(date).date()}
                  </span>
                </div>
              );
            })}
          </div>
        </Card>
      )}
      {/* Gallery */}
      {isEdit.images ? (
        <EditImages
          {...{ images: clinic.images || [], handleChangeEdit, refetch }}
        />
      ) : (
        <Card
          title="Hình ảnh phòng khám"
          className="shadow-sm"
          extra={
            isEdit.edit && (
              <EditButton onClick={() => handleChangeEdit("images", true)} />
            )
          }
        >
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
      )}
    </div>
  );
};

export default ClinicInfo;
