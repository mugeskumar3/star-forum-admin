import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";
import Select from "react-select";
import { toast } from "react-toastify";
import { Country, State } from "country-state-city";
import OrganisationApi from "../Api/OrganisationApi";
import ZoneApi from "../Api/ZoneApi";
import RegionApi from "../Api/RegionApi";

const OrganisationFormLayer = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    country: "",
    state: "",
    zoneId: "",
    region: "",
    edId: "",
    rdIds: [],
  });

  const [selectedCountry, setSelectedCountry] = useState(null);
  const [edOptions, setEdOptions] = useState([]);
  const [rdOptions, setRdOptions] = useState([]);
  const [formErrors, setFormErrors] = useState({});
  const [filteredZones, setFilteredZones] = useState([]);

  useEffect(() => {
    fetchAdminUsers();
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

  const fetchZones = async (stateName) => {
    const response = await ZoneApi.getZoneByState(stateName);
    if (response && response.status && response.response.data) {
      setFilteredZones(response.response.data);
    }
  };

  const fetchAdminUsers = async () => {
    const response = await RegionApi.getAdminUser();
    if (response && response.status && response.response.data) {
      const users = response.response.data;
      const options = users.map((user) => ({
        value: user._id, // Use _id
        label: user.name,
      }));
      setEdOptions(options);
      setRdOptions(options);
    }
  };

  const getOrganisationById = async (id) => {
    const response = await OrganisationApi.getOrganisation({ id });
    if (response && response.status && response.response.data) {
      const data = response.response.data;

      // Normalize rd data (ensure array)
      let normalizedRdIds = [];
      const rdData = data.rd || data.rdIds; // Check both rd and rdIds

      if (Array.isArray(rdData)) {
        normalizedRdIds = rdData.map((r) =>
          typeof r === "object" ? r._id : r,
        );
      } else if (rdData) {
        // Handle case where it might be a single value erroneously or just one check
        normalizedRdIds = [typeof rdData === "object" ? rdData._id : rdData];
      }

      // Normalize data to ensure we have IDs for select fields if API returns populated objects
      const normalizedData = {
        ...data,
        zoneId: data.zone?._id || data.zone || data.zoneId, // handle both potential keys
        edId: data.ed?._id || data.ed || data.edId,
        rdIds: normalizedRdIds,
      };
      setFormData(normalizedData);

      // Pre-populate country select
      const countryObj = Country.getAllCountries().find(
        (c) => c.name === data.country,
      );
      if (countryObj) {
        setSelectedCountry({ value: countryObj.isoCode, label: data.country });
      }
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

  const handleMultiSelectChange = (selectedOptions, { name }) => {
    const values = selectedOptions
      ? selectedOptions.map((opt) => opt.value)
      : [];
    setFormData({
      ...formData,
      [name]: values,
    });
    if (formErrors[name]) {
      setFormErrors({ ...formErrors, [name]: "" });
    }
  };

  const getSelectedOption = (options, value) => {
    return options.find((option) => option.value === value) || null;
  };

  const getSelectedOptions = (options, values) => {
    if (!Array.isArray(values)) return [];
    return options.filter((option) => values.includes(option.value));
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

    if (!formData.country) {
      errors.country = "Country is required";
      isValid = false;
    }
    if (!formData.state) {
      errors.state = "State is required";
      isValid = false;
    }
    if (!formData.zoneId) {
      errors.zoneId = "Zone is required";
      isValid = false;
    }
    if (!formData.region) {
      errors.region = "Region is required";
      isValid = false;
    }
    if (!formData.rdIds || formData.rdIds.length === 0) {
      errors.rdIds = "RD Name is required";
      isValid = false;
    }
    if (!formData.edId) {
      errors.edId = "ED Name is required";
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
    console.log(formData);
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
      <div className="card-header bg-base py-16 px-24 d-flex align-items-center justify-content-between">
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
            {/* Row 1: Country & State */}
            <div className="col-md-6">
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
                  setFormData({
                    ...formData,
                    country: selectedOption ? selectedOption.label : "",
                    state: "",
                    zoneId: "", // Reset zoneId
                  });
                  if (formErrors.country) {
                    setFormErrors({ ...formErrors, country: "" });
                  }
                }}
                placeholder="Select Country"
                styles={customStyles}
                error={formErrors.country}
              />
              {formErrors.country && (
                <div className="text-danger mt-1 fontsize-14">
                  {formErrors.country}
                </div>
              )}
            </div>

            <div className="col-md-6">
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
                    zoneId: "", // Reset zoneId
                  });
                  if (formErrors.state) {
                    setFormErrors({ ...formErrors, state: "" });
                  }
                }}
                placeholder="Select State"
                isDisabled={!formData.country}
                styles={customStyles}
                error={formErrors.state}
              />
              {formErrors.state && (
                <div className="text-danger mt-1 fontsize-14">
                  {formErrors.state}
                </div>
              )}
            </div>

            {/* Row 2: Zone & Region */}
            <div className="col-md-6">
              <label className="form-label fw-medium">
                Zone <span className="text-danger-600">*</span>
              </label>
              <Select
                name="zoneId"
                options={filteredZones.map((z) => ({
                  value: z._id, // Updated to _id
                  label: z.name,
                }))}
                value={
                  filteredZones
                    .map((z) => ({ value: z._id, label: z.name }))
                    .find((opt) => opt.value === formData.zoneId) || null
                }
                onChange={(selectedOption) =>
                  handleSelectChange(selectedOption, { name: "zoneId" })
                }
                styles={customStyles}
                placeholder="Select Zone"
                isClearable={false}
                isDisabled={!formData.state}
                error={formErrors.zoneId}
              />
              {formErrors.zoneId && (
                <div className="text-danger mt-1 fontsize-14">
                  {formErrors.zoneId}
                </div>
              )}
            </div>

            <div className="col-md-6">
              <label className="form-label fw-medium">
                Region <span className="text-danger-600">*</span>
              </label>
              <input
                type="text"
                className={`form-control radius-8 ${
                  formErrors.region ? "border-danger" : ""
                }`}
                name="region"
                value={formData.region}
                onChange={handleInputChange}
                placeholder="Enter Region Name"
              />
              {formErrors.region && (
                <div className="text-danger mt-1 fontsize-14">
                  {formErrors.region}
                </div>
              )}
            </div>

            {/* Row 3: RD & ED */}
            <div className="col-md-6">
              <label className="form-label fw-medium">
                RD (Regional Director){" "}
                <span className="text-danger-600">*</span>
              </label>
              <Select
                isMulti
                name="rdIds"
                options={rdOptions}
                value={getSelectedOptions(rdOptions, formData.rdIds)} // Values are IDs
                onChange={handleMultiSelectChange}
                styles={customStyles}
                placeholder="Select RD Names"
                isClearable={false}
                error={formErrors.rdIds}
              />
              {formErrors.rdIds && (
                <div className="text-danger mt-1 fontsize-14">
                  {formErrors.rdIds}
                </div>
              )}
            </div>

            <div className="col-md-6">
              <label className="form-label fw-medium">
                ED (Executive Director){" "}
                <span className="text-danger-600">*</span>
              </label>
              <Select
                name="edId"
                options={edOptions}
                value={getSelectedOption(edOptions, formData.edId)} // Value is ID
                onChange={handleSelectChange}
                styles={customStyles}
                placeholder="Select ED Name"
                isClearable={false}
                error={formErrors.edId}
              />
              {formErrors.edId && (
                <div className="text-danger mt-1 fontsize-14">
                  {formErrors.edId}
                </div>
              )}
            </div>

            {/* Buttons */}
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
