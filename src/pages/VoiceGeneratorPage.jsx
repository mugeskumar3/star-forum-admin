import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import VoiceGeneratorLayer from "../components/VoiceGeneratorLayer";


const VoiceGeneratorPage = () => {
  return (
    <>

      {/* MasterLayout */}
      <MasterLayout>
        {/* VoiceGeneratorLayer */}
        <VoiceGeneratorLayer />

      </MasterLayout>

    </>
  );
};

export default VoiceGeneratorPage; 
