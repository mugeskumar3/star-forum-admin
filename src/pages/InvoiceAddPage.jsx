import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import InvoiceAddLayer from "../components/InvoiceAddLayer";




const InvoiceAddPage = () => {
  return (
    <>

      {/* MasterLayout */}
      <MasterLayout>
        {/* InvoiceAddLayer */}
        <InvoiceAddLayer />

      </MasterLayout>

    </>
  );
};

export default InvoiceAddPage;
