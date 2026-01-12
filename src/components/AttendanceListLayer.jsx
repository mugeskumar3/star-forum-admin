import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState } from "react";
import TablePagination from "./TablePagination";

const AttendanceListLayer = () => {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const attendanceData = Array.from({ length: 20 }).map((_, i) => ({
    id: i + 1,
    name: ['Rajesh Kumar', 'Priya Sharma', 'Amit Patel', 'Sneha Reddy', 'Vikram Singh', 'Ananya Iyer', 'Suresh Nair', 'Megha Gupta', 'Arjun Verma', 'Kavita Joshi', 'Rahul Deshmukh', 'Pooja Malhotra', 'Sandeep Bansal', 'Neha Choudhury', 'Vijay Ranganathan', 'Shilpa Kulkarni', 'Manish Tiwari', 'Divya Saxena', 'Pankaj Agarwal', 'Swati Bhattacharya'][i],
    chapter: ['ARAM', 'STAR', 'GALAXY', 'ELITE', 'TITAN', 'WARRIOR', 'KING', 'FORT', 'COAST', 'PORT', 'SPICE', 'METRO', 'GIDC', 'PINK', 'NAWABS', 'ROYAL', 'CITY', 'ELITE', 'STAR', 'ARAM'][i],
    mobile: `9876543${100 + i}`,
    company: ['Alpha Tech', 'Beta Solutions', 'Gamma University', 'Delta Research', 'Epsilon Labs', 'Zeta Corp', 'Sigma Industries', 'Iota Systems', 'Kappa Ventures', 'Lambda Group', 'Mu Software', 'Nu Enterprises', 'Xi Services', 'Omicron Networks', 'Pi Healthcare', 'Rho Finance', 'Sigma Media', 'Tau Education', 'Upsilon Global', 'Phi Logistics'][i],
    category: ['Fire & Safety', 'Software Developer', 'Tax Consultant', 'Electrical Contractor', 'Interior Designer', 'Water Proofing', 'Plan Approval Consultant', 'Computer Sales', 'Insurance', 'Real Estate', 'Education', 'Marketing', 'Healthcare', 'Logistics', 'Agriculture', 'Legal', 'Consulting', 'Events', 'Photography', 'Textiles'][i],
    status: i % 2 === 0 ? "Present" : "Absent",
  }));

  // Search Filter
  const filteredData = attendanceData.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.mobile.includes(searchTerm)
  );

  // Pagination Logic
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(parseInt(e.target.value));
    setCurrentPage(1);
  };

  const statusMap = {
    Present:
      "bg-success-focus text-success-main px-24 py-4 rounded-pill fw-medium text-sm",
    Absent:
      "bg-danger-focus text-danger-main px-24 py-4 rounded-pill fw-medium text-sm",
  };

  return (
    <div className="card h-100 p-0 radius-12">
      <div className="card-header border-bottom bg-base py-16 px-24 d-flex align-items-center flex-wrap gap-3 justify-content-between">
        <div className="d-flex align-items-center flex-wrap gap-3">
          <h4 className="mb-0"  >Attendance List</h4>
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
                <th scope="col">S.No</th>
                <th scope="col">Name</th>
                <th scope="col">Chapter Name</th>
                <th scope="col">Mobile Number</th>
                <th scope="col">Company Name</th>
                <th scope="col">Category</th>
                <th scope="col" className="text-center">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {currentRows.length > 0 ? (
                currentRows.map((item, index) => (
                  <tr key={item.id}>
                    <td>{indexOfFirstRow + index + 1}</td>
                    <td>
                      <span className="text-md mb-0 fw-normal text-secondary-light">
                        {item.name}
                      </span>
                    </td>
                    <td>
                      <span className="text-md mb-0 fw-normal text-secondary-light">
                        {item.chapter}
                      </span>
                    </td>
                    <td>
                      <span className="text-md mb-0 fw-normal text-secondary-light">
                        {item.mobile}
                      </span>
                    </td>
                    <td>
                      <span className="text-md mb-0 fw-normal text-secondary-light">
                        {item.company}
                      </span>
                    </td>
                    <td>
                      <span className="text-md mb-0 fw-normal text-secondary-light">
                        {item.category}
                      </span>
                    </td>
                    <td className="text-center">
                      <button className="btn btn-outline-warning btn-sm radius-8 px-12 py-6">
                        Mark Attendance
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-3">
                    No records found
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
          onRowsPerPageChange={(e) => {
            setRowsPerPage(Number(e.target.value));
            setCurrentPage(1);
          }}
          totalRecords={filteredData.length}
        />
      </div>
    </div>
  );
};

export default AttendanceListLayer;
