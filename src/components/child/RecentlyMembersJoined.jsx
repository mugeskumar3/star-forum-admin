import React from "react";
import { Link } from "react-router-dom";

const RecentlyMembersJoined = () => {
  const members = [
    {
      name: "Rohan Mehta",
      category: "Manufacturing",
      company: "BuildHigh",
      location: "Mumbai",
      region: "West",
      chapter: "Mumbai",
    },
    {
      name: "Sanya Kapoor",
      category: "IT",
      company: "Cyberdyne",
      location: "Bangalore",
      region: "South",
      chapter: "Bangalore",
    },
    {
      name: "Amit Verma",
      category: "Finance",
      company: "Fiscal Sol",
      location: "New Delhi",
      region: "North",
      chapter: "Delhi",
    },
    {
      name: "Arjun Kumar",
      category: "Technology",
      company: "Star Forum",
      location: "Chennai",
      region: "South",
      chapter: "Chennai",
    },
    {
      name: "Meera Reddy",
      category: "Healthcare",
      company: "HealthPlus",
      location: "Hyderabad",
      region: "South",
      chapter: "Hyderabad",
    },
    {
      name: "Kabir Das",
      category: "Retail",
      company: "ShopMore",
      location: "Kolkata",
      region: "East",
      chapter: "Kolkata",
    },
  ];

  return (
    <div className="col-xxl-12">
      <div className="card h-100">
        <div className="card-header border-bottom bg-base py-16 px-24 d-flex align-items-center justify-content-between">
          <h6 className="text-lg fw-semibold mb-0">Recently Joined Members</h6>
          <Link
            to="#"
            className="text-primary-600 hover-text-primary d-flex align-items-center gap-1"
          >
            View All
            <iconify-icon
              icon="solar:alt-arrow-right-linear"
              className="icon"
            />
          </Link>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive scroll-sm">
            <table
              className="table bordered-table mb-0 rounded-0 border-0"
              style={{ color: "white" }}
            >
              <thead style={{ backgroundColor: "#C4161C", color: "white" }}>
                <tr>
                  <th
                    scope="col"
                    className="bg-transparent rounded-0 text-white"
                    style={{ color: "white" }}
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="bg-transparent rounded-0 text-white"
                    style={{ color: "white" }}
                  >
                    Category
                  </th>
                  <th scope="col" className="bg-transparent rounded-0">
                    Company
                  </th>
                  <th scope="col" className="bg-transparent rounded-0">
                    Location
                  </th>
                  <th scope="col" className="bg-transparent rounded-0">
                    Region
                  </th>
                  <th scope="col" className="bg-transparent rounded-0">
                    Chapter
                  </th>
                </tr>
              </thead>
              <tbody>
                {members.map((member, index) => (
                  <tr key={index}>
                    <td>
                      <div className="d-flex align-items-center gap-2">
                        <img
                          src="/assets/images/avatar/avatar-group1.png"
                          alt=""
                          className="w-32-px h-32-px rounded-circle object-fit-cover"
                        />
                        {member.name}
                      </div>
                    </td>
                    <td>{member.category}</td>
                    <td>{member.company}</td>
                    <td>{member.location}</td>
                    <td>{member.region}</td>
                    <td>{member.chapter}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentlyMembersJoined;
