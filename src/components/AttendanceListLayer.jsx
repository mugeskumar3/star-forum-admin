import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState } from "react";

const AttendanceListLayer = () => {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const attendanceData = [
    {
      id: 1,
      name: "Mathiarasu M",
      chapter: "ARAM",
      mobile: "9940222426",
      company: "TECHMAXX ENGINEERING",
      category: "Fire & Safety",
      status: "Present",
    },
    {
      id: 2,
      name: "Mohamed Umar",
      chapter: "ARAM",
      mobile: "9786803746",
      company: "Harxa Tech",
      category: "Software Developer",
      status: "Absent",
    },
    {
      id: 3,
      name: "Saranya ES",
      chapter: "ARAM",
      mobile: "9176715967",
      company: "ES Saranya & Company",
      category: "Tax Consultant",
      status: "Present",
    },
    {
      id: 4,
      name: "Kumaran V M",
      chapter: "ARAM",
      mobile: "9840492148",
      company: "Yogi electricals",
      category: "Electrical Contractor",
      status: "Present",
    },
    {
      id: 5,
      name: "Mano Neelamegam",
      chapter: "ARAM",
      mobile: "9884788409",
      company: "WUDFE INC",
      category: "Interior Designer",
      status: "Present",
    },
    {
      id: 6,
      name: "Prakash A",
      chapter: "ARAM",
      mobile: "9095237572",
      company: "Kalash roofing",
      category: "Water Proofing",
      status: "Absent",
    },
    {
      id: 7,
      name: "Prabhakaran A",
      chapter: "ARAM",
      mobile: "9003385222",
      company: "Varnam planners",
      category: "Plan Approval Consultant",
      status: "Present",
    },
    {
      id: 8,
      name: "Nirmal Raj R",
      chapter: "ARAM",
      mobile: "9003528919",
      company: "Om Sai sivan enterprises",
      category: "Computer Sales & Service",
      status: "Present",
    },
    {
      id: 9,
      name: "Justin S",
      chapter: "ARAM",
      mobile: "9841155116",
      company: "NA",
      category: "Interior Designer",
      status: "Present",
    },
  ];

  // Search Filter
  const filteredData = attendanceData.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.mobile.includes(searchTerm)
  );

  // Pagination Logic
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const statusMap = {
    Present:
      "bg-success-focus text-success-main px-24 py-4 rounded-pill fw-medium text-sm",
    Absent:
      "bg-danger-focus text-danger-main px-24 py-4 rounded-pill fw-medium text-sm",
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
            onChange={(e) => setRowsPerPage(Number(e.target.value))}
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
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Icon icon="ion:search-outline" className="icon" />
          </form>
        </div>
      </div>
      <div className="card-body p-24">
        <div className="table-responsive scroll-sm">
          <table className="table bordered-table sm-table mb-0">
            <thead>
              <tr>
                <th scope="col">S.No</th>
                <th scope="col">Name</th>
                <th scope="col">Chapter Name</th>
                <th scope="col">Mobile Number</th>
                <th scope="col">Company Name</th>
                <th scope="col">Category</th>
                <th scope="col" className="text-center">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {currentRows.length > 0 ? (
                currentRows.map((item, index) => (
                  <tr key={item.id}>
                    <td>{indexOfFirstRow + index + 1}</td>
                    <td>
                      <span className="text-md mb-0 fw-normal text-secondary-light">
                        {item.name}
                      </span>
                    </td>
                    <td>
                      <span className="text-md mb-0 fw-normal text-secondary-light">
                        {item.chapter}
                      </span>
                    </td>
                    <td>
                      <span className="text-md mb-0 fw-normal text-secondary-light">
                        {item.mobile}
                      </span>
                    </td>
                    <td>
                      <span className="text-md mb-0 fw-normal text-secondary-light">
                        {item.company}
                      </span>
                    </td>
                    <td>
                      <span className="text-md mb-0 fw-normal text-secondary-light">
                        {item.category}
                      </span>
                    </td>
                    <td className="text-center">
                      <button className="btn btn-outline-warning btn-sm radius-8 px-12 py-6">
                        Mark Attendance
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-3">
                    No records found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mt-24">
          <span className="text-secondary-light">
            Showing {indexOfFirstRow + 1} to{" "}
            {Math.min(indexOfLastRow, filteredData.length)} of{" "}
            {filteredData.length} entries
          </span>
          <ul className="pagination d-flex flex-wrap align-items-center gap-2 justify-content-center">
            <li className="page-item">
              <button
                className="page-link bg-neutral-200 text-secondary-light fw-semibold radius-8 border-0 d-flex align-items-center justify-content-center h-32-px w-32-px text-md"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <Icon icon="ep:arrow-left-bold" className="" />
              </button>
            </li>
            {Array.from({ length: totalPages }, (_, i) => (
              <li key={i} className="page-item">
                <button
                  className={`page-link ${
                    currentPage === i + 1
                      ? "bg-primary-600 text-white"
                      : "bg-neutral-200 text-secondary-light"
                  } fw-semibold radius-8 border-0 d-flex align-items-center justify-content-center h-32-px w-32-px text-md`}
                  onClick={() => handlePageChange(i + 1)}
                >
                  {i + 1}
                </button>
              </li>
            ))}
            <li className="page-item">
              <button
                className="page-link bg-neutral-200 text-secondary-light fw-semibold radius-8 border-0 d-flex align-items-center justify-content-center h-32-px w-32-px text-md"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                <Icon icon="ep:arrow-right-bold" className="" />
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AttendanceListLayer;
