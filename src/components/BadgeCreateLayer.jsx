import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";
import ImageUploadApi from "../Api/ImageUploadApi";
import BadgeApi from "../Api/BadgeApi";
import ShowNotifications from "../helper/ShowNotifications";

const BadgeCreateLayer = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [imagePath, setImagePath] = useState("");
  const [isUploading, setIsUploading] = useState(false);

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
      // Accessing nested image path
      const imgPath = data.badgeImage?.imagePath || "";
      setImagePath(imgPath);
      setPreview(imgPath);
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
        setPreview(null);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!imagePath && !selectedFile) {
      ShowNotifications.showAlertNotification("Please upload an image.", false);
      return;
    }

    setIsUploading(true);
    let finalImagePath = imagePath;

    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);

      try {
        const uploadResponse = await ImageUploadApi.uploadImage({
          formData: formData,
          path: "badge",
        });

        if (uploadResponse.status) {
          finalImagePath = uploadResponse.response.data.path;
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
      image: finalImagePath,
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
          {id ? "Edit Badge" : "Badge Creation"}
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
                required
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="" disabled>
                  Select Type
                </option>
                <option value="Chapter">Chapter</option>
                <option value="Member">Member</option>
              </select>
            </div>

            <div className="col-12">
              <label className="form-label">
                Badge Name <span className="text-danger-600">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Badge Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="col-12">
              <label className="form-label">
                Badge Image <span className="text-danger-600">*</span>
              </label>

              {!imagePath && !selectedFile && !isUploading && (
                <div className="position-relative">
                  <input
                    type="file"
                    className="form-control"
                    accept="image/*"
                    onChange={handleFileChange}
                    required={!id}
                  />
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
