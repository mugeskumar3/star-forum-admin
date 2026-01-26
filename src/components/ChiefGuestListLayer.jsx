import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";
import TablePagination from "./TablePagination";
import ChiefGuestApi from "../Api/ChiefGuestApi";
import { Spinner, Modal, Button } from "react-bootstrap";

const ChiefGuestListLayer = () => {
  const [guests, setGuests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const fetchGuests = async () => {
    setLoading(true);
    const response = await ChiefGuestApi.getChiefGuests();
    if (response.status) {
      setGuests(response.data.data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchGuests();
  }, []);

  const confirmDelete = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    if (deleteId) {
      const response = await ChiefGuestApi.deleteChiefGuest(deleteId);
      if (response.status) {
        fetchGuests();
        setShowDeleteModal(false);
        setDeleteId(null);
      }
    }
  };

  const filteredGuests = guests.filter(
    (guest) =>
      guest.chiefGuestName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guest.businessName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guest.contactNumber?.toLowerCase().includes(searchTerm.toLowerCase()),
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
          <Link
            to="/chief-guest-add"
            className="btn btn-primary text-sm btn-sm px-12 py-12 radius-8 d-flex align-items-center gap-2"
          >
            <Icon
              icon="ic:baseline-plus"
              className="icon text-xl line-height-1"
            />
            Add Chief Guest
          </Link>
        </div>
      </div>
      <div className="card-body p-24">
        {loading ? (
          <div className="d-flex justify-content-center py-50">
            <Spinner animation="border" variant="danger" />
          </div>
        ) : (
          <div className="table-responsive scroll-sm">
            <table className="table bordered-table sm-table mb-0">
              <thead>
                <tr>
                  <th scope="col" style={{ color: "black" }}>
                    S.No
                  </th>
                  <th scope="col" style={{ color: "black" }}>
                    Chief Guest Name
                  </th>
                  <th scope="col" style={{ color: "black" }}>
                    Contact Number
                  </th>
                  <th scope="col" style={{ color: "black" }}>
                    Business Name
                  </th>
                  <th scope="col" style={{ color: "black" }}>
                    Location
                  </th>
                  <th scope="col" style={{ color: "black" }}>
                    Referred By
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
                  currentData.map((guest, index) => (
                    <tr key={guest._id}>
                      <td>{(currentPage - 1) * rowsPerPage + index + 1}</td>
                      <td>
                        <span className="text-md mb-0 fw-medium text-secondary-light">
                          {guest.chiefGuestName}
                        </span>
                      </td>
                      <td>{guest.contactNumber}</td>
                      <td>{guest.businessName}</td>
                      <td>{guest.location}</td>
                      <td>{guest.referredBy?.name || "N/A"}</td>
                      <td className="text-center">
                        <div className="d-flex align-items-center gap-10 justify-content-center">
                          <Link
                            to={`/chief-guest-history`}
                            className="bg-info-focus bg-hover-info-200 text-info-600 fw-medium w-32-px h-32-px d-flex justify-content-center align-items-center rounded-circle"
                          >
                            <Icon icon="lucide:eye" className="icon text-sm" />
                          </Link>
                          <Link
                            to={`/chief-guest-edit/${guest._id}`}
                            className="bg-success-focus bg-hover-success-200 text-success-600 fw-medium w-32-px h-32-px d-flex justify-content-center align-items-center rounded-circle"
                          >
                            <Icon icon="lucide:edit" className="icon text-sm" />
                          </Link>
                          <button
                            type="button"
                            onClick={() => confirmDelete(guest._id)}
                            className="bg-danger-focus bg-hover-danger-200 text-danger-600 fw-medium w-32-px h-32-px d-flex justify-content-center align-items-center rounded-circle border-0"
                          >
                            <Icon icon="lucide:trash-2" className="icon text-sm" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center py-4">
                      No chief guests found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        <TablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleRowsPerPageChange}
          totalRecords={totalRecords}
        />
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        centered
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title className="text-lg fw-semibold">
            Confirm Delete
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="text-secondary-light">
            Are you sure you want to delete this chief guest? This action cannot be
            undone.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={handleDelete}
            style={{ backgroundColor: "#C4161C", borderColor: "#C4161C" }}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ChiefGuestListLayer;
