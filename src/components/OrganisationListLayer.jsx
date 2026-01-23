import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";
import OrganisationApi from "../Api/OrganisationApi";
import { toast } from "react-toastify";
import TablePagination from "./TablePagination";

const OrganisationListLayer = () => {
  const [organisations, setOrganisations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchOrganisations();
  }, []);

  const fetchOrganisations = async () => {
    try {
      setLoading(true);
      const response = await OrganisationApi.getOrganisation();
      if (response && response.status && response.response.data) {
        setOrganisations(response.response.data);
      }
    } catch (error) {
      console.error("Error fetching organisations:", error);
      toast.error("Failed to fetch organisations");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this organisation?")) {
      const response = await OrganisationApi.deleteOrganisation(id);
      if (response && response.status) {
        toast.success("Organisation deleted successfully");
        fetchOrganisations();
      }
    }
  };

  // Filter Logic
  const filteredOrganisations = organisations.filter((org) => {
    const search = searchTerm.toLowerCase();
    return (
      (org.country && org.country.toLowerCase().includes(search)) ||
      (org.state && org.state.toLowerCase().includes(search)) ||
      (org.zone && org.zone.toLowerCase().includes(search)) ||
      (org.region && org.region.toLowerCase().includes(search)) ||
      (org.ed && org.ed.toLowerCase().includes(search)) ||
      (org.rd && org.rd.toLowerCase().includes(search))
    );
  });

  // Pagination Logic
  const totalRecords = filteredOrganisations.length;
  const totalPages = Math.ceil(totalRecords / rowsPerPage);
  const currentData = filteredOrganisations.slice(
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
      <div className="card-header border-bottom bg-base py-16 px-24 d-flex align-items-center justify-content-between flex-wrap gap-3">
        <h6 className="text-primary-600 pb-2 mb-0">Organisation List</h6>
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
            to="/organisation/add"
            className="btn btn-primary text-sm btn-sm px-12 py-12 radius-8 d-flex align-items-center gap-2"
            style={{ backgroundColor: "#C4161C", borderColor: "#C4161C" }}
          >
            <Icon icon="ic:baseline-plus" className="text-xl" />
            Add Organisation
          </Link>
        </div>
      </div>
      <div className="card-body p-24">
        <div className="table-responsive scroll-sm">
          <table className="table bordered-table sm-table mb-0">
            <thead>
              <tr>
                <th
                  scope="col"
                  className="text-center"
                  style={{ color: "black" }}
                >
                  S.No
                </th>
                <th scope="col" style={{ color: "black" }}>
                  Country
                </th>
                <th scope="col" style={{ color: "black" }}>
                  State
                </th>
                <th scope="col" style={{ color: "black" }}>
                  Zone
                </th>
                <th scope="col" style={{ color: "black" }}>
                  Region
                </th>
                <th scope="col" style={{ color: "black" }}>
                  ED
                </th>
                <th scope="col" style={{ color: "black" }}>
                  RD
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
              {loading ? (
                <tr>
                  <td colSpan="8" className="text-center py-4">
                    Loading...
                  </td>
                </tr>
              ) : currentData.length > 0 ? (
                currentData.map((org, index) => (
                  <tr key={org.id || index}>
                    <td className="text-center">
                      {(currentPage - 1) * rowsPerPage + index + 1}
                    </td>
                    <td>
                      <span className="text-md mb-0 fw-normal text-secondary-light">
                        {org.country}
                      </span>
                    </td>
                    <td>
                      <span className="text-md mb-0 fw-normal text-secondary-light">
                        {org.state}
                      </span>
                    </td>
                    <td>
                      <span className="text-md mb-0 fw-normal text-secondary-light">
                        {org.zone}
                      </span>
                    </td>
                    <td>
                      <span className="text-md mb-0 fw-normal text-secondary-light">
                        {org.region}
                      </span>
                    </td>
                    <td>
                      <span className="text-md mb-0 fw-normal text-secondary-light">
                        {org.ed}
                      </span>
                    </td>
                    <td>
                      <span className="text-md mb-0 fw-normal text-secondary-light">
                        {org.rd}
                      </span>
                    </td>
                    <td className="text-center">
                      <div className="d-flex align-items-center justify-content-center gap-2">
                        <Link
                          to={`/organisation/edit/${org._id}`}
                          className="bg-success-focus text-success-600 bg-hover-success-200 fw-medium w-40-px h-40-px d-flex justify-content-center align-items-center rounded-circle"
                        >
                          <Icon icon="lucide:edit" className="menu-icon" />
                        </Link>
                        <button
                          onClick={() => handleDelete(org._id)}
                          className="remove-item-btn bg-danger-focus bg-hover-danger-200 text-danger-600 fw-medium w-40-px h-40-px d-flex justify-content-center align-items-center rounded-circle border-0"
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
                    No Data Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {!loading && (
          <TablePagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleRowsPerPageChange}
            totalRecords={totalRecords}
          />
        )}
      </div>
    </div>
  );
};

export default OrganisationListLayer;
