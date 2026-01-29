import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import TablePagination from "./TablePagination";

const LocationListLayer = () => {
  const [locations, setLocations] = useState(
    Array.from({ length: 20 }).map((_, i) => ({
      id: i + 1,
      memberId: `MEM-0${i + 100}`,
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
      chapter: [
        "Chennai Central",
        "Mumbai South",
        "Delhi West",
        "Bangalore East",
        "Hyderabad North",
        "Kolkata Metro",
        "Pune City",
        "Ahmedabad GIDC",
        "Jaipur Pink",
        "Lucknow Nawabs",
        "Chandigarh Royal",
        "Coimbatore Elite",
        "Madurai Star",
        "Trichy Titans",
        "Salem Warriors",
        "Erode Kings",
        "Vellore Fort",
        "Nellore Coast",
        "Vizag Port",
        "Kochi Spice",
      ][i],
      region: [
        "North Region",
        "South Region",
        "East Region",
        "West Region",
        "Central Region",
      ][i % 5],
      officeLocation: [
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
      branchLocation: [
        "Anna Nagar",
        "Colaba",
        "Connaught Place",
        "Whitefield",
        "Banjara Hills",
        "Salt Lake",
        "Koregaon Park",
        "SG Highway",
        "Malviya Nagar",
        "Hazratganj",
        "Sector 17",
        "RS Puram",
        "KK Nagar",
        "Thillai Nagar",
        "Fairlands",
        "Perundurai Road",
        "Gandhi Nagar",
        "Dargamitta",
        "Siripuram",
        "MG Road",
      ][i],
      status: i % 2 === 0 ? "Active" : "Inactive",
    })),
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Initial Data for Filter/Search
  const filteredLocations = locations.filter(
    (location) =>
      location.memberName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      location.memberId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      location.officeLocation.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const totalRecords = filteredLocations.length;
  const totalPages = Math.ceil(totalRecords / rowsPerPage);

  const currentData = filteredLocations.slice(
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

  const handleDeleteClick = (id) => {
    if (window.confirm("Are you sure you want to delete this location?")) {
      setLocations((prev) => prev.filter((c) => c.id !== id));
    }
  };

  return (
    <div className="card h-100 p-0 radius-12">
      <div className="card-header border-bottom bg-base py-16 px-24 d-flex align-items-center flex-wrap gap-3 justify-content-between">
        <div className="d-flex align-items-center flex-wrap gap-3">
          <h6 className="text-primary-600 pb-2 mb-0">Location List</h6>
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
          {/* <Link
            to="/location/add"
            className="btn btn-primary text-sm btn-sm px-12 py-12 radius-8 d-flex align-items-center gap-2"
            style={{ backgroundColor: "#C4161C", borderColor: "#C4161C" }}
          >
            <Icon
              icon="ic:baseline-plus"
              className="icon text-xl line-height-1"
            />
            Add New Location
          </Link> */}
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
                  Member ID
                </th>
                <th scope="col" style={{ color: "black" }}>
                  Member Name
                </th>
                <th scope="col" style={{ color: "black" }}>
                  Chapter
                </th>
                <th scope="col" style={{ color: "black" }}>
                  Region
                </th>
                <th scope="col" style={{ color: "black" }}>
                  Office Location
                </th>
                <th scope="col" style={{ color: "black" }}>
                  Branch location
                </th>
                <th scope="col" style={{ color: "black" }}>
                  Status
                </th>
                <th scope="col" style={{ color: "black" }}>
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {currentData.length > 0 ? (
                currentData.map((location, index) => (
                  <tr key={index}>
                    <td>{(currentPage - 1) * rowsPerPage + index + 1}</td>
                    <td>{location.memberId}</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="text-md mb-0 fw-normal text-secondary-light">
                          {location.memberName}
                        </span>
                      </div>
                    </td>
                    <td>{location.chapter}</td>
                    <td>{location.region}</td>
                    <td>{location.officeLocation}</td>
                    <td>{location.branchLocation}</td>
                    <td>
                      <span
                        className={`badge ${
                          location.status === "Active"
                            ? "bg-success-focus text-success-main"
                            : "bg-danger-focus text-danger-main"
                        } px-24 py-4 rounded-pill fw-medium text-sm`}
                      >
                        {location.status === "Active" ? "Yes" : "No"}
                      </span>
                    </td>
                    <td>
                      <div className="d-flex align-items-center gap-10">
                        {/* View and Edit buttons commented out as requested just to create the list for now, or can be added if pages exist. 
                             Adding basic placeholders for now to match UI request. 
                         */}
                        <Link
                          to="#"
                          className="bg-info-focus bg-hover-info-200 text-info-600 fw-medium w-40-px h-40-px d-flex justify-content-center align-items-center rounded-circle"
                        >
                          <Icon
                            icon="majesticons:eye-line"
                            className="icon text-xl"
                          />
                        </Link>
                        <Link
                          to="#"
                          className="bg-success-focus text-success-600 bg-hover-success-200 fw-medium w-40-px h-40-px d-flex justify-content-center align-items-center rounded-circle"
                        >
                          <Icon icon="lucide:edit" className="menu-icon" />
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleDeleteClick(location.id)}
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
                  <td colSpan="9" className="text-center py-4">
                    No locations found.
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

export default LocationListLayer;
