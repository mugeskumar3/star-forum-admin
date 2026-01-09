import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import UsersListLayer from "../components/UsersListLayer";


const UsersListPage = () => {
  return (
    <>

      {/* MasterLayout */}
      <MasterLayout>
        {/* UsersListLayer */}
        <UsersListLayer />

      </MasterLayout>

    </>
  );
};

export default UsersListPage; 
