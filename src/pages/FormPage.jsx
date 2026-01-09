import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import FormPageLayer from "../components/FormPageLayer";

const FormPage = ({ title }) => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title={title || "Input Form"} />

        {/* FormPageLayer */}
        <FormPageLayer title={title} />
      </MasterLayout>
    </>
  );
};

export default FormPage;
