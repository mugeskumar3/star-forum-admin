import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import AdminUserFormLayer from "../components/AdminUserFormLayer";

const AdminRegistrationEditPage = () => {
    // In a real app, we would fetch user data here based on ID and pass it to AdminUserFormLayer
    return (
        <>
            {/* MasterLayout */}
            <MasterLayout>
                {/* Breadcrumb */}
                <Breadcrumb title="Edit User" />

                {/* AdminUserFormLayer - reused for edit */}
                <AdminUserFormLayer />
            </MasterLayout>
        </>
    );
};

export default AdminRegistrationEditPage;
