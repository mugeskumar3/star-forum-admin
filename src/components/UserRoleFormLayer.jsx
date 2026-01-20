import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Select from "react-select";

const UserRoleFormLayer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const [formData, setFormData] = useState({
    roleName: "",
    description: "",
    status: "Active",
    permissions: [],
  });

  // Dummy Permissions List
  const availableModules = [
    { id: "dashboard", label: "Dashboard" },
    { id: "chapter_management", label: "Chapter Management" },
    { id: "member_management", label: "Member Management" },
    { id: "training_module", label: "Training Module" },
    { id: "user_roles", label: "User Roles" },
    { id: "reports", label: "Reports" },
    { id: "settings", label: "Settings" },
  ];

  // Dummy Data for Edit Mode Simulation
  useEffect(() => {
    if (isEditMode) {
      setFormData({
        roleName: "Chapter Admin",
        description: "Manage specific chapter operations and members.",
        status: "Active",
        permissions: ["chapter_management", "member_management", "reports"],
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

  const handlePermissionChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prev) => {
      if (checked) {
        return { ...prev, permissions: [...prev.permissions, value] };
      } else {
        return {
          ...prev,
          permissions: prev.permissions.filter((perm) => perm !== value),
        };
      }
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
          <div className="row gy-3">
            {/* Role Name */}
            <div className="col-12">
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

            {/* Description */}
            <div className="col-12">
              <label className="form-label fw-semibold">Description</label>
              <textarea
                className="form-control radius-8"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="3"
                placeholder="Enter role description..."
              ></textarea>
            </div>

            {/* Status */}
            <div className="col-md-6">
              <label className="form-label fw-semibold">
                Status <span className="text-danger">*</span>
              </label>
              <Select
                name="status"
                options={statusOptions}
                value={getSelectedOption(statusOptions, formData.status)}
                onChange={handleSelectChange}
                styles={customStyles}
                isClearable={false}
                searchable={false}
              />
            </div>

            {/* Permissions */}
            <div className="col-12">
              <label className="form-label fw-semibold mb-3">
                Permissions (Module Access)
              </label>
              <div className="row g-3">
                {availableModules.map((module) => (
                  <div className="col-sm-6 col-md-4 col-lg-3" key={module.id}>
                    <div className="form-check d-flex align-items-center gap-2">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value={module.id}
                        id={`perm-${module.id}`}
                        checked={formData.permissions.includes(module.id)}
                        onChange={handlePermissionChange}
                      />
                      <label
                        className="form-check-label text-secondary-light fw-medium cursor-pointer"
                        htmlFor={`perm-${module.id}`}
                      >
                        {module.label}
                      </label>
                    </div>
                  </div>
                ))}
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
