import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import BlogLayer from "../components/BlogLayer";

const BlogPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* BlogLayer */}
        <BlogLayer />
      </MasterLayout>
    </>
  );
};

export default BlogPage;
