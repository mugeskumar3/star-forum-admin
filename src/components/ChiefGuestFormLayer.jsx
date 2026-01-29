import React, { useState, useEffect, useMemo } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";
import ChiefGuestApi from "../Api/ChiefGuestApi";
import BusinessCategoryApi from "../Api/BusinessCategoryApi";
import MemberApi from "../Api/MemberApi";
import { Spinner } from "react-bootstrap";
import Select from "react-select";
import { selectStyles } from "../helper/SelectStyles";

const ChiefGuestFormLayer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;
  const [loading, setLoading] = useState(false);

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
  const [businessCategories, setBusinessCategories] = useState([]);
  const [members, setMembers] = useState([]);

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
    const fetchDetails = async () => {
      if (isEditMode) {
        setLoading(true);
        try {
          const response = await ChiefGuestApi.getChiefGuestDetails(id);
          if (response.status) {
            const guest = response.data.data || response.data;
            setFormData({
              chiefGuestName: guest.chiefGuestName || "",
              contactNumber: guest.contactNumber || "",
              emailId: guest.emailId || "",
              businessName: guest.businessName || "",
              businessCategory:
                guest.businessCategory?._id || guest.businessCategory || "",
              location: guest.location || "",
              referredBy: guest.referredBy?._id || guest.referredBy || "",
              address: guest.address || "",
            });
          }
        } catch (error) {
          console.error("Error fetching guest details:", error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchDetails();
  }, [isEditMode, id]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await BusinessCategoryApi.getBusinessCategory(
          null,
          0,
          500,
          "",
        );
        if (response.status) {
          const data =
            response.response?.data?.data ||
            response.response?.data ||
            response.response ||
            [];
          setBusinessCategories(Array.isArray(data) ? data : []);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await MemberApi.getMembers({ limit: 1000 });
        if (response.status) {
          const data =
            response.response?.data?.members ||
            response.response?.data?.data ||
            response.response?.data ||
            response.response ||
            [];
          setMembers(Array.isArray(data) ? data : []);
        }
      } catch (error) {
        console.error("Error fetching members:", error);
      }
    };
    fetchMembers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSelectChange = (selectedOption, name) => {
    setFormData((prev) => ({
      ...prev,
      [name]: selectedOption ? selectedOption.value : "",
    }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const categoryOptions = useMemo(
    () =>
      businessCategories.map((cat) => ({
        value: cat._id,
        label: cat.name,
      })),
    [businessCategories],
  );

  const memberOptions = useMemo(
    () =>
      members.map((member) => ({
        value: member._id,
        label: member.fullName || member.name,
      })),
    [members],
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setLoading(true);
      try {
        let response;
        if (isEditMode) {
          response = await ChiefGuestApi.updateChiefGuest(id, formData);
        } else {
          response = await ChiefGuestApi.createChiefGuest(formData);
        }

        if (response.status) {
          navigate("/chief-guest-list");
        }
      } catch (error) {
        console.error("Error submitting form:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  if (loading && isEditMode) {
    return (
      <div className="d-flex justify-content-center py-50">
        <Spinner animation="border" variant="danger" />
      </div>
    );
  }

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
              <Select
                options={categoryOptions}
                value={
                  categoryOptions.find(
                    (opt) =>
                      String(opt.value) === String(formData.businessCategory),
                  ) || null
                }
                onChange={(option) =>
                  handleSelectChange(option, "businessCategory")
                }
                placeholder="Select Business Category"
                isSearchable
                className="react-select-container"
                classNamePrefix="react-select"
                styles={selectStyles(errors.businessCategory)}
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
              <Select
                options={memberOptions}
                value={
                  memberOptions.find(
                    (opt) => String(opt.value) === String(formData.referredBy),
                  ) || null
                }
                onChange={(option) => handleSelectChange(option, "referredBy")}
                placeholder="Select Referrer Member"
                isSearchable
                className="react-select-container"
                classNamePrefix="react-select"
                styles={selectStyles(errors.referredBy)}
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
              className="btn btn-outline-secondary radius-8 px-20 py-11 justify-content-center"
              style={{ width: "120px" }}
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="btn btn-primary radius-8 px-20 py-11 justify-content-center"
              disabled={loading}
              style={{ width: "120px" }}
            >
              {loading ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    className="me-2"
                  />
                  Saving...
                </>
              ) : (
                "Save"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChiefGuestFormLayer;
