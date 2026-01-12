import React from "react";

const UnitCountSix = () => {
  // ... data arrays remain same ...
  // Group 1: General Stats
  const generalStats = [
    { label: "Zone", value: 5, icon: "ri-map-pin-line" },
    { label: "Region", value: 12, icon: "ri-global-line" },
    { label: "Chapters", value: 18, icon: "ri-book-open-line" },
    { label: "Visitors", value: 80, icon: "ri-group-line" },
    { label: "ED", value: 6, icon: "ri-admin-line" },
    { label: "RD", value: 13, icon: "ri-user-settings-line" },
  ];

  // Group 2: Member Stats
  const memberStats = [
    { label: "Members", value: 998, icon: "ri-group-line" },
    { label: "Gold Club", value: 56, icon: "ri-vip-crown-line" },
    { label: "Diamond", value: 98, icon: "ri-vip-diamond-line" },
    { label: "Platinum", value: 102, icon: "ri-medal-line" },
    { label: "Prime", value: 10, icon: "ri-user-star-line" },
    { label: "Elite", value: 6, icon: "ri-vip-line" },
  ];

  // Group 3: Achievement Stats
  const achievementStats = [
    { label: "121 Count", value: 1187, icon: "ri-calendar-check-line" },
    { label: "Referal Count", value: 2018, icon: "ri-share-line" },
    { label: "Thankyou slip", value: 1678, icon: "ri-file-paper-line" },
    { label: "Power Date", value: 117, icon: "ri-calendar-event-line" },
    { label: "Testimonials", value: 1121, icon: "ri-chat-quote-line" },
  ];

  // Group 4: Event Stats
  const eventStats = [
    { label: "Chief Guest", value: 45, icon: "ri-user-star-line" },
    { label: "Trainings", value: 110, icon: "ri-presentation-line" },
    { label: "Star Update", value: 56, icon: "ri-star-line" },
    { label: "Star Business Closed", value: 122, icon: "ri-store-3-line" },
    { label: "Next Renewal", value: 122, icon: "ri-refresh-line" },
  ];

  const UnitCard = ({ item }) => (
    <div className="col">
      <div
        className={`card h-100 py-1 shadow-hover-xl transition-2 radius-20`}
        style={{ borderRight: `3px solid #c4161c`, paddingLeft: `10px` }}
      >
        <div className="card-body p-0">
          <div className="gap-2">
            <div className="flex-grow-1">
              <span className="fw-medium text-secondary-light text-sm mb-1 d-block text-uppercase spacing-1">
                {item.label}
              </span>
            </div>
            <div className="d-flex align-items-center justify-content-between gap-2">
              <h6 className="fw-bolder text-1xl mb-0">
                {item.value.toLocaleString("en-IN")}
              </h6>
              <span
                className={`w-48-px h-48-px d-flex justify-content-center align-items-center text-1xl`}
              >
                <i className={item.icon} style={{ color: "#c4161c" }} />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="d-flex flex-column gap-4">
      <div className="card h-100 p-0 radius-12">
        <div className="card-body p-24">
          <div className="row gy-4 row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-6">
            {generalStats.map((item, index) => (
              <UnitCard item={item} key={`gen-${index}`} />
            ))}
          </div>
          <div className="gy-4"></div>
          <div className="row gy-4 my-3 row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-6">
            {memberStats.map((item, index) => (
              <UnitCard item={item} key={`mem-${index}`} />
            ))}
          </div>
        </div>
      </div>

      <div className="card h-100 p-0 radius-12">
        <div className="card-header border-bottom bg-base py-16 px-24">
          <h6 className="text-lg fw-semibold mb-0">Members Achievements</h6>
        </div>
        <div className="card-body p-24">
          <div className="row gy-4 row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-5">
            {achievementStats.map((item, index) => (
              <UnitCard item={item} key={`ach-${index}`} />
            ))}
          </div>
        </div>
      </div>
      <div className="card h-100 p-0 radius-12">
        <div className="card-header border-bottom bg-base py-16 px-24">
          <h6 className="text-lg fw-semibold mb-0">Star Achievements</h6>
        </div>
        <div className="card-body p-24">
          <div className="row gy-4 row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-5">
            {eventStats.map((item, index) => (
              <UnitCard item={item} key={`evt-${index}`} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnitCountSix;
