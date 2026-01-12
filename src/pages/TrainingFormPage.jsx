import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import TrainingFormLayer from "../components/TrainingFormLayer";

const TrainingFormPage = () => {
  return (
    <>
      <MasterLayout>
        <Breadcrumb title="Training Management" />
        <TrainingFormLayer />
      </MasterLayout>
    </>
  );
};

export default TrainingFormPage;
