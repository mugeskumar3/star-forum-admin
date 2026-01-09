import React from "react";
import ChapterCreation from "./ChapterCreation";

const FormPageLayer = ({ title }) => {
  return (
    <div className="row justify-content-center">
      <ChapterCreation title={title} />
    </div>
  );
};

export default FormPageLayer;
