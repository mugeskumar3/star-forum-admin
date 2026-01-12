import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import UserRoleListLayer from "../components/UserRoleListLayer";

const UserRoleListPage = () => {
  return (
    <>
      <MasterLayout>
        <Breadcrumb title="User Roles" />
        <UserRoleListLayer />
      </MasterLayout>
    </>
  );
};

export default UserRoleListPage;
