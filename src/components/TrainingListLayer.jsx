import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";
import TablePagination from "./TablePagination";

const TrainingListLayer = () => {
  // Static Dummy Data for Trainings
  const [trainings, setTrainings] = useState([
    {
      id: "TRN-001",
      title: "Advanced Leadership Workshop",
      module: "Leadership",
      date: "15 Jan 2025",
      time: "10:00 AM",
      trainer: "John Doe",
      mode: "In Person",
      status: "Upcoming",
    },
    {
      id: "TRN-002",
      title: "Digital Marketing Masterclass",
      module: "Marketing",
      date: "18 Jan 2025",
      time: "02:00 PM",
      trainer: "Jane Smith",
      mode: "Online",
      status: "Upcoming",
    },
    {
      id: "TRN-003",
      title: "Sales Strategies 101",
      module: "Sales",
      date: "10 Jan 2025",
      time: "11:00 AM",
      trainer: "Robert Brown",
      mode: "Hybrid",
      status: "Completed",
    },
    {
      id: "TRN-004",
      title: "Financial Planning for SMEs",
      module: "Finance",
      date: "05 Jan 2025",
      time: "09:30 AM",
      trainer: "Emily Davis",
      mode: "Online",
      status: "Completed",
    },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTrainings = trainings.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.module.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalRecords = filteredTrainings.length;
  const totalPages = Math.ceil(totalRecords / rowsPerPage);

  const currentData = filteredTrainings.slice(
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
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
            <Icon icon="ion:search-outline" className="icon" />
          </form>
        </div>
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
      <div className="card-body p-24">
        <div className="table-responsive scroll-sm">
          <table className="table bordered-table sm-table mb-0">
            <thead>
              <tr>
                <th scope="col">Training ID</th>
                <th scope="col">Title</th>
                <th scope="col">Module</th>
                <th scope="col">Date & Time</th>
                <th scope="col">Trainer</th>
                <th scope="col">Mode</th>
                <th scope="col">Status</th>
                <th scope="col" className="text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {currentData.length > 0 ? (
                currentData.map((item, index) => (
                  <tr key={item.id}>
                    <td>
                      <span className="text-md mb-0 fw-medium text-primary-600">
                        {item.id}
                      </span>
                    </td>
                    <td>
                      <span className="text-md mb-0 fw-normal text-secondary-light">
                        {item.title}
                      </span>
                    </td>
                    <td>
                      <span className="text-md mb-0 fw-normal text-secondary-light">
                        {item.module}
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
                      <span className="text-md mb-0 fw-normal text-secondary-light">
                        {item.mode}
                      </span>
                    </td>
                    <td>
                      <span
                        className={`badge radius-4 px-10 py-4 text-sm ${getStatusBadgeClass(
                          item.status
                        )}`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="text-center">
                      <div className="d-flex align-items-center gap-10 justify-content-center">
                        <Link
                          to={`/training-view/${item.id}`}
                          className="bg-info-focus bg-hover-info-200 text-info-600 fw-medium w-40-px h-40-px d-flex justify-content-center align-items-center rounded-circle"
                        >
                          <Icon
                            icon="majesticons:eye-line"
                            className="icon text-xl"
                          />
                        </Link>
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
                  <td colSpan="8" className="text-center py-4">
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
    </div>
  );
};

export default TrainingListLayer;
