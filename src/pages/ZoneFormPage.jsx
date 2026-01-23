import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import ZoneFormLayer from "../components/ZoneFormLayer";

const ZoneFormPage = () => {
  return (
    <MasterLayout>
      <Breadcrumb title="Create Zone" />
      <ZoneFormLayer />
    </MasterLayout>
  );
};

export default ZoneFormPage;
