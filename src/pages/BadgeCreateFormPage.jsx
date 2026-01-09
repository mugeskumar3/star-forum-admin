import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import BadgeCreateLayer from "../components/BadgeCreateLayer";

const BadgeCreateFormPage = () => {
    return (
        <MasterLayout>
            <Breadcrumb title="Create New Badge" />
            <BadgeCreateLayer />
        </MasterLayout>
    );
};

export default BadgeCreateFormPage;
