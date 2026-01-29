import React, { useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import Select from "react-select";
import { selectStyles } from "../helper/SelectStyles";
import { Modal, Button } from "react-bootstrap";
import TablePagination from "./TablePagination";

const PowerDateReportLayer = () => {
  // Filter states
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedZone, setSelectedZone] = useState(null);
  const [selectedEd, setSelectedEd] = useState(null);
  const [selectedRd, setSelectedRd] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(null);

  // Modal State
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // Options mapping for react-select
  const regionOptions = [
    "Tamil Nadu",
    "Kerala",
    "Karnataka",
    "Andhra Pradesh",
  ].map((r) => ({ value: r, label: r }));
  const zoneOptions = ["Zone 1", "Zone 2", "Zone 3", "Zone 4"].map((z) => ({
    value: z,
    label: z,
  }));
  const edOptions = ["ED Rajesh", "ED Priya", "ED Amit"].map((ed) => ({
    value: ed,
    label: ed,
  }));
  const rdOptions = ["RD Suresh", "RD Megha", "RD Arjun"].map((rd) => ({
    value: rd,
    label: rd,
  }));
  const chapterOptions = [
    "ARAM Chapter",
    "Arni Chapter",
    "Salem Chapter",
    "Coimbatore Chapter",
  ].map((c) => ({ value: c, label: c }));

  // Static Dummy Data for Power Date Report
  const [reportData] = useState(
    Array.from({ length: 25 }).map((_, i) => ({
      id: i + 1,
      date: `2025-01-${(i % 25) + 1 < 10 ? "0" + ((i % 25) + 1) : (i % 25) + 1}`,
      memberName: [
        "Logarajan S P",
        "Mathiarasu M",
        "Mano Neelamegam",
        "Kumar Raj S",
        "Ramesh Kumar",
      ][i % 5],
      invitedTo:
        i % 4 === 0
          ? "Rajesh, Priya"
          : i % 4 === 1
            ? "Amit, Sneha"
            : i % 4 === 2
              ? "Vikram, Arjun"
              : "Megha, Suresh",
      meetingStatus: i % 2 === 0 ? "Online" : "In Person",
      name: [
        "Guest Rajesh",
        "Guest Priya",
        "Guest Amit",
        "Guest Sneha",
        "Guest Vikram",
      ][i % 5],
      phoneNumber: `987654321${i % 10}`,
      email: `guest${i}@example.com`,
      address: `${100 + i}, Business Park, City`,
      comments:
        i % 3 === 0 ? "Interested in joining." : "Regular follow-up needed.",
      referralTemp: i % 4 === 0 ? "Hot" : i % 4 === 1 ? "Warm" : "Cold",
      region: regionOptions[i % 4].value,
      zone: zoneOptions[i % 4].value,
      ed: edOptions[i % 3].value,
      rd: rdOptions[i % 3].value,
      chapter: chapterOptions[i % 4].value,
    })),
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = reportData.filter((item) => {
    const matchesSearch =
      item.memberName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.name.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRegion = selectedRegion
      ? item.region === selectedRegion.value
      : true;
    const matchesZone = selectedZone ? item.zone === selectedZone.value : true;
    const matchesEd = selectedEd ? item.ed === selectedEd.value : true;
    const matchesRd = selectedRd ? item.rd === selectedRd.value : true;
    const matchesChapter = selectedChapter
      ? item.chapter === selectedChapter.value
      : true;

    return (
      matchesSearch &&
      matchesRegion &&
      matchesZone &&
      matchesEd &&
      matchesRd &&
      matchesChapter
    );
  });

  const totalRecords = filteredData.length;
  const totalPages = Math.ceil(totalRecords / rowsPerPage);

  const currentData = filteredData.slice(
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

  const handleClearFilters = () => {
    setSelectedRegion(null);
    setSelectedZone(null);
    setSelectedEd(null);
    setSelectedRd(null);
    setSelectedChapter(null);
    setSearchTerm("");
    setCurrentPage(1);
  };

  const handleViewDetails = (item) => {
    setSelectedItem(item);
    setShowViewModal(true);
  };

  return (
    <div className="card h-100 p-0 radius-12 overflow-hidden">
      <div className="card-header border-bottom bg-base py-16 px-24">
        <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-3">
          <h6 className="text-primary-600 pb-2 mb-0">Power Date Report</h6>
          <div className="d-flex align-items-center flex-wrap gap-3">
            <form className="navbar-search">
              <input
                type="text"
                className="bg-base h-40-px w-auto"
                name="search"
                placeholder="Search Member"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Icon icon="ion:search-outline" className="icon" />
            </form>
          </div>
        </div>

        {/* Top Filters */}

        <div className="row g-3 align-items-end">
          <div className="col-xl col-md-4 col-sm-6">
            <Select
              options={regionOptions}
              value={selectedRegion}
              onChange={setSelectedRegion}
              placeholder="Region"
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
          <div className="col-xl-2 col-md-4 col-sm-6">
            <Select
              options={chapterOptions}
              value={selectedChapter}
              onChange={setSelectedChapter}
              placeholder="Chapter"
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
                <th scope="col" style={{ color: "black", fontWeight: "600" }}>
                  Date
                </th>
                <th scope="col" style={{ color: "black", fontWeight: "600" }}>
                  Member Name
                </th>
                <th scope="col" style={{ color: "black", fontWeight: "600" }}>
                  Invited to
                </th>
                <th scope="col" style={{ color: "black", fontWeight: "600" }}>
                  Meeting Status
                </th>
                <th scope="col" style={{ color: "black", fontWeight: "600" }}>
                  Name
                </th>
                <th scope="col" style={{ color: "black", fontWeight: "600" }}>
                  Comments
                </th>
                <th scope="col" style={{ color: "black", fontWeight: "600" }}>
                  Referral Temp
                </th>
                <th scope="col" style={{ color: "black", fontWeight: "600" }}>
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {currentData.length > 0 ? (
                currentData.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <span className="text-md mb-0 fw-medium text-secondary-light">
                        {item.date}
                      </span>
                    </td>
                    <td>
                      <span className="text-md mb-0 fw-medium text-primary-600">
                        {item.memberName}
                      </span>
                    </td>
                    <td>
                      <span className="text-md mb-0 fw-normal text-secondary-light">
                        {item.invitedTo}
                      </span>
                    </td>
                    <td>
                      <span
                        className={`badge radius-4 px-10 py-4 text-sm ${
                          item.meetingStatus === "Online"
                            ? "bg-info-focus text-info-600"
                            : "bg-success-focus text-success-main"
                        }`}
                      >
                        {item.meetingStatus}
                      </span>
                    </td>
                    <td>
                      <span className="text-md mb-0 fw-normal text-secondary-light">
                        {item.name}
                      </span>
                    </td>
                    <td>
                      <div
                        className="text-md mb-0 fw-normal text-secondary-light"
                        style={{ maxWidth: "200px" }}
                      >
                        {item.comments}
                      </div>
                    </td>
                    <td>
                      <span
                        className={`badge radius-4 px-10 py-4 text-sm ${
                          item.referralTemp === "Hot"
                            ? "bg-danger-focus text-danger-main"
                            : item.referralTemp === "Warm"
                              ? "bg-warning-focus text-warning-main"
                              : "bg-info-focus text-info-main"
                        }`}
                      >
                        {item.referralTemp}
                      </span>
                    </td>
                    <td>
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
                  <td colSpan="8" className="text-center py-4">
                    No data found.
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
            Contact Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-24">
          {selectedItem && (
            <div className="d-flex flex-column gap-3">
              <div className="p-16 radius-8 bg-neutral-100 border">
                <div className="mb-12">
                  <h6 className="mb-4 fw-bold text-dark text-sm">
                    Phone Number:
                  </h6>
                  <p className="mb-0 text-secondary-light">
                    {selectedItem.phoneNumber}
                  </p>
                </div>
                <div className="mb-12">
                  <h6 className="mb-4 fw-bold text-dark text-sm">Email:</h6>
                  <p className="mb-0 text-secondary-light">
                    {selectedItem.email}
                  </p>
                </div>
                <div>
                  <h6 className="mb-4 fw-bold text-dark text-sm">Address:</h6>
                  <p className="mb-0 text-secondary-light">
                    {selectedItem.address}
                  </p>
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

export default PowerDateReportLayer;
