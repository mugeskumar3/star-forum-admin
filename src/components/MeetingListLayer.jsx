import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import MeetingApi from "../Api/MeetingApi";
import TablePagination from "./TablePagination";

const MeetingListLayer = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [meetingToDelete, setMeetingToDelete] = useState(null);
  const [showQRModal, setShowQRModal] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState(null);

  useEffect(() => {
    loadData();
  }, [currentPage, rowsPerPage, searchTerm]);

  const loadData = async () => {
    try {
      const response = await MeetingApi.getMeeting({
        page: currentPage,
        limit: rowsPerPage,
        search: searchTerm,
      });
      if (response.status) {
        setData(response.response.data || []);
        // Assuming API returns total, if not we might need to rely on other field or if data is just the page data, we can't get total easily without it being in response.
        // Badge style uses response.response.total
        setTotalRecords(response.response.total || 0);
      }
    } catch (error) {
      console.error("Error loading meetings:", error);
    }
  };
  console.log(data, "dataaa");
  const confirmDelete = (meeting) => {
    setMeetingToDelete(meeting);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    if (meetingToDelete) {
      const response = await MeetingApi.deleteMeeting(
        meetingToDelete._id || meetingToDelete.id,
      );
      if (response.status) {
        loadData();
        setShowDeleteModal(false);
        setMeetingToDelete(null);
      }
    }
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setMeetingToDelete(null);
  };

  const [totalRecords, setTotalRecords] = useState(0);
  const totalPages = Math.ceil(totalRecords / rowsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(parseInt(e.target.value));
    setCurrentPage(0);
  };

  const showQRCode = (meeting) => {
    setSelectedMeeting(meeting);
    setShowQRModal(true);
  };

  return (
    <div className="card h-100 p-0 radius-12">
      <div className="card-header border-bottom bg-base py-16 px-24 d-flex align-items-center flex-wrap gap-3 justify-content-between">
        <div className="d-flex align-items-center flex-wrap gap-3">
          <h6 className="text-primary-600 pb-2 mb-0">Meetings List</h6>
        </div>
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
            to="/meeting-creation/add"
            className="btn btn-primary text-sm btn-sm px-12 py-12 radius-8 d-flex align-items-center gap-2"
            style={{ backgroundColor: "#C4161C", borderColor: "#C4161C" }}
          >
            <Icon
              icon="ic:baseline-plus"
              className="icon text-xl line-height-1"
            />
            Make Meeting
          </Link>
        </div>
      </div>
      <div className="card-body p-24">
        <div className="table-responsive scroll-sm">
          <table className="table bordered-table sm-table mb-0">
            <thead>
              <tr>
                <th scope="col">S.No</th>
                <th scope="col">Meeting Topic</th>
                <th scope="col">Meeting Fee</th>
                <th scope="col">Visitors Fee</th>
                <th scope="col">Chapter</th>
                <th scope="col">Start Date</th>
                <th scope="col">End Date</th>
                <th scope="col" className="text-center">
                  QR Code
                </th>
                <th scope="col" className="text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {data.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center">
                    No meetings found.
                  </td>
                </tr>
              ) : (
                data.map((item, index) => (
                  <tr key={item._id || item.id}>
                    <td>{currentPage * rowsPerPage + index + 1}.</td>
                    <td>{item.meetingTopic}</td>
                    <td>₹{item.meetingFee}</td>
                    <td>₹{item.visitorFee}</td>
                    <td>
                      {Array.isArray(item.chapters)
                        ? item.chapters
                            .map((chapter) => chapter.chapterName)
                            .join(", ")
                        : item.chapters}
                    </td>
                    <td>{new Date(item.startDateTime).toLocaleString()}</td>
                    <td>{new Date(item.endDateTime).toLocaleString()}</td>
                    <td className="text-center">
                      <div className="d-flex justify-content-center">
                        <div
                          className="w-50-px h-50-px bg-neutral-200 rounded d-flex align-items-center justify-content-center cursor-pointer"
                          onClick={() => showQRCode(item)}
                          style={{ cursor: "pointer" }}
                        >
                          <Icon
                            icon="ri:qr-code-line"
                            className="text-xl text-neutral-600"
                          />
                        </div>
                      </div>
                    </td>
                    <td className="text-center">
                      <div className="d-flex align-items-center gap-10 justify-content-center">
                        <button
                          type="button"
                          onClick={() => showQRCode(item)}
                          className="bg-info-focus text-info-600 bg-hover-info-200 fw-medium w-40-px h-40-px d-flex justify-content-center align-items-center rounded-circle"
                          title="View Details"
                        >
                          <Icon icon="mdi:eye-outline" className="menu-icon" />
                        </button>
                        <Link
                          to={`/meeting-creation/edit/${item._id || item.id}`}
                          className="bg-success-focus text-success-600 bg-hover-success-200 fw-medium w-40-px h-40-px d-flex justify-content-center align-items-center rounded-circle"
                        >
                          <Icon icon="lucide:edit" className="menu-icon" />
                        </Link>
                        <button
                          type="button"
                          onClick={() => confirmDelete(item)}
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

      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal} centered>
        <Modal.Body className="text-center p-5">
          <div className="d-flex justify-content-center mb-3">
            <div className="bg-danger-focus rounded-circle d-flex justify-content-center align-items-center w-64-px h-64-px">
              <Icon
                icon="mingcute:delete-2-line"
                className="text-danger-600 text-xxl"
              />
            </div>
          </div>
          <h5 className="mb-3">Are you sure?</h5>
          <p className="text-secondary-light mb-4">
            Do you want to delete meeting "{meetingToDelete?.meetingTopic}"?
            This action cannot be undone.
          </p>
          <div className="d-flex justify-content-center gap-3">
            <Button
              variant="outline-secondary"
              className="px-32"
              onClick={handleCloseDeleteModal}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              className="px-32"
              onClick={handleDelete}
              style={{ backgroundColor: "#C4161C", borderColor: "#C4161C" }}
            >
              Delete
            </Button>
          </div>
        </Modal.Body>
      </Modal>

      {/* QR Code Modal */}
      <Modal
        centered
        show={showQRModal}
        onHide={() => setShowQRModal(false)}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title className="text-lg fw-semibold">
            <Icon icon="ri:qr-code-line" className="me-2" />
            Meeting QR Code
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center p-4">
          {selectedMeeting && (
            <>
              <h5 className="mb-3">{selectedMeeting.topic}</h5>
              <div className="bg-light p-4 rounded mb-3">
                <div
                  className="d-flex justify-content-center align-items-center"
                  style={{ minHeight: "250px" }}
                >
                  <div className="bg-white p-4 rounded shadow-sm">
                    <Icon
                      icon="ri:qr-code-line"
                      style={{ fontSize: "200px" }}
                      className="text-neutral-600"
                    />
                  </div>
                </div>
              </div>
              <div className="text-start">
                <p className="mb-1">
                  <strong>Topic:</strong> {selectedMeeting.meetingTopic}
                </p>
                <p className="mb-1">
                  <strong>Chapter:</strong>{" "}
                  {Array.isArray(selectedMeeting.chapters)
                    ? selectedMeeting.chapters
                        .map((c) => c.chapterName || c.name)
                        .join(", ")
                    : selectedMeeting.chapters}
                </p>
                <p className="mb-1">
                  <strong>Meeting Fee:</strong> ₹{selectedMeeting.meetingFee}
                </p>
                <p className="mb-1">
                  <strong>Visitor Fee:</strong> ₹{selectedMeeting.visitorFee}
                </p>
                <p className="mb-1">
                  <strong>Location:</strong>{" "}
                  {selectedMeeting.location?.name || selectedMeeting.location}
                </p>
                <p className="mb-1">
                  <strong>Start:</strong>{" "}
                  {new Date(selectedMeeting.startDateTime).toLocaleString()}
                </p>
                <p className="mb-0">
                  <strong>End:</strong>{" "}
                  {new Date(selectedMeeting.endDateTime).toLocaleString()}
                </p>
              </div>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowQRModal(false)}>
            Close
          </Button>
          <Button
            variant="primary"
            style={{ backgroundColor: "#C4161C", borderColor: "#C4161C" }}
          >
            <Icon icon="mdi:download" className="me-1" />
            Download QR
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default MeetingListLayer;
