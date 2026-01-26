import React from 'react';
import MasterLayout from '../masterLayout/MasterLayout';
import Breadcrumb from '../components/Breadcrumb';
import MemberPointsReportLayer from '../components/MemberPointsReportLayer';

const MemberPointsReportPage = () => {
    return (
        <MasterLayout>
            {/* <Breadcrumb title="Member Points Report" /> */}
            <MemberPointsReportLayer />
        </MasterLayout>
    );
};

export default MemberPointsReportPage;
