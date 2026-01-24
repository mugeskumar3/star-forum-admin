import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";
import TablePagination from "./TablePagination";

const ChiefGuestHistoryLayer = () => {
  // Static Dummy Data for Chief Guest History
  const [history, setHistory] = useState(
    Array.from({ length: 15 }).map((_, i) => ({
      id: i + 1,
      chapterName: [
        "Chennai Central",
        "Mumbai South",
        "Delhi West",
        "Bangalore East",
        "Hyderabad North",
      ][i % 5],
      invitedBy: ["Ramesh", "Suresh", "Mahesh", "Ganesh", "Dinesh"][i % 5],
      meetingDate: `2024-${(i % 12) + 1}-15`,
      meetingStatus:
        i % 3 === 0 ? "Attended" : i % 3 === 1 ? "Rejected" : "Pending",
    })),
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const filteredHistory = history.filter(
    (item) =>
      item.chapterName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.invitedBy.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Pagination Logic
  const totalRecords = filteredHistory.length;
  const totalPages = Math.ceil(totalRecords / rowsPerPage);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentData = filteredHistory.slice(indexOfFirstRow, indexOfLastRow);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(parseInt(e.target.value));
    setCurrentPage(1);
  };

  return (
    <div className="card h-100 p-0 radius-12">
      <div className="card-header border-bottom bg-base py-16 px-24 d-flex align-items-center flex-wrap gap-3 justify-content-between">
        <div className="d-flex align-items-center flex-wrap gap-3">
          <h6 className="text-primary-600 pb-2 mb-0">Chief Guest History</h6>
        </div>
        <div className="d-flex align-items-center flex-wrap gap-3">
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
            to="/chief-guest-list"
            className="btn btn-primary-600 text-sm px-12 py-12 radius-8 d-flex align-items-center gap-2"
          >
            <Icon
              icon="ic:baseline-arrow-back"
              className="icon text-xl line-height-1"
            />
            Back to List
          </Link>
        </div>
      </div>
      <div className="card-body p-24">
        <div className="table-responsive scroll-sm">
          <table className="table bordered-table sm-table mb-0">
            <thead>
              <tr>
                <th scope="col" style={{ color: "black" }}>
                  S.No
                </th>
                <th scope="col" style={{ color: "black" }}>
                  Chapter Name
                </th>
                <th scope="col" style={{ color: "black" }}>
                  Invited By
                </th>
                <th scope="col" style={{ color: "black" }}>
                  Meeting Date
                </th>
                <th scope="col" style={{ color: "black" }}>
                  Meeting Status
                </th>
              </tr>
            </thead>
            <tbody>
              {currentData.length > 0 ? (
                currentData.map((item, index) => (
                  <tr key={item.id}>
                    <td>{(currentPage - 1) * rowsPerPage + index + 1}</td>
                    <td>{item.chapterName}</td>
                    <td>{item.invitedBy}</td>
                    <td>{item.meetingDate}</td>
                    <td>
                      <span
                        className={`badge radius-4 px-10 py-4 text-sm ${
                          item.meetingStatus === "Attended"
                            ? "bg-success-focus text-success-main"
                            : item.meetingStatus === "Rejected"
                              ? "bg-danger-focus text-danger-main"
                              : "bg-warning-focus text-warning-main"
                        }`}
                      >
                        {item.meetingStatus}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-4">
                    No history found.
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

export default ChiefGuestHistoryLayer;
