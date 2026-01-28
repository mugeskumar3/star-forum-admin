import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";
import Select from "react-select";
import AsyncSelect from "react-select/async"; // Import AsyncSelect
import MemberApi from "../Api/MemberApi";
import ChapterApi from "../Api/ChapterApi";
import RegionApi from "../Api/RegionApi";
import BusinessCategoryApi from "../Api/BusinessCategoryApi";
import AdminUserApi from "../Api/AdminUserApi";
import AwardApi from "../Api/AwardApi";
import ImageUploadApi from "../Api/ImageUploadApi";
import ShowNotifications from "../helper/ShowNotifications";

const MemberFormLayer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;

  // Region options (Static or simple Select)
  const [regionOptions, setRegionOptions] = useState([]);

  const [formData, setFormData] = useState({
    profileImage: "",
    fullName: "",
    email: "",
    companyName: "",
    mobileNumber: "",
    membershipId: "",
    region: "",
    chapter: null,
    position: "",
    businessCategory: null,
    referredBy: null,
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
    trainings: [],
    awardSelected: null,
    tenure: "",
    awards: [],
    membershipType: "",
  });

  useEffect(() => {
    fetchStaticDropdownData();
    if (isEditMode) {
      fetchMemberDetails();
    } else {
      fetchMembershipId();
    }
  }, [isEditMode]);

  const fetchMembershipId = async () => {
    try {
      const res = await MemberApi.generateMembershipId();
      if (res.status) {
        setFormData((prev) => ({
          ...prev,
          membershipId: res.response.data.membershipId || res.response.data,
        }));
      }
    } catch (error) {
      console.error("Error generating membership ID", error);
    }
  };

  const fetchStaticDropdownData = async () => {
    try {
      const regionRes = await RegionApi.getRegion();
      if (regionRes.status) {
        setRegionOptions(
          regionRes.response.data.map((r) => ({
            value: r._id,
            label: r.region || r.name,
          })),
        );
      }
    } catch (error) {
      console.error("Error fetching regions", error);
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

  const loadBusinessCategoryOptions = async (inputValue) => {
    try {
      const res = await BusinessCategoryApi.getBusinessCategory(
        null,
        0,
        10,
        inputValue,
      );
      if (res.status) {
        return res.response.data.map((b) => ({
          value: b._id,
          label: b.name,
        }));
      }
      return [];
    } catch (error) {
      console.error("Error loading categories", error);
      return [];
    }
  };

  const loadReferredByOptions = async (inputValue) => {
    try {
      const res = await AdminUserApi.getAdminUser(null, 0, 10, inputValue);
      if (res.status) {
        return res.response.data.map((u) => ({
          value: u._id,
          label: u.name || u.fullName || u.email,
        }));
      }
      return [];
    } catch (error) {
      console.error("Error loading users", error);
      return [];
    }
  };
  const loadAwardOptions = async (inputValue) => {
    try {
      const res = await AwardApi.getAward(null, 0, 10, inputValue);
      if (res.status) {
        return res.response.data.map((a) => ({
          value: a._id,
          label: a.name || a.title || "Award",
        }));
      }
      return [];
    } catch (error) {
      console.error("Error loading awards", error);
      return [];
    }
  };

  const fetchMemberDetails = async () => {
    try {
      const res = await MemberApi.getMemberDetails(id);
      if (res.status) {
        const data = res.response.data;

        // Prepare AsyncSelect Objects
        const chapterObj = data.chapter
          ? { value: data.chapter._id, label: data.chapter.chapterName }
          : null;
        const busCatObj = data.businessCategory
          ? {
              value: data.businessCategory._id,
              label: data.businessCategory.name,
            }
          : null;
        // Check if referredBy is object or ID. If ID, we might not have label unless populate is used.
        // Ideally backend populates it. If not, we might ideally fetch it or show ID. Assuming populated.
        const referredByObj = data.referredBy
          ? {
              value: data.referredBy._id,
              label: data.referredBy.name || data.referredBy.fullName,
            }
          : null;

        setFormData({
          profileImage: data.profileImage || "",
          fullName: data.fullName || "",
          mobileNumber: data.mobileNumber || "",
          email: data.email || "",
          companyName: data.companyName || "",
          membershipId: data.membershipId || "",
          region: data.region?._id || data.region || "",
          chapter: chapterObj,
          position: data.position || "",
          businessCategory: busCatObj,
          referredBy: referredByObj,
          dob: data.dateOfBirth?.split("T")[0] || "",
          anniversary: data.anniversary?.split("T")[0] || "",

          doorNo: data.officeAddress?.doorNo || "",
          oldNo: data.officeAddress?.oldNo || "",
          street: data.officeAddress?.street || "",
          area: data.officeAddress?.area || "",
          city: data.officeAddress?.city || "",
          state: data.officeAddress?.state || "",
          pincode: data.officeAddress?.pincode || "",

          communicationConsent: data.isWantSmsEmailUpdates || false,
          annualFee: data.annualFee || "",
          paymentMode: data.paymentMode || "",
          transactionId: data.transactionId || "",
          paymentDate: data.paymentDate?.split("T")[0] || "",
          joiningDate: data.joiningDate?.split("T")[0] || "",
          renewalDate: data.renewalDate?.split("T")[0] || "",
          gstNo: data.gstNumber || "",
          sendWelcomeSms: data.sendWelcomeSms || false,

          trainingYear: data.trainingYear || "",
          mrp: data.trainingTypes?.includes("MRP") || false,
          mtp: data.trainingTypes?.includes("MTP") || false,
          atp: data.trainingTypes?.includes("ATP") || false,
          trainings: data.trainings || [],

          tenure: data.tenure || "",
          awardSelected: null, // Reset as this is for adding *new* award
          awards: data.awards || [],

          membershipType: data.clubMemberType || "",
        });
      }
    } catch (error) {
      console.error("Error fetching member details", error);
    }
  };

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
      [name]: selectedOption, // For AsyncSelect, store the whole object {value, label} or just value?
      // AsyncSelect value prop expects {value, label}.
      // Standard Select we usually stored just value.
      // Let's store object for AsyncSelects (chapter, etc) to persist label.
      // Check if it's Region (normal select).
    }));
  };

  // Specific handler for Region (normal select) if needed, or unify.
  // My previous code expected value for region.
  const handleRegionChange = (selectedOption) => {
    setFormData((prev) => ({
      ...prev,
      region: selectedOption ? selectedOption.value : "",
    }));
  };

  const handleImageChange = async (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const formDataUpload = new FormData();
      formDataUpload.append("image", file);

      const uploadData = {
        formData: formDataUpload,
        path: "member-profile",
      };

      const res = await ImageUploadApi.uploadImage(uploadData);

      if (res.status) {
        // Fallback or explicit check
        const imageUrl =
          res.response.data?.url ||
          res.response.data?.imagePath ||
          (typeof res.response.data === "string" ? res.response.data : "");
        if (imageUrl)
          setFormData((prev) => ({ ...prev, profileImage: imageUrl }));
      }
    }
  };

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName) newErrors.fullName = "Full Name is required";
    if (!formData.email) newErrors.email = "Email Address is required";
    if (!formData.companyName)
      newErrors.companyName = "Company Name is required";
    if (!formData.mobileNumber)
      newErrors.mobileNumber = "Mobile Number is required";
    if (!formData.region) newErrors.region = "Region is required";
    if (!formData.chapter) newErrors.chapter = "Chapter is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      const payload = {
        profileImage: formData.profileImage,
        fullName: formData.fullName,
        mobileNumber: formData.mobileNumber,
        email: formData.email,
        companyName: formData.companyName,
        membershipId: formData.membershipId,
        region: formData.region,
        chapter: formData.chapter?.value, // Extract value from Object
        position: formData.position,
        businessCategory: formData.businessCategory?.value, // Extract value
        referredBy: formData.referredBy?.value || null, // Extract value
        dateOfBirth: formData.dob,
        anniversary: formData.anniversary,
        officeAddress: {
          doorNo: formData.doorNo,
          oldNo: formData.oldNo,
          street: formData.street,
          area: formData.area,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
        },
        isWantSmsEmailUpdates: formData.communicationConsent,
        annualFee: Number(formData.annualFee),
        paymentMode: formData.paymentMode, // Assuming simple string here? No, paymentMode select stores value?
        // Check implementation below.
        transactionId: formData.transactionId,
        paymentDate: formData.paymentDate,
        joiningDate: formData.joiningDate,
        renewalDate: formData.renewalDate,
        gstNumber: formData.gstNo,
        sendWelcomeSms: formData.sendWelcomeSms,
        trainingYear: formData.trainingYear,
        trainingTypes: [
          formData.mrp ? "MRP" : null,
          formData.mtp ? "MTP" : null,
          formData.atp ? "ATP" : null,
        ].filter(Boolean),
        trainings: formData.trainings,
        tenure: formData.tenure,
        awardSelected: formData.awardSelected?.value, // Assuming API logic takes ID? Or does it take name/string?
        // Payload example used "Business Excellence" string.
        // But now we are fetching Awards (IDs).
        // If Backend expects string, use label?
        // User request said "fetch the award list correctly".
        // Usually means linking to Award ID.
        // I will send ID (value). If logic breaks, switch to label.
        awards: formData.awards,
        clubMemberType: formData.membershipType,
        createdBy: "679c133fdfd8f9a7b29c63a5",
      };

      if (payload.referredBy === "None" || payload.referredBy === "")
        delete payload.referredBy;

      let res;
      if (isEditMode) {
        res = await MemberApi.updateMember(id, payload);
      } else {
        res = await MemberApi.createMember(payload);
      }

      if (res.status) {
        navigate("/members-registration");
      }
    } else {
      window.scrollTo(0, 0);
    }
  };

  const handleAddAward = () => {
    if (formData.tenure && formData.awardSelected) {
      // Award object for list: { tenure, award }
      // If we use AsyncSelect for award, awardSelected is object {value, label}.
      // Should we store ID or Label in the local list?
      // Display uses name. Backend likely wants name or ID depending on schema.
      // Given previous hardcoded strings, I'll store Label for display/submission if schema is string-based.
      // If schema allows ID reference, use ID. User said "fetch award list", implies relation.
      // BUT "awards" array in payload example: [{ tenure: "2024", award: "Growth Award" }] -> String.
      // So I might need to send the Label.
      const newAward = {
        tenure: formData.tenure,
        award: formData.awardSelected.label,
      };
      setFormData((prev) => ({
        ...prev,
        awards: [...prev.awards, newAward],
        tenure: "",
        awardSelected: null,
      }));
    }
  };

  const handleRemoveAward = (index) => {
    setFormData((prev) => ({
      ...prev,
      awards: prev.awards.filter((_, i) => i !== index),
    }));
  };

  const paymentModeOptions = [
    { value: "Cash", label: "Cash" },
    { value: "Card", label: "Card" },
    { value: "UPI", label: "UPI" },
    { value: "Bank Transfer", label: "Bank Transfer" },
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
      "&:hover": { borderColor: "#dee2e6" },
    }),
    singleValue: (provided) => ({ ...provided, color: "#495057" }),
    valueContainer: (provided) => ({ ...provided, paddingLeft: "16px" }),
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

            <div className="col-12">
              <div className="row gy-4">
                {/* Profile Image */}
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

                <div className="col-xxl-10 col-xl-9 col-lg-9">
                  <div className="row gy-3">
                    {/* Full Name */}
                    <div className="col-md-4">
                      <label className="form-label fw-semibold">
                        Full Name <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control radius-8"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                      />
                      {errors.fullName && (
                        <small className="text-danger">{errors.fullName}</small>
                      )}
                    </div>

                    {/* Email */}
                    <div className="col-md-4">
                      <label className="form-label fw-semibold">
                        Email Address <span className="text-danger">*</span>
                      </label>
                      <input
                        type="email"
                        className="form-control radius-8"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                      />
                      {errors.email && (
                        <small className="text-danger">{errors.email}</small>
                      )}
                    </div>

                    {/* Company Name */}
                    <div className="col-md-4">
                      <label className="form-label fw-semibold">
                        Company Name <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control radius-8"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                      />
                      {errors.companyName && (
                        <small className="text-danger">
                          {errors.companyName}
                        </small>
                      )}
                    </div>

                    {/* Mobile */}
                    <div className="col-md-4">
                      <label className="form-label fw-semibold">
                        Mobile Number <span className="text-danger">*</span>
                      </label>
                      <input
                        type="tel"
                        className="form-control radius-8"
                        name="mobileNumber"
                        value={formData.mobileNumber}
                        onChange={handleChange}
                      />
                      {errors.mobileNumber && (
                        <small className="text-danger">
                          {errors.mobileNumber}
                        </small>
                      )}
                    </div>

                    {/* Region */}
                    <div className="col-md-4">
                      <label className="form-label fw-semibold">
                        Region <span className="text-danger">*</span>
                      </label>
                      <Select
                        name="region"
                        options={regionOptions}
                        value={getSelectedOption(
                          regionOptions,
                          formData.region,
                        )}
                        onChange={handleRegionChange}
                        styles={customStyles}
                        placeholder="Select Region"
                        isClearable={false}
                      />
                      {errors.region && (
                        <small className="text-danger">{errors.region}</small>
                      )}
                    </div>

                    {/* Chapter - AsyncSelect */}
                    <div className="col-md-4">
                      <label className="form-label fw-semibold">
                        Chapter <span className="text-danger">*</span>
                      </label>
                      <AsyncSelect
                        name="chapter"
                        cacheOptions
                        defaultOptions
                        loadOptions={loadChapterOptions}
                        value={formData.chapter}
                        onChange={(val) =>
                          setFormData((prev) => ({ ...prev, chapter: val }))
                        }
                        styles={customStyles}
                        placeholder="Select Chapter"
                      />
                      {errors.chapter && (
                        <small className="text-danger">{errors.chapter}</small>
                      )}
                    </div>

                    {/* Membership ID REMOVED */}

                    {/* Position */}
                    <div className="col-md-4">
                      <label className="form-label fw-semibold">Position</label>
                      <input
                        type="text"
                        className="form-control radius-8"
                        name="position"
                        value={formData.position}
                        onChange={handleChange}
                      />
                    </div>

                    {/* Business Category - AsyncSelect */}
                    <div className="col-md-4">
                      <label className="form-label fw-semibold">
                        Business Category
                      </label>
                      <AsyncSelect
                        name="businessCategory"
                        cacheOptions
                        defaultOptions
                        loadOptions={loadBusinessCategoryOptions}
                        value={formData.businessCategory}
                        onChange={(val) =>
                          setFormData((prev) => ({
                            ...prev,
                            businessCategory: val,
                          }))
                        }
                        styles={customStyles}
                        placeholder="Select Category"
                        isClearable
                      />
                    </div>

                    {/* Referred By - AsyncSelect */}
                    <div className="col-md-4">
                      <label className="form-label fw-semibold">
                        Referred By
                      </label>
                      <AsyncSelect
                        name="referredBy"
                        cacheOptions
                        defaultOptions
                        loadOptions={loadReferredByOptions}
                        value={formData.referredBy}
                        onChange={(val) =>
                          setFormData((prev) => ({ ...prev, referredBy: val }))
                        }
                        styles={customStyles}
                        placeholder="Search Member..."
                        isClearable
                      />
                    </div>

                    {/* DOB */}
                    <div className="col-md-4">
                      <label className="form-label fw-semibold">
                        Date of Birth
                      </label>
                      <input
                        type="date"
                        className="form-control radius-8"
                        name="dob"
                        value={formData.dob}
                        onChange={handleChange}
                      />
                    </div>

                    {/* Anniversary */}
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
            {/* Same address fields as before */}
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

          {/* 3. CONSENT & SUBSCRIPTION */}
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
                />
                <label
                  className="form-check-label fw-semibold"
                  htmlFor="communicationConsent"
                >
                  I wish to receive updates via SMS and E-Mail
                </label>
              </div>
            </div>
          </div>

          <div className="row gy-3 mb-24">
            <div className="col-12">
              <h6 className="text-primary-600 pb-2 mb-3">
                Subscription Details
              </h6>
            </div>
            <div className="col-md-4">
              <label className="form-label fw-semibold">Annual Fee</label>
              <input
                type="number"
                className="form-control radius-8"
                name="annualFee"
                value={formData.annualFee}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label fw-semibold">Transaction ID</label>
              <input
                type="text"
                className="form-control radius-8"
                name="transactionId"
                value={formData.transactionId}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label fw-semibold">GST No</label>
              <input
                type="text"
                className="form-control radius-8"
                name="gstNo"
                value={formData.gstNo}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-3">
              <label className="form-label fw-semibold">Payment Mode</label>
              <Select
                name="paymentMode"
                options={paymentModeOptions}
                value={getSelectedOption(
                  paymentModeOptions,
                  formData.paymentMode,
                )}
                onChange={(opt) =>
                  setFormData((prev) => ({
                    ...prev,
                    paymentMode: opt ? opt.value : "",
                  }))
                } // Using simple handleSelect helper equivalent
                styles={customStyles}
                placeholder="Select Mode"
                isClearable={false}
              />
            </div>
            <div className="col-md-3">
              <label className="form-label fw-semibold">Payment Date</label>
              <input
                type="date"
                className="form-control radius-8"
                name="paymentDate"
                value={formData.paymentDate}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-3">
              <label className="form-label fw-semibold">Joining Date</label>
              <input
                type="date"
                className="form-control radius-8"
                name="joiningDate"
                value={formData.joiningDate}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-3">
              <label className="form-label fw-semibold">Renewal Date</label>
              <input
                type="date"
                className="form-control radius-8"
                name="renewalDate"
                value={formData.renewalDate}
                onChange={handleChange}
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

          {/* 4. TRAINING REPORT */}
          <div className="row gy-4 mb-24">
            <div className="col-12">
              <h6 className="text-primary-600 pb-2 mb-3">Training Report</h6>
              <div className="row gy-3 gx-4 align-items-center">
                <div className="col-md-6">
                  <label className="form-label fw-semibold">
                    Training Year
                  </label>
                  <input
                    type="number"
                    className="form-control radius-8"
                    name="trainingYear"
                    placeholder="YYYY"
                    value={formData.trainingYear}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6">
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
              </div>
            </div>

            {/* 5. AWARDS REPORT */}
            <div className="col-12">
              <h6 className="text-primary-600 pb-2 mb-3">Add Awards Report</h6>

              {/* List of Added Awards */}
              {formData.awards.length > 0 && (
                <div className="table-responsive mb-3">
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>Tenure</th>
                        <th>Award</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {formData.awards.map((itm, idx) => (
                        <tr key={idx}>
                          <td>{itm.tenure}</td>
                          <td>{itm.award}</td>
                          <td>
                            <button
                              type="button"
                              className="btn btn-danger btn-sm"
                              onClick={() => handleRemoveAward(idx)}
                            >
                              <Icon icon="fluent:delete-24-regular" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              <div className="row gy-3">
                <div className="col-md-6">
                  <label className="form-label fw-semibold">Tenure</label>
                  <input
                    type="text"
                    className="form-control radius-8"
                    name="tenure"
                    placeholder="e.g. 2024"
                    value={formData.tenure}
                    onChange={handleChange}
                  />
                </div>
                {/* AsyncSelect for Awards */}
                <div className="col-md-6">
                  <label className="form-label fw-semibold">Choose Award</label>
                  <AsyncSelect
                    name="awardSelected"
                    cacheOptions
                    defaultOptions
                    loadOptions={loadAwardOptions}
                    value={formData.awardSelected}
                    onChange={(val) =>
                      setFormData((prev) => ({ ...prev, awardSelected: val }))
                    }
                    styles={customStyles}
                    placeholder="Select Award"
                    isClearable={false}
                  />
                </div>
                <div className="col-md-12 text-end">
                  <button
                    type="button"
                    className="btn btn-outline-primary btn-sm radius-8"
                    onClick={handleAddAward}
                  >
                    Add Award
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* 6. CLUB MEMBER */}
          <div className="row gy-3 mb-24">
            <div className="col-12">
              <h6 className="text-primary-600 border-bottom border-primary-100 pb-2 mb-3">
                CNI Club Member
              </h6>
              <p className="text-primary-600 pb-2 mb-3">
                Select Membership Type <span className="text-danger">*</span>
              </p>
            </div>
            <div className="col-12">
              <div className="d-flex flex-wrap gap-4 align-items-center">
                {["Gold", "Diamond", "Platinum"].map((type) => (
                  <div
                    className="form-check d-flex align-items-center"
                    key={type}
                  >
                    <input
                      className="form-check-input"
                      type="radio"
                      name="membershipType"
                      id={`${type}Member`}
                      value={type}
                      checked={formData.membershipType === type}
                      onChange={handleChange}
                    />
                    <label
                      className="form-check-label"
                      htmlFor={`${type}Member`}
                    >
                      {type} Member
                    </label>
                  </div>
                ))}

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
              {errors.membershipType && (
                <small className="text-danger d-block mt-2">
                  {errors.membershipType}
                </small>
              )}
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
