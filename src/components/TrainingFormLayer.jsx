import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";

const TrainingFormLayer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;
  const dropdownRef = useRef(null);

  const [formData, setFormData] = useState({
    chapter: [], // Multi-select array
    isMultiSelectOpen: false, // UI state for dropdown
    title: "",
    module: "",
    trainer: "",
    fromDateTime: "",
    toDateTime: "",
    duration: "",
    mode: "In Person",
    location: "",
    capacity: "",
    description: "",
    status: "Draft",
  });

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setFormData((prev) => ({ ...prev, isMultiSelectOpen: false }));
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Dummy Data for Edit Mode Simulation
  useEffect(() => {
    if (isEditMode) {
      setFormData({
        chapter: ["Star Chapter", "Global Chapter"],
        title: "Advanced Leadership Workshop",
        module: "Leadership",
        trainer: "John Doe",
        fromDateTime: "2025-01-15T10:00",
        toDateTime: "2025-01-15T14:00",
        duration: "4 Hours",
        mode: "In Person",
        location: "Conference Hall A",
        capacity: "50",
        description:
          "A comprehensive workshop on modern leadership strategies.",
        status: "Active",
      });
    }
  }, [isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Training Form Submitted:", formData);
    navigate("/training-list");
  };

  return (
    <div className="card h-100 p-0 radius-12">
      <div className="card-header border-bottom bg-base py-16 px-24">
        <h6 className="text-lg fw-semibold mb-0">
          {isEditMode ? "Edit Training Session" : "Add New Training Session"}
        </h6>
      </div>
      <div className="card-body p-24">
        <form onSubmit={handleSubmit}>
          <div className="row gy-3">
            {/* Chapter Selection (Multi-Select) */}
            <div className="col-md-6">
              <label className="form-label fw-semibold">
                Chapter <span className="text-danger">*</span>
              </label>
              <div className="dropdown w-100" ref={dropdownRef}>
                <div
                  className="form-select radius-8 d-flex flex-wrap align-items-center gap-2"
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      isMultiSelectOpen: !prev.isMultiSelectOpen,
                    }))
                  }
                  style={{
                    minHeight: "44px",
                    height: "auto",
                    cursor: "pointer",
                    backgroundImage: "none",
                    paddingRight: "30px",
                    position: "relative",
                  }}
                >
                  {formData.chapter.length > 0 ? (
                    formData.chapter.map((item) => (
                      <span
                        key={item}
                        className="badge bg-primary-100 text-primary-600 radius-4 px-8 py-4 d-flex align-items-center gap-1 text-sm fw-medium"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {item}
                        <Icon
                          icon="heroicons:x-mark"
                          className="text-lg cursor-pointer hover-text-danger-600"
                          onClick={() => {
                            setFormData((prev) => ({
                              ...prev,
                              chapter: prev.chapter.filter((c) => c !== item),
                            }));
                          }}
                        />
                      </span>
                    ))
                  ) : (
                    <span className="text-secondary-light">
                      Select Chapters
                    </span>
                  )}
                  <Icon
                    icon="lucide:chevron-down"
                    className="text-xl position-absolute end-0 me-2 text-secondary-light"
                    style={{ top: "50%", transform: "translateY(-50%)" }}
                  />
                </div>
                {formData.isMultiSelectOpen && (
                  <div
                    className="dropdown-menu show w-100 p-2 shadow-sm border-0"
                    style={{
                      position: "absolute",
                      top: "100%",
                      left: 0,
                      zIndex: 1000,
                      maxHeight: "200px",
                      overflowY: "auto",
                    }}
                  >
                    {[
                      "Star Chapter",
                      "Global Chapter",
                      "Elite Chapter",
                      "Sunrise Chapter",
                    ].map((option) => (
                      <div
                        key={option}
                        className="dropdown-item px-3 py-2 radius-4 cursor-pointer hover-bg-base d-flex align-items-center justify-content-between"
                        onClick={() => {
                          setFormData((prev) => {
                            const newSelection = prev.chapter.includes(option)
                              ? prev.chapter.filter((item) => item !== option)
                              : [...prev.chapter, option];
                            return {
                              ...prev,
                              chapter: newSelection,
                            };
                          });
                        }}
                      >
                        <span
                          className={`${
                            formData.chapter.includes(option)
                              ? "text-primary-600 fw-medium"
                              : "text-secondary-light"
                          }`}
                        >
                          {option}
                        </span>
                        {formData.chapter.includes(option) && (
                          <Icon
                            icon="heroicons:check"
                            className="text-primary-600 text-lg"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Training Title */}
            <div className="col-md-6">
              <label className="form-label fw-semibold">
                Training Title <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control radius-8"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter training title"
                required
              />
            </div>

            {/* Module / Topic */}
            <div className="col-md-6">
              <label className="form-label fw-semibold">
                Module / Topic <span className="text-danger">*</span>
              </label>
              <select
                className="form-select radius-8"
                name="module"
                value={formData.module}
                onChange={handleChange}
                required
              >
                <option value="">Select Module</option>
                <option value="Leadership">Leadership</option>
                <option value="Sales">Sales</option>
                <option value="Marketing">Marketing</option>
                <option value="Finance">Finance</option>
                <option value="Operations">Operations</option>
                <option value="HR">HR</option>
              </select>
            </div>

            {/* Trainer Name */}
            <div className="col-md-6">
              <label className="form-label fw-semibold">
                Trainer Name <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control radius-8"
                name="trainer"
                value={formData.trainer}
                onChange={handleChange}
                placeholder="Enter trainer name"
                required
              />
            </div>

            {/* From Date & Time */}
            <div className="col-md-6">
              <label className="form-label fw-semibold">
                From Date & Time <span className="text-danger">*</span>
              </label>
              <input
                type="datetime-local"
                className="form-control radius-8"
                name="fromDateTime"
                value={formData.fromDateTime}
                onChange={handleChange}
                required
              />
            </div>

            {/* To Date & Time */}
            <div className="col-md-6">
              <label className="form-label fw-semibold">
                To Date & Time <span className="text-danger">*</span>
              </label>
              <input
                type="datetime-local"
                className="form-control radius-8"
                name="toDateTime"
                value={formData.toDateTime}
                onChange={handleChange}
                required
              />
            </div>

            {/* Duration */}
            <div className="col-md-6">
              <label className="form-label fw-semibold">
                Duration <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control radius-8"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                placeholder="e.g. 2 Hours"
                required
              />
            </div>

            {/* Mode */}
            <div className="col-md-6">
              <label className="form-label fw-semibold">
                Mode <span className="text-danger">*</span>
              </label>
              <select
                className="form-select radius-8"
                name="mode"
                value={formData.mode}
                onChange={handleChange}
                required
              >
                <option value="In Person">In Person</option>
                <option value="Online">Online</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>

            {/* Location / Link */}
            <div className="col-md-6">
              <label className="form-label fw-semibold">
                Location / Meeting Link <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control radius-8"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Enter venue or zoom link"
                required
              />
            </div>

            {/* Capacity */}
            <div className="col-md-6">
              <label className="form-label fw-semibold">Max Capacity</label>
              <input
                type="number"
                className="form-control radius-8"
                name="capacity"
                value={formData.capacity}
                onChange={handleChange}
                placeholder="Enter max participants"
              />
            </div>

            {/* Status */}
            <div className="col-md-6">
              <label className="form-label fw-semibold">Status</label>
              <select
                className="form-select radius-8"
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="Draft">Draft</option>
                <option value="Active">Active / Published</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>

            {/* Description */}
            <div className="col-12">
              <label className="form-label fw-semibold">
                Description / Agenda
              </label>
              <textarea
                className="form-control radius-8"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                placeholder="Enter training details..."
              ></textarea>
            </div>
          </div>
          <div className="d-flex justify-content-end gap-2 mt-24">
            <Link
              to="/training-list"
              className="btn btn-outline-secondary radius-8 px-20 py-11"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="btn btn-primary radius-8 px-20 py-11"
            >
              Save Training
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TrainingFormLayer;
