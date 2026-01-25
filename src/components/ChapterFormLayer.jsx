import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Country, State } from "country-state-city";
import Select from "react-select";

const ChapterFormLayer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const [formData, setFormData] = useState({
    chapterName: "",
    country: "IN", //  Default to India (ISO Code)
    state: "",
    zone: "",
    region: "", // Renamed from religion
    executiveDirector: "",
    regionalDirector: "", // Single select
    createdDate: new Date().toISOString().split("T")[0], // Default to current date
    meetingDateTime: "",
    location: "",
    weekday: "",
    meetingType: "In Person",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.chapterName)
      newErrors.chapterName = "Chapter Name is required";
    if (!formData.country) newErrors.country = "Country is required";
    if (!formData.state) newErrors.state = "State is required";
    if (!formData.zone) newErrors.zone = "Zone is required";
    if (!formData.createdDate)
      newErrors.createdDate = "Chapter Created Date is required";
    if (!formData.location) newErrors.location = "Location is required";
    if (!formData.weekday) newErrors.weekday = "Weekday is required";
    if (!formData.region) newErrors.region = "Region is required";
    if (!formData.executiveDirector)
      newErrors.executiveDirector = "Executive Director is required";
    if (!formData.regionalDirector)
      newErrors.regionalDirector = "Regional Director is required";
    if (!formData.meetingType)
      newErrors.meetingType = "Meeting Type is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Dummy Data for Edit Mode Simulation
  useEffect(() => {
    if (isEditMode) {
      // In a real app, fetch data by ID
      setFormData({
        chapterName: "Star Chapter",
        country: "IN",
        state: "TN",
        zone: "Zone 1",
        region: "South Region", // Renamed from religion
        executiveDirector: "John Doe",
        regionalDirector: "Jane Smith",
        createdDate: "2025-01-01",
        meetingDateTime: "2025-01-01T10:00",
        location: "Chennai",
        weekday: "Monday",
        meetingType: "In Person",
      });
    }
  }, [isEditMode]);

  const calculateMaxHeight = () => {
    // Approx 40px per option * 7 options = 280px
    return 280;
  };

  const customStyles = {
    menuList: (provided) => ({
      ...provided,
      maxHeight: calculateMaxHeight(),
    }),
    control: (provided) => ({
      ...provided,
      minHeight: "44px",
      borderRadius: "8px",
      borderColor: "#dee2e6",
      boxShadow: "none",
      "&:hover": {
        borderColor: "#dee2e6",
      },
    }),
  };

  const countryOptions = Country.getAllCountries().map((country) => ({
    value: country.isoCode,
    label: country.name,
  }));

  const stateOptions = formData.country
    ? State.getStatesOfCountry(formData.country).map((state) => ({
        value: state.isoCode,
        label: state.name,
      }))
    : [];

  /* Options */
  const zoneOptions = [
    { value: "Zone 1", label: "Zone 1" },
    { value: "Zone 2", label: "Zone 2" },
  ];

  const regionOptions = [
    { value: "North Region", label: "North Region" },
    { value: "South Region", label: "South Region" },
    { value: "East Region", label: "East Region" },
    { value: "West Region", label: "West Region" },
  ];

  const executiveDirectorOptions = [
    { value: "John Doe", label: "John Doe" },
    { value: "Jane Doe", label: "Jane Doe" },
  ];

  const regionalDirectorOptions = [
    { value: "Jane Smith", label: "Jane Smith" },
    { value: "Bob Wilson", label: "Bob Wilson" },
    { value: "Alice Brown", label: "Alice Brown" },
  ];

  const weekdayOptions = [
    { value: "Monday", label: "Monday" },
    { value: "Tuesday", label: "Tuesday" },
    { value: "Wednesday", label: "Wednesday" },
    { value: "Thursday", label: "Thursday" },
    { value: "Friday", label: "Friday" },
    { value: "Saturday", label: "Saturday" },
    { value: "Sunday", label: "Sunday" },
  ];

  const meetingTypeOptions = [
    { value: "In Person", label: "In Person" },
    { value: "Online", label: "Online" },
    { value: "Hybrid", label: "Hybrid" },
  ];

  /* Handlers */
  const handleCountryChange = (selectedOption) => {
    setFormData((prev) => ({
      ...prev,
      country: selectedOption ? selectedOption.value : "",
      state: "", // Reset state
    }));
    if (errors.country) setErrors((prev) => ({ ...prev, country: "" }));
  };

  const handleStateChange = (selectedOption) => {
    setFormData((prev) => ({
      ...prev,
      state: selectedOption ? selectedOption.value : "",
    }));
    if (errors.state) setErrors((prev) => ({ ...prev, state: "" }));
  };

  const handleSelectChange = (selectedOption, { name }) => {
    setFormData((prev) => ({
      ...prev,
      [name]: selectedOption ? selectedOption.value : "",
    }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleMultiSelectChange = (selectedOptions, { name }) => {
    const values = selectedOptions
      ? selectedOptions.map((opt) => opt.value)
      : [];
    setFormData((prev) => ({ ...prev, [name]: values }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

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
      navigate("/chapter-creation");
    }
  };

  return (
    <div className="card h-100 p-0 radius-12">
      <div className="card-header border-bottom bg-base py-16 px-24">
        <h6 className="text-primary-600 pb-2 mb-0">
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
              />
              {errors.chapterName && (
                <small className="text-danger">{errors.chapterName}</small>
              )}
            </div>

            {/* Country */}
            <div className="col-md-6">
              <label className="form-label fw-semibold">
                Country <span className="text-danger">*</span>
              </label>
              <Select
                options={countryOptions}
                value={countryOptions.find(
                  (option) => option.value === formData.country,
                )}
                onChange={handleCountryChange}
                placeholder="Select Country"
                styles={customStyles}
              />
              {errors.country && (
                <small className="text-danger">{errors.country}</small>
              )}
            </div>

            {/* State */}
            <div className="col-md-6">
              <label className="form-label fw-semibold">
                State <span className="text-danger">*</span>
              </label>
              <Select
                options={stateOptions}
                value={stateOptions.find(
                  (option) => option.value === formData.state,
                )}
                onChange={handleStateChange}
                placeholder="Select State"
                styles={customStyles}
                isDisabled={!formData.country}
              />
              {errors.state && (
                <small className="text-danger">{errors.state}</small>
              )}
            </div>

            {/* Zone */}
            <div className="col-md-6">
              <label className="form-label fw-semibold">
                Zone <span className="text-danger">*</span>
              </label>
              <Select
                name="zone"
                options={zoneOptions}
                value={zoneOptions.find(
                  (option) => option.value === formData.zone,
                )}
                onChange={handleSelectChange}
                placeholder="Select Zone"
                styles={customStyles}
              />
              {errors.zone && (
                <small className="text-danger">{errors.zone}</small>
              )}
            </div>

            {/* Region (Renamed from Religion) */}
            <div className="col-md-6">
              <label className="form-label fw-semibold">
                Region <span className="text-danger">*</span>
              </label>
              <Select
                name="region"
                options={regionOptions}
                value={regionOptions.find(
                  (option) => option.value === formData.region,
                )}
                onChange={handleSelectChange}
                placeholder="Select Region"
                styles={customStyles}
              />
              {errors.region && (
                <small className="text-danger">{errors.region}</small>
              )}
            </div>

            <div className="col-md-6">
              <label className="form-label fw-semibold">
                Executive Director <span className="text-danger">*</span>
              </label>
              <Select
                name="executiveDirector"
                options={executiveDirectorOptions}
                value={executiveDirectorOptions.find(
                  (option) => option.value === formData.executiveDirector,
                )}
                onChange={handleSelectChange}
                placeholder="Select Executive Director"
                styles={customStyles}
              />
              {errors.executiveDirector && (
                <small className="text-danger">
                  {errors.executiveDirector}
                </small>
              )}
            </div>

            <div className="col-md-6">
              <label className="form-label fw-semibold">
                Regional Director <span className="text-danger">*</span>
              </label>
              <Select
                name="regionalDirector"
                options={regionalDirectorOptions}
                value={regionalDirectorOptions.find(
                  (option) => option.value === formData.regionalDirector,
                )}
                onChange={handleSelectChange}
                placeholder="Select Regional Director"
                styles={customStyles}
              />
              {errors.regionalDirector && (
                <small className="text-danger">{errors.regionalDirector}</small>
              )}
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
              />
              {errors.createdDate && (
                <small className="text-danger">{errors.createdDate}</small>
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
                placeholder="Enter location"
              />
              {errors.location && (
                <small className="text-danger">{errors.location}</small>
              )}
            </div>

            {/* Weekday */}
            <div className="col-md-6">
              <label className="form-label fw-semibold">
                Weekday <span className="text-danger">*</span>
              </label>
              <Select
                name="weekday"
                options={weekdayOptions}
                value={weekdayOptions.find(
                  (option) => option.value === formData.weekday,
                )}
                onChange={handleSelectChange}
                placeholder="Select Weekday"
                styles={customStyles}
              />
              {errors.weekday && (
                <small className="text-danger">{errors.weekday}</small>
              )}
            </div>

            {/* Meeting Type (Optional) */}
            <div className="col-md-6">
              <label className="form-label fw-semibold">
                Meeting Type <span className="text-danger">*</span>
              </label>
              <Select
                name="meetingType"
                options={meetingTypeOptions}
                value={meetingTypeOptions.find(
                  (option) => option.value === formData.meetingType,
                )}
                onChange={handleSelectChange}
                placeholder="Select Meeting Type"
                styles={customStyles}
              />
              {errors.meetingType && (
                <small className="text-danger">{errors.meetingType}</small>
              )}
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
