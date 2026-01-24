import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import ChiefGuestFormLayer from "../components/ChiefGuestFormLayer";

const ChiefGuestFormPage = () => {
  return (
    <>
      <MasterLayout>
        <Breadcrumb title="Add Chief Guest" />
        <ChiefGuestFormLayer />
      </MasterLayout>
    </>
  );
};

export default ChiefGuestFormPage;
