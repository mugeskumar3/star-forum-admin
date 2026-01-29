import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";
import Select from "react-select";
import AsyncSelect from "react-select/async";
import { selectStyles } from "../helper/SelectStyles";
import MemberApi from "../Api/MemberApi";
import ChapterApi from "../Api/ChapterApi";
import RegionApi from "../Api/RegionApi";
import BusinessCategoryApi from "../Api/BusinessCategoryApi";
import AdminUserApi from "../Api/AdminUserApi";
import AwardApi from "../Api/AwardApi";
import ImageUploadApi from "../Api/ImageUploadApi";

const MemberFormLayer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;
  const [regionOptions, setRegionOptions] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [formData, setFormData] = useState({
    profileImage: "",
    fullName: "",
    email: "",
    companyName: "",
    phoneNumber: "", // Renamed from mobileNumber
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
        regionId: formData.region,
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
        const chapterObj = data.chapter
          ? { value: data.chapter._id, label: data.chapter.chapterName }
          : null;
        const busCatObj = data.businessCategory
          ? {
              value: data.businessCategory._id,
              label: data.businessCategory.name,
            }
          : null;
        const referredByObj = data.referredBy
          ? {
              value: data.referredBy._id,
              label: data.referredBy.name || data.referredBy.fullName,
            }
          : null;

        setFormData({
          profileImage: data.profileImage || "",
          fullName: data.fullName || "",
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

          trainingYear: data.trainingYear?.split("T")[0] || "",
          mrp: data.trainingTypes?.includes("MRP") || false,
          mtp: data.trainingTypes?.includes("MTP") || false,
          atp: data.trainingTypes?.includes("ATP") || false,
          trainings: data.trainings || [],

          tenure: data.tenure?.split("T")[0] || "",
          awardSelected: null,
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
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSelectChange = (selectedOption, { name }) => {
    setFormData((prev) => ({
      ...prev,
      [name]: selectedOption,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };
  const handleRegionChange = (selectedOption) => {
    setFormData((prev) => ({
      ...prev,
      region: selectedOption ? selectedOption.value : "",
      chapter: null,
    }));
  };
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setFormData((prev) => ({
        ...prev,
        profileImage: URL.createObjectURL(file),
      }));
    }
  };

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName) newErrors.fullName = "Full Name is required";
    if (!formData.email) newErrors.email = "Email Address is required";
    if (!formData.companyName)
      newErrors.companyName = "Company Name is required";
    if (!formData.phoneNumber)
      newErrors.phoneNumber = "Phone Number is required";
    if (!formData.region) newErrors.region = "Region is required";
    if (!formData.chapter) newErrors.chapter = "Chapter is required";
    if (!formData.membershipId)
      newErrors.membershipId = "Membership ID is required";
    if (!formData.position) newErrors.position = "Position is required";
    if (!formData.dob) newErrors.dob = "Date of Birth is required";

    if (!formData.annualFee) newErrors.annualFee = "Annual Fee is required";
    if (!formData.transactionId)
      newErrors.transactionId = "Transaction ID is required";
    if (!formData.gstNo) newErrors.gstNo = "GST No is required";
    if (!formData.paymentMode)
      newErrors.paymentMode = "Payment Mode is required";
    if (!formData.paymentDate)
      newErrors.paymentDate = "Payment Date is required";
    if (!formData.joiningDate)
      newErrors.joiningDate = "Joining Date is required";
    if (!formData.renewalDate)
      newErrors.renewalDate = "Renewal Date is required";

    if (!formData.trainingYear)
      newErrors.trainingYear = "Training Date is required";
    if (!formData.membershipType)
      newErrors.membershipType = "Membership Type is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      let finalImagePath = formData.profileImage;
      if (selectedFile) {
        const formDataUpload = new FormData();
        formDataUpload.append("file", selectedFile);
        const uploadData = {
          formData: formDataUpload,
          path: "member-profile",
        };
        try {
          const res = await ImageUploadApi.uploadImage(uploadData);
          if (res.status) {
            finalImagePath = res.response.data;
          } else {
            return;
          }
        } catch (error) {
          console.error("Image upload failed", error);
          return;
        }
      }
      const payload = {
        profileImage: finalImagePath,
        fullName: formData.fullName,
        phoneNumber: formData.phoneNumber,
        email: formData.email,
        companyName: formData.companyName,
        membershipId: formData.membershipId,
        region: formData.region,
        chapter: formData.chapter?.value || null,
        position: formData.position,
        businessCategory: formData.businessCategory?.value || null,
        referredBy: formData.referredBy?.value || null,
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
        paymentMode: formData.paymentMode,
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
        awards: formData.awards,
        clubMemberType: formData.membershipType,
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

  return (
    <div className="card h-100 p-0 radius-12">
      <div className="card-header border-bottom bg-base py-16 px-24 d-flex align-items-center justify-content-between">
        <h6 className="text-primary-600 pb-2 mb-0">
          {isEditMode ? "Edit Member" : "Add New Member"}
        </h6>
      </div>
      <div className="card-body p-24">
        <form onSubmit={handleSubmit}>
          <div className="row gy-4 mb-24">
            <div className="col-12">
              <h6 className="text-primary-600 pb-2 mb-3">Basic Information</h6>
            </div>

            <div className="col-12">
              <div className="row gy-4">
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

                    {/* Phone Number */}
                    <div className="col-md-4">
                      <label className="form-label fw-semibold">
                        Phone Number <span className="text-danger">*</span>
                      </label>
                      <input
                        type="tel"
                        className="form-control radius-8"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                      />
                      {errors.phoneNumber && (
                        <small className="text-danger">
                          {errors.phoneNumber}
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
                        styles={selectStyles(errors.region)}
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
                        key={formData.region}
                        name="chapter"
                        cacheOptions
                        defaultOptions
                        loadOptions={loadChapterOptions}
                        value={formData.chapter}
                        onChange={(val) =>
                          setFormData((prev) => ({ ...prev, chapter: val }))
                        }
                        styles={selectStyles(errors.chapter)}
                        placeholder="Select Chapter"
                      />
                      {errors.chapter && (
                        <small className="text-danger">{errors.chapter}</small>
                      )}
                    </div>

                    {/* Position */}
                    <div className="col-md-4">
                      <label className="form-label fw-semibold">
                        Position <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control radius-8"
                        name="position"
                        value={formData.position}
                        onChange={handleChange}
                      />
                      {errors.position && (
                        <small className="text-danger">{errors.position}</small>
                      )}
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
                        styles={selectStyles()}
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
                        styles={selectStyles()}
                        placeholder="Search Member..."
                        isClearable
                      />
                    </div>

                    {/* DOB */}
                    <div className="col-md-4">
                      <label className="form-label fw-semibold">
                        Date of Birth <span className="text-danger">*</span>
                      </label>
                      <input
                        type="date"
                        className="form-control radius-8"
                        name="dob"
                        value={formData.dob}
                        onChange={handleChange}
                      />
                      {errors.dob && (
                        <small className="text-danger">{errors.dob}</small>
                      )}
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
              <label className="form-label fw-semibold">
                Annual Fee <span className="text-danger">*</span>
              </label>
              <input
                type="number"
                className="form-control radius-8"
                name="annualFee"
                value={formData.annualFee}
                onChange={handleChange}
              />
              {errors.annualFee && (
                <small className="text-danger">{errors.annualFee}</small>
              )}
            </div>
            <div className="col-md-4">
              <label className="form-label fw-semibold">
                Transaction ID <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control radius-8"
                name="transactionId"
                value={formData.transactionId}
                onChange={handleChange}
              />
              {errors.transactionId && (
                <small className="text-danger">{errors.transactionId}</small>
              )}
            </div>
            <div className="col-md-4">
              <label className="form-label fw-semibold">
                GST No <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control radius-8"
                name="gstNo"
                value={formData.gstNo}
                onChange={handleChange}
              />
              {errors.gstNo && (
                <small className="text-danger">{errors.gstNo}</small>
              )}
            </div>
            <div className="col-md-3">
              <label className="form-label fw-semibold">
                Payment Mode <span className="text-danger">*</span>
              </label>
              <Select
                name="paymentMode"
                options={paymentModeOptions}
                value={getSelectedOption(
                  paymentModeOptions,
                  formData.paymentMode,
                )}
                onChange={(opt) => {
                  setFormData((prev) => ({
                    ...prev,
                    paymentMode: opt ? opt.value : "",
                  }));
                  if (errors.paymentMode)
                    setErrors((prev) => ({ ...prev, paymentMode: "" }));
                }}
                styles={selectStyles(errors.paymentMode)}
                placeholder="Select Mode"
                isClearable={false}
              />
              {errors.paymentMode && (
                <small className="text-danger">{errors.paymentMode}</small>
              )}
            </div>
            <div className="col-md-3">
              <label className="form-label fw-semibold">
                Payment Date <span className="text-danger">*</span>
              </label>
              <input
                type="date"
                className="form-control radius-8"
                name="paymentDate"
                value={formData.paymentDate}
                onChange={handleChange}
              />
              {errors.paymentDate && (
                <small className="text-danger">{errors.paymentDate}</small>
              )}
            </div>
            <div className="col-md-3">
              <label className="form-label fw-semibold">
                Joining Date <span className="text-danger">*</span>
              </label>
              <input
                type="date"
                className="form-control radius-8"
                name="joiningDate"
                value={formData.joiningDate}
                onChange={handleChange}
              />
              {errors.joiningDate && (
                <small className="text-danger">{errors.joiningDate}</small>
              )}
            </div>
            <div className="col-md-3">
              <label className="form-label fw-semibold">
                Renewal Date <span className="text-danger">*</span>
              </label>
              <input
                type="date"
                className="form-control radius-8"
                name="renewalDate"
                value={formData.renewalDate}
                onChange={handleChange}
              />
              {errors.renewalDate && (
                <small className="text-danger">{errors.renewalDate}</small>
              )}
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
                    Training Date <span className="text-danger">*</span>
                  </label>
                  <input
                    type="date"
                    className="form-control radius-8"
                    name="trainingYear"
                    value={formData.trainingYear}
                    onChange={handleChange}
                  />
                  {errors.trainingYear && (
                    <small className="text-danger">{errors.trainingYear}</small>
                  )}
                </div>
                <div className="col-md-6 mt-3">
                  <div className="d-flex gap-4 mt-3">
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
                  <label className="form-label fw-semibold">
                    Tenure Date <span className="text-danger">*</span>
                  </label>
                  <input
                    type="date"
                    className="form-control radius-8"
                    name="tenure"
                    value={formData.tenure}
                    onChange={handleChange}
                  />
                  {errors.tenure && (
                    <small className="text-danger">{errors.tenure}</small>
                  )}
                </div>
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
                    styles={selectStyles()}
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

          <div className="d-flex justify-content-end gap-2 mt-24">
            <Link
              to="/members-registration"
              className="btn btn-outline-secondary radius-8 px-20 py-11 justify-content-center"
              style={{ width: "120px" }}
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="btn btn-primary radius-8 px-20 py-11 justify-content-center"
              style={{ width: "120px" }}
            >
              {isEditMode ? "Update" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MemberFormLayer;
