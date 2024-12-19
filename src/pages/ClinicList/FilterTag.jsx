import { Tag } from "antd";
import React from "react";

const FilterTag = ({ selectedFilters, filterOptions, setSelectedFilters }) => {
  if (!filterOptions) return null;

  const getFilterLabel = (key, value) => {
    switch (key) {
      case "priceRange": {
        const price = filterOptions.prices.ranges.find(
          (p) => p.value === value
        );
        return {
          label: `Phí khám: ${price?.label || value} VND`,
          color: "green",
        };
      }

      case "doctorCount": {
        const count = filterOptions.doctorCounts.options.find(
          (c) => c.value === value
        );
        return {
          label: `Số lượng bác sĩ: ${count?.label || value}`,
          color: "blue",
        };
      }

      case "rating": {
        const rating = filterOptions.ratings.options.find(
          (r) => r.value === value
        );
        return {
          label: `Đánh giá: ${rating?.label || value}`,
          color: "orange",
        };
      }

      case "workingHours": {
        const hours = filterOptions.workingHours.find((h) => h.value === value);
        return {
          label: `Thời gian: ${hours?.label || value}`,
          color: "purple",
        };
      }

      default:
        return {
          label: value,
          color: "default",
        };
    }
  };

  const getTagColor = (color) => {
    const colorMap = {
      blue: "bg-blue-50 text-blue-600 border-blue-200",
      green: "bg-green-50 text-green-600 border-green-200",
      orange: "bg-orange-50 text-orange-600 border-orange-200",
      purple: "bg-purple-50 text-purple-600 border-purple-200",
      default: "bg-gray-50 text-gray-600 border-gray-200",
    };
    return colorMap[color];
  };

  const FilterTagItem = ({ label, color, onClose }) => (
    <Tag
      closable
      onClose={onClose}
      className={`m-1 py-1.5 px-3 rounded-full flex items-center gap-1.5 font-medium text-sm ${getTagColor(
        color
      )}`}
    >
      <span>{label}</span>
    </Tag>
  );

  return (
    <div className="flex flex-wrap gap-2">
      {Object.entries(selectedFilters).map(([key, value]) => {
        if (!value) return null;

        const filterInfo = getFilterLabel(key, value);

        return (
          <FilterTagItem
            key={key}
            {...filterInfo}
            onClose={() =>
              setSelectedFilters((prev) => ({ ...prev, [key]: null }))
            }
          />
        );
      })}
    </div>
  );
};

export default FilterTag;
