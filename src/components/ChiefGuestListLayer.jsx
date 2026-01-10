import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";

const ChiefGuestListLayer = () => {
  // Static Dummy Data for Chief Guests
  const [guests, setGuests] = useState([
    {
      id: 1,
      name: "Dr. A.P.J. Abdul Kalam",
      designation: "Scientist & Former President",
      organization: "DRDO / ISRO",
      contact: "9876543210",
      email: "contact@abdulkalam.com",
      status: "Active",
    },
    {
      id: 2,
      name: "Sundar Pichai",
      designation: "CEO",
      organization: "Google Alphabet",
      contact: "9876543211",
      email: "sundar@google.com",
      status: "Active",
    },
    {
      id: 3,
      name: "Indra Nooyi",
      designation: "Former CEO",
      organization: "PepsiCo",
      contact: "9876543212",
      email: "indra.nooyi@pepsico.com",
      status: "Inactive",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const filteredGuests = guests.filter(
    (guest) =>
      guest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guest.organization.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteClick = (id) => {
    if (window.confirm("Are you sure you want to delete this chief guest?")) {
      setGuests((prev) => prev.filter((guest) => guest.id !== id));
    }
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
            onChange={(e) => setRowsPerPage(parseInt(e.target.value))}
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
                <th scope="col">Designation</th>
                <th scope="col">Organization</th>
                <th scope="col">Contact</th>
                <th scope="col">Email</th>
                <th scope="col">Status</th>
                <th scope="col" className="text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredGuests.length > 0 ? (
                filteredGuests.map((guest, index) => (
                  <tr key={guest.id}>
                    <td>{index + 1}</td>
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
                        className={`badge radius-4 px-10 py-4 text-sm ${
                          guest.status === "Active"
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
      </div>
    </div>
  );
};

export default ChiefGuestListLayer;
