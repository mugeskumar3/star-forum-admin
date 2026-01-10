import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import ImageGeneratorLayer from "../components/ImageGeneratorLayer";




const ImageGeneratorPage = () => {
  return (
    <>

      {/* MasterLayout */}
      <MasterLayout>
        {/* ImageGeneratorLayer */}
        <ImageGeneratorLayer />

      </MasterLayout>

    </>
  );
};

export default ImageGeneratorPage;
