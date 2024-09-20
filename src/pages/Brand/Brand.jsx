import React, { useState, useEffect, useCallback } from "react";
import { Breadcrumb, Checkbox, Select, Collapse } from "antd";
import useScreen from "../../hook/useScreen";
import ProductList from "../../components/Product/ProductList";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { debounce } from "lodash";
import { getProductByBrand } from "../../redux/brand/brand.thunk";

const { Option } = Select;

const Brand = () => {
  const { isMobile } = useScreen();
  const dispatch = useDispatch();
  const [filters, setFilters] = useState({
    priceRange: "",
    sortOrder: "asc",
    tags: "",
    categoriesList: "",
  });
  const [paginate, setPaginate] = useState({
    page: 1,
    pageSize: 10,
    totalPage: 0,
    totalItems: 0,
  });
  const { slug } = useParams();
  const { products, pagination, isLoading, brand } = useSelector(
    (state) => state.brand
  );
  const { priceRanges, categories, tags } = useSelector(
    (state) => state.brand.filters
  );

  const fetchProducts = useCallback(
    debounce(() => {
      dispatch(
        getProductByBrand({
          slug,
          ...paginate,
          ...filters,
        })
      );
    }, 300),
    [slug, filters, paginate.page, paginate.pageSize]
  );

  useEffect(() => {
    if (slug) {
      fetchProducts();
    }
  }, [slug, fetchProducts]);

  useEffect(() => {
    if (pagination) {
      setPaginate((prev) => ({
        ...prev,
        page: pagination.page,
        pageSize: pagination.pageSize,
        totalPage: pagination.totalPage,
        totalItems: pagination.totalItems,
      }));
    }
  }, [pagination]);

  const handlePriceChange = (value) => {
    setFilters((prev) => ({ ...prev, priceRange: value }));
  };

  const handleTagChange = (checkedValues) => {
    setFilters((prev) => ({ ...prev, tags: checkedValues }));
  };

  const handleSortChange = (value) => {
    setFilters((prev) => ({ ...prev, sortOrder: value }));
  };

  const handleCategoriesChange = (value) => {
    setFilters((prev) => ({ ...prev, categoriesList: value }));
  };

  const FilterSection = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-bold mb-2">Giá</h3>
        <Checkbox.Group
          value={filters.priceRange}
          onChange={handlePriceChange}
          className="flex flex-col space-y-2"
        >
          {priceRanges &&
            priceRanges.map((range, index) => (
              <Checkbox key={index} value={`${range.min}-${range.max}`}>
                {`${range.min.toLocaleString(
                  "vi-VN"
                )}đ - ${range.max.toLocaleString("vi-VN")}đ`}
              </Checkbox>
            ))}
        </Checkbox.Group>
      </div>
      {categories.length > 0 && (
        <div>
          <h3 className="font-bold mb-2">Danh mục</h3>
          <Checkbox.Group
            value={filters.categoriesList}
            onChange={handleCategoriesChange}
            className="flex flex-col space-y-2"
          >
            {categories &&
              categories.map((category) => (
                <Checkbox key={category._id} value={category._id}>
                  {category.name}
                </Checkbox>
              ))}
          </Checkbox.Group>
        </div>
      )}
      <div>
        <h3 className="font-bold mb-2">Tags</h3>
        <Checkbox.Group
          value={filters.tags}
          onChange={handleTagChange}
          className="flex flex-col space-y-2"
        >
          {tags &&
            tags.map((tag) => (
              <Checkbox key={tag} value={tag}>
                {tag}
              </Checkbox>
            ))}
        </Checkbox.Group>
      </div>
    </div>
  );

  return (
    <div className="space-y-4">
      <div className="w-full">
        <img
          className="rounded-lg w-full h-auto"
          src="https://image.hsv-tech.io/1920x480/bbx/common/0c250bdd-495e-45d5-b1fc-1ce26e599eb3.webp"
          alt=""
        />
      </div>
      <div>
        <Breadcrumb
          className="pb-4"
          items={[
            { title: "Trang chủ" },
            { title: "Thương hiệu" },
            { title: brand },
          ]}
        />
      </div>
      <div className="flex flex-col md:flex-row">
        {isMobile ? (
          <Collapse
            className="md:hidden mb-4"
            items={[
              {
                key: "1",
                label: "Bộ lọc",
                children: <FilterSection />,
              },
            ]}
          />
        ) : (
          <div className="hidden md:block md:w-1/4 pr-4">
            <FilterSection />
          </div>
        )}
        <div className="w-full md:w-3/4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-4">
            <h2 className="text-xl font-bold mb-2 md:mb-0">
              Sản phẩm ({pagination?.totalItems || 0})
            </h2>
            <Select
              defaultValue="asc"
              style={{ width: "100%", maxWidth: 200 }}
              onChange={handleSortChange}
            >
              <Option value="asc">Giá: Thấp đến cao</Option>
              <Option value="desc">Giá: Cao đến thấp</Option>
            </Select>
          </div>
          <ProductList {...{ products, isLoading, paginate, setPaginate }} />
        </div>
      </div>
    </div>
  );
};

export default Brand;
