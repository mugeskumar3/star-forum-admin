import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState } from "react";
import { Modal, Button, Tabs, Tab } from "react-bootstrap";
import TablePagination from "./TablePagination";
import Select from "react-select";

const CommunityUpdateListLayer = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [showResponseModal, setShowResponseModal] = useState(false);
  const [selectedResponses, setSelectedResponses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [activeTab, setActiveTab] = useState("ask");

  const [filters, setFilters] = useState({
    person: null,
    chapter: null,
  });

  const customStyles = {
    control: (provided) => ({
      ...provided,
      minHeight: "40px",
      minWidth: "200px",
      borderRadius: "8px",
      borderColor: "#dee2e6",
      boxShadow: "none",
      "&:hover": {
        borderColor: "#dee2e6",
      },
    }),
    menu: (provided) => ({
      ...provided,
      zIndex: 9999,
    }),
  };

  const chapterOptions = [
    { value: "Chennai Central", label: "Chennai Central" },
    { value: "Mumbai South", label: "Mumbai South" },
    { value: "Delhi West", label: "Delhi West" },
    { value: "Bangalore East", label: "Bangalore East" },
    { value: "Hyderabad North", label: "Hyderabad North" },
  ];

  const personOptions = [
    { value: "Rajesh Kumar", label: "Rajesh Kumar" },
    { value: "Priya Sharma", label: "Priya Sharma" },
    { value: "John Doe", label: "John Doe" },
    { value: "Anita Desai", label: "Anita Desai" },
    { value: "Vikram Singh", label: "Vikram Singh" },
  ];

  const handleFilterChange = (key, selectedOption) => {
    setFilters((prev) => ({
      ...prev,
      [key]: selectedOption,
    }));
    setCurrentPage(1); // Reset to first page on filter change
  };

  const generateData = (startId) => {
    return Array.from({ length: 20 }).map((_, i) => ({
      id: startId + i,
      publicationDate: new Date(2024, i % 12, (i % 28) + 1).toLocaleDateString(
        "en-GB",
        {
          day: "2-digit",
          month: "short",
          year: "numeric",
        },
      ),
      chapterName: [
        "Chennai Central",
        "Mumbai South",
        "Delhi West",
        "Bangalore East",
        "Hyderabad North",
      ][i % 5],
      authorName: [
        "Rajesh Kumar",
        "Priya Sharma",
        "John Doe",
        "Anita Desai",
        "Vikram Singh",
      ][i % 5],
      title: `Community Update Title ${startId + i}`,
      details: `This is the detailed description for the community update regarding item ${startId + i
        }.`,
      responses: Array.from({ length: (i % 5) + 1 }, (_, j) => ({
        id: j + 1,
        userName: `Responder ${j + 1}`,
        profileImage: `assets/images/user-list/user-list${(j % 6) + 1}.png`,
        chapter: [
          "Chennai Central",
          "Mumbai South",
          "Delhi West",
          "Bangalore East",
          "Hyderabad North",
        ][j % 5],
        zone: `Zone ${(j % 3) + 1}`,
        edName: `ED ${j + 1}`,
        region: `Region ${(j % 4) + 1}`,
        contactNumber: `+91 98765 4321${j}`,
      })),
      image: `assets/images/user-list/user-list${(i % 6) + 1}.png`,
    }));
  };

  const [data, setData] = useState({
    ask: generateData(1),
    give: generateData(21),
    required: generateData(41),
  });

  const currentTabData = data[activeTab].filter((item) => {
    const matchesChapter = filters.chapter
      ? item.chapterName === filters.chapter.value
      : true;
    const matchesPerson = filters.person
      ? item.authorName === filters.person.value
      : true;
    return matchesChapter && matchesPerson;
  });

  const totalRecords = currentTabData.length;
  const totalPages = Math.ceil(totalRecords / rowsPerPage);

  const currentData = currentTabData.slice(
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

  const confirmDelete = (item) => {
    setItemToDelete(item);
    setShowDeleteModal(true);
  };

  const handleDelete = () => {
    const newData = { ...data };
    newData[activeTab] = newData[activeTab].filter(
      (item) => item.id !== itemToDelete.id,
    );
    setData(newData);
    setShowDeleteModal(false);
    setItemToDelete(null);
  };

  const handleCloseDelete = () => {
    setShowDeleteModal(false);
    setItemToDelete(null);
  };

  const handleShowResponses = (responses) => {
    setSelectedResponses(responses);
    setShowResponseModal(true);
  };

  const handleCloseResponse = () => {
    setShowResponseModal(false);
    setSelectedResponses([]);
  };

  return (
    <>
      <div className="card h-100 p-0 radius-12">
        <div className="card-header border-bottom bg-base py-16 px-24 d-flex align-items-center flex-wrap gap-3 justify-content-between">
          <div className="d-flex align-items-center flex-wrap gap-3">
            <h6 className="text-primary-600 pb-2 mb-0">Community Update</h6>
          </div>
          <div className="d-flex align-items-center gap-3">
            <Select
              placeholder="Chapter"
              options={chapterOptions}
              value={filters.chapter}
              onChange={(opt) => handleFilterChange("chapter", opt)}
              styles={customStyles}
              className="basic-single"
              classNamePrefix="select"
              isClearable
            />
            <Select
              placeholder="Select Person"
              options={personOptions}
              value={filters.person}
              onChange={(opt) => handleFilterChange("person", opt)}
              styles={customStyles}
              className="basic-single"
              classNamePrefix="select"
              isClearable
            />
          </div>
        </div>
        <div className="card-body p-24">
          <Tabs
            activeKey={activeTab}
            onSelect={(k) => {
              setActiveTab(k);
              setCurrentPage(1);
            }}
            className="mb-3 custom-tabs"
          >
            <Tab eventKey="ask" title="Ask">
              {renderTable(currentData)}
            </Tab>
            <Tab eventKey="give" title="Give">
              {renderTable(currentData)}
            </Tab>
            <Tab eventKey="required" title="Required">
              {renderTable(currentData)}
            </Tab>
          </Tabs>

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

      {/* Delete Modal */}
      <Modal show={showDeleteModal} onHide={handleCloseDelete} centered>
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
            Do you want to delete this item? This action cannot be undone.
          </p>
          <div className="d-flex justify-content-center gap-3">
            <Button
              variant="outline-secondary"
              className="px-32"
              onClick={handleCloseDelete}
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

      {/* Response Modal */}
      <Modal
        show={showResponseModal}
        onHide={handleCloseResponse}
        centered
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Responses</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedResponses.length > 0 ? (
            <div className="table-responsive">
              <table className="table bordered-table mb-0">
                <thead>
                  <tr>
                    <th scope="col">Profile</th>
                    <th scope="col">Username</th>
                    <th scope="col">Chapter</th>
                    <th scope="col">Zone</th>
                    <th scope="col">ED Name</th>
                    <th scope="col">Region</th>
                    <th scope="col">Contact Number</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedResponses.map((response, index) => (
                    <tr key={index}>
                      <td>
                        <img
                          src={response.profileImage}
                          alt={response.userName}
                          className="w-40-px h-40-px rounded-circle object-fit-cover"
                        />
                      </td>
                      <td>
                        <span className="text-primary-600 fw-semibold">
                          {response.userName}
                        </span>
                      </td>
                      <td>{response.chapter}</td>
                      <td>{response.zone}</td>
                      <td>{response.edName}</td>
                      <td>{response.region}</td>
                      <td>{response.contactNumber}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-center text-muted">No responses yet.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseResponse}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );

  function renderTable(items) {
    return (
      <div className="table-responsive scroll-sm">
        <table className="table bordered-table sm-table mb-0">
          <thead>
            <tr>
              <th scope="col" style={{ color: "black" }}>
                S.No
              </th>
              <th scope="col" style={{ color: "black" }}>
                Date
              </th>
              <th scope="col" style={{ color: "black" }}>
                Chapter
              </th>
              <th scope="col" style={{ color: "black" }}>
                Name
              </th>
              <th scope="col" style={{ color: "black" }}>
                Title
              </th>
              <th scope="col" style={{ color: "black" }}>
                Details
              </th>
              <th scope="col" style={{ color: "black" }}>
                Response
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
            {items.length > 0 ? (
              items.map((item, index) => (
                <tr key={item.id}>
                  <td>{(currentPage - 1) * rowsPerPage + index + 1}</td>
                  <td>{item.publicationDate}</td>
                  <td>{item.chapterName}</td>
                  <td>{item.authorName}</td>
                  <td>{item.title}</td>
                  <td
                    className="text-truncate"
                    style={{ maxWidth: "200px" }}
                    title={item.details}
                  >
                    {item.details}
                  </td>
                  <td>
                    <span
                      className="text-primary-600 fw-bold cursor-pointer text-decoration-underline"
                      onClick={() => handleShowResponses(item.responses)}
                    >
                      {item.responses.length}
                    </span>
                  </td>
                  <td className="text-center">
                    <div className="d-flex align-items-center gap-10 justify-content-center">
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
            ) : (
              <tr>
                <td colSpan="8" className="text-center py-24">
                  No records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }
};

export default CommunityUpdateListLayer;
