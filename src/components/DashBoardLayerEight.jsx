import React from "react";
import UnitCountSix from "./child/UnitCountSix";
import PatientVisitByGender from "./child/PatientVisitByGender";
import TopPerformanceList from "./child/TopPerformanceList";
import RecentlyMembersJoined from "./child/RecentlyMembersJoined";

const DashBoardLayerEight = () => {
  const top121Members = [
    { name: "Wade Warren", value: 12 },
    { name: "Jenny Wilson", value: 12 },
    { name: "Guy Hawkins", value: 12 },
    { name: "Cody Fisher", value: 12 },
    { name: "Esther Howard", value: 12 },
  ];

  const topReferralMembers = [
    { name: "Floyd Miles", value: 12 },
    { name: "Arlene McCoy", value: 12 },
    { name: "Bessie Cooper", value: 12 },
    { name: "Ralph Edwards", value: 12 },
    { name: "Jerome Bell", value: 12 },
  ];

  const topBusinessGivers = [
    { name: "Courtney Henry", value: 1200000 },
    { name: "Theresa Webb", value: 1200000 },
    { name: "Kathryn Murphy", value: 1200000 },
    { name: "Darlene Robertson", value: 1200000 },
    { name: "Jane Cooper", value: 1200000 },
  ];

  return (
    <>
      <div className='row gy-4'>
        <div className='col-xxxl-12'>
          <div className='row gy-4'>
            {/* UnitCountSix */}
            <UnitCountSix />

            {/* PatientVisitByGender */}
            <PatientVisitByGender />

            {/* Top 5 Monthly Performance - Row 3 */}
            <TopPerformanceList title="Top 121 Members" data={top121Members} />
            <TopPerformanceList title="Top Referral Members" data={topReferralMembers} />
            <TopPerformanceList title="Top Business Givers" data={topBusinessGivers} />

            {/* Recently Members Joined */}
            <RecentlyMembersJoined />
          </div>
        </div>
      </div>
    </>
  );
};

export default DashBoardLayerEight;
