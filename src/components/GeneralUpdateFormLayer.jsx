import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const GeneralUpdateFormLayer = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: '',
        message: '',
        priority: '',
        publishDate: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('General Update Data:', formData);
        alert('General Update published successfully!');
        navigate('/general-update');
    };

    return (
        <div className="card h-100 p-0 radius-12">
            <div className="card-header bg-transparent border-bottom px-24 py-16">
                <h4 className="card-title mb-0">General Update</h4>
            </div>

            <div className="card-body p-24">
                <form onSubmit={handleSubmit}>
                    <div className="row gy-4">
                        <div className="col-md-6">
                            <div className="mb-4">
                                <label className="form-label fw-medium">Title <span className="text-danger-600">*</span></label>
                                <input
                                    type="text"
                                    name="title"
                                    className="form-control"
                                    placeholder="Enter update title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label className="form-label fw-medium">Priority <span className="text-danger-600">*</span></label>
                                <select
                                    name="priority"
                                    className="form-select"
                                    value={formData.priority}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="">Select priority</option>
                                    <option value="High">High</option>
                                    <option value="Medium">Medium</option>
                                    <option value="Low">Low</option>
                                </select>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="mb-4">
                                <label className="form-label fw-medium">Publish Date <span className="text-danger-600">*</span></label>
                                <input
                                    type="date"
                                    name="publishDate"
                                    className="form-control"
                                    value={formData.publishDate}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="col-12">
                            <div className="mb-4">
                                <label className="form-label fw-medium">Message <span className="text-danger-600">*</span></label>
                                <textarea
                                    name="message"
                                    className="form-control"
                                    rows="8"
                                    placeholder="Enter general update message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    required
                                ></textarea>
                            </div>
                        </div>

                        <div className="col-12 mt-4 pt-4 border-top">
                            <div className="d-flex justify-content-end gap-3">
                                <button type="submit" className="btn btn-primary px-32" style={{ backgroundColor: "#C4161C", borderColor: "#C4161C" }}>
                                    Publish Update
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default GeneralUpdateFormLayer;
