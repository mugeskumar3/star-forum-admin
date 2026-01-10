import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import GalleryLayer from "../components/GalleryLayer";

const GalleryPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* GalleryLayer */}
        <GalleryLayer />
      </MasterLayout>
    </>
  );
};

export default GalleryPage;
