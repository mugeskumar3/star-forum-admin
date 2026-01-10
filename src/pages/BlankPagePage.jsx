import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import BlankPageLayer from "../components/BlankPageLayer";

const BlankPagePage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* BlankPageLayer */}
        <BlankPageLayer />
      </MasterLayout>
    </>
  );
};

export default BlankPagePage;
