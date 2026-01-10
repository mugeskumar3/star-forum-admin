import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import AddBlogLayer from "../components/AddBlogLayer";

const AddBlogPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* AddBlogLayer */}
        <AddBlogLayer />
      </MasterLayout>
    </>
  );
};

export default AddBlogPage;
