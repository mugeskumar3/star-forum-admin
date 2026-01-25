import React, { useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import Select from "react-select";
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

  const customStyles = {
    control: (provided) => ({
      ...provided,
      minHeight: "40px",
      borderRadius: "8px",
      border: "1px solid #dee2e6",
      boxShadow: "none",
      "&:hover": {
        border: "1px solid #dee2e6",
      },
    }),
    menu: (provided) => ({
      ...provided,
      zIndex: 9999,
    }),
  };

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
        <div className="row g-3">
          <div className="col-md-3">
            <Select
              options={chapterOptions}
              value={selectedChapter}
              onChange={setSelectedChapter}
              placeholder="Select Chapter"
              styles={customStyles}
              isClearable
            />
          </div>
          <div className="col-md-3">
            <Select
              options={zoneOptions}
              value={selectedZone}
              onChange={setSelectedZone}
              placeholder="Select Zone"
              styles={customStyles}
              isClearable
            />
          </div>
          <div className="col-md-3">
            <Select
              options={edOptions}
              value={selectedEd}
              onChange={setSelectedEd}
              placeholder="Select ED"
              styles={customStyles}
              isClearable
            />
          </div>
          <div className="col-md-3">
            <Select
              options={rdOptions}
              value={selectedRd}
              onChange={setSelectedRd}
              placeholder="Select RD"
              styles={customStyles}
              isClearable
            />
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
                <th scope="col">Phone</th>
                <th scope="col">Email</th>
                <th scope="col">Address</th>
                <th scope="col">Temp</th>
                <th scope="col">Comments</th>
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
                    <td>{item.phone}</td>
                    <td>{item.email}</td>
                    <td style={{ minWidth: "150px" }}>{item.address}</td>
                    <td className="fw-bold">
                      <span className={getTempColor(item.temp)}>
                        {item.temp}
                      </span>
                    </td>
                    <td style={{ minWidth: "200px" }}>{item.comments}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="11" className="text-center py-4">
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
    </div>
  );
};

export default ReferralNoteLayer;
