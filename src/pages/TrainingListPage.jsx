import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import TrainingListLayer from "../components/TrainingListLayer";

const TrainingListPage = () => {
  return (
    <>
      <MasterLayout>

        <TrainingListLayer />
      </MasterLayout>
    </>
  );
};

export default TrainingListPage;
