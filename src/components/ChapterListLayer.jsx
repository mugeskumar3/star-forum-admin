import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import TablePagination from "./TablePagination";

const ChapterListLayer = () => {
  const [chapters, setChapters] = useState(Array.from({ length: 20 }).map((_, i) => ({
    id: i + 1,
    name: ['Chennai Central', 'Mumbai South', 'Delhi West', 'Bangalore East', 'Hyderabad North', 'Kolkata Metro', 'Pune City', 'Ahmedabad GIDC', 'Jaipur Pink', 'Lucknow Nawabs', 'Chandigarh Royal', 'Coimbatore Elite', 'Madurai Star', 'Trichy Titans', 'Salem Warriors', 'Erode Kings', 'Vellore Fort', 'Nellore Coast', 'Vizag Port', 'Kochi Spice'][i],
    country: "India",
    state: ['Tamil Nadu', 'Maharashtra', 'Delhi', 'Karnataka', 'Telangana', 'West Bengal', 'Maharashtra', 'Gujarat', 'Rajasthan', 'Uttar Pradesh', 'Punjab', 'Tamil Nadu', 'Tamil Nadu', 'Tamil Nadu', 'Tamil Nadu', 'Tamil Nadu', 'Tamil Nadu', 'Andhra Pradesh', 'Andhra Pradesh', 'Kerala'][i],
    zone: `Zone ${i + 1}`,
    type: i % 2 === 0 ? "In Person" : "Online",
    createdDate: "2025-01-01",
  })));
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Initial Data for Filter/Search
  const filteredChapters = chapters.filter(
    (chapter) =>
      chapter.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      chapter.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalRecords = filteredChapters.length;
  const totalPages = Math.ceil(totalRecords / rowsPerPage);

  const currentData = filteredChapters.slice(
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

  const handleDeleteClick = (id) => {
    if (window.confirm("Are you sure you want to delete this chapter?")) {
      setChapters((prev) => prev.filter((c) => c.id !== id));
    }
  };

  return (
    <div className="card h-100 p-0 radius-12">
      <div className="card-header border-bottom bg-base py-16 px-24 d-flex align-items-center flex-wrap gap-3 justify-content-between">
        <div className="d-flex align-items-center flex-wrap gap-3">
          <h4 className="mb-0"  >Chapter List</h4>
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
            to="/chapter-creation/add"
            className="btn btn-primary text-sm btn-sm px-12 py-12 radius-8 d-flex align-items-center gap-2"
            style={{ backgroundColor: "#C4161C", borderColor: "#C4161C" }}
          >
            <Icon
              icon="ic:baseline-plus"
              className="icon text-xl line-height-1"
            />
            Add New Chapter
          </Link>
        </div>
      </div>
      <div className="card-body p-24">
        <div className="table-responsive scroll-sm">
          <table className="table bordered-table sm-table mb-0">
            <thead>
              <tr>
                <th scope="col" style={{ color: "black" }}>S.No</th>
                <th scope="col" style={{ color: "black" }}>Chapter Name</th>
                <th scope="col" style={{ color: "black" }}>Country</th>
                <th scope="col" style={{ color: "black" }}>State</th>
                <th scope="col" style={{ color: "black" }}>Zone</th>
                <th scope="col" style={{ color: "black" }}>Meeting Type</th>
                <th scope="col" style={{ color: "black" }}>Created Date</th>
                <th scope="col" className="text-center" style={{ color: "black" }}>
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {currentData.length > 0 ? (
                currentData.map((chapter, index) => (
                  <tr key={index}>
                    <td>{(currentPage - 1) * rowsPerPage + index + 1}</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="text-md mb-0 fw-normal text-secondary-light">
                          {chapter.name || chapter.chapterName}
                        </span>
                      </div>
                    </td>
                    <td>
                      <span className="text-md mb-0 fw-normal text-secondary-light">
                        {chapter.country}
                      </span>
                    </td>
                    <td>{chapter.state}</td>
                    <td>{chapter.zone}</td>
                    <td>
                      <span
                        className={`badge ${chapter.type === "Online"
                          ? "bg-success-focus text-success-main"
                          : "bg-primary-focus text-primary-main"
                          } px-24 py-4 rounded-pill fw-medium text-sm`}
                      >
                        {chapter.type || chapter.meetingType}
                      </span>
                    </td>
                    <td>{chapter.createdDate}</td>
                    <td className="text-center">
                      <div className="d-flex align-items-center gap-10 justify-content-center">
                        <button
                          type="button"
                          className="bg-info-focus bg-hover-info-200 text-info-600 fw-medium w-40-px h-40-px d-flex justify-content-center align-items-center rounded-circle"
                        >
                          <Icon
                            icon="majesticons:eye-line"
                            className="icon text-xl"
                          />
                        </button>
                        <Link
                          to={`/chapter-creation/edit/${chapter.id}`}
                          className="bg-success-focus text-success-600 bg-hover-success-200 fw-medium w-40-px h-40-px d-flex justify-content-center align-items-center rounded-circle"
                        >
                          <Icon icon="lucide:edit" className="menu-icon" />
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleDeleteClick(chapter.id)}
                          className="remove-item-btn bg-danger-focus bg-hover-danger-200 text-danger-600 fw-medium w-40-px h-40-px d-flex justify-content-center align-items-center rounded-circle"
                        >
                          <Icon
                            icon="fluent:delete-24-regular"
                            className="menu-icon"
                          />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center py-4">
                    No chapters found.
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

export default ChapterListLayer;
