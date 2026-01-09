import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import AdminUserFormLayer from "../components/AdminUserFormLayer";

const AdminRegistrationFormPage = () => {
    return (
        <>
            {/* MasterLayout */}
            <MasterLayout>
                {/* Breadcrumb */}
                <Breadcrumb title="Add User" />

                {/* AdminUserFormLayer */}
                <AdminUserFormLayer />
            </MasterLayout>
        </>
    );
};

export default AdminRegistrationFormPage;
