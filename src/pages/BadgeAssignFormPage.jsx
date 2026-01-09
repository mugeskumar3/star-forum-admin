import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import BadgeAssignLayer from "../components/BadgeAssignLayer";

const BadgeAssignFormPage = () => {
    return (
        <MasterLayout>
            <Breadcrumb title="Assign Badge" />
            <BadgeAssignLayer />
        </MasterLayout>
    );
};

export default BadgeAssignFormPage;
