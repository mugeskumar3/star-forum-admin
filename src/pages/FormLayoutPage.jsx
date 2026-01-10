import React from "react";
import FormLayoutLayer from "../components/FormLayoutLayer";
import MasterLayout from "../masterLayout/MasterLayout";


const FormLayoutPage = () => {
  return (
    <>

      {/* MasterLayout */}
      <MasterLayout>
        {/* FormLayoutLayer */}
        <FormLayoutLayer />

      </MasterLayout>

    </>
  );
};

export default FormLayoutPage;
