import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Select from "react-select";
import TrainingApi from "../Api/TrainingApi";
import ChapterApi from "../Api/ChapterApi";
import RegionApi from "../Api/RegionApi";
const TrainingFormLayer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    chapterIds: [],
    title: "",
    description: "",
    trainerIds: [],
    trainingDateTime: "",
    lastDateForApply: "",
    duration: "",
    mode: null,
    locationOrLink: "",
    maxAllowed: "",
    status: null,
  });

  const [chapterOptions, setChapterOptions] = useState([]);
  const [trainerOptions, setTrainerOptions] = useState([]);

  const modeOptions = [
    { value: "in-person", label: "In Person" },
    { value: "online", label: "Online" },
  ];

  const statusOptions = [
    { value: "upcoming", label: "Upcoming" },
    { value: "planned", label: "Planned" },
    { value: "completed", label: "Completed" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      let chapters = [];
      let trainers = [];
      try {
        const chapterRes = await ChapterApi.getChapter();
        if (chapterRes && chapterRes.status && chapterRes.response.data) {
          chapters = chapterRes.response.data.map((c) => ({
            value: c._id,
            label: c.chapterName,
          }));
          setChapterOptions(chapters);
        }

        const trainerRes = await RegionApi.getAdminUser();
        if (trainerRes && trainerRes.status && trainerRes.response.data) {
          trainers = trainerRes.response.data.map((t) => ({
            value: t._id,
            label: t.name,
          }));
          setTrainerOptions(trainers);
        }
      } catch (error) {
        console.error("Error fetching options:", error);
      }

      if (isEditMode) {
        try {
          const response = await TrainingApi.getTraining({ id });
          if (response && response.status && response.response.data) {
            const data = response.response.data;

            const mappedChapterIds = data.chapterIds
              ? data.chapterIds.map((c) => {
                  if (typeof c === "object") {
                    return { value: c._id, label: c.chapterName || c.name };
                  }
                  const match = chapters.find((opt) => opt.value === c);
                  return match || { value: c, label: "Unknown Chapter" };
                })
              : [];

            const mappedTrainerIds = data.trainerIds
              ? data.trainerIds.map((t) => {
                  if (typeof t === "object") {
                    return { value: t._id, label: t.name };
                  }
                  const match = trainers.find((opt) => opt.value === t);
                  return match || { value: t, label: "Unknown Trainer" };
                })
              : [];

            const formatDateForInput = (dateString) => {
              if (!dateString) return "";
              const date = new Date(dateString);
              const offset = date.getTimezoneOffset();
              const adjustedDate = new Date(date.getTime() - offset * 60000);
              return adjustedDate.toISOString().slice(0, 16);
            };

            setFormData({
              chapterIds: mappedChapterIds,
              title: data.title || "",
              description: data.description || "",
              trainerIds: mappedTrainerIds,
              trainingDateTime: formatDateForInput(data.trainingDateTime),
              lastDateForApply: formatDateForInput(data.lastDateForApply),
              duration: data.duration || "",
              mode: data.mode
                ? modeOptions.find(
                    (opt) => opt.value === data.mode.toLowerCase(),
                  ) || { value: data.mode, label: data.mode }
                : null,
              locationOrLink: data.locationOrLink || "",
              maxAllowed: data.maxAllowed || "",
              status: data.status
                ? statusOptions.find(
                    (opt) => opt.value === data.status.toLowerCase(),
                  ) || { value: data.status, label: data.status }
                : null,
            });
          }
        } catch (error) {
          console.error("Error fetching training details:", error);
        }
      }
    };

    fetchData();
  }, [isEditMode, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if ((name === "duration" || name === "maxAllowed") && value < 0) return;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSelectChange = (selectedOption, actionMeta) => {
    setFormData((prev) => ({ ...prev, [actionMeta.name]: selectedOption }));
    if (errors[actionMeta.name]) {
      setErrors((prev) => ({ ...prev, [actionMeta.name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.chapterIds || formData.chapterIds.length === 0) {
      newErrors.chapterIds = "Please select at least one chapter.";
    }
    if (!formData.title.trim()) {
      newErrors.title = "Training title is required.";
    }
    if (!formData.trainerIds || formData.trainerIds.length === 0) {
      newErrors.trainerIds = "Please select at least one trainer.";
    }
    if (!formData.duration) {
      newErrors.duration = "Duration is required.";
    }
    if (!formData.trainingDateTime) {
      newErrors.trainingDateTime = "Training date & time is required.";
    }
    if (!formData.lastDateForApply) {
      newErrors.lastDateForApply = "Last date for apply is required.";
    }
    if (!formData.mode) {
      newErrors.mode = "Please select a mode.";
    }
    if (!formData.locationOrLink.trim()) {
      newErrors.locationOrLink = "Location/Link is required.";
    }
    if (!formData.status) {
      newErrors.status = "Status is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    const payload = {
      chapterIds: formData.chapterIds.map((c) => c.value),
      title: formData.title,
      description: formData.description,
      trainerIds: formData.trainerIds.map((t) => t.value),
      trainingDateTime: new Date(formData.trainingDateTime).toISOString(),
      lastDateForApply: new Date(formData.lastDateForApply).toISOString(),
      duration: Number(formData.duration),
      mode: formData.mode.value,
      locationOrLink: formData.locationOrLink,
      maxAllowed: Number(formData.maxAllowed) || 0,
      status: formData.status.value,
    };

    try {
      let response;
      if (isEditMode) {
        response = await TrainingApi.updateTraining({ ...payload, id });
      } else {
        response = await TrainingApi.createTraining(payload);
      }

      if (response && response.status) {
        navigate("/training-list");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  };

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
      backgroundColor: "#eef2ff",
      borderRadius: "4px",
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: "#4f46e5",
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
            <div className="col-md-6">
              <label className="form-label fw-semibold">
                Chapter <span className="text-danger">*</span>
              </label>
              <Select
                isMulti
                name="chapterIds"
                options={chapterOptions}
                value={formData.chapterIds}
                onChange={handleSelectChange}
                styles={customStyles}
                placeholder="Select Chapters..."
              />
              {errors.chapterIds && (
                <small className="text-danger">{errors.chapterIds}</small>
              )}
            </div>

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
              />
              {errors.title && (
                <small className="text-danger">{errors.title}</small>
              )}
            </div>

            <div className="col-md-6">
              <label className="form-label fw-semibold">
                Trainer Name <span className="text-danger">*</span>
              </label>
              <Select
                isMulti
                name="trainerIds"
                options={trainerOptions}
                value={formData.trainerIds}
                onChange={handleSelectChange}
                styles={customStyles}
                placeholder="Select Trainers..."
              />
              {errors.trainerIds && (
                <small className="text-danger">{errors.trainerIds}</small>
              )}
            </div>

            <div className="col-md-6">
              <label className="form-label fw-semibold">
                Duration (Hours) <span className="text-danger">*</span>
              </label>
              <input
                type="number"
                className="form-control radius-8"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                onWheel={(e) => e.target.blur()}
                min="0"
                placeholder="e.g. 4"
              />
              {errors.duration && (
                <small className="text-danger">{errors.duration}</small>
              )}
            </div>

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
              />
              {errors.trainingDateTime && (
                <small className="text-danger">{errors.trainingDateTime}</small>
              )}
            </div>

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
              />
              {errors.lastDateForApply && (
                <small className="text-danger">{errors.lastDateForApply}</small>
              )}
            </div>

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
              {errors.mode && (
                <small className="text-danger">{errors.mode}</small>
              )}
            </div>

            <div className="col-md-6">
              <label className="form-label fw-semibold">
                Location / Meeting Link <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control radius-8"
                name="locationOrLink"
                value={formData.locationOrLink}
                onChange={handleChange}
                placeholder="Enter Location or Link"
              />
              {errors.locationOrLink && (
                <small className="text-danger">{errors.locationOrLink}</small>
              )}
            </div>

            <div className="col-md-6">
              <label className="form-label fw-semibold">Max Allowed</label>
              <input
                type="number"
                className="form-control radius-8"
                name="maxAllowed"
                value={formData.maxAllowed}
                onChange={handleChange}
                onWheel={(e) => e.target.blur()}
                min="0"
                placeholder="Enter Max Participants"
              />
            </div>

            <div className="col-md-6">
              <label className="form-label fw-semibold">
                Status <span className="text-danger">*</span>
              </label>
              <Select
                name="status"
                options={statusOptions}
                value={formData.status}
                onChange={handleSelectChange}
                styles={customStyles}
                placeholder="Select Status"
              />
              {errors.status && (
                <small className="text-danger">{errors.status}</small>
              )}
            </div>

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
              style={{ minWidth: "120px" }}
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="btn btn-primary radius-8 px-20 py-11"
              disabled={loading}
              style={{ minWidth: "120px" }}
            >
              {loading ? "Saving..." : "Save Training"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TrainingFormLayer;
