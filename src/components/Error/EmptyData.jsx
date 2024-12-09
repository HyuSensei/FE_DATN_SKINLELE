import { Empty } from "antd";
import React from "react";

const EmptyData = ({ description = "", className = "" }) => {
  return <Empty className={`mt-40 ${className}`} description={description} />;
};

export default EmptyData;
