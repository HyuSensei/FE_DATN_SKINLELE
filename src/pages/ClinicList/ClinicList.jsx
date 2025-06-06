import CustomButton from "@/components/CustomButton";
import EmptyData from "@/components/Error/EmptyData";
import {
  useGetClinicsByCustomerQuery,
  useGetFilterOptionsClinicQuery,
} from "@/redux/clinic/clinic.query";
import React, { useCallback, useEffect, useState } from "react";
import { FaFilter } from "react-icons/fa6";
import FilterPanel from "./FilterPanel";
import FilterTag from "./FilterTag";
import { LuRefreshCcw } from "react-icons/lu";
import { Button, Card, Empty, Spin } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import ClinicCard from "@/components/Item/ClinicCard";
import ClinicBanner from "./ClinicBanner";

const ClinicList = () => {
  const [paginate, setPaginate] = useState({
    page: 1,
    pageSize: 6,
  });
  const { data: filterOptions, isLoading: isLoadingFilters } =
    useGetFilterOptionsClinicQuery();
  const [selectedFilters, setSelectedFilters] = useState({
    specialties: "",
    priceRange: "",
    doctorCount: "",
    rating: "",
    workingHours: "",
    search: "",
  });
  const [isMobileFilterVisible, setIsMobileFilterVisible] = useState(false);
  const { data: dataClinics, isLoading: isLoadingClinics } =
    useGetClinicsByCustomerQuery(
      {
        ...paginate,
        ...selectedFilters,
      },
      { refetchOnMountOrArgChange: false }
    );
  const [clinics, setClinics] = useState(dataClinics?.clinics || []);

  useEffect(() => {
    if (dataClinics?.clinics) {
      if (paginate.page === 1) {
        setClinics(dataClinics.clinics);
      } else {
        setClinics((prev) => {
          const existingIds = new Set(prev.map((clinic) => clinic._id));
          const newClinics = dataClinics.clinics.filter(
            (clinic) => !existingIds.has(clinic._id)
          );
          return [...prev, ...newClinics];
        });
      }
    }
  }, [dataClinics, paginate.page]);

  const handleSeenMore = useCallback(() => {
    if (dataClinics?.hasMore) {
      setPaginate((prev) => ({
        ...prev,
        page: prev.page + 1,
      }));
    }
  }, [dataClinics?.hasMore]);

  if (!dataClinics && !isLoadingClinics) {
    return (
      <EmptyData description="Có lỗi xảy ra khi lấy danh sách phòng khám" />
    );
  }

  const { hasMore = false } = dataClinics || {};

  return (
    <div className="mx-auto lg:px-16 mt-20 mb-10">
      <div className="p-6">
        <ClinicBanner />
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
            className={`
            lg:w-1/4 
            ${isMobileFilterVisible ? "block" : "hidden"} 
            lg:block
          `}
          >
            <Card className="sticky top-24">
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

          {/* Clinics List */}
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

            <Card className="min-h-screen">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-800">
                  Danh sách phòng khám
                </h2>
                <CustomButton
                  icon={<LuRefreshCcw />}
                  onClick={() => setSelectedFilters({})}
                >
                  Làm mới bộ lọc
                </CustomButton>
              </div>
              <Spin spinning={isLoadingClinics} tip="Loading...">
                {clinics.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {clinics.map((clinic, index) => (
                      <ClinicCard key={index} clinic={clinic} />
                    ))}
                  </div>
                ) : !isLoadingClinics ? (
                  <div className="flex justify-center">
                    <Empty description="Danh sách phòng khám trống" />
                  </div>
                ) : null}
                {hasMore && (
                  <div className="flex justify-center mt-4">
                    <Button
                      onClick={handleSeenMore}
                      type="link"
                      className="w-full flex items-center justify-center gap-2 text-blue-600 mt-4"
                    >
                      Xem thêm phòng khám <ArrowRightOutlined />
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

export default ClinicList;
