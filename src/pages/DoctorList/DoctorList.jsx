import React, { useCallback, useEffect, useState } from "react";
import {
  useGetDoctorsByCustomerQuery,
  useGetFilterOptionsDoctorQuery,
} from "@/redux/doctor/doctor.query";
import { Button, Card, Empty, Spin } from "antd";
import { FaFilter } from "react-icons/fa";
import CustomButton from "@/components/CustomButton";
import { LuRefreshCcw } from "react-icons/lu";
import FilterPanel from "./FilterPanel";
import FilterTag from "./FilterTag";
import EmptyData from "@/components/Error/EmptyData";
import { ArrowRightOutlined } from "@ant-design/icons";
import DoctorCard from "@/components/Item/DoctorCard";
import DermatologistBanner from "./DermatologistBanner";

const DoctorList = () => {
  const [paginate, setPaginate] = useState({
    page: 1,
    pageSize: 9,
  });
  const [selectedFilters, setSelectedFilters] = useState({
    specialty: "",
    experience: "",
    priceRange: "",
    rating: "",
    clinic: "",
    search: "",
  });
  const [isMobileFilterVisible, setIsMobileFilterVisible] = useState(false);
  const { data: filterOptions, isLoading: isLoadingFilters } =
    useGetFilterOptionsDoctorQuery();

  const { data: dataDoctors, isLoading: isLoadingDoctors } =
    useGetDoctorsByCustomerQuery({
      ...paginate,
      ...selectedFilters,
    });
  const [doctors, setDoctors] = useState(dataDoctors?.doctors || []);

  useEffect(() => {
    if (dataDoctors?.doctors) {
      if (paginate.page === 1) {
        setDoctors(dataDoctors.doctors);
      } else {
        setDoctors((prev) => {
          const existingIds = new Set(prev.map((doctor) => doctor._id));
          const newDoctors = dataDoctors.doctors.filter(
            (doctor) => !existingIds.has(doctor._id)
          );
          return [...prev, ...newDoctors];
        });
      }
    }
  }, [dataDoctors, paginate.page]);

  const handleSeenMore = useCallback(() => {
    if (dataDoctors?.hasMore) {
      setPaginate((prev) => ({
        ...prev,
        page: prev.page + 1,
      }));
    }
  }, [dataDoctors?.hasMore]);

  if (!dataDoctors && !isLoadingDoctors) {
    return <EmptyData description="Có lỗi xảy ra khi lấy danh sách bác sĩ" />;
  }

  const { hasMore = false } = dataDoctors || {};

  return (
    <div className="mx-auto lg:px-16 mt-20 mb-10">
      <div className="p-6">
        <DermatologistBanner />
        {/* Mobile Filter Toggle */}
        <div className="lg:hidden mb-4">
          <CustomButton
            onClick={() => setIsMobileFilterVisible(!isMobileFilterVisible)}
            icon={<FaFilter />}
          >
            {isMobileFilterVisible ? "Ẩn bộ lọc" : "Hiện bộ lọc"}
          </CustomButton>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters Panel */}
          <div
            className={`lg:w-1/4 ${isMobileFilterVisible ? "block" : "hidden"
              } lg:block`}
          >
            <Card className="sticky top-24 ">
              <FilterPanel
                {...{
                  filterOptions,
                  isLoading: isLoadingFilters,
                  setSelectedFilters,
                  selectedFilters,
                }}
              />
            </Card>
          </div>

          {/* Doctors List */}
          <div className="lg:w-3/4">
            {/* Applied Filters */}
            <div className="flex flex-wrap">
              <FilterTag
                {...{
                  selectedFilters,
                  filterOptions,
                  setSelectedFilters,
                }}
              />
            </div>

            {/* Temporary Empty State */}
            <Card className="min-h-screen">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-800">
                  Danh sách bác sĩ
                </h2>
                <CustomButton
                  icon={<LuRefreshCcw />}
                  onClick={() => setSelectedFilters({})}
                >
                  Làm mới bộ lọc
                </CustomButton>
              </div>
              <Spin spinning={isLoadingDoctors} tip="Loading...">
                {doctors.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {doctors.map((doctor, index) => (
                      <DoctorCard key={index} doctor={doctor} />
                    ))}
                  </div>
                ) : !isLoadingDoctors ? (
                  <div className="flex justify-center">
                    <Empty description="Danh sách bác sĩ trống" />
                  </div>
                ) : null}

                {hasMore && (
                  <div className="flex justify-center mt-4">
                    <Button
                      onClick={handleSeenMore}
                      type="link"
                      className="flex items-center gap-2 text-blue-600"
                    >
                      Xem thêm bác sĩ <ArrowRightOutlined />
                    </Button>
                  </div>
                )}
              </Spin>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorList;
