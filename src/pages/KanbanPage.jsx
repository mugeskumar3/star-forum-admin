import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import KanbanLayer from "../components/KanbanLayer";




const KanbanPage = () => {
  return (
    <>

      {/* MasterLayout */}
      <MasterLayout>
        {/* KanbanLayer */}
        <KanbanLayer />

      </MasterLayout>

    </>
  );
};

export default KanbanPage; 
