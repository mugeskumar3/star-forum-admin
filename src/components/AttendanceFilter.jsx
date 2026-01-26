import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import { Country, State } from "country-state-city";

const AttendanceFilter = ({ filters, setFilters, onFilterChange }) => {
  const navigate = useNavigate();

  // Custom Styles (from ChapterFormLayer)
  const customStyles = {
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

  const zoneOptions = [
    { value: "zone1", label: "Zone 1" },
    { value: "zone2", label: "Zone 2" },
  ];
  const regionOptions = [
    { value: "region1", label: "Region 1" },
    { value: "region2", label: "Region 2" },
  ];
  const chapterOptions = [
    { value: "aram", label: "ARAM" },
    { value: "star", label: "STAR" },
    { value: "galaxy", label: "GALAXY" },
    { value: "elite", label: "ELITE" },
    { value: "titan", label: "TITAN" },
  ];
  const memberOptions = [
    { value: "rajesh", label: "Rajesh Kumar" },
    { value: "priya", label: "Priya Sharma" },
  ];
  const typeOptions = [
    { value: "training", label: "Training" },
    { value: "weekly", label: "Weekly Meeting" },
  ];
  const dateRangeOptions = [
    { value: "month", label: "Month wise" },
    { value: "custom", label: "Custom Range" },
  ];

  const monthOptions = [
    { value: 1, label: "January" },
    { value: 2, label: "February" },
    { value: 3, label: "March" },
    { value: 4, label: "April" },
    { value: 5, label: "May" },
    { value: 6, label: "June" },
    { value: 7, label: "July" },
    { value: 8, label: "August" },
    { value: 9, label: "September" },
    { value: 10, label: "October" },
    { value: 11, label: "November" },
    { value: 12, label: "December" },
  ];

  const yearOptions = [
    { value: 2024, label: "2024" },
    { value: 2025, label: "2025" },
    { value: 2026, label: "2026" },
  ];

  const countryOptions = Country.getAllCountries().map((country) => ({
    value: country.isoCode,
    label: country.name,
  }));

  const stateOptions = filters.country
    ? State.getStatesOfCountry(filters.country.value).map((state) => ({
      value: state.isoCode,
      label: state.name,
    }))
    : [];

  const onCountryChange = (selectedOption) => {
    setFilters((prev) => ({
      ...prev,
      country: selectedOption,
      state: null, // Reset state when country changes
    }));
  };

  const handleSubmit = () => {
    if (filters.member) {
      if (filters.member.value === "rajesh" || filters.member.value === "1") {
        navigate(`/member-history/1`);
      } else {
        navigate(`/member-history/${filters.member.value}`);
      }
    } else if (filters.chapter) {
      navigate(
        `/meeting-attendance/${filters.chapter.value || filters.chapter.label}`,
      );
    } else {
      navigate(`/attendance-report`);
    }
  };

  return (
    <div className="card-header border-bottom bg-base py-16 px-24">
      <div className="d-flex align-items-center justify-content-between mb-24">
        <div className="d-flex align-items-center gap-3">
          <h6 className="text-primary-600 pb-2 mb-0">Attendance List</h6>
        </div>
      </div>

      <div className="row g-3">
        <div className="col-lg-3 col-md-4 col-sm-6">
          <label className="form-label fw-semibold">Country</label>
          <Select
            options={countryOptions}
            value={filters.country}
            onChange={onCountryChange}
            placeholder="Select Country"
            styles={customStyles}
            classNamePrefix="select"
          />
        </div>
        <div className="col-lg-3 col-md-4 col-sm-6">
          <label className="form-label fw-semibold">State</label>
          <Select
            options={stateOptions}
            value={filters.state}
            onChange={(opt) => onFilterChange("state", opt)}
            placeholder="Select State"
            styles={customStyles}
            isDisabled={!filters.country}
            classNamePrefix="select"
          />
        </div>
        <div className="col-lg-3 col-md-4 col-sm-6">
          <label className="form-label fw-semibold">Zone</label>
          <Select
            options={zoneOptions}
            value={filters.zone}
            onChange={(opt) => onFilterChange("zone", opt)}
            placeholder="Select Zone"
            styles={customStyles}
            classNamePrefix="select"
          />
        </div>
        <div className="col-lg-3 col-md-4 col-sm-6">
          <label className="form-label fw-semibold">Region</label>
          <Select
            options={regionOptions}
            value={filters.region}
            onChange={(opt) => onFilterChange("region", opt)}
            placeholder="Select Region"
            styles={customStyles}
            classNamePrefix="select"
          />
        </div>
        <div className="col-lg-3 col-md-4 col-sm-6">
          <label className="form-label fw-semibold">Chapter</label>
          <Select
            options={chapterOptions}
            value={filters.chapter}
            onChange={(opt) => onFilterChange("chapter", opt)}
            placeholder="Chapter"
            styles={customStyles}
            classNamePrefix="select"
          />
        </div>
        <div className="col-lg-3 col-md-4 col-sm-6">
          <label className="form-label fw-semibold">Member</label>
          <Select
            options={memberOptions}
            value={filters.member}
            onChange={(opt) => onFilterChange("member", opt)}
            placeholder="Select Member"
            styles={customStyles}
            classNamePrefix="select"
          />
        </div>
        <div className="col-lg-3 col-md-4 col-sm-6">
          <label className="form-label fw-semibold">Type</label>
          <Select
            options={typeOptions}
            value={filters.type}
            onChange={(opt) => onFilterChange("type", opt)}
            placeholder="Select Type"
            styles={customStyles}
            classNamePrefix="select"
          />
        </div>
        <div className="col-lg-3 col-md-4 col-sm-6">
          <label className="form-label fw-semibold">Date Range</label>
          <Select
            options={dateRangeOptions}
            value={dateRangeOptions.find(
              (opt) => opt.value === filters.dateRange,
            )}
            onChange={(opt) => setFilters({ ...filters, dateRange: opt.value })}
            placeholder="Select Date Range"
            styles={customStyles}
            classNamePrefix="select"
          />
        </div>
        {filters.dateRange === "month" && (
          <>
            <div className="col-lg-3 col-md-4 col-sm-6">
              <label className="form-label fw-semibold">Month</label>
              <Select
                options={monthOptions}
                value={filters.month}
                onChange={(opt) => onFilterChange("month", opt)}
                styles={customStyles}
                classNamePrefix="select"
              />
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6">
              <label className="form-label fw-semibold">Year</label>
              <Select
                options={yearOptions}
                value={filters.year}
                onChange={(opt) => onFilterChange("year", opt)}
                styles={customStyles}
                classNamePrefix="select"
              />
            </div>
          </>
        )}
        {filters.dateRange === "custom" && (
          <>
            <div className="col-lg-3 col-md-4 col-sm-6">
              <label className="form-label fw-semibold">From Date</label>
              <input
                type="date"
                className="form-control"
                value={filters.fromDate}
                onChange={(e) =>
                  setFilters({ ...filters, fromDate: e.target.value })
                }
                style={{ minHeight: "44px" }}
              />
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6">
              <label className="form-label fw-semibold">To Date</label>
              <input
                type="date"
                className="form-control"
                value={filters.toDate}
                onChange={(e) =>
                  setFilters({ ...filters, toDate: e.target.value })
                }
                style={{ minHeight: "44px" }}
              />
            </div>
          </>
        )}

        <div
          className="col-12"
          style={{ display: "flex", justifyContent: "flex-end" }}
        >
          <button
            onClick={handleSubmit}
            className="btn btn-primary-600 radius-8 px-24 py-12"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default AttendanceFilter;
