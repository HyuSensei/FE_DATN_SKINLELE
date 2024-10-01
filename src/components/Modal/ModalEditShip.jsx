import { Input, message, Modal, Select } from "antd";
import React, { useEffect, useState } from "react";
import ErrorMessage from "../Error/ErrorMessage";
import { useDispatch, useSelector } from "react-redux";
import isEmpty from "lodash/isEmpty";
import { getDistrict, getProvince, getWard } from "../../redux/ship/ship.thunk";

const ModalEditShip = ({
    open,
    setOpen,
    order = {},
}) => {
    const dispatch = useDispatch();
    const [input, setInput] = useState({
        name: "",
        phone: "",
        province: {
            id: "",
            name: "",
        },
        district: {
            id: "",
            name: "",
        },
        ward: {
            id: "",
            name: "",
        },
        address: "",
    });
    const { provinces, districts, wards, isLoading } = useSelector((state) => state.ship);
    const [validates, setValidates] = useState({});

    useEffect(() => {
        if (open) {
            dispatch(getProvince());
        }
    }, [open]);

    useEffect(() => {
        if (input.province.id) {
            dispatch(getDistrict(input.province.id));
        }
    }, [input.province.id]);

    useEffect(() => {
        if (input.district.id) {
            dispatch(getWard(input.district.id));
        }
    }, [input.district.id]);

    useEffect(() => {
        if (open && !isEmpty(order)) {
            setInput(prev => ({
                ...prev,
                name: order.name,
                phone: order.phone,
                address: order.address,
                province: order.province,
                district: order.district,
                ward: order.ward
            }))
        }
    }, [open, order])

    const handleSubmit = async (e) => {
    };

    const handleCancel = () => {
        setOpen(false)
    };

    return (
        <Modal
            open={open}
            title={
                <div className="text-lg md:text-2xl font-bold text-center">
                    Cập nhật địa chỉ nhận hàng
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
                    Cập nhật
                </button>,
            ]}
            width={800}
        >
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="w-full">
                    <label className="block text-sm font-medium text-[#14134f]">
                        Tên người nhận:
                    </label>
                    <Input
                        name="name"
                        value={input.name}
                        size="large"
                        className="mt-1 shadow-lg"
                    />
                </div>
                <div className="w-full">
                    <label className="block text-sm font-medium text-[#14134f]">
                        Số điện thoại:
                    </label>
                    <Input
                        name="name"
                        value={input.phone}
                        size="large"
                        className="mt-1 shadow-lg"
                    />
                </div>
                <div className="w-full">
                    <label className="block text-sm font-medium text-[#14134f]">
                        Tỉnh thành:
                    </label>
                    <Select
                        loading={isLoading}
                        value={input.district.name}
                        placeholder={
                            <div className="text-sm">Danh sách danh mục cha</div>
                        }
                        size="large"
                        className="w-full mt-1 shadow-lg"
                        allowClear
                    >
                        {districts.map((option) => (
                            <Select.Option key={option.value} value={option.id}>
                                {option.DistrictName}
                            </Select.Option>
                        ))}
                    </Select>
                </div>
                <div className="w-full">
                    <label className="block text-sm font-medium text-[#14134f]">
                        Quận huyện:
                    </label>

                </div>
                <div className="w-full">
                    <label className="block text-sm font-medium text-[#14134f]">
                        Địa chỉ:
                    </label>
                    <Input
                        name="name"
                        value={input.address}
                        size="large"
                        className="mt-1 shadow-lg"
                    />
                </div>
            </form>
        </Modal>
    );
};

export default ModalEditShip;
