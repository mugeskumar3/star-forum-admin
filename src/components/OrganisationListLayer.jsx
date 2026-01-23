import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";
import OrganisationApi from "../Api/OrganisationApi";
import { toast } from "react-toastify";

const OrganisationListLayer = () => {
  const [organisations, setOrganisations] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="card h-100 p-0 radius-12">
      <div className="card-header border-bottom bg-base py-16 px-24 d-flex align-items-center justify-content-between">
        <h6 className="text-primary-600 pb-2 mb-0">Organisation List</h6>
        <Link
          to="/organisation/add"
          className="btn btn-primary text-sm btn-sm px-12 py-12 radius-8 d-flex align-items-center gap-2"
        >
          <Icon icon="ic:baseline-plus" className="text-xl" />
          Add Organisation
        </Link>
      </div>
      <div className="card-body p-24">
        <div className="table-responsive scroll-sm">
          <table className="table table-borderless sm-table mb-0">
            <thead>
              <tr>
                <th scope="col" className="text-center">
                  #
                </th>
                <th scope="col">Country</th>
                <th scope="col">State</th>
                <th scope="col">Zone</th>
                <th scope="col">Region</th>
                <th scope="col">ED</th>
                <th scope="col">RD</th>
                <th scope="col" className="text-center">
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
              ) : organisations.length > 0 ? (
                organisations.map((org, index) => (
                  <tr key={org.id || index}>
                    <td className="text-center">{index + 1}</td>
                    <td>{org.country}</td>
                    <td>{org.state}</td>
                    <td>{org.zone}</td>
                    <td>{org.region}</td>
                    <td>{org.ed}</td>
                    <td>{org.rd}</td>
                    <td className="text-center">
                      <div className="d-flex align-items-center justify-content-center gap-2">
                        <Link
                          to={`/organisation/edit/${org.id}`}
                          className="w-32-px h-32-px bg-success-focus text-success-main rounded-circle d-inline-flex align-items-center justify-content-center"
                        >
                          <Icon icon="lucide:edit" />
                        </Link>
                        <button
                          onClick={() => handleDelete(org.id)}
                          className="w-32-px h-32-px bg-danger-focus text-danger-main rounded-circle d-inline-flex align-items-center justify-content-center border-0"
                        >
                          <Icon icon="mingcute:delete-2-line" />
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
      </div>
    </div>
  );
};

export default OrganisationListLayer;
