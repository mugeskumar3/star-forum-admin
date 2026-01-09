import React from "react";

const UnitCountSix = () => {
  // Row 1 Data
  const row1Data = [
    {
      label: "Zone",
      value: 5,
      bg: "bg-primary-100",
      color: "text-primary-600",
      icon: "ri-map-pin-line",
    },
    {
      label: "Region",
      value: 12,
      bg: "bg-warning-100",
      color: "text-warning-600",
      icon: "ri-map-pin-user-line",
    },
    {
      label: "Chapters",
      value: 18,
      bg: "bg-lilac-100",
      color: "text-lilac-600",
      icon: "ri-building-4-line",
    },
  ];

  // Row 2 Data
  const row2Data = [
    {
      label: "Members",
      value: 998,
      bg: "bg-primary-100",
      color: "text-primary-600",
      icon: "ri-group-line",
    },
    {
      label: "Visitors",
      value: 80,
      bg: "bg-green-100",
      color: "text-green-600",
      icon: "ri-user-follow-line",
    },
    {
      label: "Chief Guests",
      value: 45,
      bg: "bg-red-100",
      color: "text-red-600",
      icon: "ri-user-star-line",
    },
  ];

  // Row 3 Data
  const row3Data = [
    {
      label: "ED",
      value: 6,
      bg: "bg-info-100",
      color: "text-info-600",
      icon: "ri-user-settings-line",
    },
    {
      label: "RD",
      value: 13,
      bg: "bg-blue-100",
      color: "text-blue-600",
      icon: "ri-admin-line",
    },
    {
      label: "Trainings",
      value: 110,
      bg: "bg-cyan-100",
      color: "text-cyan-600",
      icon: "ri-presentation-line",
    },
  ];

  // Row 4 Left Data (Membership)
  const membershipData = [
    {
      label: "Gold Club",
      value: 56,
      bg: "bg-warning-100",
      color: "text-warning-600",
      icon: "ri-vip-crown-line",
    },
    {
      label: "Diamond",
      value: 98,
      bg: "bg-info-100",
      color: "text-info-600",
      icon: "ri-vip-diamond-line",
    },
    {
      label: "Platinum",
      value: 102,
      bg: "bg-secondary-100",
      color: "text-secondary-600",
      icon: "ri-medal-line",
    },
    {
      label: "Prime",
      value: 10,
      bg: "bg-success-100",
      color: "text-success-600",
      icon: "ri-user-star-line",
    },
    {
      label: "Elite",
      value: 6,
      bg: "bg-danger-100",
      color: "text-danger-600",
      icon: "ri-vip-line",
    },
  ];

  // Row 4 Right Data (Activity)
  const activityData = [
    {
      label: "Referrals",
      value: 2018,
      bg: "bg-orange-100",
      color: "text-orange-600",
      icon: "ri-share-line",
    },
    {
      label: "Thank You",
      value: 1678,
      bg: "bg-pink-100",
      color: "text-pink-600",
      icon: "ri-file-paper-line",
    },
    {
      label: "Testimonials",
      value: 1121,
      bg: "bg-yellow-100",
      color: "text-yellow-600",
      icon: "ri-chat-quote-line",
    },
    {
      label: "121",
      value: 1187,
      bg: "bg-purple-100",
      color: "text-purple-600",
      icon: "ri-calendar-check-line",
    },
    {
      label: "Renewal",
      value: 122,
      bg: "bg-green-100",
      color: "text-green-600",
      icon: "ri-refresh-line",
    },
    {
      label: "Power",
      value: 117,
      bg: "bg-teal-100",
      color: "text-teal-600",
      icon: "ri-calendar-event-line",
    },
    {
      label: "Star",
      value: 56,
      bg: "bg-blue-100",
      color: "text-blue-600",
      icon: "ri-star-line",
    },
  ];

  const HorizontalCardRow = ({ data }) => (
    <div className="card h-100 shadow-sm mb-24 mx-2">
      <div className="card-body p-24">
        <div className="row g-6">
          {data.map((item, idx) => (
            <div className="col-lg-4 col-sm-6 col-12" key={idx}>
              <div className="d-flex align-items-center justify-content-between p-12 radius-8 bg-base border">
                <div>
                  <h6 className="mb-0 fw-bold text-lg">{item.value}</h6>
                  <span className="text-secondary-light text-sm">
                    {item.label}
                  </span>
                </div>
                <span
                  className={`w-40-px h-40-px rounded-circle d-flex align-items-center justify-content-center ${item.bg} ${item.color}`}
                >
                  <i className={`${item.icon} text-xl`} />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const VerticalListCard = ({ data }) => (
    <div className="card h-100 shadow-sm">
      <div className="card-body p-24">
        <div className="d-flex flex-column gap-3">
          {data.map((item, idx) => (
            <div
              className="d-flex align-items-center justify-content-between p-12 radius-8 bg-base border"
              key={idx}
            >
              <div>
                <h6 className="mb-0 fw-bold">{item.value}</h6>
                <span className="text-secondary-light text-sm">
                  {item.label}
                </span>
              </div>
              <span
                className={`w-40-px h-40-px rounded-circle d-flex align-items-center justify-content-center ${item.bg} ${item.color}`}
              >
                <i className={`${item.icon} text-xl`} />
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Row 1: Zone, Region, Chapters */}
      <HorizontalCardRow data={row1Data} />

      {/* Row 2: Members, Visitors, Chief Guests */}
      <HorizontalCardRow data={row2Data} />

      {/* Row 3: ED, RD, Trainings */}
      <HorizontalCardRow data={row3Data} />

      {/* Row 4: Split Layout */}
      <div className="row g-4">
        <div className="col-lg-6 col-12">
          <VerticalListCard data={membershipData} />
        </div>
        <div className="col-lg-6 col-12">
          <VerticalListCard data={activityData} />
        </div>
      </div>
    </>
  );
};

export default UnitCountSix;
