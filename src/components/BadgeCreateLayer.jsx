import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";
import ImageUploadApi from "../Api/ImageUploadApi";
import BadgeApi from "../Api/BadgeApi";
import ShowNotifications from "../helper/ShowNotifications";
import { IMAGE_BASE_URL } from "../Config/Index";
const BadgeCreateLayer = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [imagePath, setImagePath] = useState("");
  const [savedImage, setSavedImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [errors, setErrors] = useState({});

  const [type, setType] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    if (id) {
      getBadgeDetails(id);
    }
  }, [id]);

  const getBadgeDetails = async (badgeId) => {
    const response = await BadgeApi.getBadge(badgeId);
    if (response.status) {
      const data = response.response.data;
      setName(data.name);
      setType(data.type);
      setSavedImage(data.badgeImage);
      let imgPath = "";
      if (data.badgeImage) {
        if (typeof data.badgeImage === "string") {
          imgPath = data.badgeImage;
        } else if (data.badgeImage.path) {
          imgPath = data.badgeImage.path;
        }
      }

      if (imgPath) {
        setImagePath(imgPath);
        setPreview(`${IMAGE_BASE_URL}/${imgPath}`);
      }
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const fileObj = e.target.files[0];
      setSelectedFile(fileObj);
      setPreview(URL.createObjectURL(fileObj));
    }
  };

  const handleDeleteImage = async () => {
    if (selectedFile) {
      setSelectedFile(null);
      if (imagePath) {
        setPreview(imagePath);
      } else {
        setPreview(null);
      }
      return;
    }

    if (imagePath) {
      const response = await ImageUploadApi.deleteImage({ path: imagePath });
      if (response.status) {
        setImagePath("");
        setSavedImage(null); // Clear saved object as well
        setPreview(null);
      }
    }
  };

  const validate = () => {
    let tempErrors = {};
    let isValid = true;

    if (!type) {
      tempErrors.type = "Type is required";
      isValid = false;
    }

    if (!name.trim()) {
      tempErrors.name = "Badge Name is required";
      isValid = false;
    }

    if (!imagePath && !selectedFile) {
      tempErrors.image = "Badge Image is required";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsUploading(true);
    let finalImagePath = savedImage || imagePath;

    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);

      try {
        const uploadResponse = await ImageUploadApi.uploadImage({
          formData: formData,
          path: "badge",
        });

        if (uploadResponse.status) {
          finalImagePath = uploadResponse.response.data;
        } else {
          setIsUploading(false);
          return;
        }
      } catch (error) {
        setIsUploading(false);
        return;
      }
    }

    const badgeData = {
      type,
      name,
      badgeImage: finalImagePath,
    };
    
    let response;
    if (id) {
      response = await BadgeApi.updateBadge({ ...badgeData, id });
    } else {
      response = await BadgeApi.createBadge(badgeData);
    }

    setIsUploading(false);

    if (response.status) {
      navigate("/badge");
    }
  };

  return (
    <div className="card h-100 p-0 radius-12">
      <div className="card-header bg-transparent border-bottom">
        <h6 className="text-primary-600 pb-2 mb-0">
          {id ? "Edit Badge" : "Create Badge"}
        </h6>
      </div>
      <div className="card-body p-24">
        <form onSubmit={handleSubmit}>
          <div className="row gy-3">
            <div className="col-12">
              <label className="form-label">
                Type <span className="text-danger-600">*</span>
              </label>
              <select
                className="form-select"
                value={type}
                onChange={(e) => {
                  setType(e.target.value);
                  setErrors({ ...errors, type: "" });
                }}
              >
                <option value="" disabled>
                  Select Type
                </option>
                <option value="Chapter">Chapter</option>
                <option value="Member">Member</option>
              </select>
              {errors.type && (
                <p className="text-danger-600 text-sm mt-1">{errors.type}</p>
              )}
            </div>

            <div className="col-12">
              <label className="form-label">
                Badge Name <span className="text-danger-600">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Badge Name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setErrors({ ...errors, name: "" });
                }}
              />
              {errors.name && (
                <p className="text-danger-600 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            <div className="col-12 my-3">
              <label className="form-label">
                Badge Image <span className="text-danger-600">*</span>
              </label>

              {!imagePath && !selectedFile && !isUploading && (
                <div className="position-relative">
                  <input
                    type="file"
                    className="form-control"
                    accept="image/*"
                    onChange={(e) => {
                      handleFileChange(e);
                      setErrors({ ...errors, image: "" });
                    }}
                  />
                  {errors.image && (
                    <p className="text-danger-600 text-sm mt-1">
                      {errors.image}
                    </p>
                  )}
                </div>
              )}

              {isUploading && (
                <div className="text-center">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Uploading...</span>
                  </div>
                  <p className="mt-2">Uploading...</p>
                </div>
              )}

              {(imagePath || selectedFile) && !isUploading && (
                <div className="d-flex align-items-center justify-content-between p-3 border rounded bg-light-600">
                  <div className="d-flex align-items-center gap-3">
                    <div className="w-100-px h-100-px rounded-8 overflow-hidden border">
                      <img
                        src={preview || imagePath}
                        alt="Preview"
                        className="w-100 h-100 object-fit-cover"
                        onError={(e) => {}}
                      />
                    </div>
                    <div>
                      <p className="text-primary-600 mb-0 fw-medium">
                        {selectedFile ? "New Image Selected" : "Uploaded Image"}
                      </p>
                      <p
                        className="text-secondary-400 text-sm mb-0 text-truncate"
                        style={{ maxWidth: "200px" }}
                      >
                        {selectedFile
                          ? selectedFile.name
                          : imagePath.split("/").pop()}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="btn btn-icon btn-danger-100 text-danger-600 rounded-circle"
                    onClick={handleDeleteImage}
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

            <div className="col-12 d-flex justify-content-start gap-3 mt-4">
              <Link to="/badge" className="btn btn-outline-danger-600 px-32">
                Cancel
              </Link>
              <button
                type="submit"
                className="btn btn-primary-600 px-32"
                disabled={isUploading}
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BadgeCreateLayer;
