import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Select from "react-select";
// import { Icon } from "@iconify/react/dist/iconify.js"; // Not strictly needed if cleaner UI uses text labels or standard icons

const TrainingFormLayer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const [formData, setFormData] = useState({
    chapters: [],
    title: "",
    description: "",
    trainers: [],
    trainingDateTime: "",
    lastDateForApply: "",
    duration: "",
    mode: null,
    location: "",
    maxAllowed: "",
    status: null,
    trainingFee: "",
    spotFee: "",
  });

  // Options for Selects
  const chapterOptions = [
    { value: "Star Chapter", label: "Star Chapter" },
    { value: "Global Chapter", label: "Global Chapter" },
    { value: "Elite Chapter", label: "Elite Chapter" },
    { value: "Sunrise Chapter", label: "Sunrise Chapter" },
  ];

  const trainerOptions = [
    { value: "Rajesh Kumar", label: "Rajesh Kumar (Admin)" },
    { value: "Priya Sharma", label: "Priya Sharma (Admin)" },
    { value: "Amit Singh", label: "Amit Singh (Admin)" },
    { value: "Suresh Raina", label: "Suresh Raina (Admin)" },
  ];

  const modeOptions = [
    { value: "In Person", label: "In Person" },
    { value: "Online", label: "Online" },
  ];

  const statusOptions = [
    { value: "Upcoming", label: "Upcoming" },
    { value: "Planned", label: "Planned" },
    { value: "Completed", label: "Completed" },
  ];

  useEffect(() => {
    if (isEditMode) {
      // Simulate fetching data
      setFormData({
        chapters: [chapterOptions[0], chapterOptions[1]],
        title: "Advanced Leadership Workshop",
        description:
          "A comprehensive workshop on modern leadership strategies.",
        trainers: [trainerOptions[0]],
        trainingDateTime: "2025-01-15T10:00",
        lastDateForApply: "2025-01-10T23:59",
        duration: "4 Hours",
        mode: modeOptions[0],
        location: "Conference Hall A",
        maxAllowed: "50",
        status: statusOptions[1], // Planned
        trainingFee: "500",
        spotFee: "700",
      });
    }
  }, [isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (selectedOption, actionMeta) => {
    setFormData((prev) => ({ ...prev, [actionMeta.name]: selectedOption }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Training Form Submitted:", formData);
    navigate("/training-list");
  };

  // Custom Styles for React Select
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      borderRadius: "8px",
      borderColor: "#dee2e6",
      padding: "2px",
      boxShadow: "none",
      "&:hover": {
        borderColor: "#dee2e6",
      },
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#6c757d",
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: "#eef2ff", // bg-primary-50 equivalent
      borderRadius: "4px",
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: "#4f46e5", // text-primary-600 equivalent
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: "#4f46e5",
      ":hover": {
        backgroundColor: "#e0e7ff",
        color: "#4338ca",
      },
    }),
  };

  return (
    <div className="card h-100 p-0 radius-12">
      <div className="card-header border-bottom bg-base py-16 px-24">
        <h6 className="text-primary-600 pb-2 mb-0">
          {isEditMode ? "Edit Training Session" : "Add New Training Session"}
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
                name="chapters"
                options={chapterOptions}
                value={formData.chapters}
                onChange={handleSelectChange}
                styles={customStyles}
                placeholder="Select Chapters..."
                required={!isEditMode} // Basic required validation logic
              />
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
                placeholder="Enter Training Title"
                required
              />
            </div>

            {/* Trainer Name - Multi Select */}
            <div className="col-md-6">
              <label className="form-label fw-semibold">
                Trainer Name <span className="text-danger">*</span>
              </label>
              <Select
                isMulti
                name="trainers"
                options={trainerOptions}
                value={formData.trainers}
                onChange={handleSelectChange}
                styles={customStyles}
                placeholder="Select Trainers..."
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

            {/* Training Date & Time */}
            <div className="col-md-6">
              <label className="form-label fw-semibold">
                Training Date & Time <span className="text-danger">*</span>
              </label>
              <input
                type="datetime-local"
                className="form-control radius-8"
                name="trainingDateTime"
                value={formData.trainingDateTime}
                onChange={handleChange}
                required
              />
            </div>

            {/* Last Date For Apply */}
            <div className="col-md-6">
              <label className="form-label fw-semibold">
                Last Date For Apply <span className="text-danger">*</span>
              </label>
              <input
                type="datetime-local"
                className="form-control radius-8"
                name="lastDateForApply"
                value={formData.lastDateForApply}
                onChange={handleChange}
                required
              />
            </div>

            {/* Mode */}
            <div className="col-md-6">
              <label className="form-label fw-semibold">
                Mode <span className="text-danger">*</span>
              </label>
              <Select
                name="mode"
                options={modeOptions}
                value={formData.mode}
                onChange={handleSelectChange}
                styles={customStyles}
                placeholder="Select Mode"
              />
            </div>

            {/* Location / Meeting Link */}
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
                placeholder="Enter Location or Link"
                required
              />
            </div>

            {/* Max Allowed */}
            <div className="col-md-6">
              <label className="form-label fw-semibold">Max Allowed</label>
              <input
                type="number"
                className="form-control radius-8"
                name="maxAllowed"
                value={formData.maxAllowed}
                onChange={handleChange}
                placeholder="Enter Max Participants"
              />
            </div>

            {/* Status */}
            <div className="col-md-6">
              <label className="form-label fw-semibold">Status</label>
              <Select
                name="status"
                options={statusOptions}
                value={formData.status}
                onChange={handleSelectChange}
                styles={customStyles}
                placeholder="Select Status"
              />
            </div>

            {/* Training Registration Fee */}
            <div className="col-md-6">
              <label className="form-label fw-semibold">
                Training Registration Fee
              </label>
              <div className="input-group">
                <span className="input-group-text bg-base">₹</span>
                <input
                  type="number"
                  className="form-control radius-8"
                  name="trainingFee"
                  value={formData.trainingFee}
                  onChange={handleChange}
                  placeholder="0.00"
                />
              </div>
            </div>

            {/* Spot Registration Fee */}
            <div className="col-md-6">
              <label className="form-label fw-semibold">
                Spot Registration Fee
              </label>
              <div className="input-group">
                <span className="input-group-text bg-base">₹</span>
                <input
                  type="number"
                  className="form-control radius-8"
                  name="spotFee"
                  value={formData.spotFee}
                  onChange={handleChange}
                  placeholder="0.00"
                />
              </div>
            </div>

            {/* Training Description */}
            <div className="col-12">
              <label className="form-label fw-semibold">
                Training Description
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
