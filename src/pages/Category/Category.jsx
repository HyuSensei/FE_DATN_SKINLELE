import React, { useState, useEffect, useCallback } from "react";
import { Breadcrumb, Checkbox, Select, Collapse } from "antd";
import useScreen from "../../hook/useScreen";
import ProductList from "../../components/Product/ProductList";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductByCategory } from "../../redux/product/product.thunk";
import { debounce } from "lodash";

const { Option } = Select;

const Category = () => {
  const { isMobile } = useScreen();
  const dispatch = useDispatch();
  const [filters, setFilters] = useState({
    priceRange: "",
    brands: "",
    sortOrder: "asc",
    tags: "",
    subcategoriesList: "",
  });
  const [paginate, setPaginate] = useState({
    page: 1,
    pageSize: 10,
    totalPage: 0,
    totalItems: 0,
  });
  const { slug } = useParams();
  const { products, pagination, isLoading, category } = useSelector(
    (state) => state.product
  );
  const { priceRanges, brands, subcategories, tags } = useSelector(
    (state) => state.product.filters
  );

  const fetchProducts = useCallback(
    debounce(() => {
      dispatch(
        getProductByCategory({
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

  const handleBrandChange = (checkedValues) => {
    setFilters((prev) => ({ ...prev, brands: checkedValues }));
  };

  const handleTagChange = (checkedValues) => {
    setFilters((prev) => ({ ...prev, tags: checkedValues }));
  };

  const handleSortChange = (value) => {
    setFilters((prev) => ({ ...prev, sortOrder: value }));
  };

  const handleSubcategoriesChange = (value) => {
    setFilters((prev) => ({ ...prev, subcategoriesList: value }));
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
      <div>
        <h3 className="font-bold mb-2">Thương hiệu</h3>
        <Checkbox.Group
          value={filters.brands}
          onChange={handleBrandChange}
          className="flex flex-col space-y-2"
        >
          {brands &&
            brands.map((brand) => (
              <Checkbox key={brand._id} value={brand.slug}>
                {brand.name}
              </Checkbox>
            ))}
        </Checkbox.Group>
      </div>
      {subcategories.length > 0 && (
        <div>
          <h3 className="font-bold mb-2">Danh mục con</h3>
          <Checkbox.Group
            value={filters.subcategoriesList}
            onChange={handleSubcategoriesChange}
            className="flex flex-col space-y-2"
          >
            {subcategories &&
              subcategories.map((subcategory) => (
                <Checkbox key={subcategory._id} value={subcategory._id}>
                  {subcategory.name}
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
          src="https://image.hsv-tech.io/1920x480/bbx/common/affc19d8-f19c-4d4b-8325-a0f309c99688.webp"
          alt=""
        />
      </div>
      <div>
        <Breadcrumb
          className="pb-4"
          items={[
            { title: "Trang chủ" },
            { title: "Danh mục sản phẩm" },
            { title: category },
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

export default Category;
