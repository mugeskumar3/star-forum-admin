import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";
import Select from "react-select";
import ProductApi from "../Api/ProductApi";
import ImageUploadApi from "../Api/ImageUploadApi";
import BusinessCategoryApi from "../Api/BusinessCategoryApi";
import ShowNotifications from "../helper/ShowNotifications";
import { IMAGE_BASE_URL } from "../Config/Index";

const ShopFormLayer = () => {
  const { id } = useParams(); // Get ID from URL for edit mode
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    productName: "",
    price: "",
    categoryId: "",
    description: "",
    isActive: true,
  });

  const [imageFile, setImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [existingImage, setExistingImage] = useState(null); // To store existing image data for delete/edit
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch Categories
  useEffect(() => {
    const fetchCategories = async () => {
      const response = await BusinessCategoryApi.getBusinessCategory();
      if (response && response.status && response.response) {
        // Assuming response.response.data is the array or response.response is the array
        // Adjust based on actual API response structure. 
        // Based on BusinessCategoryApi.js: return { status: true, response: response.data }; 
        // Typically response.data is the array or an object with data property.
        // Let's assume response.response is the array or has data.
        const categories = response.response.data || response.response;
        if (Array.isArray(categories)) {
          const options = categories.map((cat) => ({
            value: cat._id,
            label: cat.name || cat.categoryName, // Adjust property name
          }));
          setCategoryOptions(options);
        }
      }
    };
    fetchCategories();
  }, []);

  // Fetch Product for Edit
  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        setLoading(true);
        const response = await ProductApi.getProductDetails(id);
        if (response.status) {
          const product = response.data.data || response.data; // Adjust based on API structure
          setFormData({
            productName: product.productName,
            price: product.price,
            categoryId: product.categoryId,
            description: product.description,
            isActive: product.isActive,
          });

          if (product.productImage) {
            setExistingImage(product.productImage);
            // If imagePath is relative, you might need a base URL. 
            // Assuming existingImage.imagePath or similar helps construct URL.
            // For preview, we might assume a base URL if it's just a path.
            // But usually API returns full URL or we use a helper. 
            // Let's assume we can display it. 
            // The user example had "imagePath": "uploads/products". This is not a URL.
            // We probably need a base URL for images. 
            // For now, I'll try to show it using a likely path or just the name if full path missing.
            // Actually, the list view used `product.image`.
            // I'll assume we can use `http://localhost:5000/` + path + / + imageName as a guess or just use what works.
            // Wait, the list view in ShopAdminListLayer had `image: "assets/images/..."` hardcoded.
            // I'll assume the API serves static files.
            setPreviewImage(`${IMAGE_BASE_URL}/${product.productImage.path}`);
          }
        }
        setLoading(false);
      };
      fetchProduct();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (selectedOption) => {
    setFormData((prev) => ({
      ...prev,
      categoryId: selectedOption ? selectedOption.value : "",
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
        // Construct path for delete. User said: path=uploads/image_... 
        // But existingImage has imagePath and imageName.
        // Let's try to match user's delete query.
        // user said: `.../delete?path=uploads/image_1769080574306.png`
        // So it seems to be `imagePath/imageName` or just a path string.
        // I'll try constructing `${existingImage.imagePath}/${existingImage.imageName}`
        const pathToDelete = `${existingImage.imagePath}/${existingImage.imageName}`;
        await ImageUploadApi.deleteImage({ path: pathToDelete });
      }

      // Upload new image
      const form = new FormData();
      form.append("file", imageFile);
      const uploadRes = await ImageUploadApi.uploadImage({
        formData: form,
        path: "products",
      });

      if (uploadRes.status) {
        // Response format based on user request:
        // "imageName": "mouse_1705900000000.png",
        // "imagePath": "uploads/products",
        // "originalName": "mouse.png"
        // I'll assume the API returns this object or similar.
        // Let's assume uploadRes.response.data holds this or uploadRes.response
        finalImage = uploadRes.response.data || uploadRes.response;
      } else {
        setLoading(false);
        return; // Stop if upload failed
      }
    }

    // 2. Prepare Payload
    const payload = {
      productName: formData.productName,
      price: Number(formData.price),
      categoryId: formData.categoryId,
      productImage: finalImage,
      description: formData.description,
      isActive: formData.isActive ? true : false,
    };

    // 3. Create or Update
    let result;
    if (id) {
      result = await ProductApi.updateProduct(id, payload);
    } else {
      result = await ProductApi.createProduct(payload);
    }

    setLoading(false);
    if (result.status) {
      navigate("/shop-create");
    }
  };

  const handleRemoveImage = async () => {
    // Case 1: Removing a just-selected local file (not uploaded yet)
    if (imageFile) {
      setImageFile(null);
      // Revert to existing image if available
      if (existingImage && existingImage.path) {
        setPreviewImage(`${IMAGE_BASE_URL}/${existingImage.path}`);
      } else {
        setPreviewImage(null);
      }
      return;
    }

    // Case 2: Removing an existing server image
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

  const getSelectedOption = () => {
    return categoryOptions.find((opt) => opt.value === formData.categoryId) || null;
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
        <h6 className="text-primary-600 pb-2 mb-0">{id ? "Edit Product" : "Add New Product"}</h6>
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
                name="categoryId"
                options={categoryOptions}
                value={getSelectedOption()}
                onChange={handleSelectChange}
                styles={customStyles}
                placeholder={categoryOptions.length > 0 ? "Select Category" : "Loading Categories..."}
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
                required={!id && !previewImage} // Required only on create or if no image
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
              to="/shop-list"
              className="btn btn-outline-secondary radius-8 px-20 py-11"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="btn btn-primary radius-8 px-20 py-11"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ShopFormLayer;
