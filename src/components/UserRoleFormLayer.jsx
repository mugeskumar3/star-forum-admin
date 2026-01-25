import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Select from "react-select";

const UserRoleFormLayer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const [formData, setFormData] = useState({
    roleName: "",
    permissions: [],
  });

  // Features List matching Sidebar
  const features = [
    { id: "dashboard", label: "Dashboard" },
    { id: "roles_permissions", label: "Roles & Permissions" },
    { id: "admin_registration", label: "Admin Registration" },
    { id: "organisation", label: "Organisation" },
    { id: "badge_creation", label: "Badge Creation" },
    { id: "award", label: "Award" },
    { id: "business_category", label: "Business Category" },
    { id: "zone_creation", label: "Zone Creation" },
    { id: "chapter_creation", label: "Chapter Creation" },
    { id: "members_registration", label: "Members Registration" },
    { id: "meeting_creation", label: "Meeting Creation" },
    { id: "attendance_list", label: "Attendance List" },
    { id: "general_update", label: "General Update" },
    { id: "community_update", label: "Community Update" },
    { id: "star_update", label: "Star Update" },
    { id: "points", label: "Points" },
    { id: "training", label: "Training" },
    { id: "shop_category", label: "Shop Category" },
    { id: "shop_product", label: "Shop Product" },
    { id: "shop_order", label: "Shop Order" },
    { id: "log_report", label: "Log Report" },
    { id: "renewal_report", label: "Renewal Report" },
    { id: "chapter_report", label: "Chapter Report" },
    { id: "report_121", label: "121's Report" },
    { id: "report_referral", label: "Referral's Report" },
    { id: "report_visitor", label: "Visitor's Report" },
    { id: "report_chief_guest", label: "Chief Guest's Report" },
    { id: "thank_you_slip", label: "Thank you Slip" },
    { id: "power_date", label: "Power Date" },
    { id: "testimonials", label: "Testimonials" },
    { id: "chief_guest_list", label: "Chief Guest List" },
    { id: "locations", label: "Locations" },
  ];

  const actions = [
    { id: "view", label: "View" },
    { id: "add", label: "Add" },
    { id: "edit", label: "Edit" },
    { id: "delete", label: "Delete" },
  ];

  useEffect(() => {
    if (isEditMode) {
      setFormData({
        roleName: "Chapter Admin",
        permissions: ["dashboard_view", "chapters_view", "chapters_edit"],
      });
    }
  }, [isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (selectedOption, { name }) => {
    setFormData((prev) => ({
      ...prev,
      [name]: selectedOption ? selectedOption.value : "Active",
    }));
  };

  const togglePermission = (featureId, actionId) => {
    const permissionKey = `${featureId}_${actionId}`;
    setFormData((prev) => {
      const hasPermission = prev.permissions.includes(permissionKey);
      let newPermissions;
      if (hasPermission) {
        newPermissions = prev.permissions.filter((p) => p !== permissionKey);
      } else {
        newPermissions = [...prev.permissions, permissionKey];
      }
      return { ...prev, permissions: newPermissions };
    });
  };

  const toggleColumn = (actionId) => {
    const allFeaturesSelected = features.every((feature) =>
      formData.permissions.includes(`${feature.id}_${actionId}`),
    );

    setFormData((prev) => {
      let newPermissions = [...prev.permissions];
      if (allFeaturesSelected) {
        // Uncheck all for this column
        features.forEach((feature) => {
          newPermissions = newPermissions.filter(
            (p) => p !== `${feature.id}_${actionId}`,
          );
        });
      } else {
        // Check all for this column
        features.forEach((feature) => {
          const key = `${feature.id}_${actionId}`;
          if (!newPermissions.includes(key)) {
            newPermissions.push(key);
          }
        });
      }
      return { ...prev, permissions: newPermissions };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("User Role Form Submitted:", formData);
    navigate("/user-roles");
  };

  const statusOptions = [
    { value: "Active", label: "Active" },
    { value: "Inactive", label: "Inactive" },
  ];

  const getSelectedOption = (options, value) => {
    return options.find((option) => option.value === value) || options[0];
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
    singleValue: (provided) => ({
      ...provided,
      color: "#495057",
    }),
    valueContainer: (provided) => ({
      ...provided,
      paddingLeft: "16px",
    }),
  };

  return (
    <div className="card h-100 p-0 radius-12">
      <div className="card-header border-bottom bg-base py-16 px-24">
        <h6 className="text-primary-600 pb-2 mb-0">
          {isEditMode ? "Edit User Role" : "Add New User Role"}
        </h6>
      </div>
      <div className="card-body p-24">
        <form onSubmit={handleSubmit}>
          <div className="row gy-3 my-4">
            <div className="col-md-6 mb-4">
              <label className="form-label fw-semibold">
                Role Name <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control radius-8"
                name="roleName"
                value={formData.roleName}
                onChange={handleChange}
                placeholder="Enter role name (e.g., Chapter Admin)"
                required
              />
            </div>
            {/* Permissions Matrix */}
            <div className="col-12 mt-4">
              <h6 className="fw-semibold mb-3">Role Permissions</h6>
              <div className="table-responsive rounded-8 border border-neutral-200">
                <table className="table bordered-table sm-table mb-0">
                  <thead
                    className="border-bottom border-neutral-200"
                    style={{ backgroundColor: "#C4161C" }}
                  >
                    <tr>
                      <th
                        scope="col"
                        className="fw-semibold text-white px-24 py-16"
                      >
                        Feature
                      </th>
                      {actions.map((action) => (
                        <th
                          key={action.id}
                          scope="col"
                          className="fw-semibold text-white px-24 py-16"
                        >
                          <div className="d-flex align-items-center gap-2">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id={`col-${action.id}`}
                              onChange={() => toggleColumn(action.id)}
                              checked={features.every((feature) =>
                                formData.permissions.includes(
                                  `${feature.id}_${action.id}`,
                                ),
                              )}
                            />
                            <label
                              className="cursor-pointer"
                              htmlFor={`col-${action.id}`}
                            >
                              {action.label}
                            </label>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {features.map((feature, index) => (
                      <tr
                        key={feature.id}
                        className={
                          index !== features.length - 1
                            ? "border-bottom border-neutral-200"
                            : ""
                        }
                      >
                        <td className="px-24 py-12 fw-medium text-secondary-light">
                          {feature.label}
                        </td>
                        {actions.map((action) => (
                          <td key={action.id} className="px-24 py-12">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              checked={formData.permissions.includes(
                                `${feature.id}_${action.id}`,
                              )}
                              onChange={() =>
                                togglePermission(feature.id, action.id)
                              }
                            />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-end gap-2 mt-24">
            <Link
              to="/user-roles"
              className="btn btn-outline-secondary radius-8 px-20 py-11"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="btn btn-primary radius-8 px-20 py-11"
            >
              Save Role
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserRoleFormLayer;
