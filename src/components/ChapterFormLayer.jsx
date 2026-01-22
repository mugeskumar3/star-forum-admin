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
    regionalDirector: [], // Multi-select
    createdDate: new Date().toISOString().split("T")[0], // Default to current date
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
        country: "IN",
        state: "TN",
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
  };

  const handleStateChange = (selectedOption) => {
    setFormData((prev) => ({
      ...prev,
      state: selectedOption ? selectedOption.value : "",
    }));
  };

  const handleSelectChange = (selectedOption, { name }) => {
    setFormData((prev) => ({
      ...prev,
      [name]: selectedOption ? selectedOption.value : "",
    }));
  };

  const handleMultiSelectChange = (selectedOptions) => {
    const values = selectedOptions
      ? selectedOptions.map((opt) => opt.value)
      : [];
    setFormData((prev) => ({ ...prev, regionalDirector: values }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
                required
              />
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
                required
              />
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
                required
              />
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
                required
              />
            </div>

            {/* Region (Renamed from Religion) */}
            <div className="col-md-6">
              <label className="form-label fw-semibold">Region</label>
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
            </div>

            <div className="col-md-6">
              <label className="form-label fw-semibold">
                Executive Director
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
            </div>

            <div className="col-md-6">
              <label className="form-label fw-semibold">
                Regional Director
              </label>
              <Select
                name="regionalDirector"
                options={regionalDirectorOptions}
                value={regionalDirectorOptions.filter((option) =>
                  formData.regionalDirector.includes(option.value),
                )}
                onChange={handleSelectChange}
                placeholder="Select Regional Directors"
                styles={customStyles}
              />
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
              <Select
                name="weekday"
                options={weekdayOptions}
                value={weekdayOptions.find(
                  (option) => option.value === formData.weekday,
                )}
                onChange={handleSelectChange}
                placeholder="Select Weekday"
                styles={customStyles}
                required
              />
            </div>

            {/* Meeting Type (Optional) */}
            <div className="col-md-6">
              <label className="form-label fw-semibold">Meeting Type</label>
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
