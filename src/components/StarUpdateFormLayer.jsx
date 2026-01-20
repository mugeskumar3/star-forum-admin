import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react/dist/iconify.js';

const StarUpdateFormLayer = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        memberName: '',
        achievement: '',
        achievementDate: '',
        description: '',
        image: null
    });

    const [preview, setPreview] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setFormData({ ...formData, image: file });
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Star Update Data:', formData);
        // Add your save logic here
        alert('Star Update submitted successfully!');
        navigate('/star-update');
    };

    return (
        <div className="card h-100 p-0 radius-12">
            <div className="card-header bg-transparent border-bottom px-24 py-16">
                <h6 className="text-primary-600 pb-2 mb-0">
                    <Icon icon="ri:star-line" className="me-2" />
                    Star Update
                </h6>
            </div>

            <div className="card-body p-24">
                <form onSubmit={handleSubmit}>
                    <div className="row gy-4">
                        <div className="col-md-6">
                            <div className="mb-4">
                                <label className="form-label fw-medium">Member Name <span className="text-danger-600">*</span></label>
                                <input
                                    type="text"
                                    name="memberName"
                                    className="form-control"
                                    placeholder="Enter member name"
                                    value={formData.memberName}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label className="form-label fw-medium">Achievement Type <span className="text-danger-600">*</span></label>
                                <select
                                    name="achievement"
                                    className="form-select"
                                    value={formData.achievement}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="">Select achievement type</option>
                                    <option value="Business Milestone">Business Milestone</option>
                                    <option value="Award">Award</option>
                                    <option value="Recognition">Recognition</option>
                                    <option value="Community Service">Community Service</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>

                            <div className="mb-4">
                                <label className="form-label fw-medium">Achievement Date <span className="text-danger-600">*</span></label>
                                <input
                                    type="date"
                                    name="achievementDate"
                                    className="form-control"
                                    value={formData.achievementDate}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="mb-4">
                                <label className="form-label fw-medium">Achievement Photo</label>
                                <input
                                    type="file"
                                    className="form-control"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                />
                                <div className="form-text">Upload a photo of the achievement (optional)</div>
                            </div>

                            {preview && (
                                <div className="mb-4">
                                    <label className="form-label fw-medium">Preview</label>
                                    <div className="text-center">
                                        <img
                                            src={preview}
                                            alt="Preview"
                                            className="img-fluid rounded-8 border"
                                            style={{ maxHeight: '200px' }}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="col-12">
                            <div className="mb-4">
                                <label className="form-label fw-medium">Description <span className="text-danger-600">*</span></label>
                                <textarea
                                    name="description"
                                    className="form-control"
                                    rows="6"
                                    placeholder="Describe the achievement in detail"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    required
                                ></textarea>
                            </div>
                        </div>

                        <div className="col-12 mt-4 pt-4 border-top">
                            <div className="d-flex justify-content-end gap-3">
                                <Link to="/star-update" className="btn btn-outline-secondary px-32">Cancel</Link>
                                <button type="submit" className="btn btn-primary px-32" style={{ backgroundColor: "#C4161C", borderColor: "#C4161C" }}>
                                    <Icon icon="ri:star-fill" className="me-2" />
                                    Publish Star Update
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default StarUpdateFormLayer;
