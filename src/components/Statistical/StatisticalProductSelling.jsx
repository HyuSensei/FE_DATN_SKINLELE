import { Empty, Spin } from "antd";
import React from "react";
import ReactApexChart from "react-apexcharts";

const StatisticalProductSelling = ({ isLoading, topSellingProducts }) => {
  const processedData = React.useMemo(() => {
    if (!Array.isArray(topSellingProducts) || topSellingProducts.length === 0) {
      return {
        names: [],
        quantities: [],
      };
    }

    const sortedProducts = [...topSellingProducts].sort(
      (a, b) => a.totalSold - b.totalSold
    );

    return {
      names: sortedProducts.map((product) => product.name),
      quantities: sortedProducts.map((product) => product.totalSold),
    };
  }, [topSellingProducts]);

  const chartData = {
    series: [
      {
        name: "Số lượng bán",
        data: processedData.quantities,
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 350,
      },
      plotOptions: {
        bar: {
          borderRadius: 0,
          horizontal: true,
          distributed: true,
          barHeight: "80%",
          isFunnel: true,
        },
      },
      colors: [
        "#F44F5E",
        "#E55A89",
        "#D863B1",
        "#CA6CD8",
        "#B57BED",
        "#8D95EB",
        "#62ACEA",
        "#4BC3E6",
      ],
      dataLabels: {
        enabled: true,
        formatter: function (val, opt) {
          return `${val} - ${opt.w.globals.labels[opt.dataPointIndex]}`;
        },
        dropShadow: {
          enabled: true,
        },
      },
      xaxis: {
        categories: processedData.names,
      },
      yaxis: {
        labels: {
          show: false,
        },
      },
      legend: {
        show: false,
      },
    },
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spin />
      </div>
    );
  }

  if (processedData.names.length === 0) {
    return <Empty />;
  }

  return (
    <div className="w-full" id="chart">
      <ReactApexChart
        options={chartData.options}
        series={chartData.series}
        type="bar"
        height={450}
      />
    </div>
  );
};

export default StatisticalProductSelling;
