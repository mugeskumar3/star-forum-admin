import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";

const ChapterFormLayer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const [formData, setFormData] = useState({
    chapterName: "",
    country: "",
    state: "",
    zone: "",
    region: "", // Renamed from religion
    executiveDirector: "",
    regionalDirector: [], // Multi-select
    createdDate: "",
    meetingDateTime: "",
    location: "",
    weekday: "",
    meetingType: "In Person",
  });

  // Dummy Data for Edit Mode Simulation
  useEffect(() => {
    if (isEditMode) {
      // In a real app, fetch data by ID
      setFormData({
        chapterName: "Star Chapter",
        country: "India",
        state: "Tamil Nadu",
        zone: "Zone 1",
        region: "South Region", // Renamed from religion
        executiveDirector: "John Doe",
        regionalDirector: ["Jane Smith", "Bob Wilson"],
        createdDate: "2025-01-01",
        meetingDateTime: "2025-01-01T10:00",
        location: "Chennai",
        weekday: "Monday",
        meetingType: "In Person",
      });
    }
  }, [isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleMultiSelectChange = (e) => {
    const options = e.target.options;
    const value = [];
    for (let i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    setFormData((prev) => ({ ...prev, regionalDirector: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    // Add API call here
    navigate("/chapter-creation");
  };

  return (
    <div className="card h-100 p-0 radius-12">
      <div className="card-header border-bottom bg-base py-16 px-24">
        <h6 className="text-lg fw-semibold mb-0">
          {isEditMode ? "Edit Chapter" : "Add New Chapter"}
        </h6>
      </div>
      <div className="card-body p-24">
        <form onSubmit={handleSubmit}>
          <div className="row gy-3">
            {/* Chapter Name */}
            <div className="col-md-6">
              <label className="form-label fw-semibold">
                Chapter Name <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control radius-8"
                name="chapterName"
                value={formData.chapterName}
                onChange={handleChange}
                placeholder="Enter chapter name"
                required
              />
            </div>

            {/* Country */}
            <div className="col-md-6">
              <label className="form-label fw-semibold">
                Country <span className="text-danger">*</span>
              </label>
              <select
                className="form-select radius-8"
                name="country"
                value={formData.country}
                onChange={handleChange}
                required
              >
                <option value="">Select Country</option>
                <option value="India">India</option>
                <option value="USA">USA</option>
                <option value="UK">UK</option>
              </select>
            </div>

            {/* State */}
            <div className="col-md-6">
              <label className="form-label fw-semibold">
                State <span className="text-danger">*</span>
              </label>
              <select
                className="form-select radius-8"
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
              >
                <option value="">Select State</option>
                <option value="Tamil Nadu">Tamil Nadu</option>
                <option value="Kerala">Kerala</option>
                <option value="Karnataka">Karnataka</option>
              </select>
            </div>

            {/* Zone */}
            <div className="col-md-6">
              <label className="form-label fw-semibold">
                Zone <span className="text-danger">*</span>
              </label>
              <select
                className="form-select radius-8"
                name="zone"
                value={formData.zone}
                onChange={handleChange}
                required
              >
                <option value="">Select Zone</option>
                <option value="Zone 1">Zone 1</option>
                <option value="Zone 2">Zone 2</option>
              </select>
            </div>

            {/* Region (Renamed from Religion) */}
            <div className="col-md-6">
              <label className="form-label fw-semibold">Region</label>
              <select
                className="form-select radius-8"
                name="region"
                value={formData.region}
                onChange={handleChange}
              >
                <option value="">Select Region</option>
                <option value="North Region">North Region</option>
                <option value="South Region">South Region</option>
                <option value="East Region">East Region</option>
                <option value="West Region">West Region</option>
              </select>
            </div>

            {/* Executive Director */}
            <div className="col-md-6">
              <label className="form-label fw-semibold">
                Executive Director
              </label>
              <select
                className="form-select radius-8"
                name="executiveDirector"
                value={formData.executiveDirector}
                onChange={handleChange}
              >
                <option value="">Select Executive Director</option>
                <option value="John Doe">John Doe</option>
                <option value="Jane Doe">Jane Doe</option>
              </select>
            </div>

            {/* Regional Director (Multi Select Tags) */}
            <div className="col-md-6">
              <label className="form-label fw-semibold">
                Regional Director
              </label>
              <div className="dropdown w-100">
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
                    backgroundImage: "none", // Remove default arrow to control placement
                    paddingRight: "30px", // Space for custom arrow
                    position: "relative",
                  }}
                >
                  {formData.regionalDirector.length > 0 ? (
                    formData.regionalDirector.map((director) => (
                      <span
                        key={director}
                        className="badge bg-primary-100 text-primary-600 radius-4 px-8 py-4 d-flex align-items-center gap-1 text-sm fw-medium"
                        onClick={(e) => e.stopPropagation()} // Prevent dropdown toggle when clicking badge
                      >
                        {director}
                        <Icon
                          icon="heroicons:x-mark"
                          className="text-lg cursor-pointer hover-text-danger-600"
                          onClick={() => {
                            setFormData((prev) => ({
                              ...prev,
                              regionalDirector: prev.regionalDirector.filter(
                                (item) => item !== director
                              ),
                            }));
                          }}
                        />
                      </span>
                    ))
                  ) : (
                    <span className="text-secondary-light">
                      Select Regional Directors
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
                    {["Jane Smith", "Bob Wilson", "Alice Brown"].map(
                      (option) => (
                        <div
                          key={option}
                          className="dropdown-item px-3 py-2 radius-4 cursor-pointer hover-bg-base d-flex align-items-center justify-content-between"
                          onClick={() => {
                            setFormData((prev) => {
                              const newSelection =
                                prev.regionalDirector.includes(option)
                                  ? prev.regionalDirector.filter(
                                      (item) => item !== option
                                    )
                                  : [...prev.regionalDirector, option];
                              return {
                                ...prev,
                                regionalDirector: newSelection,
                              };
                            });
                          }}
                        >
                          <span
                            className={`${
                              formData.regionalDirector.includes(option)
                                ? "text-primary-600 fw-medium"
                                : "text-secondary-light"
                            }`}
                          >
                            {option}
                          </span>
                          {formData.regionalDirector.includes(option) && (
                            <Icon
                              icon="heroicons:check"
                              className="text-primary-600 text-lg"
                            />
                          )}
                        </div>
                      )
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Created Date */}
            <div className="col-md-6">
              <label className="form-label fw-semibold">
                Chapter Created Date <span className="text-danger">*</span>
              </label>
              <input
                type="date"
                className="form-control radius-8"
                name="createdDate"
                value={formData.createdDate}
                onChange={handleChange}
                required
              />
            </div>

            {/* Meeting Date & Time */}
            <div className="col-md-6">
              <label className="form-label fw-semibold">
                Meeting Date & Time <span className="text-danger">*</span>
              </label>
              <input
                type="datetime-local"
                className="form-control radius-8"
                name="meetingDateTime"
                value={formData.meetingDateTime}
                onChange={handleChange}
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

            {/* Weekday */}
            <div className="col-md-6">
              <label className="form-label fw-semibold">
                Weekday <span className="text-danger">*</span>
              </label>
              <select
                className="form-select radius-8"
                name="weekday"
                value={formData.weekday}
                onChange={handleChange}
                required
              >
                <option value="">Select Weekday</option>
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
                <option value="Saturday">Saturday</option>
                <option value="Sunday">Sunday</option>
              </select>
            </div>

            {/* Meeting Type (Optional) */}
            <div className="col-md-6">
              <label className="form-label fw-semibold">Meeting Type</label>
              <select
                className="form-select radius-8"
                name="meetingType"
                value={formData.meetingType}
                onChange={handleChange}
              >
                <option value="In Person">In Person</option>
                <option value="Online">Online</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>
          </div>
          <div className="d-flex justify-content-end gap-2 mt-24">
            <Link
              to="/chapter-creation"
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

export default ChapterFormLayer;
