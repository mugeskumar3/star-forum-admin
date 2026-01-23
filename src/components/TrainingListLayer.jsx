import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";
import TablePagination from "./TablePagination";
import { Modal } from "react-bootstrap";

const TrainingListLayer = () => {
  const initialTrainings = Array.from({ length: 20 }, (_, i) => ({
    id: `TRN-0${i + 1 < 10 ? "0" + (i + 1) : i + 1}`,
    chapter:
      i % 3 === 0
        ? "Star Chapter"
        : i % 3 === 1
          ? "Global Chapter"
          : "Elite Chapter",
    title:
      i % 2 === 0
        ? "Advanced Leadership Workshop"
        : "Digital Marketing Masterclass",
    module: i % 2 === 0 ? "Leadership" : "Marketing",
    date: `${10 + (i % 20)} Jan 2025`,
    time: "10:00 AM",
    trainer: i % 2 === 0 ? "John Doe" : "Jane Smith",
    mode: i % 4 === 0 ? "Online" : "In Person",
    status: i % 5 === 0 ? "Completed" : "Upcoming",
  }));

  const [trainings] = useState(initialTrainings);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

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
    {
      id: 3,
      chapter: "Elite Chapter",
      name: "Charlie Brown",
      category: "Member",
      contact: "9876543212",
      feeStatus: "Paid",
    },
    {
      id: 4,
      chapter: "Star Chapter",
      name: "David Wilson",
      category: "Member",
      contact: "9876543213",
      feeStatus: "Paid",
    },
    {
      id: 5,
      chapter: "Global Chapter",
      name: "Eva Green",
      category: "Guest",
      contact: "9876543214",
      feeStatus: "Not Paid",
    },
  ]);

  const filteredTrainings = trainings.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.module.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.chapter.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const totalRecords = filteredTrainings.length;
  const totalPages = Math.ceil(totalRecords / rowsPerPage);

  const currentData = filteredTrainings.slice(
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

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "Upcoming":
        return "bg-primary-focus text-primary-main";
      case "Completed":
        return "bg-success-focus text-success-main";
      case "Cancelled":
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
                <th scope="col">Training ID</th>
                <th scope="col">Chapter</th>
                <th scope="col">Training Title</th>
                <th scope="col">Date & Time</th>
                <th scope="col">Trainer</th>
                <th scope="col">Status</th>
                <th scope="col" className="text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {currentData.length > 0 ? (
                currentData.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <span className="text-md mb-0 fw-medium text-primary-600">
                        {item.id}
                      </span>
                    </td>
                    <td>
                      <span className="text-md mb-0 fw-normal text-secondary-light">
                        {item.chapter}
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
                          {item.date}
                        </span>
                        <span className="text-xs text-secondary-light">
                          {item.time}
                        </span>
                      </div>
                    </td>
                    <td>
                      <span className="text-md mb-0 fw-normal text-secondary-light">
                        {item.trainer}
                      </span>
                    </td>
                    <td>
                      <span
                        className={`badge radius-4 px-10 py-4 text-sm ${getStatusBadgeClass(
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
                          to={`/training-edit/${item.id}`}
                          className="bg-success-focus bg-hover-success-200 text-success-600 fw-medium w-40-px h-40-px d-flex justify-content-center align-items-center rounded-circle"
                        >
                          <Icon icon="lucide:edit" className="icon text-xl" />
                        </Link>
                        <button className="bg-danger-focus bg-hover-danger-200 text-danger-600 fw-medium w-40-px h-40-px d-flex justify-content-center align-items-center rounded-circle border-0">
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

      {/* View Modal */}
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
    </div>
  );
};

export default TrainingListLayer;
