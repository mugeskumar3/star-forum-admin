import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import ChiefGuestListLayer from "../components/ChiefGuestListLayer";

const ChiefGuestListPage = () => {
  return (
    <>
      <MasterLayout>
        <ChiefGuestListLayer />
      </MasterLayout>
    </>
  );
};

export default ChiefGuestListPage;
