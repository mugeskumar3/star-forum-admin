import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import TablePagination from "./TablePagination";
import Select from "react-select";

const RenewalReportLayer = () => {
  const [data, setData] = useState([
    {
      id: 1,
      memberId: "MEM-0123",
      memberName: "Rajesh Kumar",
      chapter: "Chennai Central",
      region: "North Region",
      membershipId: "M-1001",
      status: "Expired",
    },
    {
      id: 2,
      memberId: "MEM-0124",
      memberName: "Priya Sharma",
      chapter: "Mumbai South",
      region: "West Region",
      membershipId: "M-1002",
      status: "Due Soon",
    },
    {
      id: 3,
      memberId: "MEM-0125",
      memberName: "Amit Patel",
      chapter: "Delhi West",
      region: "East Region",
      membershipId: "M-1003",
      status: "Expired",
    },
    {
      id: 4,
      memberId: "MEM-0126",
      memberName: "Sneha Reddy",
      chapter: "Bangalore East",
      region: "South Region",
      membershipId: "M-1004",
      status: "Due Soon",
    },
    {
      id: 5,
      memberId: "MEM-0127",
      memberName: "Vikram Singh",
      chapter: "Hyderabad North",
      region: "Central Region",
      membershipId: "M-1005",
      status: "Expired",
    },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [showRenewModal, setShowRenewModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [renewFormData, setRenewFormData] = useState({
    amount: "",
    years: "",
    transferMode: null,
  });

  const transferModeOptions = [
    { value: "UPI", label: "UPI" },
    { value: "Bank Transfer", label: "Bank Transfer" },
    { value: "Cash", label: "Cash" },
  ];

  const totalRecords = data.length;
  const totalPages = Math.ceil(totalRecords / rowsPerPage);

  const currentData = data.slice(
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

  const handleRenewClick = (member) => {
    setSelectedMember(member);
    setRenewFormData({ amount: "", years: "", transferMode: null });
    setShowRenewModal(true);
  };

  const handleRenewSubmit = (e) => {
    e.preventDefault();
    // Here you would handle the API call to renew
    console.log("Renewing for:", selectedMember.memberName, renewFormData);
    setShowRenewModal(false);
    // Add success toast or logic here
  };

  const customStyles = {
    control: (provided) => ({
      ...provided,
      minHeight: "40px",
      borderRadius: "8px",
      borderColor: "#dee2e6",
      boxShadow: "none",
      "&:hover": {
        borderColor: "#dee2e6",
      },
    }),
  };

  return (
    <div className="card h-100 p-0 radius-12">
      <div className="card-header border-bottom bg-base py-16 px-24 d-flex align-items-center flex-wrap gap-3 justify-content-between">
        <div className="d-flex align-items-center flex-wrap gap-3">
          <h6 className="text-primary-600 pb-2 mb-0">Renewal Report</h6>
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
                  Membership ID
                </th>
                <th scope="col" style={{ color: "black" }}>
                  Status
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
                currentData.map((item, index) => (
                  <tr key={item.id}>
                    <td>{(currentPage - 1) * rowsPerPage + index + 1}</td>
                    <td>{item.memberId}</td>
                    <td>{item.memberName}</td>
                    <td>{item.chapter}</td>
                    <td>{item.region}</td>
                    <td>{item.membershipId}</td>
                    <td>
                      <span
                        className={`badge ${
                          item.status === "Expired"
                            ? "bg-danger-focus text-danger-main"
                            : "bg-warning-focus text-warning-main"
                        } px-24 py-4 rounded-pill fw-medium text-sm`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="text-center">
                      <button
                        onClick={() => handleRenewClick(item)}
                        className="btn btn-primary btn-sm text-sm px-12 py-6 radius-8"
                        style={{
                          backgroundColor: "#C4161C",
                          borderColor: "#C4161C",
                        }}
                      >
                        Renew
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center py-4">
                    No records found.
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

      {/* Renew Modal */}
      <Modal
        show={showRenewModal}
        onHide={() => setShowRenewModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title className="text-lg fw-semibold">
            Renew Membership
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedMember && (
            <form onSubmit={handleRenewSubmit}>
              <div className="mb-3">
                <p className="mb-1 text-secondary-light">
                  Member:{" "}
                  <span className="text-primary-600 fw-medium">
                    {selectedMember.memberName}
                  </span>
                </p>
                <p className="mb-3 text-secondary-light">
                  ID:{" "}
                  <span className="text-primary-600 fw-medium">
                    {selectedMember.memberId}
                  </span>
                </p>
              </div>

              <div className="mb-3">
                <label className="form-label fw-medium">Enter Amount</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Enter amount"
                  value={renewFormData.amount}
                  onChange={(e) =>
                    setRenewFormData({
                      ...renewFormData,
                      amount: e.target.value,
                    })
                  }
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-medium">Number of Years</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Enter years"
                  value={renewFormData.years}
                  onChange={(e) =>
                    setRenewFormData({
                      ...renewFormData,
                      years: e.target.value,
                    })
                  }
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-medium">Transfer Mode</label>
                <Select
                  options={transferModeOptions}
                  value={renewFormData.transferMode}
                  onChange={(opt) =>
                    setRenewFormData({ ...renewFormData, transferMode: opt })
                  }
                  placeholder="Select mode"
                  styles={customStyles}
                  required
                />
              </div>

              <div className="d-flex justify-content-end gap-3 mt-4">
                <Button
                  variant="outline-secondary"
                  onClick={() => setShowRenewModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  style={{ backgroundColor: "#C4161C", borderColor: "#C4161C" }}
                >
                  Submit
                </Button>
              </div>
            </form>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default RenewalReportLayer;
