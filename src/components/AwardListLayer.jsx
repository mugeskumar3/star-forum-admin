import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import TablePagination from "./TablePagination";
import AwardApi from "../Api/AwardApi";

const AwardListLayer = () => {
  const [awards, setAwards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    fetchAwards();
  }, []);

  const fetchAwards = async () => {
    setLoading(true);
    const response = await AwardApi.getAward();
    if (response && response.status && response.response.data) {
      setAwards(response.response.data);
    } else {
      setAwards([]);
    }
    setLoading(false);
  };

  // Initial Data for Filter/Search
  const filteredAwards = awards.filter((award) =>
    award.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const totalRecords = filteredAwards.length;
  const totalPages = Math.ceil(totalRecords / rowsPerPage);

  const currentData = filteredAwards.slice(
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

  const handleDeleteClick = async (id) => {
    if (window.confirm("Are you sure you want to delete this award?")) {
      const response = await AwardApi.deleteAward(id);
      if (response && response.status) {
        fetchAwards(); // Refresh list
      }
    }
  };

  return (
    <div className="card h-100 p-0 radius-12">
      <div className="card-header border-bottom bg-base py-16 px-24 d-flex align-items-center flex-wrap gap-3 justify-content-between">
        <div className="d-flex align-items-center flex-wrap gap-3">
          <h6 className="text-primary-600 pb-2 mb-0">Award List</h6>
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
            to="/award/add"
            className="btn btn-primary text-sm btn-sm px-12 py-12 radius-8 d-flex align-items-center gap-2"
            style={{ backgroundColor: "#C4161C", borderColor: "#C4161C" }}
          >
            <Icon
              icon="ic:baseline-plus"
              className="icon text-xl line-height-1"
            />
            Add New Award
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
                  Award Name
                </th>
                <th scope="col" style={{ color: "black" }}>
                  Status
                </th>
                <th scope="col" style={{ color: "black" }}>
                  Created Date
                </th>
                <th
                  scope="col"
                  className="text-center"
                  style={{ color: "black" }}
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {currentData.length > 0 ? (
                currentData.map((award, index) => (
                  <tr key={index}>
                    <td>{(currentPage - 1) * rowsPerPage + index + 1}</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="text-md mb-0 fw-normal text-secondary-light">
                          {award.name}
                        </span>
                      </div>
                    </td>
                    <td>
                      <span
                        className={`badge ${
                          award.isActive
                            ? "bg-success-focus text-success-main"
                            : "bg-danger-focus text-danger-main"
                        }`}
                      >
                        {award.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td>
                      {award.createdAt
                        ? new Date(award.createdAt)
                            .toLocaleDateString("en-GB", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            })
                            .replace(/ /g, "-")
                        : "-"}
                    </td>
                    <td className="text-center">
                      <div className="d-flex align-items-center gap-10 justify-content-center">
                        <Link
                          to={`/award/edit/${award._id}`}
                          className="bg-success-focus text-success-600 bg-hover-success-200 fw-medium w-40-px h-40-px d-flex justify-content-center align-items-center rounded-circle"
                        >
                          <Icon icon="lucide:edit" className="menu-icon" />
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleDeleteClick(award._id)}
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
                  <td colSpan="4" className="text-center py-4">
                    {loading ? "Loading..." : "No awards found."}
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

export default AwardListLayer;
