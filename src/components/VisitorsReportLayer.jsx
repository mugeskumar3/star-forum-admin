import React, { useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { selectStyles } from "../helper/SelectStyles";
import TablePagination from "./TablePagination";

const VisitorsReportLayer = () => {
  const navigate = useNavigate();

  // Mock Data
  const [visitors, setVisitors] = useState(
    Array.from({ length: 20 }).map((_, i) => ({
      id: i + 1,
      visitorName: `Visitor ${i + 1}`,
      company: `Company ${i + 1}`,
      category: `Category ${i + 1}`,
      phone: `98765432${i < 10 ? "0" + i : i}`,
      visitDate: "2025-01-25T10:30:00",
      chapterName: ["Star Chapter", "Galaxy Chapter"][i % 2],
      email: `visitor${i + 1}@example.com`,
      invitedBy: `Member ${i + 1}`,
      sourceOfEvent: ["Social Media", "Referral", "Website", "Direct"][i % 4],
      status: "Pending",
      zone: ["Zone 1", "Zone 2"][i % 2],
      ed: ["ED 1", "ED 2"][i % 2],
      rd: ["RD 1", "RD 2"][i % 2],
    })),
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

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

  const handleStatusChange = (id, newStatus) => {
    setVisitors(prev => prev.map(v => v.id === id ? { ...v, status: newStatus } : v));
  };

  // Filtering logic
  const filteredVisitors = visitors.filter((visitor) => {
    const matchesSearch =
      visitor.visitorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      visitor.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      visitor.invitedBy.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesChapter = selectedChapter
      ? visitor.chapterName === selectedChapter.value
      : true;
    const matchesZone = selectedZone
      ? visitor.zone === selectedZone.value
      : true;
    const matchesEd = selectedEd ? visitor.ed === selectedEd.value : true;
    const matchesRd = selectedRd ? visitor.rd === selectedRd.value : true;

    return (
      matchesSearch && matchesChapter && matchesZone && matchesEd && matchesRd
    );
  });

  const totalRecords = filteredVisitors.length;
  const totalPages = Math.ceil(totalRecords / rowsPerPage);

  const currentData = filteredVisitors.slice(
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

  const handleClearFilters = () => {
    setSelectedChapter(null);
    setSelectedZone(null);
    setSelectedEd(null);
    setSelectedRd(null);
    setSearchTerm("");
    setCurrentPage(1);
  };

  return (
    <div className="card h-100 p-0 radius-12">
      <div className="card-header border-bottom bg-base py-16 px-24">
        <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-3">
          <h6 className="text-primary-600 pb-2 mb-0">Visitor's Report</h6>
          <div className="d-flex align-items-center flex-wrap gap-3">
            <form className="navbar-search">
              <input
                type="text"
                className="bg-base h-40-px w-auto"
                name="search"
                placeholder="Search Visitor, Company or Member"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Icon icon="ion:search-outline" className="icon" />
            </form>
            <button
              type="button"
              onClick={() => navigate('/visitors-form')}
              className="btn btn-primary-600 d-flex align-items-center gap-2 radius-8 h-40-px text-nowrap"
            >
              <Icon icon="solar:add-circle-bold-duotone" fontSize={20} />
              Add Visitor
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="row g-3 align-items-end">
          <div className="col-xl col-md-4 col-sm-6">
            <label className="form-label fw-bold text-secondary-light">Chapter</label>
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
            <label className="form-label fw-bold text-secondary-light">Zone</label>
            <Select
              options={zoneOptions}
              value={selectedZone}
              onChange={setSelectedZone}
              placeholder="Select Zone"
              styles={selectStyles()}
              isClearable
            />
          </div>
          <div className="col-xl col-md-4 col-sm-6">
            <label className="form-label fw-bold text-secondary-light">ED</label>
            <Select
              options={edOptions}
              value={selectedEd}
              onChange={setSelectedEd}
              placeholder="Select ED"
              styles={selectStyles()}
              isClearable
            />
          </div>
          <div className="col-xl col-md-4 col-sm-6">
            <label className="form-label fw-bold text-secondary-light">RD</label>
            <Select
              options={rdOptions}
              value={selectedRd}
              onChange={setSelectedRd}
              placeholder="Select RD"
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
                <th scope="col" style={{ color: "black", fontWeight: '600' }}>Sl.No</th>
                <th scope="col" style={{ color: "black", fontWeight: '600' }}>Date</th>
                <th scope="col" style={{ color: "black", fontWeight: '600' }}>Visitors Name</th>
                <th scope="col" style={{ color: "black", fontWeight: '600' }}>Contact Number</th>
                <th scope="col" style={{ color: "black", fontWeight: '600' }}>Business Category</th>
                <th scope="col" style={{ color: "black", fontWeight: '600' }}>Business Name</th>
                <th scope="col" style={{ color: "black", fontWeight: '600' }}>Source of event</th>
                <th scope="col" style={{ color: "black", fontWeight: '600' }}>Invited By</th>
                <th scope="col" style={{ color: "black", fontWeight: '600' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {currentData.length > 0 ? (
                currentData.map((visitor, index) => (
                  <tr key={visitor.id}>
                    <td>{(currentPage - 1) * rowsPerPage + index + 1}</td>
                    <td>{formatDate(visitor.visitDate)}</td>
                    <td>{visitor.visitorName}</td>
                    <td>{visitor.phone}</td>
                    <td>{visitor.category}</td>
                    <td>{visitor.company}</td>
                    <td>{visitor.sourceOfEvent}</td>
                    <td>{visitor.invitedBy}</td>
                    <td>
                      <select
                        className={`form-select form-select-sm radius-4 fw-medium ${visitor.status === "Approved"
                          ? "bg-success-focus text-success-main border-success-main"
                          : visitor.status === "Rejected"
                            ? "bg-danger-focus text-danger-main border-danger-main"
                            : "bg-warning-focus text-warning-main border-warning-main"
                          }`}
                        value={visitor.status}
                        onChange={(e) => handleStatusChange(visitor.id, e.target.value)}
                        style={{ width: '120px' }}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Approved">Approved</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="10" className="text-center py-4">
                    No visitors found.
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

export default VisitorsReportLayer;
