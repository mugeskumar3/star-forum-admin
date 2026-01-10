import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import InvoiceEditLayer from "../components/InvoiceEditLayer";




const InvoiceEditPage = () => {
  return (
    <>

      {/* MasterLayout */}
      <MasterLayout>
        {/* InvoiceEditLayer */}
        <InvoiceEditLayer />

      </MasterLayout>

    </>
  );
};

export default InvoiceEditPage;
