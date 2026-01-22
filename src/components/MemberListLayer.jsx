import React, { useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Link } from "react-router-dom";
import Select from "react-select";
import TablePagination from "./TablePagination";

const MemberListLayer = () => {
  const [members, setMembers] = useState(
    Array.from({ length: 20 }).map((_, i) => ({
      id: i + 1,
      name: [
        "Rajesh Kumar",
        "Priya Sharma",
        "Amit Patel",
        "Sneha Reddy",
        "Vikram Singh",
        "Ananya Iyer",
        "Suresh Nair",
        "Megha Gupta",
        "Arjun Verma",
        "Kavita Joshi",
        "Rahul Deshmukh",
        "Pooja Malhotra",
        "Sandeep Bansal",
        "Neha Choudhury",
        "Vijay Ranganathan",
        "Shilpa Kulkarni",
        "Manish Tiwari",
        "Divya Saxena",
        "Pankaj अग्रवाल",
        "Swati Bhattacharya",
      ][i],
      image: `assets/images/users/user${(i % 5) + 1}.png`,
      chapter: [
        "Chennai Central",
        "Mumbai South",
        "Delhi West",
        "Bangalore East",
        "Hyderabad North",
        "Kolkata Metro",
        "Pune City",
        "Ahmedabad GIDC",
        "Jaipur Pink",
        "Lucknow Nawabs",
        "Chandigarh Royal",
        "Coimbatore Elite",
        "Madurai Star",
        "Trichy Titans",
        "Salem Warriors",
        "Erode Kings",
        "Vellore Fort",
        "Nellore Coast",
        "Vizag Port",
        "Kochi Spice",
      ][i],
      region: [
        "North Region",
        "South Region",
        "East Region",
        "West Region",
        "Central Region",
      ][i % 5],
      membershipId: `MEM-0${i + 100}`,
      status: i % 2 === 0 ? "Active" : "Inactive",
      email: `member${i + 1}@example.com`,
      membershipType: ["Gold", "Platinum", "Silver"][i % 3],
    })),
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMembershipType, setSelectedMembershipType] = useState("All");

  // Filter Data
  const filteredMembers = members.filter(
    (member) =>
      (member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.membershipId.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedMembershipType === "All" ||
        member.membershipType === selectedMembershipType),
  );

  const totalRecords = filteredMembers.length;
  const totalPages = Math.ceil(totalRecords / rowsPerPage);

  const currentData = filteredMembers.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage,
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(parseInt(e.target.value));
    setCurrentPage(1);
  };

  const handleDeleteClick = (id) => {
    if (window.confirm("Are you sure you want to delete this member?")) {
      setMembers((prev) => prev.filter((m) => m.id !== id));
    }
  };

  const membershipOptions = [
    { value: "All", label: "All Types" },
    { value: "Gold", label: "Gold" },
    { value: "Platinum", label: "Platinum" },
    { value: "Silver", label: "Silver" },
  ];

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: "var(--bg-base)",
      border: "1px solid var(--border-color)",
      borderRadius: "8px",
      minHeight: "40px",
      boxShadow: "none",
      "&:hover": {
        border: "1px solid var(--primary-600)",
      },
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? "var(--primary-600)"
        : state.isFocused
          ? "var(--primary-50)"
          : "transparent",
      color: state.isSelected ? "#fff" : "var(--text-main)",
      cursor: "pointer",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "var(--text-main)",
    }),
    menu: (provided) => ({
      ...provided,
      zIndex: 9999,
    }),
  };

  return (
    <div className="card h-100 p-0 radius-12">
      <div className="card-header border-bottom bg-base py-16 px-24 d-flex align-items-center flex-wrap gap-3 justify-content-between">
        <div className="d-flex align-items-center flex-wrap gap-3">
          <h6 className="text-primary-600 pb-2 mb-0">Member List</h6>
        </div>
        <div className="d-flex align-items-center flex-wrap gap-3">
          <div style={{ width: "150px" }}>
            <Select
              options={membershipOptions}
              value={membershipOptions.find(
                (option) => option.value === selectedMembershipType,
              )}
              onChange={(selectedOption) => {
                setSelectedMembershipType(selectedOption.value);
                setCurrentPage(1);
              }}
              styles={customStyles}
              isSearchable={false}
              placeholder="Select Type"
            />
          </div>
          <form className="navbar-search">
            <input
              type="text"
              className="bg-base h-40-px w-auto"
              name="search"
              placeholder="Search by Name or ID"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
            <Icon icon="ion:search-outline" className="icon" />
          </form>
          <Link
            to="/members-registration/add"
            className="btn btn-primary text-sm btn-sm px-12 py-12 radius-8 d-flex align-items-center gap-2"
            style={{ backgroundColor: "#C4161C", borderColor: "#C4161C" }}
          >
            <Icon
              icon="ic:baseline-plus"
              className="icon text-xl line-height-1"
            />
            Add New Member
          </Link>
        </div>
      </div>
      <div className="card-body p-24">
        <div className="table-responsive scroll-sm">
          <table className="table bordered-table sm-table mb-0">
            <thead>
              <tr>
                <th scope="col" style={{ color: "black" }}>
                  S.No
                </th>
                <th scope="col" style={{ color: "black" }}>
                  Member Profile
                </th>
                <th scope="col" style={{ color: "black" }}>
                  Chapter
                </th>
                <th scope="col" style={{ color: "black" }}>
                  Region
                </th>
                <th scope="col" style={{ color: "black" }}>
                  Membership ID
                </th>
                <th scope="col" style={{ color: "black" }}>
                  Type
                </th>
                <th scope="col" style={{ color: "black" }}>
                  Status
                </th>
                <th
                  scope="col"
                  className="text-center"
                  style={{ color: "black" }}
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {currentData.length > 0 ? (
                currentData.map((member, index) => (
                  <tr key={member.id}>
                    <td>{(currentPage - 1) * rowsPerPage + index + 1}</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <img
                          src={member.image}
                          alt=""
                          className="w-40-px h-40-px rounded-circle flex-shrink-0 me-12 overflow-hidden"
                          onError={(e) => {
                            e.target.src = "https://placehold.co/40x40"; // Fallback
                          }}
                        />
                        <div className="flex-grow-1">
                          <span className="text-md mb-0 fw-normal text-secondary-light d-block">
                            {member.name}
                          </span>
                          <span className="text-xs text-secondary-light fw-normal">
                            {member.email}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td>{member.chapter}</td>
                    <td>{member.region}</td>
                    <td>{member.membershipId}</td>
                    <td>
                      <span
                        className={`badge ${member.membershipType === "Platinum" ? "bg-primary-50 text-primary-600" : member.membershipType === "Gold" ? "bg-warning-50 text-warning-600" : "bg-secondary-50 text-secondary-600"} px-12 py-4 radius-4`}
                      >
                        {member.membershipType}
                      </span>
                    </td>
                    <td>
                      <span
                        className={`badge ${
                          member.status === "Active"
                            ? "bg-success-focus text-success-main"
                            : "bg-danger-focus text-danger-main"
                        } px-24 py-4 rounded-pill fw-medium text-sm`}
                      >
                        {member.status}
                      </span>
                    </td>
                    <td className="text-center">
                      <div className="d-flex align-items-center gap-10 justify-content-center">
                        <Link
                          to={`/members-registration/edit/${member.id}`}
                          className="bg-info-focus bg-hover-info-200 text-info-600 fw-medium w-40-px h-40-px d-flex justify-content-center align-items-center rounded-circle"
                        >
                          <Icon
                            icon="majesticons:eye-line"
                            className="icon text-xl"
                          />
                        </Link>
                        <Link
                          to={`/members-registration/edit/${member.id}`}
                          className="bg-success-focus text-success-600 bg-hover-success-200 fw-medium w-40-px h-40-px d-flex justify-content-center align-items-center rounded-circle"
                        >
                          <Icon icon="lucide:edit" className="menu-icon" />
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleDeleteClick(member.id)}
                          className="remove-item-btn bg-danger-focus bg-hover-danger-200 text-danger-600 fw-medium w-40-px h-40-px d-flex justify-content-center align-items-center rounded-circle"
                        >
                          <Icon
                            icon="fluent:delete-24-regular"
                            className="menu-icon"
                          />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-4">
                    No members found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <TablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleRowsPerPageChange}
          totalRecords={totalRecords}
        />
      </div>
    </div>
  );
};

export default MemberListLayer;
