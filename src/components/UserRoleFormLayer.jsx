import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import RoleApi from "../Api/RoleApi";

const UserRoleFormLayer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const [formData, setFormData] = useState({
    roleName: "",
    roleCode: "",
  });
  const [modules, setModules] = useState([]);
  const [permissions, setPermissions] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const actions = [
    { id: "view", label: "View" },
    { id: "add", label: "Add" },
    { id: "edit", label: "Edit" },
    { id: "delete", label: "Delete" },
  ];

  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchModules();
  }, []);

  const fetchModules = async () => {
    try {
      const response = await RoleApi.getModules();
      if (response.status) {
        setModules(response.response.data || []);
        // Initialize permissions state
        const initialPermissions = {};
        (response.response.data || []).forEach((module) => {
          initialPermissions[module._id] = {
            view: false,
            add: false,
            edit: false,
            delete: false,
          };
        });

        // If not edit mode, set as initial state.
        // If edit mode, we'll merge strictly after fetching role.
        if (!isEditMode) {
          setPermissions(initialPermissions);
        }
        return initialPermissions;
      }
    } catch (error) {
      console.error("Error fetching modules:", error);
    }
  };

  useEffect(() => {
    if (isEditMode && modules.length > 0) {
      fetchRoleDetails();
    }
  }, [isEditMode, modules.length]); // Run only after modules are loaded

  const fetchRoleDetails = async () => {
    setIsLoading(true);
    try {
      const response = await RoleApi.getRole(id);
      if (response.status) {
        const role = response.response.data;
        setFormData({
          roleName: role.name,
          roleCode: role.code,
        });

        const newPermissions = {};
        modules.forEach((m) => {
          newPermissions[m._id] = {
            view: false,
            add: false,
            edit: false,
            delete: false,
          };
        });

        if (role.permissions) {
          role.permissions.forEach((perm) => {
            const modId =
              typeof perm.moduleId === "object"
                ? perm.moduleId._id
                : perm.moduleId;
            if (newPermissions[modId]) {
              newPermissions[modId] = {
                ...newPermissions[modId],
                ...perm.actions,
              };
            }
          });
        }
        setPermissions(newPermissions);
      }
    } catch (error) {
      console.error("Error fetching role details:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updatedData = { ...prev, [name]: value };
      if (name === "roleName") {
        updatedData.roleCode = value.toUpperCase().replace(/\s+/g, "_");
      }
      return updatedData;
    });
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const togglePermission = (moduleId, actionId) => {
    setPermissions((prev) => ({
      ...prev,
      [moduleId]: {
        ...prev[moduleId],
        [actionId]: !prev[moduleId]?.[actionId],
      },
    }));
  };

  const isReportModule = (moduleName) => {
    return moduleName && moduleName.toLowerCase().includes("report");
  };

  const toggleColumn = (actionId) => {
    const eligibleModules = modules.filter(
      (m) => actionId === "view" || !isReportModule(m.name),
    );

    const allSelected = eligibleModules.every(
      (module) => permissions[module._id]?.[actionId],
    );

    setPermissions((prev) => {
      const newPermissions = { ...prev };
      modules.forEach((module) => {
        if (actionId !== "view" && isReportModule(module.name)) {
          return;
        }

        if (!newPermissions[module._id]) {
          newPermissions[module._id] = {
            view: false,
            add: false,
            edit: false,
            delete: false,
          };
        }
        newPermissions[module._id] = {
          ...newPermissions[module._id],
          [actionId]: !allSelected,
        };
      });
      return newPermissions;
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.roleName.trim()) {
      newErrors.roleName = "Role Name is required";
    }
    if (!formData.roleCode.trim()) {
      newErrors.roleCode = "Role Code is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);

    const formattedPermissions = Object.entries(permissions).map(
      ([moduleId, actions]) => ({
        moduleId,
        actions,
      }),
    );

    const payload = {
      //   id: isEditMode ? id : undefined, // Some APIs might not want ID in body for create
      name: formData.roleName,
      code: formData.roleCode,
      permissions: formattedPermissions,
    };

    if (isEditMode) payload.id = id;

    try {
      let response;
      if (isEditMode) {
        response = await RoleApi.updateRole(id, payload);
      } else {
        response = await RoleApi.createRole(payload);
      }

      if (response.status) {
        navigate("/user-roles");
      }
    } catch (error) {
      console.error("Error saving role:", error);
    } finally {
      setIsLoading(false);
    }
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
                className={`form-control radius-8 ${errors.roleName ? "is-invalid" : ""}`}
                name="roleName"
                value={formData.roleName}
                onChange={handleChange}
                placeholder="Enter role name (e.g., Chapter Admin)"
              />
              {errors.roleName && (
                <div className="text-danger text-sm mt-1">
                  {errors.roleName}
                </div>
              )}
            </div>
            <div className="col-md-6 mb-4">
              <label className="form-label fw-semibold">
                Role Code <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className={`form-control radius-8 ${errors.roleCode ? "is-invalid" : ""}`}
                name="roleCode"
                value={formData.roleCode}
                onChange={handleChange}
                placeholder="Enter role code (e.g., CHAPTER_ADMIN)"
              />
              {errors.roleCode && (
                <div className="text-danger text-sm mt-1">
                  {errors.roleCode}
                </div>
              )}
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
                        Module
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
                              checked={
                                modules.length > 0 &&
                                modules
                                  .filter(
                                    (m) =>
                                      action.id === "view" ||
                                      !isReportModule(m.name),
                                  )
                                  .every(
                                    (module) =>
                                      permissions[module._id]?.[action.id],
                                  )
                              }
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
                    {modules.map((module, index) => (
                      <tr
                        key={module._id}
                        className={
                          index !== modules.length - 1
                            ? "border-bottom border-neutral-200"
                            : ""
                        }
                      >
                        <td className="px-24 py-12 fw-medium text-secondary-light">
                          {module.name}
                        </td>
                        {actions.map((action) => {
                          const isReport = isReportModule(module.name);
                          const isDisabled = action.id !== "view" && isReport;

                          return (
                            <td key={action.id} className="px-24 py-12">
                              {isDisabled ? (
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  disabled
                                  checked={false} // Force unchecked
                                />
                              ) : (
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  checked={
                                    permissions[module._id]?.[action.id] ||
                                    false
                                  }
                                  onChange={() =>
                                    togglePermission(module._id, action.id)
                                  }
                                />
                              )}
                            </td>
                          );
                        })}
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
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save Role"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserRoleFormLayer;
