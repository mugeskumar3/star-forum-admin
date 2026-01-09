import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import FormPageLayer from "../components/FormPageLayer";

const FormPage = ({ title }) => {
  return (
    <>
      <MasterLayout>
        <FormPageLayer title={title} />
      </MasterLayout>
    </>
  );
};

export default FormPage;
