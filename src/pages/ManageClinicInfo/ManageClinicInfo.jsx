import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ClinicInfo from "./ClinicInfo";
import CreateClinic from "./CreateClinic";
import UpdateClinic from "./UpdateClinic";

const ManageClinicInfo = () => {
  const dispatch = useDispatch();
  const [action, setAction] = useState("info");

  return (
    <>
      {action === "info" && <ClinicInfo />}
      {action === "create" && <CreateClinic />}
      {action === "update" && <UpdateClinic />}
    </>
  );
};

export default ManageClinicInfo;
