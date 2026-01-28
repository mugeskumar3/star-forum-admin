import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import MeetingApi from "../Api/MeetingApi";
import ChapterApi from "../Api/ChapterApi";

const MeetingFormLayer = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    topic: "",
    meetingFee: "",
    visitorFee: "",
    chapters: [],
    hotelName: "",
    startDate: "",
    endDate: "",
    latePunchTime: "",
    location: "",
  });

  const [chapterOptions, setChapterOptions] = useState([]);

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.topic) newErrors.topic = "Meeting Topic is required";
    if (!formData.meetingFee) newErrors.meetingFee = "Meeting Fee is required";
    if (!formData.visitorFee) newErrors.visitorFee = "Visitor Fee is required";
    if (!formData.chapters || formData.chapters.length === 0)
      newErrors.chapters = "At least one Chapter is required";
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

  const mapContainerStyle = {
    width: "100%",
    height: "300px",
    borderRadius: "8px",
    marginTop: "16px",
  };

  const defaultCenter = {
    lat: 13.0827,
    lng: 80.2707,
  };

  const [markerPosition, setMarkerPosition] = useState(null);
  useEffect(() => {
    fetchChapters();
    if (id) {
      fetchMeeting(id);
    }
  }, [id]);

  const fetchChapters = async () => {
    try {
      const response = await ChapterApi.getChapter();
      if (response.status && response.response.data) {
        const options = response.response.data.map((chapter) => ({
          value: chapter._id,
          label: chapter.chapterName,
        }));
        setChapterOptions(options);
      }
    } catch (error) {
      console.error("Error fetching chapters:", error);
    }
  };

  const fetchMeeting = async (id) => {
    try {
      const response = await MeetingApi.getMeeting({ id });
      if (response.status && response.response.data) {
        const meeting = response.response.data;

        // Extract IDs if chapters are objects
        const chapterIds =
          meeting.chapters && Array.isArray(meeting.chapters)
            ? meeting.chapters.map((ch) =>
                typeof ch === "object" && ch._id ? ch._id : ch,
              )
            : [];

        setFormData({
          topic: meeting.meetingTopic,
          meetingFee: meeting.meetingFee,
          visitorFee: meeting.visitorFee,
          chapters: chapterIds,
          hotelName: meeting.hotelName,
          startDate: formatDateForInput(meeting.startDateTime),
          endDate: formatDateForInput(meeting.endDateTime),
          latePunchTime: formatDateForInput(meeting.latePunchTime),
          location:
            meeting.location && meeting.location.name
              ? meeting.location.name
              : "",
        });

        if (meeting.location && meeting.location.latitude) {
          setMarkerPosition({
            lat: meeting.location.latitude,
            lng: meeting.location.longitude,
          });
        }
      }
    } catch (error) {
      console.error("Error fetching meeting:", error);
    }
  };

  const formatDateForInput = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toISOString().slice(0, 16); // Format: YYYY-MM-DDTHH:MM
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Prevent negative fees
    if ((name === "meetingFee" || name === "visitorFee") && value < 0) return;

    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSelectChange = (selectedOptions, { name }) => {
    if (name === "chapters") {
      const values = selectedOptions
        ? selectedOptions.map((opt) => opt.value)
        : [];
      setFormData({ ...formData, [name]: values });
    } else {
      setFormData({
        ...formData,
        [name]: selectedOptions ? selectedOptions.value : "",
      });
    }
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const onMapClick = (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    setMarkerPosition({ lat, lng });
    // Keep location text as is or update if you want to show coords
    // setFormData({ ...formData, location: `${lat}, ${lng}` });
    if (errors.location) setErrors((prev) => ({ ...prev, location: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      const payload = {
        meetingTopic: formData.topic,
        meetingFee: parseFloat(formData.meetingFee),
        visitorFee: parseFloat(formData.visitorFee),
        hotelName: formData.hotelName,
        chapters: formData.chapters,
        startDateTime: new Date(formData.startDate).toISOString(),
        endDateTime: new Date(formData.endDate).toISOString(),
        latePunchTime: new Date(formData.latePunchTime).toISOString(),
        location: {
          name: formData.location || "Default Location",
          latitude: markerPosition ? markerPosition.lat : 13.0827,
          longitude: markerPosition ? markerPosition.lng : 80.2707,
        },
      };

      let response;
      if (id) {
        response = await MeetingApi.updateMeeting(id, payload);
      } else {
        response = await MeetingApi.createMeeting(payload);
      }

      if (response.status) {
        navigate("/meeting-creation");
      }
    }
  };

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
                  name="chapters"
                  isMulti
                  options={chapterOptions}
                  value={chapterOptions.filter((option) =>
                    formData.chapters.includes(option.value),
                  )}
                  onChange={handleSelectChange}
                  styles={customStyles}
                  placeholder="Select chapters..."
                  isClearable={false}
                />
                {errors.chapters && (
                  <small className="text-danger">{errors.chapters}</small>
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
