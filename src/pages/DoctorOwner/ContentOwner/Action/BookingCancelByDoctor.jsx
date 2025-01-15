import CustomButton from '@/components/CustomButton'
import { Form, Input, message, Modal, Radio } from 'antd'
import React, { useState } from 'react'
import { IoMdArrowRoundBack } from 'react-icons/io'
import moment from '@utils/monentTz'
import { updateStatusBooking } from '@/redux/booking/booking.thunk'
import { useDispatch } from 'react-redux'
import { TbCalendarCancel } from 'react-icons/tb'

const BookingCancelByDoctor = ({ open, onClose, booking }) => {
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const [isLoading, setIsLoading] = useState(false)
    const cancelReasons = [
        "Bác sĩ có việc đột xuất",
        "Bác sĩ không đủ sức khỏe để thực hiện khám chữa bệnh",
        "Lịch trình của bác sĩ bị thay đổi do yêu cầu công việc",
        "Thiếu hồ sơ hoặc tài liệu y tế cần thiết cho buổi khám",
        "Bệnh nhân không cung cấp đầy đủ thông tin cần thiết",
        "Cơ sở y tế gặp sự cố không thể phục vụ",
        "Bệnh nhân không đến đúng giờ và không thể chờ thêm",
        "Bệnh nhân yêu cầu hủy buổi khám",
        "Lịch khám bị trùng với lịch khác của bác sĩ",
        "Khác"
    ];

    const handleFinish = async (values) => {
        try {
            setIsLoading(true);
            const reason =
                values.reason === "Khác" ? values.customReason : values.reason;
            const res = await dispatch(
                updateStatusBooking({
                    id: booking._id,
                    data: {
                        status: "cancelled",
                        cancelReason: reason,
                        model: "Doctor",
                    },
                })
            ).unwrap();
            if (res.success) {
                message.success(res.message);
                onClose(true);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Modal
            title="Xác nhận hủy lịch khám"
            open={open}
            onCancel={() => onClose(false)}
            footer={null}
            className="max-w-2xl"
        >
            <div className="py-4 mt-4">
                <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-600">
                        <span className='font-medium'>Bênh nhân:</span> {booking?.customer?.name}
                    </p>
                    <p className="text-sm text-blue-600">
                    <span className='font-medium'>Lịch khám:</span> {booking?.startTime} - {booking?.endTime} ({moment(booking?.date).format("DD MMMM, YYYY")})
                    </p>
                </div>

                <Form
                    form={form}
                    onFinish={handleFinish}
                    layout="vertical"
                    requiredMark={false}
                >
                    <Form.Item
                        name="reason"
                        label="Vui lòng chọn lý do hủy:"
                        rules={[{ required: true, message: "Vui lòng chọn lý do hủy" }]}
                    >
                        <Radio.Group className="flex flex-col gap-3">
                            {cancelReasons.map((reason) => (
                                <Radio key={reason} value={reason} className="text-gray-700">
                                    {reason}
                                </Radio>
                            ))}
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item
                        noStyle
                        shouldUpdate={(prev, curr) => prev?.reason !== curr?.reason}
                    >
                        {({ getFieldValue }) =>
                            getFieldValue("reason") === "Khác" && (
                                <Form.Item
                                    name="customReason"
                                    rules={[
                                        { required: true, message: "Vui lòng nhập lý do hủy" },
                                    ]}
                                >
                                    <Input.TextArea
                                        rows={4}
                                        placeholder="Nhập lý do hủy chi tiết..."
                                        className="resize-none"
                                    />
                                </Form.Item>
                            )
                        }
                    </Form.Item>

                    <div className="flex justify-end gap-4 mt-6">
                        <CustomButton
                            onClick={() => onClose(false)}
                            icon={<IoMdArrowRoundBack />}
                        >
                            Quay lại
                        </CustomButton>
                        <CustomButton
                            type="submit"
                            variant="danger"
                            loading={isLoading}
                            icon={<TbCalendarCancel />}
                        >
                            Xác nhận hủy
                        </CustomButton>
                    </div>
                </Form>
            </div>
        </Modal>
    )
}

export default BookingCancelByDoctor
