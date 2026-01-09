import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import BlogDetailsLayer from "../components/BlogDetailsLayer";

const BlogDetailsPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* BlogDetailsLayer */}
        <BlogDetailsLayer />
      </MasterLayout>
    </>
  );
};

export default BlogDetailsPage;
