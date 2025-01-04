import React, { memo, useCallback } from "react";
import { Collapse, Empty, Skeleton } from "antd";
import CategoryTree from "./CategoryTree";
import PriceRangeFilter from "./PriceRangeFilter";
import RatingFilter from "./RatingFilter";
import BrandFilter from "./BrandFilter";
import TagFilter from "./TagFilter";

const FilterPanelProduct = memo(
  ({
    isShowBrand = true,
    setSelectedFilters,
    selectedFilters,
    filterOptions,
    isLoading,
    error,
  }) => {
    const handleCategoryChange = useCallback(
      (categoryId, checked) => {
        setSelectedFilters((prev) => ({
          ...prev,
          categories: checked
            ? [...prev.categories, categoryId]
            : prev.categories.filter((id) => id !== categoryId),
        }));
      },
      [setSelectedFilters]
    );

    const handlePriceChange = useCallback(
      (e) => {
        setSelectedFilters((prev) => ({ ...prev, priceRange: e.target.value }));
      },
      [setSelectedFilters]
    );

    const handleRatingChange = useCallback(
      (e) => {
        setSelectedFilters((prev) => ({ ...prev, rating: e.target.value }));
      },
      [setSelectedFilters]
    );

    const handleBrandChange = useCallback(
      (values) => {
        setSelectedFilters((prev) => ({ ...prev, brands: values }));
      },
      [setSelectedFilters]
    );

    const handleTagClick = useCallback(
      (tag) => {
        setSelectedFilters((prev) => ({
          ...prev,
          tags: prev.tags.includes(tag)
            ? prev.tags.filter((t) => t !== tag)
            : [...prev.tags, tag],
        }));
      },
      [setSelectedFilters]
    );

    if (error) return <Empty description="Đã có lỗi xảy ra" />;
    if (isLoading) return <Skeleton active />;
    if (!filterOptions) return <Empty description="Không có dữ liệu" />;

    const items = [
      {
        key: "categories",
        label: (
          <span className="text-base font-medium text-gray-800">
            Danh mục sản phẩm
          </span>
        ),
        children: (
          <CategoryTree
            categories={filterOptions.categories || []}
            selectedCategories={selectedFilters.categories}
            onCategoryChange={handleCategoryChange}
          />
        ),
      },
      {
        key: "price",
        label: (
          <span className="text-base font-medium text-gray-800">
            Khoảng giá
          </span>
        ),
        children: (
          <PriceRangeFilter
            priceRanges={filterOptions.priceRanges}
            selectedRange={selectedFilters.priceRange}
            onChange={handlePriceChange}
          />
        ),
      },
      {
        key: "ratings",
        label: (
          <span className="text-base font-medium text-gray-800">Đánh giá</span>
        ),
        children: (
          <RatingFilter
            ratings={filterOptions.ratings}
            selectedRating={selectedFilters.rating}
            onChange={handleRatingChange}
          />
        ),
      },
      {
        key: "brands",
        label: (
          <span className="text-base font-medium text-gray-800">
            Thương hiệu
          </span>
        ),
        children: (
          <BrandFilter
            brands={filterOptions.brands}
            selectedBrands={selectedFilters.brands}
            onChange={handleBrandChange}
          />
        ),
      },
      {
        key: "tags",
        label: (
          <span className="text-base font-medium text-gray-800">Tags</span>
        ),
        children: (
          <TagFilter
            tags={filterOptions.tags}
            selectedTags={selectedFilters.tags}
            onTagClick={handleTagClick}
          />
        ),
      },
    ].filter((item) => (!isShowBrand ? item.key !== "brands" : true));

    return (
      <div className="w-full lg:w-[350px] bg-white rounded-lg shadow-sm">
        <Collapse
          items={items}
          defaultActiveKey={[
            "categories",
            "price",
            "ratings",
            "brands",
            "tags",
          ]}
          ghost
          className="[&_.ant-collapse-content-box]:px-0 [&_.ant-collapse-header]:px-0"
        />
      </div>
    );
  }
);

export default FilterPanelProduct;
