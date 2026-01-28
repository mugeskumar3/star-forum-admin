import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import TablePagination from "./TablePagination";
import AdminUserApi from "../Api/AdminUserApi";

const AdminRegistrationListLayer = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);

  useEffect(() => {
    fetchUsers();
  }, [currentPage, rowsPerPage, searchTerm]);

  const fetchUsers = async () => {
    try {
      const response = await AdminUserApi.getAdminUser(
        null,
        currentPage,
        rowsPerPage,
        searchTerm,
      );
      if (response && response.status && response.response.data) {
        setUsers(response.response.data);
        setTotalRecords(response.response.total || 0);
      } else {
        setUsers([]);
        setTotalRecords(0);
      }
    } catch (error) {
      console.error("Failed to fetch admin users", error);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(0);
  };

  const totalPages = Math.ceil(totalRecords / rowsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(parseInt(e.target.value));
    setCurrentPage(0);
  };

  const confirmDelete = (user) => {
    setUserToDelete(user);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    if (userToDelete) {
      const response = await AdminUserApi.deleteAdminUser(userToDelete._id);
      if (response && response.status) {
        fetchUsers();
        setShowDeleteModal(false);
        setUserToDelete(null);
      }
    }
  };

  const handleClose = () => {
    setShowDeleteModal(false);
    setUserToDelete(null);
  };

  return (
    <>
      <div className="card h-100 p-0 radius-12">
        <div className="card-header border-bottom bg-base py-16 px-24 d-flex align-items-center flex-wrap gap-3 justify-content-between">
          <div className="d-flex align-items-center flex-wrap gap-3">
            <h6 className="text-primary-600 pb-2 mb-0">Admin Registration</h6>
          </div>

          <div className="d-flex align-items-center flex-wrap gap-3">
            <form
              className="navbar-search"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="text"
                className="bg-base h-40-px w-auto"
                name="search"
                placeholder="Search"
                value={searchTerm}
                onChange={handleSearch}
              />
              <Icon icon="ion:search-outline" className="icon" />
            </form>
            <Link
              to="/admin-registration/add"
              className="btn btn-primary text-sm btn-sm px-12 py-12 radius-8 d-flex align-items-center gap-2"
              style={{ backgroundColor: "#C4161C", borderColor: "#C4161C" }}
            >
              <Icon
                icon="ic:baseline-plus"
                className="icon text-xl line-height-1"
              />
              Add New User
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
                    Name
                  </th>
                  <th scope="col" style={{ color: "black" }}>
                    Email
                  </th>
                  <th scope="col" style={{ color: "black" }}>
                    Phone Number
                  </th>
                  <th scope="col" style={{ color: "black" }}>
                    Company Name
                  </th>
                  <th scope="col" style={{ color: "black" }}>
                    Status
                  </th>
                  <th scope="col" style={{ color: "black" }}>
                    Role
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
                {users.length > 0 ? (
                  users.map((user, index) => (
                    <tr key={user._id}>
                      <td>{currentPage * rowsPerPage + index + 1}.</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <span className="text-md mb-0 fw-normal text-secondary-light">
                            {user.name}
                          </span>
                        </div>
                      </td>
                      <td>
                        <span className="text-md mb-0 fw-normal text-secondary-light">
                          {user.email}
                        </span>
                      </td>
                      <td>{user.phoneNumber}</td>
                      <td>{user.companyName}</td>
                      <td>
                        <span
                          className={`badge px-24 py-4 radius-4 fw-medium text-sm ${
                            user.isActive === 1
                              ? "bg-success-focus text-success-main"
                              : "bg-danger-focus text-danger-main"
                          }`}
                        >
                          {user.isActive === 1 ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td>
                        <span className="badge bg-primary-focus text-primary-600 border border-primary-main px-24 py-4 radius-4 fw-medium text-sm">
                          {user.roleId?.roleName || user.roleId || "-"}
                        </span>
                      </td>
                      <td className="text-center">
                        <div className="d-flex align-items-center gap-10 justify-content-center">
                          <Link
                            to={`/admin-registration/view/${user._id}`}
                            className="bg-info-focus bg-hover-info-200 text-info-600 fw-medium w-40-px h-40-px d-flex justify-content-center align-items-center rounded-circle"
                          >
                            <Icon
                              icon="majesticons:eye-line"
                              className="icon text-xl"
                            />
                          </Link>
                          <Link
                            to={`/admin-registration/edit/${user._id}`}
                            className="bg-success-focus text-success-600 bg-hover-success-200 fw-medium w-40-px h-40-px d-flex justify-content-center align-items-center rounded-circle"
                          >
                            <Icon icon="lucide:edit" className="menu-icon" />
                          </Link>
                          <button
                            type="button"
                            onClick={() => confirmDelete(user)}
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
                    <td colSpan="7" className="text-center py-24">
                      No users found
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

      <Modal show={showDeleteModal} onHide={handleClose} centered>
        <Modal.Body className="text-center p-5">
          <div className="d-flex justify-content-center mb-3">
            <div className="bg-danger-focus rounded-circle d-flex justify-content-center align-items-center w-64-px h-64-px">
              <Icon
                icon="mingcute:delete-2-line"
                className="text-danger-600 text-xxl"
              />
            </div>
          </div>
          <h5 className="mb-3">Are you sure?</h5>
          <p className="text-secondary-light mb-4">
            Do you want to delete user "{userToDelete?.name}"? This action
            cannot be undone.
          </p>
          <div className="d-flex justify-content-center gap-3">
            <Button
              variant="outline-secondary"
              className="px-32"
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              className="px-32"
              onClick={handleDelete}
              style={{ backgroundColor: "#C4161C", borderColor: "#C4161C" }}
            >
              Delete
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AdminRegistrationListLayer;
