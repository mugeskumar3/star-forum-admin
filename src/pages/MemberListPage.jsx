import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import MemberListLayer from "../components/MemberListLayer";

const MemberListPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>

        <MemberListLayer />
      </MasterLayout>
    </>
  );
};

export default MemberListPage;
