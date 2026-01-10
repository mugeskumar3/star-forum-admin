import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";

const UserRoleListLayer = () => {
  // Static Dummy Data for User Roles
  const [roles, setRoles] = useState([
    {
      id: "ROLE-001",
      name: "Super Admin",
      description: "Full access to all modules and settings.",
      activeUsers: 3,
      createdDate: "01 Jan 2025",
      status: "Active",
    },
    {
      id: "ROLE-002",
      name: "Chapter Admin",
      description: "Manage specific chapter operations and members.",
      activeUsers: 12,
      createdDate: "05 Jan 2025",
      status: "Active",
    },
    {
      id: "ROLE-003",
      name: "Member",
      description: "Regular member access with limited permissions.",
      activeUsers: 450,
      createdDate: "10 Jan 2025",
      status: "Active",
    },
    {
      id: "ROLE-004",
      name: "Guest",
      description: "View-only access for visitors.",
      activeUsers: 0,
      createdDate: "15 Jan 2025",
      status: "Inactive",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const filteredRoles = roles.filter(
    (role) =>
      role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      role.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Icon icon="ion:search-outline" className="icon" />
          </form>
        </div>
        <Link
          to="/user-roles/create"
          className="btn btn-primary text-sm btn-sm px-12 py-12 radius-8 d-flex align-items-center gap-2"
        >
          <Icon
            icon="ic:baseline-plus"
            className="icon text-xl line-height-1"
          />
          Add New Role
        </Link>
      </div>
      <div className="card-body p-24">
        <div className="table-responsive scroll-sm">
          <table className="table bordered-table sm-table mb-0">
            <thead>
              <tr>
                <th scope="col">Role ID</th>
                <th scope="col">Role Name</th>
                <th scope="col">Description</th>
                <th scope="col" className="text-center">
                  Active Users
                </th>
                <th scope="col">Created Date</th>
                <th scope="col">Status</th>
                <th scope="col" className="text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredRoles.length > 0 ? (
                filteredRoles.map((role) => (
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
      </div>
    </div>
  );
};

export default UserRoleListLayer;
