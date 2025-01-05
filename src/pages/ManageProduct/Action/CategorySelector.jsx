import React, { useState, useEffect } from "react";
import { Card, Form, Select } from "antd";

const CategorySelector = ({ categories = [], form, initialValues }) => {
  const [selectedCategories, setSelectedCategories] = useState({
    level0: initialValues?.level0 || null,
    level1: initialValues?.level1 || null,
    level2: initialValues?.level2 || [],
  });

  const [options, setOptions] = useState({
    level1: [],
    level2: [],
  });

  useEffect(() => {
    if (initialValues?.level0) {
      const level0Category = categories.find(
        (c) => c._id === initialValues.level0
      );
      setOptions((prev) => ({
        ...prev,
        level1: level0Category?.children || [],
      }));

      if (initialValues.level1) {
        const level1Category = level0Category?.children?.find(
          (c) => c._id === initialValues.level1
        );
        setOptions((prev) => ({
          ...prev,
          level2: level1Category?.children || [],
        }));
      }
    }
  }, [initialValues, categories]);

  const handleLevel0Change = (value) => {
    setSelectedCategories({
      level0: value,
      level1: null,
      level2: [],
    });
    form.setFieldsValue({ level1: null, level2: [] });

    const level0Category = categories.find((c) => c._id === value);
    setOptions((prev) => ({
      ...prev,
      level1: level0Category?.children || [],
      level2: [],
    }));
  };

  const handleLevel1Change = (value) => {
    setSelectedCategories((prev) => ({
      ...prev,
      level1: value,
      level2: [],
    }));
    form.setFieldsValue({ level2: [] });

    const level0Category = categories.find(
      (c) => c._id === selectedCategories.level0
    );
    const level1Category = level0Category?.children?.find(
      (c) => c._id === value
    );
    setOptions((prev) => ({
      ...prev,
      level2: level1Category?.children || [],
    }));
  };

  const handleLevel2Change = (values) => {
    setSelectedCategories((prev) => ({
      ...prev,
      level2: values,
    }));
  };

  return (
    <Card title="Danh mục sản phẩm" className="shadow-md">
      <Form.Item
        label="Danh mục (0)"
        name="level0"
        initialValue={initialValues?.level0}
        rules={[{ required: true, message: "Vui lòng chọn danh mục cấp 0" }]}
      >
        <Select
          placeholder="Chọn danh mục"
          className="w-full"
          onChange={handleLevel0Change}
          size="middle"
          options={categories?.map((category) => ({
            value: category._id,
            label: category.name,
          }))}
        />
      </Form.Item>

      {selectedCategories.level0 && (
        <Form.Item
          label="Danh mục (1)"
          name="level1"
          initialValue={initialValues?.level1}
        >
          <Select
            placeholder="Chọn danh mục con"
            className="w-full"
            onChange={handleLevel1Change}
            size="middle"
            options={options.level1?.map((option) => ({
              value: option._id,
              label: option.name,
            }))}
          />
        </Form.Item>
      )}

      {selectedCategories.level1 && (
        <Form.Item
          label="Danh mục (2)"
          name="level2"
          initialValue={initialValues?.level2}
        >
          <Select
            placeholder="Chọn danh mục con"
            className="w-full"
            mode="multiple"
            onChange={handleLevel2Change}
            size="middle"
            options={options.level2?.map((option) => ({
              value: option._id,
              label: option.name,
            }))}
          />
        </Form.Item>
      )}
    </Card>
  );
};

export default CategorySelector;
