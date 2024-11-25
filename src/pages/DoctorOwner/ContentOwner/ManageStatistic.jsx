import React from "react";
import { Card, Row, Col, Statistic, Table, DatePicker } from "antd";
import {
  UserOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  StarOutlined,
  DollarOutlined,
} from "@ant-design/icons";

const { RangePicker } = DatePicker;

const ManageStatistic = () => {
  // Mock data - thay thế bằng API data
  const statistics = {
    totalAppointments: 150,
    completedAppointments: 120,
    pendingAppointments: 20,
    cancelledAppointments: 10,
    totalRevenue: 75000000,
    averageRating: 4.8,
  };

  const recentAppointments = [
    {
      key: "1",
      patientName: "Nguyễn Văn A",
      date: "20/03/2024",
      time: "09:00 - 09:30",
      status: "completed",
      amount: 500000,
    },
    {
      key: "2",
      patientName: "Trần Thị B",
      date: "21/03/2024",
      time: "10:00 - 10:30",
      status: "pending",
      amount: 500000,
    },
  ];

  const columns = [
    {
      title: "Bệnh nhân",
      dataIndex: "patientName",
      key: "patientName",
    },
    {
      title: "Ngày khám",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Thời gian",
      dataIndex: "time",
      key: "time",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        const statusConfig = {
          completed: { color: "text-green-500", text: "Hoàn thành" },
          pending: { color: "text-blue-500", text: "Đang chờ" },
          cancelled: { color: "text-red-500", text: "Đã hủy" },
        };
        return (
          <span className={statusConfig[status].color}>
            {statusConfig[status].text}
          </span>
        );
      },
    },
    {
      title: "Phí khám",
      dataIndex: "amount",
      key: "amount",
      render: (amount) => `${amount.toLocaleString("vi-VN")}đ`,
    },
  ];

  return (
    <div className="mt-4">
      {/* Filter Section */}
      <Card className="mb-6">
        <div className="flex items-center justify-between">
          <span className="text-lg font-medium">Thống kê lịch khám</span>
          <RangePicker
            placeholder={["Ngày bắt đầu", "Ngày kết thúc"]}
            className="w-[300px]"
          />
        </div>
      </Card>

      {/* Statistics Cards */}
      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={24} sm={12} lg={8}>
          <Card>
            <Statistic
              title={<span className="text-gray-600">Tổng số lịch khám</span>}
              value={statistics.totalAppointments}
              prefix={<UserOutlined className="text-blue-500" />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <Card>
            <Statistic
              title={<span className="text-gray-600">Đã hoàn thành</span>}
              value={statistics.completedAppointments}
              prefix={<CheckCircleOutlined className="text-green-500" />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <Card>
            <Statistic
              title={<span className="text-gray-600">Đang chờ</span>}
              value={statistics.pendingAppointments}
              prefix={<ClockCircleOutlined className="text-blue-500" />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <Card>
            <Statistic
              title={<span className="text-gray-600">Đã hủy</span>}
              value={statistics.cancelledAppointments}
              prefix={<CloseCircleOutlined className="text-red-500" />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <Card>
            <Statistic
              title={<span className="text-gray-600">Tổng doanh thu</span>}
              value={statistics.totalRevenue}
              prefix={<DollarOutlined className="text-green-500" />}
              suffix="đ"
              formatter={(value) => `${value.toLocaleString("vi-VN")}`}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <Card>
            <Statistic
              title={<span className="text-gray-600">Đánh giá trung bình</span>}
              value={statistics.averageRating}
              prefix={<StarOutlined className="text-yellow-500" />}
              precision={1}
              suffix="/5"
            />
          </Card>
        </Col>
      </Row>

      {/* Recent Appointments Table */}
      <Card title="Lịch sử lịch khám gần đây">
        <Table
          scroll={{ x: false }}
          columns={columns}
          dataSource={recentAppointments}
          pagination={{
            pageSize: 10,
            total: recentAppointments.length,
            showTotal: (total) => `Tổng ${total} lịch khám`,
          }}
        />
      </Card>
    </div>
  );
};

export default ManageStatistic;
