import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";
import Select from "react-select";
import ShopCategoryApi from "../Api/ShopCategoryApi";
import ImageUploadApi from "../Api/ImageUploadApi";
import ShowNotifications from "../helper/ShowNotifications";
import { IMAGE_BASE_URL } from "../Config/Index";

const ShopCategoryFormLayer = () => {
    const { id } = useParams(); // Get ID from URL for edit mode
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        isActive: true, // Default Active
    });

    const [imageFile, setImageFile] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [existingImage, setExistingImage] = useState(null);
    const [loading, setLoading] = useState(false);

    const statusOptions = [
        { value: true, label: "Active" },
        { value: false, label: "Inactive" }
    ];

    // Fetch Category for Edit
    useEffect(() => {
        if (id) {
            const fetchCategory = async () => {
                setLoading(true);
                const response = await ShopCategoryApi.getShopCategoryDetails(id);
                if (response.status) {
                    const category = response.data.data || response.data;
                    setFormData({
                        name: category.name,
                        isActive: category.isActive,
                    });

                    if (category.categoryImage) {
                        setExistingImage(category.categoryImage);
                        setPreviewImage(`${IMAGE_BASE_URL}/${category.categoryImage.path}`);
                    }
                }
                setLoading(false);
            };
            fetchCategory();
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleStatusChange = (selectedOption) => {
        setFormData((prev) => ({
            ...prev,
            isActive: selectedOption ? selectedOption.value : true,
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        let finalImage = existingImage;

        // 1. Handle Image Upload / Delete
        if (imageFile) {
            // If editing and replacing image, delete old one
            if (id && existingImage && existingImage.imageName) {
                const pathToDelete = `${existingImage.imagePath}/${existingImage.imageName}`;
                await ImageUploadApi.deleteImage({ path: pathToDelete });
            }

            // Upload new image
            const form = new FormData();
            form.append("file", imageFile);
            const uploadRes = await ImageUploadApi.uploadImage({
                formData: form,
                path: "shop-categories",
            });

            if (uploadRes.status) {
                finalImage = uploadRes.response.data || uploadRes.response;
            } else {
                setLoading(false);
                return; // Stop if upload failed
            }
        }

        // 2. Prepare Payload
        const payload = {
            name: formData.name,
            categoryImage: finalImage,
            isActive: formData.isActive,
        };

        // 3. Create or Update
        let result;
        if (id) {
            result = await ShopCategoryApi.updateShopCategory(id, payload);
        } else {
            result = await ShopCategoryApi.createShopCategory(payload);
        }

        setLoading(false);
        if (result.status) {
            navigate("/shop-category-list");
        }
    };

    const handleRemoveImage = async () => {
        if (imageFile) {
            setImageFile(null);
            if (existingImage && existingImage.path) {
                setPreviewImage(`${IMAGE_BASE_URL}/${existingImage.path}`);
            } else {
                setPreviewImage(null);
            }
            return;
        }

        if (existingImage) {
            if (window.confirm("Are you sure you want to delete this image?")) {
                const response = await ImageUploadApi.deleteImage({ path: existingImage.path });
                if (response.status) {
                    setExistingImage(null);
                    setPreviewImage(null);
                }
            }
        }
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
                <h6 className="text-primary-600 pb-2 mb-0">{id ? "Edit Category" : "Create Category"}</h6>
            </div>
            <div className="card-body p-24">
                <form onSubmit={handleSubmit}>
                    <div className="row gy-4">
                        {/* Category Name */}
                        <div className="col-md-6">
                            <label className="form-label fw-semibold">
                                Category Name <span className="text-danger">*</span>
                            </label>
                            <input
                                type="text"
                                className="form-control radius-8"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter category name"
                                required
                            />
                        </div>

                        {/* Status */}
                        <div className="col-md-6">
                            <label className="form-label fw-semibold">
                                Status <span className="text-danger">*</span>
                            </label>
                            <Select
                                name="isActive"
                                options={statusOptions}
                                value={statusOptions.find(opt => opt.value === formData.isActive)}
                                onChange={handleStatusChange}
                                styles={customStyles}
                                isClearable={false}
                            />
                        </div>

                        {/* Image Upload */}
                        <div className="col-md-6">
                            <label className="form-label fw-semibold">
                                Category Image <span className="text-secondary fw-normal">(Optional)</span>
                            </label>
                            <input
                                type="file"
                                className="form-control radius-8"
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                            {previewImage && (
                                <div className="mt-3 position-relative d-inline-block">
                                    <img
                                        src={previewImage}
                                        alt="Preview"
                                        className="w-120-px h-120-px object-fit-cover radius-8 border"
                                        onError={(e) => e.target.style.display = 'none'}
                                    />
                                    <button
                                        type="button"
                                        onClick={handleRemoveImage}
                                        className="position-absolute top-0 start-100 translate-middle btn btn-danger rounded-circle p-0 d-flex align-items-center justify-content-center"
                                        style={{ width: '24px', height: '24px', border: '2px solid white' }}
                                    >
                                        <Icon icon="ic:round-close" width="16" height="16" />
                                    </button>
                                </div>
                            )}
                        </div>

                    </div>

                    <div className="d-flex justify-content-end gap-2 mt-24">
                        <Link
                            to="/shop-category-list"
                            className="btn btn-outline-secondary radius-8 px-20 py-11"
                        >
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            className="btn btn-primary radius-8 px-20 py-11"
                            disabled={loading}
                            style={{ backgroundColor: "#C4161C", borderColor: "#C4161C" }}
                        >
                            {loading ? "Saving..." : "Save Category"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ShopCategoryFormLayer;
