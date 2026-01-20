import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import MemberHistoryLayer from "../components/MemberHistoryLayer";

const MemberHistoryPage = () => {
    return (
        <>
            <MasterLayout>
                <MemberHistoryLayer />
            </MasterLayout>
        </>
    );
};

export default MemberHistoryPage;
