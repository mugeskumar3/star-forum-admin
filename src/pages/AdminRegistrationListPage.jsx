import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import AdminRegistrationListLayer from "../components/AdminRegistrationListLayer";

const AdminRegistrationListPage = () => {
    return (
        <>
            {/* MasterLayout */}
            <MasterLayout>
                {/* Breadcrumb */}
                {/* <Breadcrumb title="Admin Users" /> */}

                {/* AdminRegistrationListLayer */}
                <AdminRegistrationListLayer />
            </MasterLayout>
        </>
    );
};

export default AdminRegistrationListPage;
