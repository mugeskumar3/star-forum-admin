import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import BadgeListLayer from "../components/BadgeListLayer";

const BadgeCreationPage = () => {
    return (
        <MasterLayout>
            <Breadcrumb title="Badge Creation" />
            <BadgeListLayer />
        </MasterLayout>
    );
};

export default BadgeCreationPage;
