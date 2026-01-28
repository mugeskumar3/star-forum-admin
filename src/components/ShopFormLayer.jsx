import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";
import Select from "react-select";
import { selectStyles } from "../helper/SelectStyles";
import ProductApi from "../Api/ProductApi";
import ImageUploadApi from "../Api/ImageUploadApi";
import ShopCategoryApi from "../Api/ShopCategoryApi";
import { IMAGE_BASE_URL } from "../Config/Index";

const ShopFormLayer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    productName: "",
    price: "",
    categoryId: "",
    description: "",
    isActive: true,
  });

  const [imageFile, setImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [existingImage, setExistingImage] = useState(null);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await ShopCategoryApi.getShopCategories();
      if (response && response.status) {
        const categories = response.data.data || response.data;
        if (Array.isArray(categories)) {
          const options = categories.map((cat) => ({
            value: cat._id,
            label: cat.name,
          }));
          setCategoryOptions(options);
        }
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        setLoading(true);
        const response = await ProductApi.getProductDetails(id);
        if (response.status) {
          const product = response.data.data || response.data;
          setFormData({
            productName: product.productName,
            price: product.price,
            categoryId: product.categoryId,
            description: product.description,
            isActive: product.isActive,
          });

          if (product.productImage) {
            setExistingImage(product.productImage);
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
    if (name === "price") {
      if (value < 0) {
        setErrors((prev) => ({ ...prev, price: "Price cannot be negative" }));
        return;
      }
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSelectChange = (selectedOption) => {
    setFormData((prev) => ({
      ...prev,
      categoryId: selectedOption ? selectedOption.value : "",
    }));
    if (errors.categoryId) {
      setErrors((prev) => ({ ...prev, categoryId: "" }));
    }
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
      if (errors.image) {
        setErrors((prev) => ({ ...prev, image: "" }));
      }
    }
  };

  const validateForm = () => {
    let newErrors = {};
    let isValid = true;

    if (!formData.productName.trim()) {
      newErrors.productName = "Product Name is required";
      isValid = false;
    }

    if (!formData.price) {
      newErrors.price = "Price is required";
      isValid = false;
    } else if (Number(formData.price) < 0) {
      newErrors.price = "Price cannot be negative";
      isValid = false;
    }

    if (!formData.categoryId) {
      newErrors.categoryId = "Category is required";
      isValid = false;
    }

    if (!existingImage && !imageFile && !previewImage) {
      newErrors.image = "Product Image is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    let finalImage = existingImage;

    if (imageFile) {
      if (id && existingImage && existingImage.imageName) {
        const pathToDelete = `${existingImage.imagePath}/${existingImage.imageName}`;
        await ImageUploadApi.deleteImage({ path: pathToDelete });
      }

      const form = new FormData();
      form.append("file", imageFile);
      const uploadRes = await ImageUploadApi.uploadImage({
        formData: form,
        path: "products",
      });

      if (uploadRes.status) {
        finalImage = uploadRes.response.data || uploadRes.response;
      } else {
        setLoading(false);
        return;
      }
    }

    const payload = {
      productName: formData.productName,
      price: Number(formData.price),
      categoryId: formData.categoryId,
      productImage: finalImage,
      description: formData.description,
      isActive: formData.isActive ? true : false,
    };

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
        const response = await ImageUploadApi.deleteImage({
          path: existingImage.path,
        });
        if (response.status) {
          setExistingImage(null);
          setPreviewImage(null);
        }
      }
    }
  };

  const getSelectedOption = () => {
    return (
      categoryOptions.find((opt) => opt.value === formData.categoryId) || null
    );
  };

  return (
    <div className="card h-100 p-0 radius-12">
      <div className="card-header border-bottom bg-base py-16 px-24">
        <h6 className="text-primary-600 pb-2 mb-0">
          {id ? "Edit Product" : "Add New Product"}
        </h6>
      </div>
      <div className="card-body p-24">
        <form onSubmit={handleSubmit}>
          <div className="row gy-4">
            <div className="col-md-6">
              <label className="form-label fw-semibold">
                Product Name <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className={`form-control radius-8 ${errors.productName ? "is-invalid" : ""}`}
                name="productName"
                value={formData.productName}
                onChange={handleChange}
                placeholder="Enter product name"
              />
              {errors.productName && (
                <div className="invalid-feedback text-danger">{errors.productName}</div>
              )}
            </div>

            <div className="col-md-6">
              <label className="form-label fw-semibold">
                Price <span className="text-danger">*</span>
              </label>
              <div className="input-group">
                <input
                  type="number"
                  className={`form-control radius-8 ${errors.price ? "is-invalid" : ""}`}
                  name="price"
                  min={1}
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="Enter price"
                />
                {errors.price && (
                  <div className="invalid-feedback text-danger">{errors.price}</div>
                )}
              </div>
            </div>

            <div className="col-md-6">
              <label className="form-label fw-semibold">
                Category <span className="text-danger">*</span>
              </label>
              <Select
                name="categoryId"
                options={categoryOptions}
                value={getSelectedOption()}
                onChange={handleSelectChange}
                styles={selectStyles(errors.categoryId)}
                placeholder={
                  categoryOptions.length > 0
                    ? "Select Category"
                    : "Loading Categories..."
                }
                isClearable={false}
              />
              {errors.categoryId && (
                <small className="text-danger">{errors.categoryId}</small>
              )}
            </div>

            <div className="col-12">
              <label className="form-label fw-semibold">
                Product Image <span className="text-danger">*</span>
              </label>

              {!previewImage && !imageFile && !loading && (
                <div className="position-relative">
                  <input
                    type="file"
                    className={`form-control radius-8 ${errors.image ? "is-invalid" : ""}`}
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                  {errors.image && (
                    <div className="invalid-feedback text-danger">{errors.image}</div>
                  )}
                </div>
              )}

              {(previewImage || imageFile) && (
                <div className="d-flex align-items-center justify-content-between p-3 border rounded bg-light-600">
                  <div className="d-flex align-items-center gap-3">
                    <div className="w-100-px h-100-px rounded-8 overflow-hidden border">
                      <img
                        src={previewImage}
                        alt="Preview"
                        className="w-100 h-100 object-fit-cover"
                        onError={(e) => {
                          e.target.src =
                            "https://placehold.co/100x100?text=Error";
                        }}
                      />
                    </div>
                    <div>
                      <p className="text-primary-600 mb-0 fw-medium">
                        {imageFile ? "New Image Selected" : "Current Image"}
                      </p>
                      <p
                        className="text-secondary-400 text-sm mb-0 text-truncate"
                        style={{ maxWidth: "200px" }}
                      >
                        {imageFile
                          ? imageFile.name
                          : existingImage?.imageName || "product-image.png"}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="btn btn-icon btn-danger-100 text-danger-600 rounded-circle"
                    onClick={handleRemoveImage}
                    title="Delete Image"
                  >
                    <Icon
                      icon="mingcute:delete-2-line"
                      width="24"
                      height="24"
                    />
                  </button>
                </div>
              )}
            </div>

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
              disabled={loading}
              style={{ width: "90px" }}
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ShopFormLayer;
