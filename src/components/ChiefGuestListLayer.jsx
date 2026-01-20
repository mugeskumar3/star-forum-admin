import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";
import TablePagination from "./TablePagination";

const ChiefGuestListLayer = () => {
  // Static Dummy Data for Chief Guests
  const [guests, setGuests] = useState(Array.from({ length: 20 }).map((_, i) => ({
    id: i + 1,
    name: ['Rajesh Kumar', 'Priya Sharma', 'Amit Patel', 'Sneha Reddy', 'Vikram Singh', 'Ananya Iyer', 'Suresh Nair', 'Megha Gupta', 'Arjun Verma', 'Kavita Joshi', 'Rahul Deshmukh', 'Pooja Malhotra', 'Sandeep Bansal', 'Neha Choudhury', 'Vijay Ranganathan', 'Shilpa Kulkarni', 'Manish Tiwari', 'Divya Saxena', 'Pankaj Agarwal', 'Swati Bhattacharya'][i],
    designation: ['CEO', 'Managing Director', 'Professor', 'Scientist', 'Founder', 'Director', 'General Manager', 'Chief Architect', 'Lead Consultant', 'Principal Engineer', 'VP Engineering', 'Executive Director', 'Chairman', 'President', 'Partner', 'Associate Director', 'Head of Ops', 'Senior Scientist', 'Advisor', 'Consultant'][i],
    organization: ['Alpha Tech', 'Beta Solutions', 'Gamma University', 'Delta Research', 'Epsilon Labs', 'Zeta Corp', 'Sigma Industries', 'Iota Systems', 'Kappa Ventures', 'Lambda Group', 'Mu Software', 'Nu Enterprises', 'Xi Services', 'Omicron Networks', 'Pi Healthcare', 'Rho Finance', 'Sigma Media', 'Tau Education', 'Upsilon Global', 'Phi Logistics'][i],
    contact: `98765432${20 + i}`,
    email: `guest${i + 1}@example.com`,
    status: i % 2 === 0 ? "Active" : "Inactive",
  })));

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const filteredGuests = guests.filter(
    (guest) =>
      guest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guest.organization.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination Logic
  const totalRecords = filteredGuests.length;
  const totalPages = Math.ceil(totalRecords / rowsPerPage);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentData = filteredGuests.slice(indexOfFirstRow, indexOfLastRow);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(parseInt(e.target.value));
    setCurrentPage(1);
  };

  const handleDeleteClick = (id) => {
    if (window.confirm("Are you sure you want to delete this chief guest?")) {
      setGuests((prev) => prev.filter((guest) => guest.id !== id));
    }
  };

  return (
    <div className="card h-100 p-0 radius-12">
      <div className="card-header border-bottom bg-base py-16 px-24 d-flex align-items-center flex-wrap gap-3 justify-content-between">
        <div className="d-flex align-items-center flex-wrap gap-3">
          <h6 className="text-primary-600 pb-2 mb-0">Chief Guest List</h6>
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
        </div>
      </div>
      <div className="card-body p-24">
        <div className="table-responsive scroll-sm">
          <table className="table bordered-table sm-table mb-0">
            <thead>
              <tr>
                <th scope="col" style={{ color: "black" }}>S.No</th>
                <th scope="col" style={{ color: "black" }}>Name</th>
                <th scope="col" style={{ color: "black" }}>Designation</th>
                <th scope="col" style={{ color: "black" }}>Organization</th>
                <th scope="col" style={{ color: "black" }}>Contact</th>
                <th scope="col" style={{ color: "black" }}>Email</th>
                <th scope="col" style={{ color: "black" }}>Status</th>
                <th scope="col" className="text-center" style={{ color: "black" }}>
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {currentData.length > 0 ? (
                currentData.map((guest, index) => (
                  <tr key={guest.id}>
                    <td>{(currentPage - 1) * rowsPerPage + index + 1}</td>
                    <td>
                      <span className="text-md mb-0 fw-medium text-secondary-light">
                        {guest.name}
                      </span>
                    </td>
                    <td>{guest.designation}</td>
                    <td>{guest.organization}</td>
                    <td>{guest.contact}</td>
                    <td>{guest.email}</td>
                    <td>
                      <span
                        className={`badge radius-4 px-10 py-4 text-sm ${guest.status === "Active"
                          ? "bg-success-focus text-success-main"
                          : "bg-danger-focus text-danger-main"
                          }`}
                      >
                        {guest.status}
                      </span>
                    </td>
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
                        <button
                          type="button"
                          onClick={() => handleDeleteClick(guest.id)}
                          className="bg-danger-focus bg-hover-danger-200 text-danger-600 fw-medium w-40-px h-40-px d-flex justify-content-center align-items-center rounded-circle border-0"
                        >
                          <Icon
                            icon="fluent:delete-24-regular"
                            className="icon text-xl"
                          />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center py-4">
                    No chief guests found.
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

export default ChiefGuestListLayer;
