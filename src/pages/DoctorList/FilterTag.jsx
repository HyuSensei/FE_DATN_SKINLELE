import { Tag } from "antd";
import React from "react";

const FilterTag = ({ selectedFilters, filterOptions, setSelectedFilters }) => {
  if (!filterOptions) return null;
  const getFilterLabel = (key, value) => {
    switch (key) {
      case "specialty": {
        const specialty = filterOptions.specialties.options.find(
          (s) => s.value === value
        );
        return {
          label: `Chuyên khoa: ${specialty.label || value}`,
          color: "blue",
        };
      }

      case "experience": {
        const exp = filterOptions.experience.options.find(
          (e) => e.value === value
        );
        return {
          label: `Kinh nghiệm: ${exp?.label || value}`,
          color: "cyan",
        };
      }

      case "priceRange": {
        const price = filterOptions.prices.ranges.find(
          (p) => p.value === value
        );
        return {
          label: `Mức phí: ${price.label || value}`,
          color: "green",
        };
      }

      case "rating": {
        const rating = filterOptions.ratings.options.find(
          (r) => r.value === value
        );
        return {
          label: `Đánh giá: ${rating.label || value}`,
          color: "orange",
        };
      }

      case "clinic": {
        const clinic = filterOptions.clinics.options.find(
          (c) => c.value === value
        );
        return {
          label: `Phòng khám: ${clinic.label || value}`,
          color: "purple",
        };
      }

      case "status": {
        const status = filterOptions.status.options.find(
          (s) => s.value === value
        );
        return {
          label: `Trạng thái: ${status.label || value}`,
          color: "magenta",
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
      cyan: "bg-cyan-50 text-cyan-600 border-cyan-200",
      green: "bg-green-50 text-green-600 border-green-200",
      orange: "bg-orange-50 text-orange-600 border-orange-200",
      purple: "bg-purple-50 text-purple-600 border-purple-200",
      magenta: "bg-pink-50 text-pink-600 border-pink-200",
      default: "bg-gray-50 text-gray-600 border-gray-200",
    };
    return colorMap[color];
  };

  const FilterTagItem = ({ icon, label, color, onClose }) => (
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
