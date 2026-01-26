import React from "react";
import { useParams } from "react-router-dom";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import ChiefGuestFormLayer from "../components/ChiefGuestFormLayer";

const ChiefGuestFormPage = () => {
  const { id } = useParams();
  const isEditMode = !!id;

  return (
    <>
      <MasterLayout>
        <Breadcrumb title={isEditMode ? "Edit Chief Guest" : "Add Chief Guest"} />
        <ChiefGuestFormLayer />
      </MasterLayout>
    </>
  );
};

export default ChiefGuestFormPage;
