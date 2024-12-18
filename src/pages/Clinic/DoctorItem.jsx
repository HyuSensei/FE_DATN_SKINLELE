import { Avatar } from 'antd'
import React from 'react'
import { MdOutlineVerified } from 'react-icons/md'
import { RiStarFill } from 'react-icons/ri'

const DoctorItem = ({ doctor }) => {
    if (!doctor) return null

    return (
        <div
            className="bg-white rounded-xl p-4 hover:bg-gray-50 transition-colors cursor-pointer border border-gray-100 hover:border-blue-200"
        >
            <div className="flex items-center gap-4 flex-wrap justify-center">
                <Avatar
                    src={doctor.avatar.url}
                    size={56}
                    className="border-2 border-blue-100"
                />
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-gray-800">
                            BS. {doctor.name}
                        </h4>
                        {doctor.isActive && (
                            <MdOutlineVerified color="#5ad7ff" size={18} />
                        )}
                    </div>
                    <p className="text-sm text-gray-500 mb-2">
                        {doctor.specialty} • {doctor.experience} năm kinh nghiệm
                    </p>
                    <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                            <RiStarFill className="text-yellow-400" />
                            <span>{doctor.rating}</span>
                        </div>
                        <span className="text-gray-400">•</span>
                        <span className="text-gray-500">
                            {doctor.reviewCount} đánh giá
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DoctorItem
