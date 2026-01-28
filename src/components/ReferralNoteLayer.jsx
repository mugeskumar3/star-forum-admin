import React, { useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import Select from "react-select";
import { selectStyles } from "../helper/SelectStyles";
import { Modal, Button } from "react-bootstrap";
import TablePagination from "./TablePagination";

const ReferralNoteLayer = () => {
  // Mock Data
  const [referrals, setReferrals] = useState(
    Array.from({ length: 20 }).map((_, i) => ({
      id: i + 1,
      date: "2025-01-25T10:30:00",
      memberName: `Member ${i + 1}`,
      referralTo: `Business ${i + 1}`,
      type: i % 2 === 0 ? "Inside" : "Outside",
      status: ["Pending", "Closed", "In Progress"][i % 3],
      name: `Referral Name ${i + 1}`,
      phone: `98765432${i < 10 ? "0" + i : i}`,
      email: `referral${i + 1}@example.com`,
      address: `Address Line ${i + 1}, City`,
      comments: "Looking for services.",
      temp: ["Hot", "Warm", "Cold"][i % 3],
      chapter: ["Star Chapter", "Galaxy Chapter"][i % 2],
      zone: ["Zone 1", "Zone 2"][i % 2],
      ed: ["ED 1", "ED 2"][i % 2],
      rd: ["RD 1", "RD 2"][i % 2],
    })),
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  // Modal State
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedReferral, setSelectedReferral] = useState(null);

  // Filter States
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [selectedZone, setSelectedZone] = useState(null);
  const [selectedEd, setSelectedEd] = useState(null);
  const [selectedRd, setSelectedRd] = useState(null);

  // Options
  const chapterOptions = [
    { value: "Star Chapter", label: "Star Chapter" },
    { value: "Galaxy Chapter", label: "Galaxy Chapter" },
  ];
  const zoneOptions = [
    { value: "Zone 1", label: "Zone 1" },
    { value: "Zone 2", label: "Zone 2" },
  ];
  const edOptions = [
    { value: "ED 1", label: "ED 1" },
    { value: "ED 2", label: "ED 2" },
  ];
  const rdOptions = [
    { value: "RD 1", label: "RD 1" },
    { value: "RD 2", label: "RD 2" },
  ];

  // Filtering logic
  const filteredReferrals = referrals.filter((referral) => {
    const matchesSearch =
      referral.memberName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      referral.referralTo.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesChapter = selectedChapter
      ? referral.chapter === selectedChapter.value
      : true;
    const matchesZone = selectedZone
      ? referral.zone === selectedZone.value
      : true;
    const matchesEd = selectedEd ? referral.ed === selectedEd.value : true;
    const matchesRd = selectedRd ? referral.rd === selectedRd.value : true;

    return (
      matchesSearch && matchesChapter && matchesZone && matchesEd && matchesRd
    );
  });

  const totalRecords = filteredReferrals.length;
  const totalPages = Math.ceil(totalRecords / rowsPerPage);

  const currentData = filteredReferrals.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage,
  );

  const handlePageChange = (page) => setCurrentPage(page);

  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(parseInt(e.target.value));
    setCurrentPage(1);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Closed":
        return "bg-success-focus text-success-main";
      case "Pending":
        return "bg-warning-focus text-warning-main";
      case "In Progress":
        return "bg-info-focus text-info-main";
      default:
        return "bg-neutral-200 text-neutral-600";
    }
  };

  const getTempColor = (temp) => {
    switch (temp) {
      case "Hot":
        return "text-danger-main";
      case "Warm":
        return "text-warning-main";
      case "Cold":
        return "text-info-main";
      default:
        return "text-neutral-600";
    }
  };

  const handleClearFilters = () => {
    setSelectedChapter(null);
    setSelectedZone(null);
    setSelectedEd(null);
    setSelectedRd(null);
    setSearchTerm("");
    setCurrentPage(1);
  };

  const handleViewDetails = (referral) => {
    setSelectedReferral(referral);
    setShowViewModal(true);
  };

  return (
    <div className="card h-100 p-0 radius-12">
      <div className="card-header border-bottom bg-base py-16 px-24">
        <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-3">
          <h6 className="text-primary-600 pb-2 mb-0">Referral's Report</h6>
          <div className="d-flex align-items-center flex-wrap gap-3">
            <form className="navbar-search">
              <input
                type="text"
                className="bg-base h-40-px w-auto"
                name="search"
                placeholder="Search Member or Referral To"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Icon icon="ion:search-outline" className="icon" />
            </form>
          </div>
        </div>

        {/* Filters */}
        <div className="row g-3 align-items-end">
          <div className="col-xl col-md-4 col-sm-6">
            <Select
              options={chapterOptions}
              value={selectedChapter}
              onChange={setSelectedChapter}
              placeholder="Chapter"
              styles={selectStyles()}
              isClearable
            />
          </div>
          <div className="col-xl col-md-4 col-sm-6">
            <Select
              options={zoneOptions}
              value={selectedZone}
              onChange={setSelectedZone}
              placeholder="Zone"
              styles={selectStyles()}
              isClearable
            />
          </div>
          <div className="col-xl col-md-4 col-sm-6">
            <Select
              options={edOptions}
              value={selectedEd}
              onChange={setSelectedEd}
              placeholder="ED"
              styles={selectStyles()}
              isClearable
            />
          </div>
          <div className="col-xl col-md-4 col-sm-6">
            <Select
              options={rdOptions}
              value={selectedRd}
              onChange={setSelectedRd}
              placeholder="RD"
              styles={selectStyles()}
              isClearable
            />
          </div>
          <div className="col-xl-auto col-md-4 col-sm-6 d-flex align-items-end">
            <button
              type="button"
              onClick={handleClearFilters}
              className="btn btn-outline-danger d-flex align-items-center gap-2 radius-8 h-40-px text-nowrap w-100"
              title="Clear All Filters"
            >
              <Icon icon="solar:filter-remove-bold-duotone" fontSize={20} />
              Clear Filter
            </button>
          </div>
        </div>
      </div>

      <div className="card-body p-24">
        <div className="table-responsive scroll-sm">
          <table className="table bordered-table sm-table mb-0">
            <thead>
              <tr>
                <th scope="col">Date</th>
                <th scope="col">Member Name</th>
                <th scope="col">Referral To</th>
                <th scope="col">Type</th>
                <th scope="col">Status</th>
                <th scope="col">Referral Name</th>
                <th scope="col">Temp</th>
                <th scope="col">Comments</th>
                <th scope="col" className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentData.length > 0 ? (
                currentData.map((item) => (
                  <tr key={item.id}>
                    <td>{formatDate(item.date)}</td>
                    <td>{item.memberName}</td>
                    <td>{item.referralTo}</td>
                    <td>
                      <span
                        className={`badge ${item.type === "Inside" ? "bg-primary-50 text-primary-600" : "bg-neutral-200 text-neutral-600"} px-8 py-4 radius-4`}
                      >
                        {item.type}
                      </span>
                    </td>
                    <td>
                      <span
                        className={`badge ${getStatusColor(item.status)} px-8 py-4 radius-4`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td>{item.name}</td>
                    <td className="fw-bold">
                      <span className={getTempColor(item.temp)}>
                        {item.temp}
                      </span>
                    </td>
                    <td style={{ minWidth: "200px" }}>{item.comments}</td>
                    <td className="text-center">
                      <button
                        className="btn btn-sm btn-outline-primary d-inline-flex align-items-center gap-1"
                        onClick={() => handleViewDetails(item)}
                      >
                        <Icon icon="majesticons:eye-line" /> View
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="text-center py-4">
                    No referrals found.
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

      <Modal
        centered
        show={showViewModal}
        onHide={() => setShowViewModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title className="text-lg fw-semibold">
            Referral Contact Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-24">
          {selectedReferral && (
            <div className="d-flex flex-column gap-3">
              <div className="p-16 radius-8 bg-neutral-100 border">
                <div className="mb-12">
                  <h6 className="mb-4 fw-bold text-dark text-sm">Phone:</h6>
                  <p className="mb-0 text-secondary-light">{selectedReferral.phone}</p>
                </div>
                <div className="mb-12">
                  <h6 className="mb-4 fw-bold text-dark text-sm">Email:</h6>
                  <p className="mb-0 text-secondary-light">{selectedReferral.email}</p>
                </div>
                <div>
                  <h6 className="mb-4 fw-bold text-dark text-sm">Address:</h6>
                  <p className="mb-0 text-secondary-light">{selectedReferral.address}</p>
                </div>
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowViewModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ReferralNoteLayer;
