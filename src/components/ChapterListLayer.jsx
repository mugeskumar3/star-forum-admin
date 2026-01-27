import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";
import ChapterApi from "../Api/ChapterApi";
import { toast } from "react-toastify";
import TablePagination from "./TablePagination";

const ChapterListLayer = () => {
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [totalRecords, setTotalRecords] = useState(0);

  useEffect(() => {
    fetchChapters();
  }, [currentPage, rowsPerPage, searchTerm]);

  const fetchChapters = async () => {
    try {
      setLoading(true);
      const params = {
        page: currentPage,
        limit: rowsPerPage,
        search: searchTerm,
      };
      const response = await ChapterApi.getChapter(params);
      if (response && response.status && response.response.data) {
        setChapters(response.response.data);
        setTotalRecords(response.response.total || 0); // Assuming API returns total
      } else {
        setChapters([]);
        setTotalRecords(0);
      }
    } catch (error) {
      console.error("Error fetching chapters:", error);
      toast.error("Failed to fetch chapters");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this chapter?")) {
      const response = await ChapterApi.deleteChapter(id);
      if (response && response.status) {
        fetchChapters();
      }
    }
  };

  const totalPages = Math.ceil(totalRecords / rowsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(parseInt(e.target.value));
    setCurrentPage(0);
  };

  return (
    <div className="card h-100 p-0 radius-12">
      <div className="card-header border-bottom bg-base py-16 px-24 d-flex align-items-center justify-content-between flex-wrap gap-3">
        <h6 className="text-primary-600 pb-2 mb-0">Chapter List</h6>
        <div className="d-flex align-items-center flex-wrap gap-3">
          <form className="navbar-search" onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              className="bg-base h-40-px w-auto"
              name="search"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(0);
              }}
            />
            <Icon icon="ion:search-outline" className="icon" />
          </form>
          <Link
            to="/chapter-creation/add"
            className="btn btn-primary text-sm btn-sm px-12 py-12 radius-8 d-flex align-items-center gap-2"
            style={{ backgroundColor: "#C4161C", borderColor: "#C4161C" }}
          >
            <Icon icon="ic:baseline-plus" className="text-xl" />
            Add New Chapter
          </Link>
        </div>
      </div>
      <div className="card-body p-24">
        <div className="table-responsive scroll-sm">
          <table className="table bordered-table sm-table mb-0">
            <thead>
              <tr>
                <th
                  scope="col"
                  className="text-center"
                  style={{ color: "black" }}
                >
                  S.No
                </th>
                <th scope="col" style={{ color: "black" }}>
                  Chapter Name
                </th>
                <th scope="col" style={{ color: "black" }}>
                  Location
                </th>
                <th scope="col" style={{ color: "black" }}>
                  Zone
                </th>
                <th scope="col" style={{ color: "black" }}>
                  Region
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
              {loading ? (
                <tr>
                  <td colSpan="7" className="text-center py-4">
                    Loading...
                  </td>
                </tr>
              ) : chapters.length > 0 ? (
                chapters.map((chapter, index) => (
                  <tr key={chapter._id || index}>
                    <td className="text-center">
                      {currentPage * rowsPerPage + index + 1}
                    </td>
                    <td>
                      <span className="text-md mb-0 fw-normal text-secondary-light">
                        {chapter.chapterName}
                      </span>
                    </td>
                    <td>
                      <span className="text-md mb-0 fw-normal text-secondary-light">
                        {chapter.location}
                      </span>
                    </td>
                    <td>
                      <span className="text-md mb-0 fw-normal text-secondary-light">
                        {chapter.zoneName || chapter.zoneId?.name || "-"}
                      </span>
                    </td>
                    <td>
                      <span className="text-md mb-0 fw-normal text-secondary-light">
                        {chapter.regionName || chapter.regionId?.name || "-"}
                      </span>
                    </td>
                    <td>
                      <span className="text-md mb-0 fw-normal text-secondary-light">
                        {chapter.createdDate
                          ? new Date(chapter.createdDate).toLocaleDateString(
                              "en-GB",
                            )
                          : "-"}
                      </span>
                    </td>

                    <td className="text-center">
                      <div className="d-flex align-items-center justify-content-center gap-2">
                        <Link
                          to={`/chapter-view/${chapter._id}`}
                          className="bg-info-focus text-info-600 bg-hover-info-200 fw-medium w-40-px h-40-px d-flex justify-content-center align-items-center rounded-circle"
                        >
                          <Icon
                            icon="majesticons:eye-line"
                            className="menu-icon"
                          />
                        </Link>
                        <Link
                          to={`/chapter-creation/edit/${chapter._id}`}
                          className="bg-success-focus text-success-600 bg-hover-success-200 fw-medium w-40-px h-40-px d-flex justify-content-center align-items-center rounded-circle"
                        >
                          <Icon icon="lucide:edit" className="menu-icon" />
                        </Link>
                        <button
                          onClick={() => handleDelete(chapter._id)}
                          className="remove-item-btn bg-danger-focus bg-hover-danger-200 text-danger-600 fw-medium w-40-px h-40-px d-flex justify-content-center align-items-center rounded-circle border-0"
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
                  <td colSpan="7" className="text-center py-4">
                    No Data Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {!loading && (
          <TablePagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleRowsPerPageChange}
            totalRecords={totalRecords}
          />
        )}
      </div>
    </div>
  );
};

export default ChapterListLayer;
