import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import TablePagination from "./TablePagination";

const GeneralUpdateListLayer = () => {
  const [updates, setUpdates] = useState(
    Array.from({ length: 20 }).map((_, i) => ({
      id: i + 1,
      image: `assets/images/user-list/user-list${(i % 6) + 1}.png`,
      from: [
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
        "Pankaj Agarwal",
        "Swati Bhattacharya",
      ][i],
      to: "All Members",
      description: `Update for Section ${i + 1}: Maintenance and guidelines for membership.`,
      location: [
        "Chennai",
        "Mumbai",
        "Delhi",
        "Bangalore",
        "Hyderabad",
        "Kolkata",
        "Pune",
        "Ahmedabad",
        "Jaipur",
        "Lucknow",
        "Chandigarh",
        "Coimbatore",
        "Madurai",
        "Trichy",
        "Salem",
        "Erode",
        "Vellore",
        "Nellore",
        "Vizag",
        "Kochi",
      ][i],
      dateTime: "12 Jan 2026, 10:00 AM",
    })),
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredUpdates = updates.filter((update) => {
    const matchesSearch =
      update.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
      update.to.toLowerCase().includes(searchTerm.toLowerCase()) ||
      update.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      update.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const totalRecords = filteredUpdates.length;
  const totalPages = Math.ceil(totalRecords / rowsPerPage);

  const currentData = filteredUpdates.slice(
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

  return (
    <div className="card h-100 p-0 radius-12">
      <div className="card-header border-bottom bg-base py-16 px-24 d-flex align-items-center flex-wrap gap-3 justify-content-between">
        <div className="d-flex align-items-center flex-wrap gap-3">
          <h6 className="text-primary-600 pb-2 mb-0">General Update</h6>
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
            to="/general-update"
            className="btn btn-primary text-sm btn-sm px-12 py-12 radius-8 d-flex align-items-center gap-2"
            style={{ backgroundColor: "#C4161C", borderColor: "#C4161C" }}
          >
            <Icon
              icon="ic:baseline-plus"
              className="icon text-xl line-height-1"
            />
            Add New Update
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
                  Uploaded Image
                </th>
                <th scope="col" style={{ color: "black" }}>
                  From
                </th>
                <th scope="col" style={{ color: "black" }}>
                  To
                </th>
                <th scope="col" style={{ color: "black" }}>
                  Description
                </th>
                <th scope="col" style={{ color: "black" }}>
                  Location
                </th>
                <th scope="col" style={{ color: "black" }}>
                  Date and Time
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
                currentData.map((update, index) => (
                  <tr key={update.id}>
                    <td>
                      {String(
                        (currentPage - 1) * rowsPerPage + index + 1,
                      ).padStart(2, "0")}
                    </td>
                    <td>
                      <div className="d-flex align-items-center">
                        <img
                          src={update.image}
                          alt=""
                          className="w-40-px h-40-px rounded-circle flex-shrink-0 me-12 overflow-hidden"
                          onError={(e) => {
                            e.target.src =
                              "https://placehold.co/40x40?text=IMG";
                          }}
                        />
                      </div>
                    </td>
                    <td>
                      <span className="text-md mb-0 fw-normal">
                        {update.from}
                      </span>
                    </td>
                    <td>
                      <span className="text-md mb-0 fw-normal">
                        {update.to}
                      </span>
                    </td>
                    <td>
                      <span className="text-md mb-0 fw-normal">
                        {update.description}
                      </span>
                    </td>
                    <td>
                      <span className="text-md mb-0 fw-normal">
                        {update.location}
                      </span>
                    </td>
                    <td>
                      <span className="text-md mb-0 fw-normal">
                        {update.dateTime}
                      </span>
                    </td>
                    <td>
                      <div className="d-flex align-items-center gap-10">
                        <button
                          type="button"
                          className="bg-info-focus bg-hover-info-200 text-info-600 fw-medium w-40-px h-40-px d-flex justify-content-center align-items-center rounded-circle"
                        >
                          <Icon
                            icon="majesticons:eye-line"
                            className="icon text-xl"
                          />
                        </button>
                        <button
                          type="button"
                          className="bg-success-focus text-success-600 bg-hover-success-200 fw-medium w-40-px h-40-px d-flex justify-content-center align-items-center rounded-circle"
                        >
                          <Icon icon="lucide:edit" className="menu-icon" />
                        </button>
                        <button
                          type="button"
                          className="remove-item-btn bg-danger-focus bg-hover-danger-200 text-danger-600 fw-medium w-40-px h-40-px d-flex align-items-center rounded-circle"
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
                    No updates found.
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

export default GeneralUpdateListLayer;
