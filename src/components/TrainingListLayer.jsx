import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";
import TablePagination from "./TablePagination";
import { Modal, Button } from "react-bootstrap";

import TrainingApi from "../Api/TrainingApi";

const TrainingListLayer = () => {
  const [trainings, setTrainings] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [totalRecords, setTotalRecords] = useState(0);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [trainingToDelete, setTrainingToDelete] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [selectedTraining, setSelectedTraining] = useState(null);

  const [participants, setParticipants] = useState([
    {
      id: 1,
      chapter: "Star Chapter",
      name: "Alice Johnson",
      category: "Member",
      contact: "9876543210",
      feeStatus: "Paid",
    },
    {
      id: 2,
      chapter: "Global Chapter",
      name: "Bob Smith",
      category: "Guest",
      contact: "9876543211",
      feeStatus: "Not Paid",
    },
  ]);

  useEffect(() => {
    fetchTrainings();
  }, [currentPage, rowsPerPage, searchTerm]);

  const fetchTrainings = async () => {
    try {
      const response = await TrainingApi.getTraining({
        page: currentPage,
        limit: rowsPerPage,
        search: searchTerm,
      });
      if (response && response.status && response.response.data) {
        setTrainings(response.response.data);
        setTotalRecords(
          response.response.totalRecords || response.response.data.length,
        );
      }
    } catch (error) {
      console.error("Error fetching trainings:", error);
    }
  };

  const confirmDelete = (training) => {
    setTrainingToDelete(training);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    if (trainingToDelete) {
      const response = await TrainingApi.deleteTraining(
        trainingToDelete._id || trainingToDelete.trainingId,
      );
      if (response && response.status) {
        fetchTrainings();
        setShowDeleteModal(false);
        setTrainingToDelete(null);
      }
    }
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setTrainingToDelete(null);
  };

  const totalPages = Math.ceil(totalRecords / rowsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(parseInt(e.target.value));
    setCurrentPage(1);
  };

  const getStatusBadgeClass = (status) => {
    switch (status?.toLowerCase()) {
      case "upcoming":
      case "planned":
        return "bg-neutral-200 text-neutral-600";
      case "completed":
        return "bg-success-focus text-success-main";
      case "cancelled":
        return "bg-danger-focus text-danger-main";
      default:
        return "bg-neutral-200 text-neutral-600";
    }
  };

  const handleViewClick = (training) => {
    setSelectedTraining(training);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedTraining(null);
  };

  const handleFeeStatusChange = (id, newStatus) => {
    setParticipants((prev) =>
      prev.map((p) => (p.id === id ? { ...p, feeStatus: newStatus } : p)),
    );
  };

  return (
    <div className="card h-100 p-0 radius-12">
      <div className="card-header border-bottom bg-base py-16 px-24 d-flex align-items-center flex-wrap gap-3 justify-content-between">
        <h6 className="text-primary-600 pb-2 mb-0">Training List</h6>
        <div className="d-flex align-items-center flex-wrap gap-3 ms-auto">
          <form className="navbar-search" onSubmit={(e) => e.preventDefault()}>
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
            to="/training-create"
            className="btn btn-primary text-sm btn-sm px-12 py-12 radius-8 d-flex align-items-center gap-2"
          >
            <Icon
              icon="ic:baseline-plus"
              className="icon text-xl line-height-1"
            />
            Add New Training
          </Link>
        </div>
      </div>
      <div className="card-body p-24">
        <div className="table-responsive scroll-sm">
          <table className="table bordered-table sm-table mb-0">
            <thead>
              <tr>
                <th scope="col">S.No</th>
                <th scope="col">Training ID</th>
                <th scope="col" style={{ minWidth: "150px" }}>
                  Training Title
                </th>
                <th scope="col" style={{ minWidth: "150px" }}>
                  Date & Time
                </th>
                <th scope="col">Status</th>
                <th scope="col" className="text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {trainings.length > 0 ? (
                trainings.map((item,index) => (
                  <tr key={item._id || item.trainingId}>
                    <td>{currentPage * rowsPerPage + index + 1}</td>
                    <td>
                      <span className="text-md mb-0 fw-medium text-primary-600">
                        {item.trainingId || item._id}
                      </span>
                    </td>

                    <td>
                      <span className="text-md mb-0 fw-normal text-secondary-light">
                        {item.title}
                      </span>
                    </td>
                    <td>
                      <div className="d-flex flex-column">
                        <span className="text-md mb-0 fw-normal text-secondary-light">
                          {new Date(item.trainingDateTime)
                            .toLocaleDateString("en-GB", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            })
                            .replace(/ /g, "-")}
                        </span>
                        <span className="text-xs text-secondary-light">
                          {new Date(item.trainingDateTime).toLocaleTimeString(
                            "en-US",
                            {
                              hour: "numeric",
                              minute: "2-digit",
                              hour12: true,
                            },
                          )}
                        </span>
                      </div>
                    </td>

                    <td>
                      <span
                        className={`badge radius-4 px-10 py-4 text-sm text-capitalize ${getStatusBadgeClass(
                          item.status,
                        )}`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="text-center">
                      <div className="d-flex align-items-center gap-10 justify-content-center">
                        <button
                          onClick={() => handleViewClick(item)}
                          className="bg-info-focus bg-hover-info-200 text-info-600 fw-medium w-40-px h-40-px d-flex justify-content-center align-items-center rounded-circle border-0"
                        >
                          <Icon
                            icon="majesticons:eye-line"
                            className="icon text-xl"
                          />
                        </button>
                        <Link
                          to={`/training-edit/${item._id}`}
                          className="bg-success-focus bg-hover-success-200 text-success-600 fw-medium w-40-px h-40-px d-flex justify-content-center align-items-center rounded-circle"
                        >
                          <Icon icon="lucide:edit" className="icon text-xl" />
                        </Link>
                        <button
                          onClick={() => confirmDelete(item)}
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
                    No trainings found.
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

      {showModal && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-xl modal-dialog-centered">
            <div className="modal-content radius-16">
              <div className="modal-header border-bottom p-24">
                <h6 className="modal-title mb-0 text-primary-600">
                  Training Participants - {selectedTraining?.title}
                </h6>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleCloseModal}
                ></button>
              </div>
              <div className="modal-body p-24">
                <div className="table-responsive">
                  <table className="table bordered-table sm-table mb-0">
                    <thead>
                      <tr>
                        <th>Sl.no</th>
                        <th>Chapter Name</th>
                        <th>Person Name</th>
                        <th>Category</th>
                        <th>Contact Number</th>
                        <th>Fee Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {participants.map((participant, index) => (
                        <tr key={participant.id}>
                          <td>{index + 1}</td>
                          <td>{participant.chapter}</td>
                          <td>{participant.name}</td>
                          <td>{participant.category}</td>
                          <td>{participant.contact}</td>
                          <td>
                            <select
                              className={`form-select form-select-sm radius-4 ${
                                participant.feeStatus === "Paid"
                                  ? "text-success-main bg-success-focus border-success-main"
                                  : "text-danger-main bg-danger-focus border-danger-main"
                              }`}
                              value={participant.feeStatus}
                              onChange={(e) =>
                                handleFeeStatusChange(
                                  participant.id,
                                  e.target.value,
                                )
                              }
                            >
                              <option value="Paid">Paid</option>
                              <option value="Not Paid">Not Paid</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
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
            Do you want to delete training "{trainingToDelete?.title}"? This
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

export default TrainingListLayer;
