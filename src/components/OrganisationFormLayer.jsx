import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";
import Select from "react-select";
import { toast } from "react-toastify";
import { Country, State } from "country-state-city";
import OrganisationApi from "../Api/OrganisationApi";
import RegionApi from "../Api/RegionApi";
import ZoneApi from "../Api/ZoneApi";

const OrganisationFormLayer = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    country: "",
    state: "",
    zone: "",
    region: "",
    ed: "",
    rd: "",
  });

  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [adminUsers, setAdminUsers] = useState([]);
  const [edOptions, setEdOptions] = useState([]);
  const [rdOptions, setRdOptions] = useState([]);
  const [formErrors, setFormErrors] = useState({});
  const [filteredZones, setFilteredZones] = useState([]);
  const [filteredRegions, setFilteredRegions] = useState([]);
  const [allRegions, setAllRegions] = useState([]);

  useEffect(() => {
    fetchAdminUsers();
    fetchRegions();
    if (id) {
      getOrganisationById(id);
    }
  }, [id]);

  useEffect(() => {
    if (formData.state) {
      fetchZones(formData.state);
    } else {
      setFilteredZones([]);
    }
  }, [formData.state]);

  useEffect(() => {
    if (formData.zone && allRegions.length > 0) {
      const regions = allRegions.filter((r) => r.zone === formData.zone);
      setFilteredRegions(regions.length > 0 ? regions : allRegions);
    } else {
      setFilteredRegions([]);
    }
  }, [formData.zone, allRegions]);

  const fetchZones = async (stateName) => {
    const response = await ZoneApi.getZoneByState(stateName);
    if (response && response.status && response.response.data) {
      setFilteredZones(response.response.data);
    }
  };

  const fetchRegions = async () => {
    const response = await RegionApi.getRegion();
    if (response && response.status && response.response.data) {
      setAllRegions(response.response.data);
    }
  };

  const fetchAdminUsers = async () => {
    const response = await RegionApi.getAdminUser();
    if (response && response.status && response.response.data) {
      const users = response.response.data;
      setAdminUsers(users);
      const options = users.map((user) => ({
        value: user.name,
        label: user.name,
      }));
      setEdOptions(options);
      setRdOptions(options);
    }
  };

  const getOrganisationById = async (id) => {
    const response = await OrganisationApi.getOrganisation(id);
    if (response && response.status && response.response.data) {
      setFormData(response.response.data);
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
    });
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the validation errors.");
      return;
    }

    if (id) {
      const payload = { ...formData, id };
      const response = await OrganisationApi.updateOrganisation(payload);
      if (response && response.status) {
        navigate("/organisation");
      }
    } else {
      const response = await OrganisationApi.createOrganisation(formData);
      if (response && response.status) {
        navigate("/organisation");
      }
    }
  };

  return (
    <div className="card h-100 p-0 radius-12">
      <div className="card-header border-bottom bg-base py-16 px-24 d-flex align-items-center justify-content-between">
        <h6 className="text-primary-600 pb-2 mb-0">Create Organisation</h6>
        <div className="d-flex gap-2">
          <Link to="/zone/add" className="btn btn-primary btn-sm">
            <Icon icon="ic:baseline-plus" className="text-xl me-1" />
            Add Zone
          </Link>
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
                    formData.country
                      ? State.getStatesOfCountry(
                          Country.getAllCountries().find(
                            (c) => c.name === formData.country,
                          )?.isoCode,
                        ).map((state) => ({
                          value: state.isoCode,
                          label: state.name,
                        }))
                      : []
                  }
                  value={
                    formData.state
                      ? { value: formData.state, label: formData.state }
                      : null
                  }
                  onChange={(selectedOption) => {
                    setFormData({
                      ...formData,
                      state: selectedOption ? selectedOption.label : "",
                      zone: "", // Reset zone when state changes
                    });
                    if (formErrors.state) {
                      setFormErrors({ ...formErrors, state: "" });
                    }
                  }}
                  placeholder="Select State"
                  isDisabled={!formData.country}
                  styles={customStyles}
                />
                {formErrors.state && (
                  <div className="text-danger mt-1 fontsize-14">
                    {formErrors.state}
                  </div>
                )}
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
                  }))}
                  value={
                    formData.zone
                      ? { value: formData.zone, label: formData.zone }
                      : null
                  }
                  onChange={(selectedOption) => {
                    handleSelectChange(selectedOption, { name: "zone" });
                    setFormData((prev) => ({
                      ...prev,
                      zone: selectedOption.value,
                      region: "",
                    }));
                  }}
                  styles={customStyles}
                  placeholder="Select Zone"
                  isClearable={false}
                  isDisabled={!formData.state}
                />
                {formErrors.zone && (
                  <div className="text-danger mt-1 fontsize-14">
                    {formErrors.zone}
                  </div>
                )}
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
                />
                {formErrors.region && (
                  <div className="text-danger mt-1 fontsize-14">
                    {formErrors.region}
                  </div>
                )}
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
    </div>
  );
};

export default OrganisationFormLayer;
