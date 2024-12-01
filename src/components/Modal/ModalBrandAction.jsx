import { Input, message, Modal } from "antd";
import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "lodash";
import { validateBrandActionSchema, validateForm } from "@validate/validate";
import ErrorMessage from "@components/Error/ErrorMessage";
import { createBrand, updateBrand } from "@redux/brand/brand.thunk";
import { setBrands } from "@redux/brand/brand.slice";

const ModalBrandAction = ({
    open,
    setOpen,
    brand = {},
}) => {
    const dispatch = useDispatch();
    const [input, setInput] = useState({
        name: "",
    });
    const [validates, setValidates] = useState({});
    const { brands } = useSelector(state => state.brand)

    useEffect(() => {
        if (open && !isEmpty(brand)) {
            setInput((prev) => ({
                ...prev,
                name: brand.name,
            }));
        }
    }, [brand, open]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInput((prev) => ({ ...prev, [name]: value }));
        setValidates((prev) => ({ ...prev, [name]: "" }));
    };

    const clearInput = useCallback(() => {
        setInput(prev => (
            {
                ...prev,
                name: ""
            }
        ));
        setValidates({});
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = await validateForm({
            input: input,
            validateSchema: validateBrandActionSchema,
        });

        if (Object.keys(validationErrors).length > 0) {
            setValidates(validationErrors);
            return;
        }

        if (isEmpty(brand)) {
            const res = await dispatch(createBrand(input)).unwrap()
            if (res.success) {
                const newBrands = [res.data, ...brands]
                dispatch(setBrands(newBrands))
                message.success(res.message)
                clearInput()
                setOpen(false);
            }
        } else {
            const res = await dispatch(updateBrand({
                id: brand._id,
                payload: input
            })).unwrap()
            if (res.success) {
                const newBrands = [...brands]
                const brandIndex = newBrands.findIndex((item) => item._id === brand._id)
                newBrands[brandIndex] = res.data
                dispatch(setBrands(newBrands))
                message.success(res.message)
                clearInput()
                setOpen(false);
            }
        }
    };

    const handleCancel = () => {
        setOpen(false);
        clearInput();
    };

    return (
        <Modal
            open={open}
            title={
                <div className="text-lg md:text-2xl font-bold text-center">
                    {isEmpty(brand) ? "Thêm mới thương hiệu" : "Cập nhật thương hiệu"}
                </div>
            }
            onOk={handleSubmit}
            onCancel={handleCancel}
            footer={[
                <button
                    key="cancel"
                    onClick={handleCancel}
                    className="bg-white text-gray-700 border-gray-300 hover:bg-gray-50 border px-6 py-2 rounded-full transition duration-300 ease-in-out"
                >
                    Hủy
                </button>,
                <button
                    key="submit"
                    onClick={handleSubmit}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-full transition duration-300 ease-in-out mx-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isEmpty(brand) ? "Thêm" : "Cập nhật"}
                </button>,
            ]}
            width={600}
        >
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="w-full">
                    <label className="block text-sm font-medium text-[#14134f]">
                        Tên thương hiệu
                    </label>
                    <Input
                        name="name"
                        value={input.name}
                        onChange={handleInputChange}
                        size="large"
                        className="mt-1 shadow-lg"
                    />
                    {validates.name && <ErrorMessage message={validates.name} />}
                </div>
            </form>
        </Modal>
    );
};

export default ModalBrandAction;
