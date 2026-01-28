import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Select from "react-select";
import AsyncSelect from "react-select/async";
import BadgeApi from "../Api/BadgeApi";
import ChapterApi from "../Api/ChapterApi";
import MemberApi from "../Api/MemberApi";

const BadgeAssignLayer = () => {
  const navigate = useNavigate();
  const [assignType, setAssignType] = useState({
    value: "Chapter",
    label: "Chapter",
  });
  const [selectedAssignTo, setSelectedAssignTo] = useState(null);
  const [selectedBadge, setSelectedBadge] = useState(null);

  // Options state
  const [badgeOptions, setBadgeOptions] = useState([]);
  const [assignTypeOptions] = useState([
    { value: "Chapter", label: "Chapter" },
    { value: "Member", label: "Member" },
  ]);

  useEffect(() => {
    fetchBadges();
  }, []);

  const fetchBadges = async () => {
    try {
      // Fetch all badges (pagination might be needed if many badges, but starting with basics)
      const res = await BadgeApi.getBadge(null, 0, 100);
      if (res.status) {
        setBadgeOptions(
          res.response.data.map((b) => ({
            value: b._id,
            label: b.name,
          })),
        );
      }
    } catch (error) {
      console.error("Error fetching badges", error);
    }
  };

  const loadChapterOptions = async (inputValue) => {
    try {
      const res = await ChapterApi.getChapter({
        search: inputValue,
        limit: 10,
      });
      if (res.status) {
        return res.response.data.map((c) => ({
          value: c._id,
          label: c.chapterName,
        }));
      }
      return [];
    } catch (error) {
      console.error("Error loading chapters", error);
      return [];
    }
  };

  const loadMemberOptions = async (inputValue) => {
    try {
      const res = await MemberApi.getMembers({
        search: inputValue,
        limit: 10,
      });
      if (res.status) {
        // Response structure check - usually data inside response.data
        const members = res.response.data.members || res.response.data;
        if (Array.isArray(members)) {
          return members.map((m) => ({
            value: m._id,
            label: `${m.fullName} (${m.membershipId})`,
          }));
        }
        return [];
      }
      return [];
    } catch (error) {
      console.error("Error loading members", error);
      return [];
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedAssignTo || !selectedBadge) {
      // Add validation error display if needed
      return;
    }

    const payload = {
      assignTo: assignType.value.toUpperCase(), // "CHAPTER" or "MEMBER"
      assignToId: selectedAssignTo.value,
      badgeId: selectedBadge.value,
    };

    const res = await BadgeApi.assignBadge(payload);

    if (res.status) {
      navigate("/badge");
    }
  };

  const customStyles = {
    control: (provided) => ({
      ...provided,
      minHeight: "48px",
      borderRadius: "8px",
      borderColor: "#dee2e6",
      boxShadow: "none",
      "&:hover": { borderColor: "#dee2e6" },
    }),
    valueContainer: (provided) => ({ ...provided, paddingLeft: "16px" }),
  };

  return (
    <div className="card h-100 p-0 radius-12">
      <div className="card-header bg-transparent border-bottom">
        <h6 className="text-primary-600 pb-2 mb-0">Assign Badge</h6>
      </div>
      <div className="card-body p-24">
        <form onSubmit={handleSubmit}>
          <div className="row gy-3">
            <div className="col-12">
              <label className="form-label">
                Assign To <span className="text-danger-600">*</span>
              </label>
              <Select
                options={assignTypeOptions}
                value={assignType}
                onChange={(val) => {
                  setAssignType(val);
                  setSelectedAssignTo(null); // Reset selection on type change
                }}
                styles={customStyles}
                isClearable={false}
              />
            </div>

            {assignType.value === "Chapter" && (
              <div className="col-12">
                <label className="form-label">
                  Select Chapter <span className="text-danger-600">*</span>
                </label>
                <AsyncSelect
                  cacheOptions
                  defaultOptions
                  loadOptions={loadChapterOptions}
                  value={selectedAssignTo}
                  onChange={setSelectedAssignTo}
                  styles={customStyles}
                  placeholder="Search Chapter..."
                />
              </div>
            )}

            {assignType.value === "Member" && (
              <div className="col-12">
                <label className="form-label">
                  Select Member <span className="text-danger-600">*</span>
                </label>
                <AsyncSelect
                  cacheOptions
                  defaultOptions
                  loadOptions={loadMemberOptions}
                  value={selectedAssignTo}
                  onChange={setSelectedAssignTo}
                  styles={customStyles}
                  placeholder="Search Member..."
                />
              </div>
            )}

            <div className="col-12">
              <label className="form-label">
                Select Badge <span className="text-danger-600">*</span>
              </label>
              <Select
                options={badgeOptions}
                value={selectedBadge}
                onChange={setSelectedBadge}
                styles={customStyles}
                placeholder="Search Badge..."
                isSearchable
              />
            </div>

            <div className="col-12 d-flex justify-content-start gap-3 mt-4">
              <Link to="/badge" className="btn btn-outline-danger-600 px-32">
                Cancel
              </Link>
              <button type="submit" className="btn btn-primary-600 px-32">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BadgeAssignLayer;
