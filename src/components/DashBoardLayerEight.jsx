import React from "react";
import UnitCountSix from "./child/UnitCountSix";
import PatientVisitByGender from "./child/PatientVisitByGender";
import TopPerformanceList from "./child/TopPerformanceList";
import RecentlyMembersJoined from "./child/RecentlyMembersJoined";

const DashBoardLayerEight = () => {
  const top121Members = [
    {
      name: "Karthikeyan P",
      value: 25,
      image: "assets/images/tamil_users/man1.png",
    },
    {
      name: "Saravanan K",
      value: 22,
      image: "assets/images/tamil_users/man2.png",
    },
    {
      name: "Muthu Kumar",
      value: 20,
      image: "assets/images/tamil_users/man1.png",
    },
    {
      name: "Senthil Balaji",
      value: 18,
      image: "assets/images/tamil_users/man2.png",
    },
    {
      name: "Vijay Sethupathi",
      value: 15,
      image: "assets/images/tamil_users/man1.png",
    },
  ];

  const topReferralMembers = [
    {
      name: "Meenakshi S",
      value: 45,
      image: "assets/images/tamil_users/woman1.png",
    },
    {
      name: "Lakshmi Priya",
      value: 42,
      image: "assets/images/tamil_users/woman2.png",
    },
    {
      name: "Anitha Raj",
      value: 40,
      image: "assets/images/tamil_users/woman1.png",
    },
    {
      name: "Revathi M",
      value: 38,
      image: "assets/images/tamil_users/woman2.png",
    },
    {
      name: "Kanchana Devi",
      value: 35,
      image: "assets/images/tamil_users/woman1.png",
    },
  ];

  const topBusinessGivers = [
    {
      name: "Ramesh Babu",
      value: 1500000,
      image: "assets/images/tamil_users/man2.png",
    },
    {
      name: "Suresh Krishnan",
      value: 1450000,
      image: "assets/images/tamil_users/man1.png",
    },
    {
      name: "Geetha Govindam",
      value: 1400000,
      image: "assets/images/tamil_users/woman1.png",
    },
    {
      name: "Divya Bharathi",
      value: 1350000,
      image: "assets/images/tamil_users/woman2.png",
    },
    {
      name: "Bala Murugan",
      value: 1300000,
      image: "assets/images/tamil_users/man2.png",
    },
  ];

  return (
    <>
      <div className="row gy-4">
        <div className="col-xxxl-12">
          <div className="row gy-4">
            {/* UnitCountSix */}
            <UnitCountSix />

            <PatientVisitByGender />

            {/* Top 5 Monthly Performance - Row 3 */}
            <TopPerformanceList title="Top 121 Members" data={top121Members} />
            <TopPerformanceList
              title="Top Referral Members"
              data={topReferralMembers}
            />
            <TopPerformanceList
              title="Top Business Givers"
              data={topBusinessGivers}
            />

            {/* Recently Members Joined */}
            <RecentlyMembersJoined />
          </div>
        </div>
      </div>
    </>
  );
};

export default DashBoardLayerEight;
