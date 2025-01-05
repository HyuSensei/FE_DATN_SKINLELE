import { Form, Select } from "antd";
import { useState, useEffect } from "react";

const CategorySelector = ({ categories, form }) => {
  const [selectedCategories, setSelectedCategories] = useState({
    level0: null,
    level1: null,
    level2: [],
  });

  const [options, setOptions] = useState({
    level1: [],
    level2: [],
  });

  useEffect(() => {
    if (selectedCategories.level0) {
      const level0Category = categories.find(
        (c) => c._id === selectedCategories.level0
      );
      setOptions((prev) => ({
        ...prev,
        level1: level0Category?.children || [],
      }));
    } else {
      setOptions({
        level1: [],
        level2: [],
      });
    }
  }, [selectedCategories.level0, categories]);

  useEffect(() => {
    if (selectedCategories.level1) {
      const level0Category = categories.find(
        (c) => c._id === selectedCategories.level0
      );
      const level1Category = level0Category?.children?.find(
        (c) => c._id === selectedCategories.level1
      );
      setOptions((prev) => ({
        ...prev,
        level2: level1Category?.children || [],
      }));
    } else {
      setOptions((prev) => ({
        ...prev,
        level2: [],
      }));
    }
  }, [selectedCategories.level1, categories]);

  const handleLevel0Change = (value) => {
    setSelectedCategories({
      level0: value,
      level1: null,
      level2: [],
    });
    form.setFieldsValue({ level1: null, level2: [] });
  };

  const handleLevel1Change = (value) => {
    setSelectedCategories((prev) => ({
      ...prev,
      level1: value,
      level2: [],
    }));
    form.setFieldsValue({ level2: [] });
  };

  const handleLevel2Change = (value) => {
    setSelectedCategories((prev) => ({
      ...prev,
      level2: value,
    }));
  };

  return (
    <div className="flex items-center gap-2 justify-center w-full flex-wrap">
      <Form.Item
        className="flex-1"
        label="Danh mục (0)"
        name="level0"
        rules={[{ required: true, message: "Vui lòng chọn danh mục cấp 0" }]}
      >
        <Select
          placeholder="Chọn danh mục"
          className="w-full"
          onChange={handleLevel0Change}
          value={selectedCategories.level0}
          size="middle"
          options={categories?.map((category) => ({
            value: category._id,
            label: category.name,
          }))}
        />
      </Form.Item>

      <Form.Item label="Danh mục (1)" name="level1" className="flex-1">
        <Select
          disabled={!selectedCategories.level0}
          placeholder="Chọn danh mục con"
          className="w-full"
          onChange={handleLevel1Change}
          value={selectedCategories.level1}
          size="middle"
          options={options.level1?.map((option) => ({
            value: option._id,
            label: option.name,
          }))}
        />
      </Form.Item>

      <Form.Item label="Danh mục (2)" name="level2" className="flex-1">
        <Select
          disabled={!selectedCategories.level1}
          placeholder="Chọn danh mục con"
          className="w-full"
          mode="multiple"
          onChange={handleLevel2Change}
          value={selectedCategories.level2}
          size="middle"
          options={options.level2?.map((option) => ({
            value: option._id,
            label: option.name,
          }))}
        />
      </Form.Item>
    </div>
  );
};

export default CategorySelector;
