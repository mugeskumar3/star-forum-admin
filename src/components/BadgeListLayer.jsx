import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import BadgeApi from "../Api/BadgeApi"; 
import TablePagination from "./TablePagination";
import { IMAGE_BASE_URL } from "../Config/Index";

const BadgeListLayer = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    loadData();
  }, [currentPage, rowsPerPage]);

  const loadData = async () => {
    const response = await BadgeApi.getBadge(
      null,
      currentPage,
      rowsPerPage,
    );
    if (response.status) {
      setData(response.response.data);
      setTotalRecords(response.response.total);
    }
  };

  const confirmDelete = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    if (deleteId) {
      const response = await BadgeApi.deleteBadge(deleteId);
      if (response.status) {
        loadData();
        setShowDeleteModal(false);
        setDeleteId(null);
      }
    }
  };

  const totalPages = Math.ceil(totalRecords / rowsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(parseInt(e.target.value));
    setCurrentPage(0); // Reset to first page
  };

  return (
    <div className="card h-100 p-0 radius-12">
      <div className="card-header border-bottom bg-base py-16 px-24 d-flex align-items-center flex-wrap gap-3 justify-content-between">
        <div className="d-flex align-items-center flex-wrap gap-3">
          <h6 className="text-primary-600 pb-2 mb-0">Badge List</h6>
        </div>
        <div className="d-flex gap-2">
          <Link
            to="/badge/create"
            className="btn btn-primary text-sm btn-sm px-12 py-12 radius-8 d-flex align-items-center gap-2"
            style={{ backgroundColor: "#C4161C", borderColor: "#C4161C" }}
          >
            <Icon
              icon="ic:baseline-plus"
              className="icon text-xl line-height-1"
            />
            Create Badge
          </Link>
          <Link
            to="/badge/assign"
            className="btn btn-primary text-sm btn-sm px-12 py-12 radius-8 d-flex align-items-center gap-2"
          >
            <Icon
              icon="lucide:user-check"
              className="icon text-xl line-height-1"
            />
            Assigned
          </Link>
        </div>
      </div>
      <div className="card-body p-24">
        <div className="table-responsive scroll-sm">
          <table className="table bordered-table sm-table mb-0">
            <thead>
              <tr>
                <th scope="col">S.No</th>
                <th scope="col">Type</th>
                <th scope="col">Badge Name</th>
                <th scope="col">Image</th>
                <th scope="col" className="text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {data.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center">
                    No badges found.
                  </td>
                </tr>
              ) : (
                data.map((item, index) => (
                  <tr key={item.id}>
                    <td>{currentPage * rowsPerPage + index + 1}.</td>
                    <td>{item.type}</td>
                    <td>{item.name}</td>
                    <td>
                      <div className="w-40-px h-40-px rounded-circle overflow-hidden">
                        {item.badgeImage ? (
                          <img
                            src={`${IMAGE_BASE_URL}/${item.badgeImage.path}`}
                            alt="badge"
                            className="w-100 h-100 object-fit-cover"
                          />
                        ) : (
                          <div className="w-100 h-100 bg-neutral-200 d-flex align-items-center justify-content-center">
                            <Icon icon="ri:image-line" />
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="text-center">
                      <div className="d-flex align-items-center gap-10 justify-content-center">
                        <Link
                          to={`/badge/edit/${item._id}`} // Assuming we will create this route
                          className="bg-info-focus bg-hover-info-200 text-info-600 fw-medium w-40-px h-40-px d-flex justify-content-center align-items-center rounded-circle"
                        >
                          <Icon icon="lucide:edit" className="menu-icon" />
                        </Link>
                        <button
                          type="button"
                          onClick={() => confirmDelete(item._id)}
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

      {/* Delete Confirmation Modal */}
      <Modal
        centered
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title className="text-lg fw-semibold">
            Confirm Delete
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="text-secondary-light">
            Are you sure you want to delete this badge? This action cannot be
            undone.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={handleDelete}
            style={{ backgroundColor: "#C4161C", borderColor: "#C4161C" }}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default BadgeListLayer;
