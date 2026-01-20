import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";
import Select from "react-select";

const MemberFormLayer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const [formData, setFormData] = useState({
    profileImage: null,
    fullName: "",
    email: "",
    companyName: "",
    mobileNumber: "",
    region: "",
    chapter: "",
    position: "",
    businessCategory: "",
    referredBy: "None",
    dob: "",
    anniversary: "",
    doorNo: "",
    oldNo: "",
    street: "",
    area: "",
    city: "",
    state: "",
    pincode: "",
    communicationConsent: false,
    annualFee: "",
    transactionId: "",
    gstNo: "",
    paymentMode: "",
    paymentDate: "",
    joiningDate: "",
    renewalDate: "",
    sendWelcomeSms: false,
    trainingYear: "",
    mrp: false,
    mtp: false,
    atp: false,
    tenure: "",
    award: "",
    membershipType: "",
  });

  useEffect(() => {
    if (isEditMode) {
      // Dummy Data for Edit Mode
      setFormData({
        profileImage: "assets/images/users/user1.png",
        fullName: "Darlene Robertson",
        email: "darlene@example.com",
        companyName: "Robertson Inc",
        mobileNumber: "9876543210",
        region: "North Region",
        chapter: "Star Chapter",
        membershipId: "MEM-001",
        position: "CEO",
        businessCategory: "Technology",
        referredBy: "John Doe",
        dob: "1990-05-15",
        anniversary: "2015-08-20",
        doorNo: "123",
        oldNo: "45",
        street: "Main Street",
        area: "Downtown",
        city: "Chennai",
        state: "Tamil Nadu",
        pincode: "600001",
        communicationConsent: true,
        annualFee: "5000",
        transactionId: "TXN123456",
        gstNo: "GSTIN001",
        paymentMode: "UPI",
        paymentDate: "2024-01-01",
        joiningDate: "2024-01-01",
        renewalDate: "2025-01-01",
        sendWelcomeSms: true,
        trainingYear: "2024",
        mrp: true,
        mtp: false,
        atp: true,
        tenure: "1 Year",
        award: "Best Member",
        membershipType: "Gold Member",
      });
    }
  }, [isEditMode]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSelectChange = (selectedOption, { name }) => {
    setFormData((prev) => ({
      ...prev,
      [name]: selectedOption ? selectedOption.value : "",
    }));
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({
        ...formData,
        profileImage: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Member Data Submitted:", formData);
    navigate("/members-registration");
  };

  // Options for React Select
  const regionOptions = [
    { value: "North Region", label: "North Region" },
    { value: "South Region", label: "South Region" },
  ];

  const chapterOptions = [
    { value: "Star Chapter", label: "Star Chapter" },
    { value: "Galaxy Chapter", label: "Galaxy Chapter" },
  ];

  const businessCategoryOptions = [
    { value: "Technology", label: "Technology" },
    { value: "Manufacturing", label: "Manufacturing" },
    { value: "Retail", label: "Retail" },
  ];

  const referredByOptions = [
    { value: "None", label: "None" },
    { value: "John Doe", label: "John Doe" },
    { value: "Jane Smith", label: "Jane Smith" },
  ];

  const paymentModeOptions = [
    { value: "Cash", label: "Cash" },
    { value: "Card", label: "Card" },
    { value: "UPI", label: "UPI" },
    { value: "Bank Transfer", label: "Bank Transfer" },
  ];

  const awardOptions = [
    { value: "Best Member", label: "Best Member" },
    { value: "Star Performer", label: "Star Performer" },
  ];

  // Helper to get selected option object from string value
  const getSelectedOption = (options, value) => {
    return options.find((option) => option.value === value) || null;
  };

  const customStyles = {
    control: (provided) => ({
      ...provided,
      minHeight: "40px", // Match height of text inputs
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
          {isEditMode ? "Edit Member" : "Add New Member"}
        </h6>
      </div>
      <div className="card-body p-24">
        <form onSubmit={handleSubmit}>
          {/* 1. BASIC INFORMATION */}
          <div className="row gy-4 mb-24">
            <div className="col-12">
              <h6 className="text-primary-600 pb-2 mb-3">Basic Information</h6>
            </div>

            {/* Outer Row to separate Profile and Inputs */}
            <div className="col-12">
              <div className="row gy-4">
                {/* Left Column: Profile Image */}
                <div className="col-xxl-2 col-xl-3 col-lg-3 text-center">
                  <div
                    className="upload-image-app-icon rounded-circle overflow-hidden position-relative mx-auto mb-3"
                    style={{
                      width: "120px",
                      height: "120px",
                      backgroundColor: "#f0f0f0",
                    }}
                  >
                    {formData.profileImage ? (
                      <img
                        src={formData.profileImage}
                        alt="Profile"
                        className="w-100 h-100 object-fit-cover"
                      />
                    ) : (
                      <div className="d-flex align-items-center justify-content-center h-100 text-secondary-light">
                        <Icon icon="solar:user-bold" className="text-6xl" />
                      </div>
                    )}
                  </div>
                  <label
                    className="btn btn-outline-primary btn-sm radius-8"
                    htmlFor="profileImageUpload"
                  >
                    Choose Image
                  </label>
                  <input
                    type="file"
                    id="profileImageUpload"
                    hidden
                    onChange={handleImageChange}
                    accept="image/*"
                  />
                </div>

                {/* Right Column: Input Fields Grid */}
                <div className="col-xxl-10 col-xl-9 col-lg-9">
                  <div className="row gy-3">
                    <div className="col-md-4">
                      <label className="form-label fw-semibold">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        className="form-control radius-8"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="col-md-4">
                      <label className="form-label fw-semibold">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        className="form-control radius-8"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="col-md-4">
                      <label className="form-label fw-semibold">
                        Company Name *
                      </label>
                      <input
                        type="text"
                        className="form-control radius-8"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="col-md-4">
                      <label className="form-label fw-semibold">
                        Mobile Number *
                      </label>
                      <input
                        type="tel"
                        className="form-control radius-8"
                        name="mobileNumber"
                        value={formData.mobileNumber}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="col-md-4">
                      <label className="form-label fw-semibold">Region *</label>
                      <Select
                        name="region"
                        options={regionOptions}
                        value={getSelectedOption(
                          regionOptions,
                          formData.region,
                        )}
                        onChange={handleSelectChange}
                        styles={customStyles}
                        placeholder="Select Region"
                        isClearable={false}
                        required
                      />
                    </div>

                    <div className="col-md-4">
                      <label className="form-label fw-semibold">
                        Chapter *
                      </label>
                      <Select
                        name="chapter"
                        options={chapterOptions}
                        value={getSelectedOption(
                          chapterOptions,
                          formData.chapter,
                        )}
                        onChange={handleSelectChange}
                        styles={customStyles}
                        placeholder="Select Chapter"
                        isClearable={false}
                        required
                      />
                    </div>

                    <div className="col-md-4">
                      <label className="form-label fw-semibold">
                        Membership ID *
                      </label>
                      <input
                        type="text"
                        className="form-control radius-8 bg-light"
                        name="membershipId"
                        value={formData.membershipId}
                        readOnly
                      />
                    </div>

                    <div className="col-md-4">
                      <label className="form-label fw-semibold">
                        Position *
                      </label>
                      <input
                        type="text"
                        className="form-control radius-8"
                        name="position"
                        value={formData.position}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="col-md-4">
                      <label className="form-label fw-semibold">
                        Business Category
                      </label>
                      <Select
                        name="businessCategory"
                        options={businessCategoryOptions}
                        value={getSelectedOption(
                          businessCategoryOptions,
                          formData.businessCategory,
                        )}
                        onChange={handleSelectChange}
                        styles={customStyles}
                        placeholder="Select Category"
                        isClearable
                      />
                    </div>

                    <div className="col-md-4">
                      <label className="form-label fw-semibold">
                        Referred By
                      </label>
                      <Select
                        name="referredBy"
                        options={referredByOptions}
                        value={getSelectedOption(
                          referredByOptions,
                          formData.referredBy,
                        )}
                        onChange={handleSelectChange}
                        styles={customStyles}
                        placeholder="Select Referrer"
                        isClearable
                      />
                    </div>

                    <div className="col-md-4">
                      <label className="form-label fw-semibold">
                        Date of Birth *
                      </label>
                      <input
                        type="date"
                        className="form-control radius-8"
                        name="dob"
                        value={formData.dob}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="col-md-4">
                      <label className="form-label fw-semibold">
                        Anniversary
                      </label>
                      <input
                        type="date"
                        className="form-control radius-8"
                        name="anniversary"
                        value={formData.anniversary}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 2. OFFICE ADDRESS */}
          <div className="row gy-3 mb-24">
            <div className="col-12">
              <h6 className="text-primary-600 pb-2 mb-3">Office Address</h6>
            </div>
            <div className="col-md-6">
              <label className="form-label fw-semibold">Door No (New No)</label>
              <input
                type="text"
                className="form-control radius-8"
                name="doorNo"
                value={formData.doorNo}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label fw-semibold">Old No</label>
              <input
                type="text"
                className="form-control radius-8"
                name="oldNo"
                value={formData.oldNo}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label fw-semibold">Street</label>
              <input
                type="text"
                className="form-control radius-8"
                name="street"
                value={formData.street}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label fw-semibold">Area</label>
              <input
                type="text"
                className="form-control radius-8"
                name="area"
                value={formData.area}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label fw-semibold">City</label>
              <input
                type="text"
                className="form-control radius-8"
                name="city"
                value={formData.city}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label fw-semibold">State</label>
              <input
                type="text"
                className="form-control radius-8"
                name="state"
                value={formData.state}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label fw-semibold">Pincode</label>
              <input
                type="number"
                className="form-control radius-8"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* 3. COMMUNICATION CONSENT */}
          <div className="row gy-3 mb-24">
            <div className="col-12">
              <div className="form-check d-flex align-items-center">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="communicationConsent"
                  id="communicationConsent"
                  checked={formData.communicationConsent}
                  onChange={handleChange}
                  required
                />
                <label
                  className="form-check-label fw-semibold"
                  htmlFor="communicationConsent"
                >
                  I wish to receive updates via SMS and E-Mail *
                </label>
              </div>
            </div>
          </div>

          {/* 4. SUBSCRIPTION DETAILS */}
          <div className="row gy-3 mb-24">
            <div className="col-12">
              <h6 className="text-primary-600 pb-2 mb-3">
                Subscription Details
              </h6>
            </div>
            <div className="col-md-4">
              <label className="form-label fw-semibold">Annual Fee *</label>
              <input
                type="number"
                className="form-control radius-8"
                name="annualFee"
                value={formData.annualFee}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-4">
              <label className="form-label fw-semibold">Transaction ID *</label>
              <input
                type="text"
                className="form-control radius-8"
                name="transactionId"
                value={formData.transactionId}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-4">
              <label className="form-label fw-semibold">GST No *</label>
              <input
                type="text"
                className="form-control radius-8"
                name="gstNo"
                value={formData.gstNo}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-3">
              <label className="form-label fw-semibold">Payment Mode *</label>
              <Select
                name="paymentMode"
                options={paymentModeOptions}
                value={getSelectedOption(
                  paymentModeOptions,
                  formData.paymentMode,
                )}
                onChange={handleSelectChange}
                styles={customStyles}
                placeholder="Select Mode"
                isClearable={false}
                required
              />
            </div>
            <div className="col-md-3">
              <label className="form-label fw-semibold">Payment Date *</label>
              <input
                type="date"
                className="form-control radius-8"
                name="paymentDate"
                value={formData.paymentDate}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-3">
              <label className="form-label fw-semibold">Joining Date *</label>
              <input
                type="date"
                className="form-control radius-8"
                name="joiningDate"
                value={formData.joiningDate}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-3">
              <label className="form-label fw-semibold">Renewal Date *</label>
              <input
                type="date"
                className="form-control radius-8"
                name="renewalDate"
                value={formData.renewalDate}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-12">
              <div className="form-check d-flex align-items-center">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="sendWelcomeSms"
                  id="sendWelcomeSms"
                  checked={formData.sendWelcomeSms}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="sendWelcomeSms">
                  Send Welcome SMS
                </label>
              </div>
            </div>
          </div>

          <div className="row gy-4 mb-24">
            <div className="col-md-6">
              <h6 className="text-primary-600 pb-2 mb-3">Training Report</h6>
              <div className="row gy-3">
                <div className="col-md-12">
                  <label className="form-label fw-semibold">
                    Training Year *
                  </label>
                  <input
                    type="number"
                    className="form-control radius-8"
                    name="trainingYear"
                    placeholder="YYYY"
                    value={formData.trainingYear}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-12">
                  <div className="d-flex gap-4">
                    <div className="form-check d-flex align-items-center">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="mrp"
                        id="mrp"
                        checked={formData.mrp}
                        onChange={handleChange}
                      />
                      <label className="form-check-label" htmlFor="mrp">
                        MRP
                      </label>
                    </div>
                    <div className="form-check d-flex align-items-center">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="mtp"
                        id="mtp"
                        checked={formData.mtp}
                        onChange={handleChange}
                      />
                      <label className="form-check-label" htmlFor="mtp">
                        MTP
                      </label>
                    </div>
                    <div className="form-check d-flex align-items-center">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="atp"
                        id="atp"
                        checked={formData.atp}
                        onChange={handleChange}
                      />
                      <label className="form-check-label" htmlFor="atp">
                        ATP
                      </label>
                    </div>
                  </div>
                </div>
                <div className="col-md-12 text-end">
                  <button
                    type="button"
                    className="btn btn-outline-primary btn-sm radius-8"
                  >
                    Save Training
                  </button>
                </div>
              </div>
            </div>

            {/* 6. AWARDS REPORT */}
            <div className="col-md-6">
              <h6 className="text-primary-600 pb-2 mb-3">Awards Report</h6>
              <div className="row gy-3">
                <div className="col-md-12">
                  <label className="form-label fw-semibold">Tenure</label>
                  <input
                    type="text"
                    className="form-control radius-8"
                    name="tenure"
                    value={formData.tenure}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-12">
                  <label className="form-label fw-semibold">Choose Award</label>
                  <Select
                    name="award"
                    options={awardOptions}
                    value={getSelectedOption(awardOptions, formData.award)}
                    onChange={handleSelectChange}
                    styles={customStyles}
                    placeholder="Select Award"
                    isClearable={false}
                  />
                </div>
                <div className="col-md-12 text-end">
                  <button
                    type="button"
                    className="btn btn-outline-primary btn-sm radius-8"
                  >
                    Save Award
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* 7. CNI CLUB MEMBER */}
          <div className="row gy-3 mb-24">
            <div className="col-12">
              <h6 className="text-primary-600 border-bottom border-primary-100 pb-2 mb-3">
                CNI Club Member
              </h6>
            </div>
            <div className="col-12">
              <div className="d-flex flex-wrap gap-4 align-items-center">
                <div className="form-check d-flex align-items-center">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="membershipType"
                    id="goldMember"
                    value="Gold Member"
                    checked={formData.membershipType === "Gold Member"}
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="goldMember">
                    Gold Member (2 members induct)
                  </label>
                </div>
                <div className="form-check d-flex align-items-center">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="membershipType"
                    id="diamondMember"
                    value="Diamond Member"
                    checked={formData.membershipType === "Diamond Member"}
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="diamondMember">
                    Diamond Member (5 members induct)
                  </label>
                </div>
                <div className="form-check d-flex align-items-center">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="membershipType"
                    id="platinumMember"
                    value="Platinum Member"
                    checked={formData.membershipType === "Platinum Member"}
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="platinumMember">
                    Platinum Member (10 members induct)
                  </label>
                </div>
                <button
                  type="button"
                  className="text-danger border-0 bg-transparent ms-auto text-sm"
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, membershipType: "" }))
                  }
                >
                  Reset Selection
                </button>
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-end gap-2 mt-24 pt-3 border-top">
            <Link
              to="/members-registration"
              className="btn btn-outline-secondary radius-8 px-20 py-11"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="btn btn-primary radius-8 px-20 py-11"
            >
              Save New Member
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MemberFormLayer;
