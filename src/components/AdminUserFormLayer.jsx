import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import AdminUserApi from "../Api/AdminUserApi";
import RoleApi from "../Api/RoleApi";
import Select from "react-select";
import { selectStyles } from "../helper/SelectStyles";

const AdminUserFormLayer = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    pin: "",
    companyName: "",
    roleId: "",
    isActive: 1,
  });

  const [roleOptions, setRoleOptions] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchRoles();
    if (isEdit) {
      getAdminUserById(id);
    }
  }, [isEdit, id]);

  const fetchRoles = async () => {
    const response = await RoleApi.getRoles(); // Assuming getRoles returns list of roles
    if (response && response.status && response.response.data) {
      const roles = response.response.data.map((role) => ({
        value: role._id,
        label: role.name,
      }));
      setRoleOptions(roles);
    }
  };

  const getAdminUserById = async (id) => {
    const response = await AdminUserApi.getAdminUser(id);
    if (response && response.status && response.response.data) {
      const data = response.response.data;
      setFormData({
        name: data.name || "",
        phoneNumber: data.phoneNumber || "",
        email: data.email || "",
        pin: "",
        companyName: data.companyName || "",
        roleId: data.roleId?._id || data.roleId || "",
        isActive: data.isActive !== undefined ? data.isActive : 1,
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "pin") {
      // Only allow numbers and max 4 digits
      const cleanedValue = value.replace(/\D/g, "").slice(0, 4);
      setFormData((prev) => ({ ...prev, [name]: cleanedValue }));
    } else if (name === "name") {
      // Allow only alphabets and spaces (no numbers)
      if (/[0-9]/.test(value)) return;
      setFormData((prev) => ({ ...prev, [name]: value }));
    } else if (name === "phoneNumber") {
      // Allow only numbers (no alphabets)
      if (/[a-zA-Z]/.test(value)) return;
      setFormData((prev) => ({ ...prev, [name]: value }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSelectChange = (selectedOption) => {
    setFormData((prev) => ({ ...prev, roleId: selectedOption?.value || "" }));
  };

  const handleStatusChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      isActive: e.target.value === "Active" ? 1 : 0,
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.phoneNumber)
      newErrors.phoneNumber = "Phone Number is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (
      (!isEdit && !formData.pin) ||
      (formData.pin && formData.pin.length !== 4)
    )
      newErrors.pin = "PIN must be exactly 4 digits";
    if (!formData.companyName)
      newErrors.companyName = "Company Name is required";
    if (!formData.roleId) newErrors.roleId = "Role is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setLoading(true);
    try {
      let response;
      if (isEdit) {
        response = await AdminUserApi.updateAdminUser({ ...formData, id });
      } else {
        response = await AdminUserApi.createAdminUser(formData);
      }

      if (response && response.status) {
        navigate("/admin-registration");
      }
    } catch (error) {
      console.error("API Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card h-100 p-0 radius-12">
      <div className="card-header bg-transparent border-bottom px-24 py-16">
        <h6 className="text-primary-600 pb-2 mb-0">
          {" "}
          {isEdit ? "Edit Admin" : "Admin Registration"}
        </h6>
      </div>
      <div className="card-body p-24">
        <form onSubmit={handleSubmit}>
          <div className="row gy-3">
            <div className="col-lg-6">
              <div className="mb-3">
                <label className="form-label fw-semibold">
                  Name <span className="text-danger-600">*</span>
                </label>
                <input
                  type="text"
                  className="form-control radius-8"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter full name"
                />
                {errors.name && (
                  <small className="text-danger">{errors.name}</small>
                )}
              </div>
            </div>

            <div className="col-lg-6">
              <div className="mb-3">
                <label className="form-label fw-semibold">
                  Email <span className="text-danger-600">*</span>
                </label>
                <input
                  type="email"
                  className="form-control radius-8"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter email address"
                />
                {errors.email && (
                  <small className="text-danger">{errors.email}</small>
                )}
              </div>
            </div>

            <div className="col-lg-6">
              <div className="mb-3">
                <label className="form-label fw-semibold">
                  Company Name <span className="text-danger-600">*</span>
                </label>
                <input
                  type="text"
                  className="form-control radius-8"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  placeholder="Enter company name"
                />
                {errors.companyName && (
                  <small className="text-danger">{errors.companyName}</small>
                )}
              </div>
            </div>

            <div className="col-lg-6">
              <div className="mb-3">
                <label className="form-label fw-semibold">
                  Phone Number <span className="text-danger-600">*</span>
                </label>
                <input
                  type="text"
                  className="form-control radius-8"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="Enter mobile number"
                  maxLength={10}
                />
                {errors.phoneNumber && (
                  <small className="text-danger">{errors.phoneNumber}</small>
                )}
              </div>
            </div>

            <div className="col-lg-4">
              <div className="mb-3">
                <label className="form-label fw-semibold">
                  PIN - Enter 4-digit Pin code{" "}
                  <span className="text-danger-600">*</span>
                </label>
                <div className="d-flex gap-2">
                  {[0, 1, 2, 3].map((index) => (
                    <input
                      key={index}
                      id={`pin-input-${index}`}
                      type="text"
                      className="form-control text-center text-lg fw-semibold p-0 radius-8"
                      style={{ width: "50px", height: "50px" }}
                      value={(formData.pin || "")[index] || ""}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (!/^\d*$/.test(val)) return;

                        const currentPin = formData.pin || "";
                        let newPinArray = currentPin.split("");
                        while (newPinArray.length < 4) newPinArray.push("");
                        newPinArray[index] = val.slice(-1);

                        const finalPin = newPinArray.join("").slice(0, 4);
                        setFormData((prev) => ({ ...prev, pin: finalPin }));

                        if (val && index < 3) {
                          setTimeout(() => {
                            const next = document.getElementById(
                              `pin-input-${index + 1}`,
                            );
                            if (next) next.focus();
                          }, 10);
                        }
                      }}
                      onKeyDown={(e) => {
                        if (
                          e.key === "Backspace" &&
                          !(formData.pin || "")[index] &&
                          index > 0
                        ) {
                          const prev = document.getElementById(
                            `pin-input-${index - 1}`,
                          );
                          if (prev) prev.focus();
                        }
                      }}
                      disabled={index > (formData.pin || "").length}
                      maxLength={1}
                      autoComplete="off"
                    />
                  ))}
                </div>
                {errors.pin && (
                  <small className="text-danger">{errors.pin}</small>
                )}
              </div>
            </div>

            <div className="col-lg-4">
              <div className="mb-3">
                <label className="form-label fw-semibold">
                  Role <span className="text-danger-600">*</span>
                </label>
                <Select
                  options={roleOptions}
                  value={roleOptions.find(
                    (opt) => opt.value === formData.roleId,
                  )}
                  onChange={handleSelectChange}
                  styles={selectStyles(!!errors.roleId)}
                  placeholder="Select Role"
                />
                {errors.roleId && (
                  <small className="text-danger">{errors.roleId}</small>
                )}
              </div>
            </div>

            <div className="col-lg-4">
              <div className="mb-3">
                <label className="form-label fw-semibold">Status</label>
                <div className="d-flex gap-3 mt-2">
                  <div
                    className="form-check"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <input
                      className="form-check-input"
                      type="radio"
                      name="isActive"
                      id="active"
                      value="Active"
                      checked={formData.isActive === 1}
                      onChange={handleStatusChange}
                    />
                    <label className="form-check-label ms-2" htmlFor="active">
                      Active
                    </label>
                  </div>
                  <div
                    className="form-check"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <input
                      className="form-check-input"
                      type="radio"
                      name="isActive"
                      id="inactive"
                      value="Inactive"
                      checked={formData.isActive === 0}
                      onChange={handleStatusChange}
                    />
                    <label className="form-check-label ms-2" htmlFor="inactive">
                      Inactive
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 d-flex justify-content-end gap-3 mt-4 pt-3">
              <Link
                to="/admin-registration"
                className="btn btn-outline-danger-600 px-32 radius-8 justify-content-center"
                style={{ width: "120px" }}
              >
                Cancel
              </Link>
              <button
                type="submit"
                className="btn btn-primary-600 px-32 radius-8 justify-content-center"
                disabled={loading}
                style={{ width: "120px" }}
              >
                {loading ? "Saving..." : isEdit ? "Update" : "Save"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminUserFormLayer;
