import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import AttendanceListLayer from "../components/AttendanceListLayer";

const AttendanceListPage = () => {
  return (
    <>
      <MasterLayout>
        <AttendanceListLayer />
      </MasterLayout>
    </>
  );
};

export default AttendanceListPage;
