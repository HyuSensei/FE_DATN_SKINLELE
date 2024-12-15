import React from "react";
import StatisticalOverView from "./StatisticalOverView";
import StatisticalDetail from "./StatisticalDetail";

const DashBoardClinic = () => {
  return (
    <div className="space-y-4 px-2">
      <StatisticalOverView />
      <StatisticalDetail />
    </div>
  );
};

export default DashBoardClinic;
