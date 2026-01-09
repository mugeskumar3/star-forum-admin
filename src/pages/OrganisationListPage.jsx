import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import OrganisationListLayer from "../components/OrganisationListLayer";

const OrganisationListPage = () => {
    return (
        <MasterLayout>
            <Breadcrumb title="Organisation" />
            <OrganisationListLayer />
        </MasterLayout>
    );
};

export default OrganisationListPage;
