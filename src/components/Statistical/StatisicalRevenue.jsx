import React from "react";
import ReactApexChart from "react-apexcharts";
import moment from "moment";
import { Empty, Spin } from "antd";
import { formatPrice } from "../../helpers/formatPrice";

const StatisicalRevenue = ({ isLoading, monthlyRevenue }) => {
  const currentYear = moment().year();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spin />
      </div>
    );
  }

  if (monthlyRevenue.length === 0) {
    return <Empty />;
  }

  const series = [
    {
      name: "Doanh thu",
      data: monthlyRevenue.map((item) => [
        moment(`${currentYear}-${item.month}`, "YYYY-MMM").valueOf(),
        item.revenue,
      ]),
    },
  ];

  const options = {
    chart: {
      id: "area-statistica-revenue",
      type: "area",
      height: 350,
      zoom: {
        autoScaleYaxis: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 5,
    },
    xaxis: {
      type: "datetime",
      labels: {
        format: "MMM yyyy",
        formatter: (val) => {
          return moment(val).format("MMM");
        },
      },
      tickAmount: 12,
    },
    yaxis: {
      labels: {
        formatter: (value) => {
          return formatPrice(value) + " VND";
        },
      },
    },
    tooltip: {
      x: {
        formatter: (val) => {
          return moment(val).format("MMM YYYY");
        },
      },
      y: {
        formatter: (value) => {
          return formatPrice(value) + " VND";
        },
        title: {
          formatter: () => "Doanh thu",
        },
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.9,
        stops: [0, 100],
      },
    },
  };

  return (
    <div className="m-auto" id="chart">
      <div id="chart-timeline">
        <ReactApexChart
          options={options}
          series={series}
          type="area"
          height={450}
        />
      </div>
    </div>
  );
};

export default StatisicalRevenue;
