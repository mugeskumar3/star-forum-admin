import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Select from "react-select";
import { selectStyles } from "../helper/SelectStyles";

const StarUpdateFormLayer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const [formData, setFormData] = useState({
    chapter: [],
    category: [],
    title: "",
    details: "",
    lastDate: "",
    location: "",
  });

  // Dummy data for edit mode
  useEffect(() => {
    if (isEditMode) {
      setFormData({
        chapter: [
          { value: "chennai", label: "Chennai" },
          { value: "madurai", label: "Madurai" },
        ],
        category: [{ value: "business", label: "Business" }],
        title: "New Business Opportunity",
        details: "Looking for business partners",
        lastDate: "2026-01-30",
        location: "Chennai",
      });
    }
  }, [isEditMode]);

  const chapterOptions = [
    { value: "chennai", label: "Chennai" },
    { value: "madurai", label: "Madurai" },
    { value: "coimbatore", label: "Coimbatore" },
    { value: "trichy", label: "Trichy" },
    { value: "salem", label: "Salem" },
  ];

  const categoryOptions = [
    { value: "business", label: "Business" },
    { value: "award", label: "Award" },
    { value: "event", label: "Event" },
    { value: "community", label: "Community" },
    { value: "recognition", label: "Recognition" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleMultiSelectChange = (selectedOptions, { name }) => {
    setFormData((prev) => ({ ...prev, [name]: selectedOptions || [] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    // Add API call here
    navigate("/star-update");
  };

  return (
    <div className="card h-100 p-0 radius-12">
      <div className="card-header border-bottom bg-base py-16 px-24">
        <h6 className="text-primary-600 pb-2 mb-0">
          {isEditMode ? "Edit Star Update" : "Add New Star Update"}
        </h6>
      </div>
      <div className="card-body p-24">
        <form onSubmit={handleSubmit}>
          <div className="row gy-3">
            {/* Chapter - Multi Select */}
            <div className="col-md-6">
              <label className="form-label fw-semibold">
                Chapter <span className="text-danger">*</span>
              </label>
              <Select
                isMulti
                name="chapter"
                options={chapterOptions}
                value={formData.chapter}
                onChange={handleMultiSelectChange}
                placeholder="Select Chapters"
                styles={selectStyles()}
                required
              />
            </div>

            {/* Category - Multi Select */}
            <div className="col-md-6">
              <label className="form-label fw-semibold">
                Category <span className="text-danger">*</span>
              </label>
              <Select
                isMulti
                name="category"
                options={categoryOptions}
                value={formData.category}
                onChange={handleMultiSelectChange}
                placeholder="Select Categories"
                styles={selectStyles()}
                required
              />
            </div>

            {/* Title */}
            <div className="col-md-6">
              <label className="form-label fw-semibold">
                Title <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control radius-8"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter title"
                required
              />
            </div>

            {/* Last Date */}
            <div className="col-md-6">
              <label className="form-label fw-semibold">
                Last Date <span className="text-danger">*</span>
              </label>
              <input
                type="date"
                className="form-control radius-8"
                name="lastDate"
                value={formData.lastDate}
                onChange={handleChange}
                required
              />
            </div>

            {/* Details */}
            <div className="col-12">
              <label className="form-label fw-semibold">
                Details <span className="text-danger">*</span>
              </label>
              <textarea
                className="form-control radius-8"
                rows="4"
                name="details"
                value={formData.details}
                onChange={handleChange}
                placeholder="Enter details"
                required
              />
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
                placeholder="Enter location"
                required
              />
            </div>
          </div>

          <div className="d-flex justify-content-end gap-2 mt-24">
            <Link
              to="/star-update"
              className="btn btn-outline-secondary radius-8 px-20 py-11 justify-content-center"
              style={{ width: "120px" }}
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="btn btn-primary radius-8 px-20 py-11 justify-content-center"
              style={{ width: "120px" }}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StarUpdateFormLayer;
