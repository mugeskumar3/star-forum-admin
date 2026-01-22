import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Modal, Button, Tabs, Tab } from "react-bootstrap";
import TablePagination from "./TablePagination";
import Select from "react-select";

const CommunityUpdateListLayer = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
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
    { value: "aram", label: "ARAM" },
    { value: "star", label: "STAR" },
    { value: "galaxy", label: "GALAXY" },
    { value: "elite", label: "ELITE" },
    { value: "titan", label: "TITAN" },
  ];

  const personOptions = [
    { value: "rajesh", label: "Rajesh Kumar" },
    { value: "priya", label: "Priya Sharma" },
    { value: "john", label: "John Doe" },
  ];

  const handleFilterChange = (key, selectedOption) => {
    setFilters((prev) => ({
      ...prev,
      [key]: selectedOption,
    }));
  };

  const [data, setData] = useState({
    ask: Array.from({ length: 20 }).map((_, i) => ({
      id: i + 1,
      chapterName: [
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
      image: `assets/images/user-list/user-list${(i % 6) + 1}.png`,
      description: `Looking for resources in Section ${i + 1} for upcoming community event.`,
    })),
    give: Array.from({ length: 20 }).map((_, i) => ({
      id: i + 21,
      chapterName: [
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
      image: `assets/images/user-list/user-list${(i % 6) + 1}.png`,
      description: `Offering sponsorship for Section ${i + 1} annual meetup.`,
    })),
    required: Array.from({ length: 20 }).map((_, i) => ({
      id: i + 41,
      chapterName: [
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
      image: `assets/images/user-list/user-list${(i % 6) + 1}.png`,
      description: `Immediate requirement for volunteers in Section ${i + 1}.`,
    })),
  });

  const currentTabData = data[activeTab];
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

  const handleClose = () => {
    setShowDeleteModal(false);
    setItemToDelete(null);
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
              placeholder="Select Chapter"
              options={chapterOptions}
              value={filters.chapter}
              onChange={(opt) => handleFilterChange("chapter", opt)}
              styles={customStyles}
              className="basic-single"
              classNamePrefix="select"
            />
            <Select
              placeholder="Select Person"
              options={personOptions}
              value={filters.person}
              onChange={(opt) => handleFilterChange("person", opt)}
              styles={customStyles}
              className="basic-single"
              classNamePrefix="select"
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

      <Modal show={showDeleteModal} onHide={handleClose} centered>
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
              onClick={handleClose}
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
                Chapter Name
              </th>
              <th scope="col" style={{ color: "black" }}>
                Image
              </th>
              <th scope="col" style={{ color: "black" }}>
                Description
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
                  <td>{item.chapterName}</td>
                  <td>
                    <img
                      src={item.image}
                      alt=""
                      className="w-40-px h-40-px rounded-circle flex-shrink-0"
                      onError={(e) => {
                        e.target.src = "https://placehold.co/40x40?text=IMG";
                      }}
                    />
                  </td>
                  <td>{item.description}</td>
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
                <td colSpan="5" className="text-center py-24">
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
