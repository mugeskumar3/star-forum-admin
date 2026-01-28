import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import TablePagination from "./TablePagination";
import BusinessCategoryApi from "../Api/BusinessCategoryApi";
const BusinessCategoryListLayer = () => {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  const fetchCategories = async () => {
    try {
      const response = await BusinessCategoryApi.getBusinessCategory(
        null,
        currentPage,
        rowsPerPage,
        searchTerm,
      );
      if (response && response.status && response.response.data) {
        setCategories(response.response.data);
        setTotalRecords(response.response.total || 0);
      } else {
        setCategories([]);
        setTotalRecords(0);
      }
    } catch (error) {
      console.error("Failed to fetch categories", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [currentPage, rowsPerPage, searchTerm]);

  const totalPages = Math.ceil(totalRecords / rowsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(parseInt(e.target.value));
    setCurrentPage(0);
  };

  const confirmDelete = (category) => {
    setCategoryToDelete(category);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    if (categoryToDelete) {
      const response = await BusinessCategoryApi.deleteBusinessCategory(
        categoryToDelete._id,
      );
      if (response && response.status) {
        fetchCategories();
        setShowDeleteModal(false);
        setCategoryToDelete(null);
      }
    }
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setCategoryToDelete(null);
  };

  return (
    <div className="card h-100 p-0 radius-12">
      <div className="card-header border-bottom bg-base py-16 px-24 d-flex align-items-center flex-wrap gap-3 justify-content-between">
        <div className="d-flex align-items-center flex-wrap gap-3">
          <h6 className="text-primary-600 pb-2 mb-0">Business Category List</h6>
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
                setCurrentPage(0);
              }}
            />
            <Icon icon="ion:search-outline" className="icon" />
          </form>
          <Link
            to="/business-category/add"
            className="btn btn-primary text-sm btn-sm px-12 py-12 radius-8 d-flex align-items-center gap-2"
            style={{ backgroundColor: "#C4161C", borderColor: "#C4161C" }}
          >
            <Icon
              icon="ic:baseline-plus"
              className="icon text-xl line-height-1"
            />
            Add New Category
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
                  Category Name
                </th>
                <th scope="col" style={{ color: "black" }}>
                  Status
                </th>
                <th scope="col" style={{ color: "black" }}>
                  Created Date
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
              {categories.length > 0 ? (
                categories.map((category, index) => (
                  <tr key={index}>
                    <td>{currentPage * rowsPerPage + index + 1}</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="text-md mb-0 fw-normal text-secondary-light">
                          {category.name}
                        </span>
                      </div>
                    </td>
                    <td>
                      <span
                        className={`badge ${
                          category.isActive
                            ? "bg-success-focus text-success-main"
                            : "bg-danger-focus text-danger-main"
                        }`}
                      >
                        {category.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td>
                      {category.createdAt
                        ? new Date(category.createdAt)
                            .toLocaleDateString("en-GB", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            })
                            .replace(/ /g, "-")
                        : "-"}
                    </td>
                    <td className="text-center">
                      <div className="d-flex align-items-center gap-10 justify-content-center">
                        <Link
                          to={`/business-category/edit/${category._id}`}
                          className="bg-success-focus text-success-600 bg-hover-success-200 fw-medium w-40-px h-40-px d-flex justify-content-center align-items-center rounded-circle"
                        >
                          <Icon icon="lucide:edit" className="menu-icon" />
                        </Link>
                        <button
                          type="button"
                          onClick={() => confirmDelete(category)}
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
                  <td colSpan="4" className="text-center py-4">
                    No categories found.
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

      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal} centered>
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
            Do you want to delete category "{categoryToDelete?.name}"? This
            action cannot be undone.
          </p>
          <div className="d-flex justify-content-center gap-3">
            <Button
              variant="outline-secondary"
              className="px-32"
              onClick={handleCloseDeleteModal}
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
    </div>
  );
};

export default BusinessCategoryListLayer;
