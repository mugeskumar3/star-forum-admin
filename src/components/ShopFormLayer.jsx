import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";
import Select from "react-select";

const ShopFormLayer = () => {
  const [formData, setFormData] = useState({
    productName: "",
    price: "",
    category: "",
    description: "",
    image: null,
  });

  const [previewImage, setPreviewImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (selectedOption, { name }) => {
    setFormData((prev) => ({
      ...prev,
      [name]: selectedOption ? selectedOption.value : "",
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
  };

  const categoryOptions = [
    { value: "Electronics", label: "Electronics" },
    { value: "Clothing", label: "Clothing" },
    { value: "Accessories", label: "Accessories" },
    { value: "Home & Garden", label: "Home & Garden" },
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
      <div className="card-header border-bottom bg-base py-16 px-24">
        <h6 className="text-primary-600 pb-2 mb-0">Add New Product</h6>
      </div>
      <div className="card-body p-24">
        <form onSubmit={handleSubmit}>
          <div className="row gy-4">
            {/* Product Name */}
            <div className="col-md-6">
              <label className="form-label fw-semibold">
                Product Name <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control radius-8"
                name="productName"
                value={formData.productName}
                onChange={handleChange}
                placeholder="Enter product name"
                required
              />
            </div>

            {/* Price */}
            <div className="col-md-6">
              <label className="form-label fw-semibold">
                Price <span className="text-danger">*</span>
              </label>
              <div className="input-group">
                <span className="input-group-text bg-base text-secondary-light radius-8 border-end-0">
                  ₹
                </span>
                <input
                  type="number"
                  className="form-control radius-8"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="0.00"
                  required
                />
              </div>
            </div>

            {/* Category */}
            <div className="col-md-6">
              <label className="form-label fw-semibold">
                Category <span className="text-danger">*</span>
              </label>
              <Select
                name="category"
                options={categoryOptions}
                value={getSelectedOption(categoryOptions, formData.category)}
                onChange={handleSelectChange}
                styles={customStyles}
                placeholder="Select Category"
                isClearable={false}
                required
              />
            </div>

            {/* Image Upload */}
            <div className="col-md-6">
              <label className="form-label fw-semibold">
                Product Image <span className="text-danger">*</span>
              </label>
              <input
                type="file"
                className="form-control radius-8"
                accept="image/*"
                onChange={handleImageChange}
                required
              />
              {previewImage && (
                <div className="mt-3">
                  <img
                    src={previewImage}
                    alt="Preview"
                    className="w-120-px h-120-px object-fit-cover radius-8 border"
                  />
                </div>
              )}
            </div>

            {/* Description */}
            <div className="col-12">
              <label className="form-label fw-semibold">Description</label>
              <textarea
                className="form-control radius-8"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter product description..."
                rows="4"
              ></textarea>
            </div>
          </div>

          <div className="d-flex justify-content-end gap-2 mt-24">
            <Link
              to="/shop-create"
              className="btn btn-outline-secondary radius-8 px-20 py-11"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="btn btn-primary radius-8 px-20 py-11"
            >
              Save Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ShopFormLayer;
