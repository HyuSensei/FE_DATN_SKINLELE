import { Avatar, Card, Rate } from "antd";
import { UserOutlined } from "@ant-design/icons";
import React from "react";

const DoctorReview = () => {
  return (
    <div className="grid grid-cols-1 gap-4">
      {[1, 2, 3].map((review) => (
        <Card
          key={review}
          className="w-full border-0 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-start gap-4">
            <Avatar size={48} icon={<UserOutlined />} className="bg-blue-100" />
            <div>
              <div className="flex items-center gap-2 mb-2">
                <h4 className="font-semibold text-gray-800">Nguyễn Văn A</h4>
                <Rate
                  disabled
                  defaultValue={5}
                  className="text-sm text-yellow-400"
                />
              </div>
              <p className="text-gray-600 mb-2">
                Bác sĩ rất tận tâm và chuyên nghiệp. Tôi rất hài lòng với quá
                trình điều trị.
              </p>
              <span className="text-gray-400 text-sm">2 ngày trước</span>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default DoctorReview;
