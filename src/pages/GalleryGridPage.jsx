import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import GalleryGridLayer from "../components/GalleryGridLayer";

const GalleryGridPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* GalleryLayer */}
        <GalleryGridLayer />
      </MasterLayout>
    </>
  );
};

export default GalleryGridPage;
