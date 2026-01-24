import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { MockDataService } from "../helper/MockDataService";
import Select from "react-select";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const MeetingFormLayer = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    topic: "",
    meetingFee: "",
    visitorFee: "",
    chapter: "",
    hotelName: "",
    startDate: "",
    endDate: "",
    latePunchTime: "",
    location: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.topic) newErrors.topic = "Meeting Topic is required";
    if (!formData.meetingFee) newErrors.meetingFee = "Meeting Fee is required";
    if (!formData.visitorFee) newErrors.visitorFee = "Visitor Fee is required";
    if (!formData.chapter) newErrors.chapter = "Chapter is required";
    if (!formData.hotelName) newErrors.hotelName = "Hotel Name is required";
    if (!formData.startDate)
      newErrors.startDate = "Start Date & Time is required";
    if (!formData.endDate) newErrors.endDate = "End Date & Time is required";
    if (!formData.latePunchTime)
      newErrors.latePunchTime = "Late Punch Time is required";
    if (!formData.location) newErrors.location = "Location is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Google Maps Configuration
  const mapContainerStyle = {
    width: "100%",
    height: "300px",
    borderRadius: "8px",
    marginTop: "16px",
  };

  const defaultCenter = {
    lat: 13.0827, // Default to Chennai
    lng: 80.2707,
  };

  const [markerPosition, setMarkerPosition] = useState(null);

  useEffect(() => {
    if (id) {
      const meeting = MockDataService.getMeetingById(id);
      if (meeting) {
        setFormData(meeting);
        if (meeting.location) {
          // Try to parse lat,lng from location string if possible, else just keep text
          // This is a simple assumption for the demo
          const parts = meeting.location.split(",");
          if (parts.length === 2) {
            const lat = parseFloat(parts[0]);
            const lng = parseFloat(parts[1]);
            if (!isNaN(lat) && !isNaN(lng)) {
              setMarkerPosition({ lat, lng });
            }
          }
        }
      }
    }
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSelectChange = (selectedOption, { name }) => {
    setFormData({
      ...formData,
      [name]: selectedOption ? selectedOption.value : "",
    });
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const onMapClick = (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    setMarkerPosition({ lat, lng });
    setFormData({ ...formData, location: `${lat}, ${lng}` });
    if (errors.location) setErrors((prev) => ({ ...prev, location: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      MockDataService.saveMeeting(formData);
      navigate("/meeting-creation");
    }
  };

  const chapterOptions = [
    { value: "ARAM", label: "ARAM" },
    { value: "Chapter Alpha", label: "Chapter Alpha" },
    { value: "Chapter Beta", label: "Chapter Beta" },
  ];

  const getSelectedOption = (options, value) => {
    return options.find((option) => option.value === value) || null;
  };

  const customStyles = {
    control: (provided) => ({
      ...provided,
      minHeight: "40px",
      borderRadius: "8px",
      borderColor: "#dee2e6",
      boxShadow: "none",
      "&:hover": {
        borderColor: "#dee2e6",
      },
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#495057",
    }),
    valueContainer: (provided) => ({
      ...provided,
      paddingLeft: "16px",
    }),
  };

  return (
    <div className="card h-100 p-0 radius-12">
      <div className="card-header border-bottom bg-base py-16 px-24 d-flex align-items-center justify-content-between">
        <h6 className="text-primary-600 pb-2 mb-0">
          {id ? "Edit Meeting" : "Meeting Creation"}
        </h6>
        <Link
          to="/meeting-creation"
          className="btn btn-outline-secondary btn-sm"
        >
          Back to List
        </Link>
      </div>

      <div className="card-body p-24">
        <form onSubmit={handleSubmit}>
          <div className="row gy-4">
            {/* Row 1: Topic, Meeting Fee, Visitor Fee */}
            <div className="col-md-6">
              <div className="mb-4">
                <label className="form-label fw-medium">
                  Meeting Topic <span className="text-danger-600">*</span>
                </label>
                <input
                  type="text"
                  name="topic"
                  className="form-control"
                  placeholder="Enter meeting topic"
                  value={formData.topic}
                  onChange={handleInputChange}
                />
                {errors.topic && (
                  <small className="text-danger">{errors.topic}</small>
                )}
              </div>
            </div>

            <div className="col-md-3">
              <div className="mb-4">
                <label className="form-label fw-medium">
                  Meeting Fee <span className="text-danger-600">*</span>
                </label>
                <input
                  type="number"
                  name="meetingFee"
                  className="form-control"
                  placeholder="Enter meeting fee"
                  value={formData.meetingFee}
                  onChange={handleInputChange}
                />
                {errors.meetingFee && (
                  <small className="text-danger">{errors.meetingFee}</small>
                )}
              </div>
            </div>

            <div className="col-md-3">
              <div className="mb-4">
                <label className="form-label fw-medium">
                  Visitor Fee <span className="text-danger-600">*</span>
                </label>
                <input
                  type="number"
                  name="visitorFee"
                  className="form-control"
                  placeholder="Enter visitor fee"
                  value={formData.visitorFee}
                  onChange={handleInputChange}
                />
                {errors.visitorFee && (
                  <small className="text-danger">{errors.visitorFee}</small>
                )}
              </div>
            </div>

            {/* Row 2: Chapter and Hotel */}
            <div className="col-md-6">
              <div className="mb-4">
                <label className="form-label fw-medium">
                  Chapter(s) <span className="text-danger-600">*</span>
                </label>
                <Select
                  name="chapter"
                  options={chapterOptions}
                  value={getSelectedOption(chapterOptions, formData.chapter)}
                  onChange={handleSelectChange}
                  styles={customStyles}
                  placeholder="Select chapter..."
                  isClearable={false}
                />
                {errors.chapter && (
                  <small className="text-danger">{errors.chapter}</small>
                )}
              </div>
            </div>

            <div className="col-md-6">
              <div className="mb-4">
                <label className="form-label fw-medium">
                  Hotel Name <span className="text-danger-600">*</span>
                </label>
                <input
                  type="text"
                  name="hotelName"
                  className="form-control"
                  placeholder="Enter hotel name"
                  value={formData.hotelName}
                  onChange={handleInputChange}
                />
                {errors.hotelName && (
                  <small className="text-danger">{errors.hotelName}</small>
                )}
              </div>
            </div>

            {/* Row 3: Date Inputs (3 in a row) */}
            <div className="col-md-4">
              <div className="mb-4">
                <label className="form-label fw-medium">
                  Start Date & Time <span className="text-danger-600">*</span>
                </label>
                <input
                  type="datetime-local"
                  name="startDate"
                  className="form-control"
                  value={formData.startDate}
                  onChange={handleInputChange}
                />
                {errors.startDate && (
                  <small className="text-danger">{errors.startDate}</small>
                )}
              </div>
            </div>

            <div className="col-md-4">
              <div className="mb-4">
                <label className="form-label fw-medium">
                  End Date & Time <span className="text-danger-600">*</span>
                </label>
                <input
                  type="datetime-local"
                  name="endDate"
                  className="form-control"
                  value={formData.endDate}
                  onChange={handleInputChange}
                />
                {errors.endDate && (
                  <small className="text-danger">{errors.endDate}</small>
                )}
              </div>
            </div>

            <div className="col-md-4">
              <div className="mb-4">
                <label className="form-label fw-medium">
                  Late Punch Time <span className="text-danger-600">*</span>
                </label>
                <input
                  type="datetime-local"
                  name="latePunchTime"
                  className="form-control"
                  value={formData.latePunchTime}
                  onChange={handleInputChange}
                />
                {errors.latePunchTime && (
                  <small className="text-danger">{errors.latePunchTime}</small>
                )}
              </div>
            </div>

            {/* Row 4: Location */}
            <div className="col-md-12">
              <div className="mb-4">
                <label className="form-label fw-medium">
                  Location <span className="text-danger-600">*</span>
                </label>
                <input
                  type="text"
                  name="location"
                  className="form-control"
                  placeholder="Click map to select location"
                  value={formData.location}
                  onChange={handleInputChange}
                />
                {errors.location && (
                  <small className="text-danger">{errors.location}</small>
                )}
              </div>
            </div>

            {/* Map Section - Full Width */}
            <div className="col-12 mt-0">
              <LoadScript
                googleMapsApiKey={
                  process.env.REACT_APP_GOOGLE_MAPS_API_KEY ||
                  "YOUR_VALID_API_KEY_HERE"
                }
              >
                <GoogleMap
                  mapContainerStyle={mapContainerStyle}
                  center={markerPosition || defaultCenter}
                  zoom={12}
                  onClick={onMapClick}
                >
                  {markerPosition && <Marker position={markerPosition} />}
                </GoogleMap>
              </LoadScript>
              <div className="form-text mt-2">
                Click on the map to automatically fill the location coordinates.
              </div>
            </div>

            <div className="col-12 mt-4 pt-4">
              <div className="d-flex justify-content-end gap-3">
                <Link
                  to="/meeting-creation"
                  className="btn btn-outline-secondary px-32"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  className="btn btn-primary px-32"
                  style={{ backgroundColor: "#C4161C", borderColor: "#C4161C" }}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MeetingFormLayer;
