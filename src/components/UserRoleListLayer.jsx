import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";
import TablePagination from "./TablePagination";

const UserRoleListLayer = () => {
  // Static Dummy Data for User Roles
  const [roles, setRoles] = useState(Array.from({ length: 20 }).map((_, i) => ({
    id: `ROLE-0${i + 101}`,
    name: ['Super Admin', 'Chapter Admin', 'Member', 'Guest', 'Regional Director', 'Executive Director', 'State Coordinator', 'Event Lead', 'Finance Admin', 'Membership Head', 'Chapter Lead', 'Zone Manager', 'Star Member', 'Elite Member', 'Titan Member', 'Warrior Member', 'King Member', 'Fort Admin', 'Coast Lead', 'Port Admin'][i],
    description: `Full access to Section ${i + 1} modules and settings. Managed by ${['Rajesh', 'Priya', 'Amit', 'Sneha', 'Vikram', 'Ananya', 'Suresh', 'Megha', 'Arjun', 'Kavita', 'Rahul', 'Pooja', 'Sandeep', 'Neha', 'Vijay', 'Shilpa', 'Manish', 'Divya', 'Pankaj', 'Swati'][i]}.`,
    activeUsers: Math.floor(Math.random() * 500),
    createdDate: "01 Jan 2025",
    status: i % 2 === 0 ? "Active" : "Inactive",
  })));

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredRoles = roles.filter(
    (role) =>
      role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      role.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalRecords = filteredRoles.length;
  const totalPages = Math.ceil(totalRecords / rowsPerPage);

  const currentData = filteredRoles.slice(
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
    if (window.confirm("Are you sure you want to delete this role?")) {
      setRoles((prev) => prev.filter((role) => role.id !== id));
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "Active":
        return "bg-success-focus text-success-main";
      case "Inactive":
        return "bg-danger-focus text-danger-main";
      default:
        return "bg-neutral-200 text-neutral-600";
    }
  };

  return (
    <div className="card h-100 p-0 radius-12">
      <div className="card-header border-bottom bg-base py-16 px-24 d-flex align-items-center flex-wrap gap-3 justify-content-between">
        <div className="d-flex align-items-center flex-wrap gap-3">
          <h4 className="mb-0"  >User Roles</h4>
        </div>
        <div className="d-flex align-items-center flex-wrap gap-3">
          <form className="navbar-search">
            <input
              type="text"
              className="bg-base h-40-px w-auto"
              name="search"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
            <Icon icon="ion:search-outline" className="icon" />
          </form>
          <Link
            to="/user-roles/create"
            className="btn btn-primary text-sm btn-sm px-12 py-12 radius-8 d-flex align-items-center gap-2"
            style={{ backgroundColor: "#C4161C", borderColor: "#C4161C" }}
          >
            <Icon
              icon="ic:baseline-plus"
              className="icon text-xl line-height-1"
            />
            Add New Role
          </Link>
        </div>
      </div>
      <div className="card-body p-24">
        <div className="table-responsive scroll-sm">
          <table className="table bordered-table sm-table mb-0">
            <thead>
              <tr>
                <th scope="col" style={{ color: "black" }}>Role ID</th>
                <th scope="col" style={{ color: "black" }}>Role Name</th>
                <th scope="col" style={{ color: "black" }}>Description</th>
                <th scope="col" className="text-center" style={{ color: "black" }}>
                  Active Users
                </th>
                <th scope="col" style={{ color: "black" }}>Created Date</th>
                <th scope="col" style={{ color: "black" }}>Status</th>
                <th scope="col" className="text-center" style={{ color: "black" }}>
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {currentData.length > 0 ? (
                currentData.map((role) => (
                  <tr key={role.id}>
                    <td>
                      <span className="text-md mb-0 fw-medium text-primary-600">
                        {role.id}
                      </span>
                    </td>
                    <td>
                      <span className="text-md mb-0 fw-medium text-secondary-light">
                        {role.name}
                      </span>
                    </td>
                    <td>
                      <span className="text-md mb-0 fw-normal text-secondary-light">
                        {role.description}
                      </span>
                    </td>
                    <td className="text-center">
                      <span className="text-md mb-0 fw-normal text-secondary-light">
                        {role.activeUsers}
                      </span>
                    </td>
                    <td>
                      <span className="text-md mb-0 fw-normal text-secondary-light">
                        {role.createdDate}
                      </span>
                    </td>
                    <td>
                      <span
                        className={`badge radius-4 px-10 py-4 text-sm ${getStatusBadgeClass(
                          role.status
                        )}`}
                      >
                        {role.status}
                      </span>
                    </td>
                    <td className="text-center">
                      <div className="d-flex align-items-center gap-10 justify-content-center">
                        <Link
                          to={`/user-roles/view/${role.id}`}
                          className="bg-info-focus bg-hover-info-200 text-info-600 fw-medium w-40-px h-40-px d-flex justify-content-center align-items-center rounded-circle"
                        >
                          <Icon
                            icon="majesticons:eye-line"
                            className="icon text-xl"
                          />
                        </Link>
                        <Link
                          to={`/user-roles/edit/${role.id}`}
                          className="bg-success-focus bg-hover-success-200 text-success-600 fw-medium w-40-px h-40-px d-flex justify-content-center align-items-center rounded-circle"
                        >
                          <Icon icon="lucide:edit" className="icon text-xl" />
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleDeleteClick(role.id)}
                          className="bg-danger-focus bg-hover-danger-200 text-danger-600 fw-medium w-40-px h-40-px d-flex justify-content-center align-items-center rounded-circle border-0"
                        >
                          <Icon
                            icon="fluent:delete-24-regular"
                            className="icon text-xl"
                          />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-4">
                    No roles found.
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

export default UserRoleListLayer;
