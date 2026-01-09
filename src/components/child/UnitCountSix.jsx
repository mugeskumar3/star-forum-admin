import React from "react";

const UnitCountSix = () => {
  const data = [
    {
      label: "Zone",
      value: 5,
      color: "text-cyan-600",
      bg: "bg-cyan-100",
      icon: "ri-map-pin-line",
    },
    {
      label: "Region",
      value: 12,
      color: "text-lilac-600",
      bg: "bg-lilac-100",
      icon: "ri-global-line",
    },
    {
      label: "Chapters",
      value: 18,
      color: "text-primary-600",
      bg: "bg-primary-100",
      icon: "ri-book-open-line",
    },
    {
      label: "Chief Guest",
      value: 45,
      color: "text-success-600",
      bg: "bg-success-100",
      icon: "ri-user-star-line",
    },
    {
      label: "Visitors",
      value: 80,
      color: "text-orange-600",
      bg: "bg-orange-100",
      icon: "ri-group-line",
    },
    {
      label: "ED",
      value: 6,
      color: "text-danger-600",
      bg: "bg-danger-100",
      icon: "ri-admin-line",
    },
    {
      label: "RD",
      value: 13,
      color: "text-info-600",
      bg: "bg-info-100",
      icon: "ri-user-settings-line",
    },
  ];

  const membershipData = [
    {
      label: "Members",
      value: 998,
      color: "text-primary-600",
      bg: "bg-primary-100",
      icon: "ri-group-line",
    },
    {
      label: "Gold Club",
      value: 56,
      color: "text-warning-600",
      bg: "bg-warning-100",
      icon: "ri-vip-crown-line",
    },
    {
      label: "Diamond",
      value: 98,
      color: "text-info-600",
      bg: "bg-info-100",
      icon: "ri-vip-diamond-line",
    },
    {
      label: "Platinum",
      value: 102,
      color: "text-secondary-600",
      bg: "bg-secondary-100",
      icon: "ri-medal-line",
    },
    {
      label: "Prime",
      value: 10,
      color: "text-success-600",
      bg: "bg-success-100",
      icon: "ri-user-star-line",
    },
    {
      label: "Elite",
      value: 6,
      color: "text-danger-600",
      bg: "bg-danger-100",
      icon: "ri-vip-line",
    },
    {
      label: "Trainings",
      value: 110,
      color: "text-cyan-600",
      bg: "bg-cyan-100",
      icon: "ri-presentation-line",
    },
  ];

  const activityData = [
    {
      label: "121 Count",
      value: 1187,
      color: "text-purple-600",
      bg: "bg-purple-100",
      icon: "ri-calendar-check-line",
    },
    {
      label: "Referal Count",
      value: 2018,
      color: "text-orange-600",
      bg: "bg-orange-100",
      icon: "ri-share-line",
    },
    {
      label: "Thankyou slip",
      value: 1678,
      color: "text-pink-600",
      bg: "bg-pink-100",
      icon: "ri-file-paper-line",
    },
    {
      label: "Power Date",
      value: 117,
      color: "text-teal-600",
      bg: "bg-teal-100",
      icon: "ri-calendar-event-line",
    },
    {
      label: "Star Update",
      value: 56,
      color: "text-blue-600",
      bg: "bg-blue-100",
      icon: "ri-star-line",
    },
    {
      label: "Testimonials",
      value: 1121,
      color: "text-yellow-600",
      bg: "bg-yellow-100",
      icon: "ri-chat-quote-line",
    },
    {
      label: "Next Renwal",
      value: 122,
      color: "text-green-600",
      bg: "bg-green-100",
      icon: "ri-refresh-line",
    },
  ];

  const UnitCard = ({ item }) => (
    <div className="col-xxl-3 col-xl-3 col-lg-6 col-md-6 col-sm-6 col-12">
      <div
        className={`card h-100 p-3 shadow-hover-xl transition-2 radius-12 ${
          item.bg
        } border-end border-1 ${item.color.replace("text-", "border-")}`}
      >
        <div className="card-body p-0">
          <div className="d-flex align-items-center justify-content-between gap-3">
            <div className="flex-grow-1">
              <span className="fw-medium text-secondary-light text-sm mb-1 d-block text-uppercase spacing-1">
                {item.label}
              </span>
              <h6 className="fw-bolder text-3xl mb-0">{item.value}</h6>
            </div>
            <div className="flex-shrink-0">
              <span
                className={`w-48-px h-48-px bg-white ${item.color} shadow-sm d-flex justify-content-center align-items-center rounded-circle text-1xl transition-2`}
              >
                <i className={item.icon} />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* General Stats */}
      <div className="row gy-4">
        {data.map((item, index) => (
          <UnitCard item={item} key={`data-${index}`} />
        ))}
      </div>

      <div className="my-4"></div>

      {/* Membership Stats */}
      <div className="row gy-4">
        {membershipData.map((item, index) => (
          <UnitCard item={item} key={`mem-${index}`} />
        ))}
      </div>

      <div className="my-4"></div>

      {/* Activity Stats */}
      <div className="row gy-4">
        {activityData.map((item, index) => (
          <UnitCard item={item} key={`act-${index}`} />
        ))}
      </div>
    </>
  );
};

export default UnitCountSix;
