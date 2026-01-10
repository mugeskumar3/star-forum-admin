import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import UsersGridLayer from "../components/UsersGridLayer";


const UsersGridPage = () => {
  return (
    <>

      {/* MasterLayout */}
      <MasterLayout>
        {/* UsersGridLayer */}
        <UsersGridLayer />

      </MasterLayout>

    </>
  );
};

export default UsersGridPage; 
