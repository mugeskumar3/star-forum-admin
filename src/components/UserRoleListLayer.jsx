import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";
import TablePagination from "./TablePagination";
import RoleApi from "../Api/RoleApi";
import ShowNotifications from "../helper/ShowNotifications";

const UserRoleListLayer = () => {
  const [roles, setRoles] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [totalRecords, setTotalRecords] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const fetchRoles = async () => {
    setIsLoading(true);
    try {
      const response = await RoleApi.getRoles({
        page: currentPage,
        limit: rowsPerPage,
        search: searchTerm,
      });

      if (response.status) {
        setRoles(response.response.data || []);
        setTotalRecords(response.response.total || 0); // Adjust according to API response structure
      } else {
        setRoles([]);
        setTotalRecords(0);
      }
    } catch (error) {
      console.error("Error fetching roles:", error);
      ShowNotifications.showAlertNotification("Error fetching roles", false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, [currentPage, rowsPerPage, searchTerm]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(parseInt(e.target.value));
    setCurrentPage(0);
  };

  const handleDeleteClick = async (id) => {
    if (window.confirm("Are you sure you want to delete this role?")) {
      const response = await RoleApi.deleteRole(id);
      if (response.status) {
        fetchRoles();
      }
    }
  };

  const totalPages = Math.ceil(totalRecords / rowsPerPage);

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
          <h6 className="text-primary-600 pb-2 mb-0">Roles & Permissions</h6>
        </div>
        <div className="d-flex align-items-center flex-wrap gap-3">
          <form className="navbar-search" onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              className="bg-base h-40-px w-auto"
              name="search"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(0);
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
        {isLoading ? (
          <div className="text-center py-4">Loading...</div>
        ) : (
          <>
            <div className="table-responsive scroll-sm">
              <table className="table bordered-table sm-table mb-0">
                <thead>
                  <tr>
                    {/* <th scope="col" style={{ color: "black" }}>
                      Role ID
                    </th> */}
                    <th scope="col" style={{ color: "black" }}>
                      Role Name
                    </th>
                    <th scope="col" style={{ color: "black" }}>
                      Code
                    </th>
                    {/* <th
                      scope="col"
                      className="text-center"
                      style={{ color: "black" }}
                    >
                      Active Users
                    </th> */}
                    <th scope="col" style={{ color: "black" }}>
                      Created Date
                    </th>
                    {/* <th scope="col" style={{ color: "black" }}>
                      Status
                    </th> */}
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
                  {roles && roles.length > 0 ? (
                    roles.map((role) => (
                      <tr key={role._id}>
                        {/* <td>
                          <span className="text-md mb-0 fw-medium text-primary-600">
                            {role._id.substring(0, 6)}...
                          </span>
                        </td> */}
                        <td>
                          <span className="text-md mb-0 fw-medium text-secondary-light">
                            {role.name}
                          </span>
                        </td>
                        <td>
                          <span className="text-md mb-0 fw-normal text-secondary-light">
                            {role.code}
                          </span>
                        </td>
                        {/* <td className="text-center">
                          <span className="text-md mb-0 fw-normal text-secondary-light">
                            {role.activeUsers || 0}
                          </span>
                        </td> */}
                        <td>
                          <span className="text-md mb-0 fw-normal text-secondary-light">
                            {new Date(role.createdAt).toLocaleDateString(
                              "en-GB",
                              {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              },
                            )}
                          </span>
                        </td>
                        {/* <td>
                          <span
                            className={`badge radius-4 px-10 py-4 text-sm ${getStatusBadgeClass(
                              role.status || "Active"
                            )}`}
                          >
                            {role.status || "Active"}
                          </span>
                        </td> */}
                        <td className="text-center">
                          <div className="d-flex align-items-center gap-10 justify-content-center">
                            {/* <Link
                              to={`/user-roles/view/${role._id}`}
                              className="bg-info-focus bg-hover-info-200 text-info-600 fw-medium w-40-px h-40-px d-flex justify-content-center align-items-center rounded-circle"
                            >
                              <Icon
                                icon="majesticons:eye-line"
                                className="icon text-xl"
                              />
                            </Link> */}
                            <Link
                              to={`/user-roles/edit/${role._id}`}
                              className="bg-success-focus bg-hover-success-200 text-success-600 fw-medium w-40-px h-40-px d-flex justify-content-center align-items-center rounded-circle"
                            >
                              <Icon
                                icon="lucide:edit"
                                className="icon text-xl"
                              />
                            </Link>
                            <button
                              type="button"
                              onClick={() => handleDeleteClick(role._id)}
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
              totalPages={totalPages || 1}
              onPageChange={handlePageChange}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleRowsPerPageChange}
              totalRecords={totalRecords}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default UserRoleListLayer;
