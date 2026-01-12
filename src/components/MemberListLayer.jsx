import React, { useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Link } from "react-router-dom";
import TablePagination from "./TablePagination";

const MemberListLayer = () => {
  const [members, setMembers] = useState([
    {
      id: 1,
      name: "Darlene Robertson",
      image: "assets/images/users/user1.png",
      chapter: "Star Chapter",
      region: "North Region",
      membershipId: "MEM-001",
      status: "Active",
      email: "darlene@example.com",
    },
    {
      id: 2,
      name: "Cody Fisher",
      image: "assets/images/users/user2.png",
      chapter: "Galaxy Chapter",
      region: "South Region",
      membershipId: "MEM-002",
      status: "Inactive",
      email: "cody@example.com",
    },
  ]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  // Filter Data
  const filteredMembers = members.filter(
    (member) =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.membershipId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalRecords = filteredMembers.length;
  const totalPages = Math.ceil(totalRecords / rowsPerPage);

  const currentData = filteredMembers.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
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

  return (
    <div className="card h-100 p-0 radius-12">
      <div className="card-header border-bottom bg-base py-16 px-24 d-flex align-items-center flex-wrap gap-3 justify-content-between">
        <div className="d-flex align-items-center flex-wrap gap-3">
          <span className="text-md fw-medium text-secondary-light mb-0">
            Show
          </span>
          <select
            className="form-select form-select-sm w-auto ps-12 py-6 radius-12 h-40-px"
            value={rowsPerPage}
            onChange={(e) => setRowsPerPage(parseInt(e.target.value))}
          >
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
          </select>
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
        </div>
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
      <div className="card-body p-24">
        <div className="table-responsive scroll-sm">
          <table className="table bordered-table sm-table mb-0">
            <thead>
              <tr>
                <th scope="col">S.No</th>
                <th scope="col">Member Profile</th>
                <th scope="col">Chapter</th>
                <th scope="col">Region</th>
                <th scope="col">Membership ID</th>
                <th scope="col">Status</th>
                <th scope="col" className="text-center">
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
                        className={`badge ${member.status === "Active"
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
