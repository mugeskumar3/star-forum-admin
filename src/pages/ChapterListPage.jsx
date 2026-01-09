import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import ChapterListLayer from "../components/ChapterListLayer";

const ChapterListPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title="Chapter Management" />

        {/* ChapterListLayer */}
        <ChapterListLayer />
      </MasterLayout>
    </>
  );
};

export default ChapterListPage;
