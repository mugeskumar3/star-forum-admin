import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import OrganisationFormLayer from "../components/OrganisationFormLayer";

const OrganisationFormPage = () => {
    return (
        <MasterLayout>
            <Breadcrumb title="Add Organisation" />
            <OrganisationFormLayer />
        </MasterLayout>
    );
};

export default OrganisationFormPage;
