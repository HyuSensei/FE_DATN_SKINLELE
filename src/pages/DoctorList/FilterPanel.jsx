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
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="space-y-1">
          <h2 className="text-xl font-bold text-gray-800">
            🔎 Bộ lọc tìm kiếm
          </h2>
          <div className="flex gap-4 py-4">
            <Statistic
              title="Tổng bác sĩ"
              value={filterOptions.status.stats.total || 0}
              className="!text-sm"
            />
            <Statistic
              title="Đang hoạt động"
              value={filterOptions.status.stats.active || 0}
              className="!text-sm"
            />
          </div>
        </div>
      </div>

      {/* Specialties Filter */}
      <FilterSection title="Chuyên khoa">
        <div className="flex flex-wrap gap-2">
          {filterOptions.specialties.options.map((specialty) => (
            <Tag
              key={specialty.value}
              className={`cursor-pointer py-1 px-3 rounded-full transition-colors ${
                selectedFilters.specialty === specialty.value
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
              onClick={() =>
                setSelectedFilters((prev) => ({
                  ...prev,
                  specialty:
                    prev.specialty === specialty.value ? null : specialty.value,
                }))
              }
            >
              {specialty.label}
            </Tag>
          ))}
        </div>
      </FilterSection>

      {/* Experience Filter */}
      <FilterSection
        title="Kinh nghiệm"
        stats={`Trung bình ${filterOptions.experience.stats.avg || 0} năm`}
      >
        <Radio.Group
          value={selectedFilters.experience}
          onChange={(e) =>
            setSelectedFilters((prev) => ({
              ...prev,
              experience: e.target.value,
            }))
          }
          className="flex flex-col gap-2"
        >
          {filterOptions.experience.options.map((exp) => (
            <Radio key={exp.value} value={exp.value} className="text-gray-600">
              {exp.label}
            </Radio>
          ))}
        </Radio.Group>
      </FilterSection>

      {/* Price Range Filter */}
      <FilterSection
        title="Mức phí"
        stats={`${filterOptions.prices.stats.formatted.min} - ${filterOptions.prices.stats.formatted.max} VND`}
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

      {/* Rating Filter */}
      <FilterSection
        title="Đánh giá"
        stats={`${filterOptions.ratings.stats.total || 0} đánh giá`}
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

      {/* Clinics Filter */}
      <FilterSection title="Phòng khám">
        <Radio.Group
          value={selectedFilters.clinic}
          onChange={(e) =>
            setSelectedFilters((prev) => ({
              ...prev,
              clinic: e.target.value,
            }))
          }
          className="flex flex-col gap-2"
        >
          {filterOptions.clinics.options.map((clinic) => (
            <Radio
              key={clinic.value}
              value={clinic.value}
              className="text-gray-600"
            >
              <div className="text-sm">
                <div className="font-medium">{clinic.label}</div>
                <div
                  className="text-gray-500 text-xs mt-0.5"
                  dangerouslySetInnerHTML={{ __html: clinic.address }}
                />
              </div>
            </Radio>
          ))}
        </Radio.Group>
      </FilterSection>
    </div>
  );
};

export default FilterPanel;
