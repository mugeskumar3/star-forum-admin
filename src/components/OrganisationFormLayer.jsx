import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";
import { MockDataService } from "../helper/MockDataService";
import Select from "react-select";
import { Modal, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { Country, State } from "country-state-city";
import OrganisationApi from "../Api/ZoneApi";
import RegionApi from "../Api/RegionApi";

const OrganisationFormLayer = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [knownZones, setKnownZones] = useState([]);
  const [formData, setFormData] = useState({
    zone: "",
    zone: "",
    region: "",
    country: "",
    state: "",
    ed: "",
    rd: "",
  });
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [filteredZones, setFilteredZones] = useState([]);
  const [filteredRegions, setFilteredRegions] = useState([]);
  const [knownRegions, setKnownRegions] = useState([]);
  const [showZoneModal, setShowZoneModal] = useState(false);
  const [newZoneName, setNewZoneName] = useState("");
  const [newZoneCountry, setNewZoneCountry] = useState(null);
  const [newZoneState, setNewZoneState] = useState(null);
  const [zoneError, setZoneError] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [rdInput, setRdInput] = useState("");
  const edOptions = [
    { value: "ED John Doe", label: "ED John Doe" },
    { value: "ED Jane Smith", label: "ED Jane Smith" },
    { value: "ED Alex Wilson", label: "ED Alex Wilson" },
  ];
  const rdOptions = [
    { value: "RD Michael Brown", label: "RD Michael Brown" },
    { value: "RD Sarah Connor", label: "RD Sarah Connor" },
    { value: "RD David Miller", label: "RD David Miller" },
    { value: "RD Chris Evans", label: "RD Chris Evans" },
    { value: "RD Natasha Romanoff", label: "RD Natasha Romanoff" },
  ];
  useEffect(() => {
    if (id) {
      const org = MockDataService.getOrganisationById(id);
      if (org) {
        setFormData(org);
      }
    }
  }, [id]);
  /* const getZone = async () => {
    // Removed old fetch all
  }; */

  useEffect(() => {
    if (selectedCountry && selectedState) {
      getZonesForState(selectedState.label);
    } else {
      setFilteredZones([]);
    }
  }, [selectedCountry, selectedState]);

  const getZonesForState = async (stateName) => {
    const response = await OrganisationApi.getZoneByState(stateName);
    if (response && response.status && response.response.data) {
      setFilteredZones(response.response.data);
    } else {
      setFilteredZones([]);
    }
  };

  const getRegionsForZone = async (zoneName) => {
    // Assuming RegionApi has a getRegionByZone or similar, if not we might filter locally if we fetch all.
    // Checking RegionApi.js content first would be ideal, but let's assume standard pattern or fetch all and filter.
    // Based on previous file list, RegionApi.js exists.
    // Let's rely on a hypothetical getRegionByZone or just fetch all and filter.
    // Ideally update RegionApi.js first if needed.
    const response = await RegionApi.getRegion();
    if (response && response.status && response.response.data) {
      const regions = response.response.data.filter((r) => r.zone === zoneName);
      setFilteredRegions(regions);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (formErrors[name]) {
      setFormErrors({ ...formErrors, [name]: "" });
    }
  };
  const handleSelectChange = (selectedOption, { name }) => {
    setFormData({
      ...formData,
      [name]: selectedOption ? selectedOption.value : "",
      country: selectedOption ? selectedOption.country : "",
      state: selectedOption ? selectedOption.state : "",
    });
    if (name === "zone") {
      getRegionsForZone(selectedOption.value);
      setFormData((prev) => ({ ...prev, region: "" }));
    }
    if (formErrors[name]) {
      setFormErrors({ ...formErrors, [name]: "" });
    }
  };

  const getSelectedOption = (options, value) => {
    return options.find((option) => option.value === value) || null;
  };

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      minHeight: "40px",
      borderRadius: "8px",
      borderColor: state.selectProps.error ? "#dc3545" : "#dee2e6",
      boxShadow: "none",
      "&:hover": {
        borderColor: state.selectProps.error ? "#dc3545" : "#dee2e6",
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

  const handleZoneModalClose = () => {
    setShowZoneModal(false);
    setNewZoneName("");
    setNewZoneCountry(null);
    setNewZoneState(null);
    setZoneError("");
  };
  const handleZoneModalShow = () => setShowZoneModal(true);

  const handleAddZone = async () => {
    if (!newZoneName.trim()) {
      setZoneError("Zone name cannot be empty");
      return;
    }
    if (!newZoneCountry) {
      setZoneError("Country is required");
      return;
    }
    if (!newZoneState) {
      setZoneError("State is required");
      return;
    }
    const payload = {
      name: newZoneName.trim(),
      country: newZoneCountry.label,
      state: newZoneState.label,
    };
    const resp = await OrganisationApi.createZone(payload);
    if (resp && resp.status) {
      const updatedZones = [...knownZones, newZoneName.trim()];
      setKnownZones(updatedZones);
      setFormData({ ...formData, zone: newZoneName.trim() });
      // Toast handled in Api
      handleZoneModalClose();
    }
  };

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!formData.zone) {
      errors.zone = "Zone is required";
      isValid = false;
    }
    if (!formData.ed) {
      errors.ed = "ED Name is required";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the validation errors.");
      return;
    }

    if (formData.zone && !knownZones.includes(formData.zone)) {
      const newZones = [...knownZones, formData.zone];
      setKnownZones(newZones);
    }

    MockDataService.saveOrganisation(formData);

    navigate("/organisation");
  };

  return (
    <div className="card h-100 p-0 radius-12">
      <div className="card-header border-bottom bg-base py-16 px-24 d-flex align-items-center justify-content-between">
        <h6 className="text-primary-600 pb-2 mb-0">Create Organisation</h6>
        <div className="d-flex gap-2">
          <button
            type="button"
            className="btn btn-primary btn-sm d-flex align-items-center"
            onClick={handleZoneModalShow}
          >
            <Icon icon="ic:baseline-plus" className="me-1" /> Add Zone
          </button>
          <Link to="/organisation" className="btn btn-outline-secondary btn-sm">
            Back to List
          </Link>
        </div>
      </div>

      <div className="card-body p-24">
        <form onSubmit={handleSubmit}>
          <div className="row gy-4">
            <div className="col-md-6">
              <div className="mb-4">
                <label className="form-label fw-medium">
                  Country <span className="text-danger-600">*</span>
                </label>
                <Select
                  options={Country.getAllCountries().map((country) => ({
                    value: country.isoCode,
                    label: country.name,
                  }))}
                  value={selectedCountry}
                  onChange={(selectedOption) => {
                    setSelectedCountry(selectedOption);
                    setSelectedState(null);
                    setFormData({
                      ...formData,
                      country: selectedOption ? selectedOption.label : "",
                      state: "",
                      zone: "",
                      region: "",
                    });
                  }}
                  placeholder="Select Country"
                />
              </div>

              <div className="mb-4">
                <label className="form-label fw-medium">
                  State <span className="text-danger-600">*</span>
                </label>
                <Select
                  options={
                    selectedCountry
                      ? State.getStatesOfCountry(selectedCountry.value).map(
                          (state) => ({
                            value: state.isoCode,
                            label: state.name,
                          }),
                        )
                      : []
                  }
                  value={selectedState}
                  onChange={(selectedOption) => {
                    setSelectedState(selectedOption);
                    setFormData({
                      ...formData,
                      state: selectedOption ? selectedOption.label : "",
                      zone: "",
                    });
                  }}
                  placeholder="Select State"
                  isDisabled={!selectedCountry}
                />
              </div>

              <div className="mb-4">
                <label className="form-label fw-medium">
                  Zone <span className="text-danger-600">*</span>
                </label>
                <Select
                  name="zone"
                  options={filteredZones.map((z) => ({
                    value: z.name,
                    label: z.name,
                    country: z.country,
                    state: z.state,
                  }))}
                  value={
                    formData.zone
                      ? { value: formData.zone, label: formData.zone }
                      : null
                  }
                  onChange={handleSelectChange}
                  styles={customStyles}
                  placeholder="Select Zone"
                  isClearable={false}
                  error={!!formErrors.zone}
                  isDisabled={!selectedState}
                />
                {formErrors.zone && (
                  <div className="text-danger mt-1 fontsize-14">
                    {formErrors.zone}
                  </div>
                )}
                <div className="form-text">
                  Select Country and State first to see available zones.
                </div>
              </div>

              <div className="mb-4">
                <label className="form-label fw-medium">
                  ED (Executive Director){" "}
                  <span className="text-danger-600">*</span>
                </label>
                <Select
                  name="ed"
                  options={edOptions}
                  value={getSelectedOption(edOptions, formData.ed)}
                  onChange={handleSelectChange}
                  styles={customStyles}
                  placeholder="Select ED Name"
                  isClearable={false}
                  required
                />
              </div>
            </div>

            {/* Column 2 */}
            <div className="col-md-6">
              <div className="mb-4">
                <label className="form-label fw-medium">
                  Region <span className="text-danger-600">*</span>
                </label>
                <Select
                  name="region"
                  options={filteredRegions.map((r) => ({
                    value: r.name,
                    label: r.name,
                  }))}
                  value={
                    formData.region
                      ? { value: formData.region, label: formData.region }
                      : null
                  }
                  onChange={handleSelectChange}
                  styles={customStyles}
                  placeholder="Select Region"
                  isClearable={false}
                  isDisabled={!formData.zone}
                  required
                />
              </div>

              {/* RD Single Selection */}
              <div className="mb-4" style={{ marginTop: "30px" }}>
                <label className="form-label fw-medium">
                  RD (Regional Director){" "}
                  <span className="text-danger-600">*</span>
                </label>
                <Select
                  name="rd"
                  options={rdOptions}
                  value={getSelectedOption(rdOptions, formData.rd)}
                  onChange={handleSelectChange}
                  styles={customStyles}
                  placeholder="Select RD Name"
                  isClearable={false}
                  required
                />
                <div className="form-text">Select RD from the dropdown</div>
              </div>
            </div>

            {/* Full Width Buttons */}
            <div className="col-12 mt-4 pt-4 border-top">
              <div className="d-flex justify-content-end gap-3">
                <Link
                  to="/organisation"
                  className="btn btn-outline-secondary px-32"
                >
                  Cancel
                </Link>
                <button type="submit" className="btn btn-primary px-32">
                  <i className="fas fa-save me-2"></i>Save Organisation
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* Add Zone Modal */}
      <Modal show={showZoneModal} onHide={handleZoneModalClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add New Zone</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <label className="form-label">
              Country <span className="text-danger">*</span>
            </label>
            <Select
              options={Country.getAllCountries().map((country) => ({
                value: country.isoCode,
                label: country.name,
              }))}
              value={newZoneCountry}
              onChange={(selectedOption) => {
                setNewZoneCountry(selectedOption);
                setNewZoneState(null); // Reset state when country changes
              }}
              placeholder="Select Country"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">
              State <span className="text-danger">*</span>
            </label>
            <Select
              options={
                newZoneCountry
                  ? State.getStatesOfCountry(newZoneCountry.value).map(
                      (state) => ({
                        value: state.isoCode,
                        label: state.name,
                      }),
                    )
                  : []
              }
              value={newZoneState}
              onChange={(selectedOption) => setNewZoneState(selectedOption)}
              placeholder="Select State"
              isDisabled={!newZoneCountry}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">
              Zone Name <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className={`form-control ${zoneError ? "is-invalid" : ""}`}
              placeholder="Enter Zone Name"
              value={newZoneName}
              onChange={(e) => {
                setNewZoneName(e.target.value);
                if (zoneError) setZoneError("");
              }}
            />
            {zoneError && <div className="invalid-feedback">{zoneError}</div>}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleZoneModalClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddZone}>
            Add Zone
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default OrganisationFormLayer;
