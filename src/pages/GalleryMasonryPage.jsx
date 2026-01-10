import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import GalleryMasonryLayer from "../components/GalleryMasonryLayer";

const GalleryMasonryPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* GalleryLayer */}
        <GalleryMasonryLayer />
      </MasterLayout>
    </>
  );
};

export default GalleryMasonryPage;
