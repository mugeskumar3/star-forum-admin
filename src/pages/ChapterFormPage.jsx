import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import ChapterFormLayer from "../components/ChapterFormLayer";
import { useParams } from "react-router-dom";

const ChapterFormPage = () => {
  const { id } = useParams();
  const isEditMode = !!id;

  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title={isEditMode ? "Edit Chapter" : "Add Chapter"} />

        {/* ChapterFormLayer */}
        <ChapterFormLayer />
      </MasterLayout>
    </>
  );
};

export default ChapterFormPage;
