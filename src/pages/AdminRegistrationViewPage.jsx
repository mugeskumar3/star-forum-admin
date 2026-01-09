import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import AdminUserViewLayer from "../components/AdminUserViewLayer";

const AdminRegistrationViewPage = () => {
    return (
        <>
            {/* MasterLayout */}
            <MasterLayout>
                {/* Breadcrumb */}
                <Breadcrumb title="User Details" />

                {/* AdminUserViewLayer */}
                <AdminUserViewLayer />
            </MasterLayout>
        </>
    );
};

export default AdminRegistrationViewPage;
