import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import UserRoleFormLayer from "../components/UserRoleFormLayer";

const UserRoleFormPage = () => {
  return (
    <>
      <MasterLayout>
        <Breadcrumb title="User Roles" />
        <UserRoleFormLayer />
      </MasterLayout>
    </>
  );
};

export default UserRoleFormPage;
