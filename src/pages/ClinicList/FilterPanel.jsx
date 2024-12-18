import { Empty, Radio, Skeleton, Statistic, Tag } from "antd";
import React from "react";

const FilterPanel = ({
  filterOptions = null,
  isLoading,
  setSelectedFilters,
  selectedFilters,
}) => {
  if (!filterOptions && !isLoading) {
    return <Empty description="Đã có lỗi xảy ra vui lòng thử lại !" />;
  }

  if (isLoading) return <Skeleton active />;

  const FilterSection = ({ title, icon, children, stats }) => (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 text-gray-700 font-medium">
          {icon}
          <h3 className="text-base">{title}</h3>
        </div>
        {stats && <span className="text-sm text-gray-500">{stats}</span>}
      </div>
      {children}
    </div>
  );

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <div className="space-y-1">
          <h2 className="text-xl font-bold text-gray-800">
            🔎 Bộ lọc tìm kiếm
          </h2>
          <div className="flex gap-4 py-4">
            <Statistic
              title="Tổng phòng khám"
              value={filterOptions.status.stats.total || 0}
              className="!text-sm"
            />
            <Statistic
              title="Đang hoạt động"
              value={filterOptions.status.stats.activeCount || 0}
              className="!text-sm"
            />
          </div>
        </div>
      </div>

      {/* Price Range Filter */}
      <FilterSection
        title="Mức phí"
        stats={`${filterOptions.prices.stats.formatted.min} - ${filterOptions.prices.stats.formatted.max}  VND`}
      >
        <div className="px-2">
          {filterOptions.prices.ranges.map((range) => (
            <div
              key={range.value}
              onClick={() =>
                setSelectedFilters((prev) => ({
                  ...prev,
                  priceRange:
                    prev.priceRange === range.value ? null : range.value,
                }))
              }
              className={`p-2 rounded-lg cursor-pointer mb-2 transition-colors ${
                selectedFilters.priceRange === range.value
                  ? "bg-blue-50 text-blue-600"
                  : "hover:bg-gray-50"
              }`}
            >
              {range.label}
            </div>
          ))}
        </div>
      </FilterSection>

      {/* Doctor Count Filter */}
      <FilterSection title="Số lượng bác sĩ">
        <Radio.Group
          value={selectedFilters.doctorCount}
          onChange={(e) =>
            setSelectedFilters((prev) => ({
              ...prev,
              doctorCount: e.target.value,
            }))
          }
          className="flex flex-col gap-2"
        >
          {filterOptions.doctorCounts.options.map((count) => (
            <Radio
              key={count.value}
              value={count.value}
              className="text-gray-600"
            >
              {count.label}
            </Radio>
          ))}
        </Radio.Group>
      </FilterSection>

      {/* Rating Filter */}
      <FilterSection
        title="Đánh giá"
        stats={`${filterOptions.ratings.stats.averageRating} trung bình`}
      >
        {filterOptions.ratings.options.map((rating) => (
          <div
            key={rating.value}
            onClick={() =>
              setSelectedFilters((prev) => ({
                ...prev,
                rating: prev.rating === rating.value ? null : rating.value,
              }))
            }
            className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer mb-2 transition-colors ${
              selectedFilters.rating === rating.value
                ? "bg-blue-50 text-blue-600"
                : "hover:bg-gray-50"
            }`}
          >
            <span className="text-sm">{rating.label}</span>
          </div>
        ))}
      </FilterSection>

      {/* Working Hours Filter */}
      <FilterSection title="Thời gian làm việc">
        <Radio.Group
          value={selectedFilters.workingHours}
          onChange={(e) =>
            setSelectedFilters((prev) => ({
              ...prev,
              workingHours: e.target.value,
            }))
          }
          className="flex flex-col gap-2"
        >
          {filterOptions.workingHours.map((time) => (
            <Radio
              key={time.value}
              value={time.value}
              className="text-gray-600"
            >
              {time.label}
            </Radio>
          ))}
        </Radio.Group>
      </FilterSection>
    </>
  );
};

export default FilterPanel;
