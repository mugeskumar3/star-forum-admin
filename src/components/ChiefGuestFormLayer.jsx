import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";

const ChiefGuestFormLayer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const [formData, setFormData] = useState({
    chiefGuestName: "",
    contactNumber: "",
    emailId: "",
    businessName: "",
    businessCategory: "",
    location: "",
    referredBy: "",
    address: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.chiefGuestName)
      newErrors.chiefGuestName = "Chief Guest Name is required";
    if (!formData.contactNumber)
      newErrors.contactNumber = "Contact Number is required";
    if (!formData.emailId) newErrors.emailId = "Email ID is required";
    if (!formData.businessName)
      newErrors.businessName = "Business Name is required";
    if (!formData.businessCategory)
      newErrors.businessCategory = "Business Category is required";
    if (!formData.location) newErrors.location = "Location is required";
    if (!formData.referredBy) newErrors.referredBy = "Referred By is required";
    if (!formData.address) newErrors.address = "Address is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    if (isEditMode) {
      // Simulation of fetching data
      setFormData({
        chiefGuestName: "Rajesh Kumar",
        contactNumber: "9876543210",
        emailId: "rajesh@example.com",
        businessName: "Alpha Tech",
        businessCategory: "Technology",
        location: "Chennai",
        referredBy: "Suresh",
        address: "123 Main St, Chennai",
      });
    }
  }, [isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Form Submitted:", formData);
      // Add API call here
      navigate("/chief-guest-list");
    }
  };

  return (
    <div className="card h-100 p-0 radius-12">
      <div className="card-header border-bottom bg-base py-16 px-24">
        <h6 className="text-primary-600 pb-2 mb-0">
          {isEditMode ? "Edit Chief Guest" : "Add New Chief Guest"}
        </h6>
      </div>
      <div className="card-body p-24">
        <form onSubmit={handleSubmit}>
          <div className="row gy-3">
            {/* Chief Guest Name */}
            <div className="col-md-6">
              <label className="form-label fw-semibold">
                Chief Guest Name <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control radius-8"
                name="chiefGuestName"
                value={formData.chiefGuestName}
                onChange={handleChange}
                placeholder="Enter Chief Guest Name"
              />
              {errors.chiefGuestName && (
                <small className="text-danger">{errors.chiefGuestName}</small>
              )}
            </div>

            {/* Contact Number */}
            <div className="col-md-6">
              <label className="form-label fw-semibold">
                Contact Number <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control radius-8"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                placeholder="Enter Contact Number"
              />
              {errors.contactNumber && (
                <small className="text-danger">{errors.contactNumber}</small>
              )}
            </div>

            {/* Email ID */}
            <div className="col-md-6">
              <label className="form-label fw-semibold">
                Email ID <span className="text-danger">*</span>
              </label>
              <input
                type="email"
                className="form-control radius-8"
                name="emailId"
                value={formData.emailId}
                onChange={handleChange}
                placeholder="Enter Email ID"
              />
              {errors.emailId && (
                <small className="text-danger">{errors.emailId}</small>
              )}
            </div>

            {/* Business Name */}
            <div className="col-md-6">
              <label className="form-label fw-semibold">
                Business Name <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control radius-8"
                name="businessName"
                value={formData.businessName}
                onChange={handleChange}
                placeholder="Enter Business Name"
              />
              {errors.businessName && (
                <small className="text-danger">{errors.businessName}</small>
              )}
            </div>

            {/* Business Category */}
            <div className="col-md-6">
              <label className="form-label fw-semibold">
                Business Category <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control radius-8"
                name="businessCategory"
                value={formData.businessCategory}
                onChange={handleChange}
                placeholder="Enter Business Category"
              />
              {errors.businessCategory && (
                <small className="text-danger">{errors.businessCategory}</small>
              )}
            </div>

            {/* Location */}
            <div className="col-md-6">
              <label className="form-label fw-semibold">
                Location <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control radius-8"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Enter Location"
              />
              {errors.location && (
                <small className="text-danger">{errors.location}</small>
              )}
            </div>

            {/* Referred By */}
            <div className="col-md-6">
              <label className="form-label fw-semibold">
                Referred By <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control radius-8"
                name="referredBy"
                value={formData.referredBy}
                onChange={handleChange}
                placeholder="Enter Referrer Name"
              />
              {errors.referredBy && (
                <small className="text-danger">{errors.referredBy}</small>
              )}
            </div>

            {/* Address */}
            <div className="col-md-12">
              <label className="form-label fw-semibold">
                Address <span className="text-danger">*</span>
              </label>
              <textarea
                className="form-control radius-8"
                rows="4"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter Address"
              ></textarea>
              {errors.address && (
                <small className="text-danger">{errors.address}</small>
              )}
            </div>
          </div>

          <div className="d-flex justify-content-end gap-2 mt-24">
            <Link
              to="/chief-guest-list"
              className="btn btn-outline-secondary radius-8 px-20 py-11"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="btn btn-primary radius-8 px-20 py-11"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChiefGuestFormLayer;
