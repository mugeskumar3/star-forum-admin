import React, { useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Link } from "react-router-dom";
import Select from "react-select";
import { Modal, Button } from "react-bootstrap";
import TablePagination from "./TablePagination";

const Note121Layer = () => {
  // Mock Data
  const [reports, setReports] = useState(
    Array.from({ length: 20 }).map((_, i) => ({
      id: i + 1,
      dateTime: "2025-01-25T10:30:00", // Changed to ISO format for better parsing
      memberName: [
        "Rajesh Kumar",
        "Priya Sharma",
        "Amit Patel",
        "Sneha Reddy",
        "Vikram Singh",
        "Ananya Iyer",
        "Suresh Nair",
        "Megha Gupta",
        "Arjun Verma",
        "Kavita Joshi",
        "Rahul Deshmukh",
        "Pooja Malhotra",
        "Sandeep Bansal",
        "Neha Choudhury",
        "Vijay Ranganathan",
        "Shilpa Kulkarni",
        "Manish Tiwari",
        "Divya Saxena",
        "Pankaj अग्रवाल",
        "Swati Bhattacharya",
      ][i],
      metWith: [
        "John Doe",
        "Jane Smith",
        "Robert Brown",
        "Emily Davis",
        "Michael Wilson",
        "Sarah Miller",
        "David Moore",
        "Jessica Taylor",
        "Richard Anderson",
        "Karen Thomas",
        "Lisa Jackson",
        "Kevin White",
        "Brian Harris",
        "Ashley Martin",
        "Steven Thompson",
        "Mary Garcia",
        "Daniel Martinez",
        "Patricia Robinson",
        "Paul Clark",
        "Jennifer Rodriguez",
      ][i],
      initiatedBy: i % 2 === 0 ? "Member" : "Met With",
      location: ["Chennai", "Mumbai", "Delhi", "Bangalore", "Hyderabad"][i % 5],
      topics: "Business Growth, Referrals, Networking",
      selfie: "https://placehold.co/600x400",
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
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

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
  const filteredReports = reports.filter((report) => {
    const matchesSearch =
      report.memberName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.metWith.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesChapter = selectedChapter
      ? report.chapter === selectedChapter.value
      : true;
    const matchesZone = selectedZone
      ? report.zone === selectedZone.value
      : true;
    const matchesEd = selectedEd ? report.ed === selectedEd.value : true;
    const matchesRd = selectedRd ? report.rd === selectedRd.value : true;

    return (
      matchesSearch && matchesChapter && matchesZone && matchesEd && matchesRd
    );
  });

  const totalRecords = filteredReports.length;
  const totalPages = Math.ceil(totalRecords / rowsPerPage);

  const currentData = filteredReports.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage,
  );

  const handlePageChange = (page) => setCurrentPage(page);

  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(parseInt(e.target.value));
    setCurrentPage(1);
  };

  const handleViewImage = (image) => {
    setSelectedImage(image);
    setShowImageModal(true);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-IN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    }).toUpperCase();
  };

  return (
    <div className="card h-100 p-0 radius-12">
      <div className="card-header border-bottom bg-base py-16 px-24">
        <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-3">
          <h6 className="text-primary-600 pb-2 mb-0">121's Report</h6>
          <div className="d-flex align-items-center flex-wrap gap-3">
            <form className="navbar-search">
              <input
                type="text"
                className="bg-base h-40-px w-auto"
                name="search"
                placeholder="Search Member or Met With"
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
                <th scope="col">S.No</th>
                <th scope="col">Date & Time</th>
                <th scope="col">Member Name</th>
                <th scope="col">Met with</th>
                <th scope="col">Initiated by</th>
                <th scope="col">Location</th>
                <th scope="col">Topics</th>
                <th scope="col" className="text-center">
                  Selfi (View)
                </th>
              </tr>
            </thead>
            <tbody>
              {currentData.length > 0 ? (
                currentData.map((report, index) => (
                  <tr key={report.id}>
                    <td>{(currentPage - 1) * rowsPerPage + index + 1}</td>
                    <td>{formatDate(report.dateTime)}</td>
                    <td>{report.memberName}</td>
                    <td>{report.metWith}</td>
                    <td>{report.initiatedBy}</td>
                    <td>{report.location}</td>
                    <td>{report.topics}</td>
                    <td className="text-center">
                      <button
                        onClick={() => handleViewImage(report.selfie)}
                        className="btn btn-sm btn-outline-primary d-inline-flex align-items-center gap-1"
                      >
                        <Icon icon="majesticons:eye-line" /> View
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center py-4">
                    No reports found.
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

       {/* Selfie Modal */}
       <Modal
          centered
          show={showImageModal}
          onHide={() => setShowImageModal(false)}
      >
          <Modal.Header closeButton>
          <Modal.Title className="text-lg fw-semibold">
              View Selfie
          </Modal.Title>
          </Modal.Header>
          <Modal.Body className="text-center p-0">
              {selectedImage && (
                  <img
                      src={selectedImage}
                      alt="Selfie"
                      className="img-fluid w-100"
                      style={{ maxHeight: '80vh', objectFit: 'contain' }}
                  />
              )}
          </Modal.Body>
          <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowImageModal(false)}>
              Close
          </Button>
          </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Note121Layer;
