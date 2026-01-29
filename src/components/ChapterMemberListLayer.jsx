import React, { useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { selectStyles } from "../helper/SelectStyles";
import TablePagination from "./TablePagination";

const ChapterMemberListLayer = () => {
  const navigate = useNavigate();

  // Filter states
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedZone, setSelectedZone] = useState(null);
  const [selectedEd, setSelectedEd] = useState(null);
  const [selectedRd, setSelectedRd] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(null);

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

  // Static Dummy Data for Chapter Member List
  const [reportData] = useState(
    Array.from({ length: 25 }).map((_, i) => ({
      id: i + 1,
      memberName: [
        "Logarajan S P",
        "Mathiarasu M",
        "Mano Neelamegam",
        "Kumar Raj S",
        "Ramesh Kumar",
      ][i % 5],
      companyName: [
        "Tech Solutions",
        "Modern Designs",
        "Creative House",
        "Building Pro",
        "Civil Works",
      ][i % 5],
      category: [
        "IT Services",
        "Interior Design",
        "Digital Marketing",
        "Construction",
        "Architecture",
      ][i % 5],
      email: `member${i + 1}@example.com`,
      phone: `987654321${i % 10}`,
      membershipStatus: i % 4 === 0 ? "Active" : "Renewal Due",
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
      item.companyName.toLowerCase().includes(searchTerm.toLowerCase());

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

  const handleViewProfile = (member) => {
    // Navigating to profile view page
    navigate("/view-profile", { state: { member } });
  };

  return (
    <div className="card h-100 p-0 radius-12 overflow-hidden">
      <div className="card-header border-bottom bg-base py-16 px-24">
        <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-3">
          <h6 className="text-primary-600 pb-2 mb-0">Chapter Member List</h6>
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
                  S.No
                </th>
                <th scope="col" style={{ color: "black", fontWeight: "600" }}>
                  Member ID
                </th>
                <th scope="col" style={{ color: "black", fontWeight: "600" }}>
                  Member Name
                </th>
                <th scope="col" style={{ color: "black", fontWeight: "600" }}>
                  Phone Number
                </th>
                <th scope="col" style={{ color: "black", fontWeight: "600" }}>
                  Chapter
                </th>
                <th scope="col" style={{ color: "black", fontWeight: "600" }}>
                  Category
                </th>
                <th scope="col" style={{ color: "black", fontWeight: "600" }}>
                  Company Name
                </th>
                <th scope="col" style={{ color: "black", fontWeight: "600" }}>
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {currentData.length > 0 ? (
                currentData.map((member, index) => (
                  <tr key={member.id}>
                    <td>
                      <span className="text-md mb-0 fw-medium text-secondary-light">
                        {(currentPage - 1) * rowsPerPage + index + 1}
                      </span>
                    </td>
                    <td>
                      <span className="text-md mb-0 fw-bold text-primary-600">
                        MBR-{member.id + 1000}
                      </span>
                    </td>
                    <td>
                      <span className="text-md mb-0 fw-medium text-dark">
                        {member.memberName}
                      </span>
                    </td>
                    <td>
                      <span className="text-md mb-0 fw-normal text-secondary-light">
                        {member.phone}
                      </span>
                    </td>
                    <td>
                      <span className="text-md mb-0 fw-normal text-secondary-light">
                        {member.chapter}
                      </span>
                    </td>
                    <td>
                      <span className="text-md mb-0 fw-normal text-secondary-light">
                        {member.category}
                      </span>
                    </td>
                    <td>
                      <span className="text-md mb-0 fw-normal text-secondary-light">
                        {member.companyName}
                      </span>
                    </td>
                    <td>
                      <button
                        type="button"
                        onClick={() => handleViewProfile(member)}
                        className="bg-info-focus bg-hover-info-200 text-info-600 fw-medium w-40-px h-40-px d-flex justify-content-center align-items-center rounded-circle border-0"
                        title="View Profile"
                      >
                        <Icon
                          icon="majesticons:eye-line"
                          className="icon text-xl"
                        />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center py-4">
                    No members found.
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

export default ChapterMemberListLayer;
