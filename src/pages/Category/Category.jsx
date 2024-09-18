import React, { useState, useEffect } from "react";
import { Breadcrumb, Checkbox, Select, Collapse } from "antd";
import useScreen from "../../hook/useScreen";
import ProductList from "../../components/Product/ProductList";

const { Option } = Select;
const { Panel } = Collapse;

const Category = () => {
  const [priceRange, setPriceRange] = useState([]);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const { isMobile } = useScreen();

  // Giả lập dữ liệu danh mục 3 cấp
  const categoryData = [
    {
      id: 1,
      name: "Category 1",
      children: [
        {
          id: 11,
          name: "Subcategory 1.1",
          children: [
            { id: 111, name: "Sub-subcategory 1.1.1" },
            { id: 112, name: "Sub-subcategory 1.1.2" },
          ],
        },
        {
          id: 12,
          name: "Subcategory 1.2",
          children: [
            { id: 121, name: "Sub-subcategory 1.2.1" },
            { id: 122, name: "Sub-subcategory 1.2.2" },
          ],
        },
      ],
    },
    // Thêm các danh mục khác ở đây
  ];

  // Giả lập dữ liệu sản phẩm
  const products = [
    {
      id: 1,
      name: "Sản phẩm 1",
      price: 100000,
      brand: "Brand A",
      category: "Category 1",
    },
    {
      id: 2,
      name: "Sản phẩm 2",
      price: 200000,
      brand: "Brand B",
      category: "Category 2",
    },
    // Thêm các sản phẩm khác ở đây
  ];

  const handlePriceChange = (checkedValues) => {
    setPriceRange(checkedValues);
  };

  const handleBrandChange = (checkedValues) => {
    setBrands(checkedValues);
  };

  const handleCategoryChange = (checkedValues) => {
    setCategories(checkedValues);
  };

  const handleSortChange = (value) => {
    setSortOrder(value);
  };

  // Lọc và sắp xếp sản phẩm
  const filteredProducts = products
    .filter((product) => {
      // Thêm logic lọc theo giá, thương hiệu và danh mục ở đây
      return true;
    })
    .sort((a, b) => {
      if (sortOrder === "asc") {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });

  const renderCategoryCheckboxes = (categories, level = 0) => {
    return categories.map((category) => (
      <div key={category.id} className={`ml-${level * 4}`}>
        <Checkbox value={category.id} className="py-2">
          {category.name}
        </Checkbox>
        {category.children &&
          renderCategoryCheckboxes(category.children, level + 1)}
      </div>
    ));
  };

  const FilterSection = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-bold mb-2">Giá</h3>
        <Checkbox.Group
          onChange={handlePriceChange}
          className="flex flex-col space-y-2"
        >
          <Checkbox value="0-100000">0 - 100.000đ</Checkbox>
          <Checkbox value="100000-200000">100.000đ - 200.000đ</Checkbox>
          <Checkbox value="200000-300000">200.000đ - 300.000đ</Checkbox>
          <Checkbox value="300000+">Trên 300.000đ</Checkbox>
        </Checkbox.Group>
      </div>
      <div>
        <h3 className="font-bold mb-2">Thương hiệu</h3>
        <Checkbox.Group
          onChange={handleBrandChange}
          className="flex flex-col space-y-2"
        >
          <Checkbox value="Brand A">Brand A</Checkbox>
          <Checkbox value="Brand B">Brand B</Checkbox>
          <Checkbox value="Brand C">Brand C</Checkbox>
        </Checkbox.Group>
      </div>
      <div>
        <h3 className="font-bold mb-2">Danh mục sản phẩm</h3>
        <Checkbox.Group
          onChange={handleCategoryChange}
          className="flex flex-col"
        >
          {renderCategoryCheckboxes(categoryData)}
        </Checkbox.Group>
      </div>
      <div>
        <h3 className="font-bold mb-2">Màu</h3>
        <Checkbox.Group
          onChange={handleBrandChange}
          className="flex flex-col space-y-2"
        >
          <Checkbox value="Màu 1">Màu 1</Checkbox>
          <Checkbox value="Màu 2">Màu 2</Checkbox>
          <Checkbox value="Màu 3">Màu 3</Checkbox>
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
            { title: "Trang điểm" },
          ]}
        />
      </div>
      <div className="flex flex-col md:flex-row">
        {/* Bộ lọc */}
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
        {/* Danh sách sản phẩm */}
        <div className="w-full md:w-3/4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-4">
            <h2 className="text-xl font-bold mb-2 md:mb-0">
              Sản phẩm ({filteredProducts.length})
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
          <ProductList />
        </div>
      </div>
    </div>
  );
};

export default Category;
