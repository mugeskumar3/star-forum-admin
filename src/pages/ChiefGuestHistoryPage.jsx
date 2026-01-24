import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import ChiefGuestHistoryLayer from "../components/ChiefGuestHistoryLayer";

const ChiefGuestHistoryPage = () => {
  return (
    <>
      <MasterLayout>
        <Breadcrumb title="Chief Guest History" />
        <ChiefGuestHistoryLayer />
      </MasterLayout>
    </>
  );
};

export default ChiefGuestHistoryPage;
