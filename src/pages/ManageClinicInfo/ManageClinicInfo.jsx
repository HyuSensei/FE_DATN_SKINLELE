import React, { useState } from "react";
import ClinicInfo from "./ClinicInfo";
import CreateClinic from "./CreateClinic";

const ManageClinicInfo = () => {
  const [action, setAction] = useState("info");

  return (
    <>
      {action === "info" && <ClinicInfo {...{ setAction }} />}
      {action === "create" && <CreateClinic />}
    </>
  );
};

export default ManageClinicInfo;
