import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import PaymentGatewayLayer from "../components/PaymentGatewayLayer";



const PaymentGatewayPage = () => {
  return (
    <>

      {/* MasterLayout */}
      <MasterLayout>
        {/* PaymentGatewayLayer */}
        <PaymentGatewayLayer />

      </MasterLayout>

    </>
  );
};

export default PaymentGatewayPage; 
