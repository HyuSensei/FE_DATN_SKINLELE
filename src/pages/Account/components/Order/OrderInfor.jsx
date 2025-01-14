import { formatDateReview } from '@/helpers/formatDate'
import { getStatusColor, getStatusText, renderPaymentMethod } from '@/helpers/order'
import { Tag, Timeline } from 'antd'
import React from 'react'
import { IoArrowForward } from 'react-icons/io5'

const OrderInfor = ({ order }) => {
    return (
        <div className="w-full mt-4 space-y-2">
            <div>
                <span className="font-medium pr-1">Ngày đặt hàng:</span>
                {formatDateReview(order.createdAt)}
            </div>
            <div>
                <span className="font-medium pr-1">Phương thức:</span>
                {renderPaymentMethod(order.paymentMethod)}
            </div>
            <div className="break-words">
                <span className="font-medium pr-1">Địa chỉ:</span>
                {order.address}, {order.ward.name},{" "}
                {order.district.name}, {order.province.name}
            </div>
            <div>
                <span className="font-medium pr-1">Số điện thoại:</span>
                {order.phone}
            </div>
            {order.note && <div>
                <span className="font-medium pr-1">Ghi chú: </span>
                {order.note}
            </div>
            }
            <div className="space-y-4">
                <div className="font-medium">Hoạt động đơn hàng</div>
                <Timeline
                    items={order.statusHistory.map((item) => ({
                        color: getStatusColor(item.status),
                        children: (
                            <div className="flex flex-col gap-1">
                                <div className="space-y-2">
                                    <div className="flex gap-2 items-center">
                                        {item.updatedByModel === "User" && item.updatedBy && item.updatedBy.name ? item.updatedBy.name : "ADMIN"}
                                    </div>
                                    {
                                        !item.prevStatus && <div className="space-y-1">
                                            <Tag className="text-sm" color={getStatusColor(item.status)}>{getStatusText(item.status)}</Tag>
                                            <div className="text-slate-800">{new Date(item.date).toLocaleString('vi-VN')}</div>
                                        </div>
                                    }
                                </div>
                                {item.prevStatus && (
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-4">
                                            <Tag className="text-sm" color={getStatusColor(item.prevStatus)}>{getStatusText(item.prevStatus)}</Tag>
                                            <IoArrowForward />
                                            <Tag className="text-sm" color={getStatusColor(item.status)}>{getStatusText(item.status)}</Tag>
                                        </div>
                                        <div className="text-slate-800">{new Date(item.date).toLocaleString('vi-VN')}</div>
                                    </div>
                                )}
                            </div>
                        ),
                    }))}
                />
            </div>
        </div>
    )
}

export default OrderInfor
