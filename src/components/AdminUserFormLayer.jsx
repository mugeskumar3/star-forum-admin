import { Icon } from '@iconify/react/dist/iconify.js';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const AdminUserFormLayer = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEdit = !!id;

    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        mobile: '',
        email: '',
        pin: '',
        companyName: '',
        role: '',
        status: 'Active',
        message: '',
        zone: '',
        region: '',
        ed: '',
        rd: ''
    });

    // Mock ED and RD options - in a real app, fetch these from API
    const edOptions = ['ED John Doe', 'ED Jane Smith', 'ED Alex Wilson'];
    const rdOptions = ['RD Michael Brown', 'RD Sarah Connor', 'RD David Miller'];

    useEffect(() => {
        if (isEdit) {
            // Fetch user data if editing
            // axios.get(`/api/admin/${id}`).then(res => setFormData(res.data));
            console.log(`Fetching data for admin ID: ${id}`);
        }
    }, [isEdit, id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'pin') {
            // Only allow numbers and max 4 digits
            const cleanedValue = value.replace(/\D/g, '').slice(0, 4);
            setFormData(prev => ({ ...prev, [name]: cleanedValue }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation
        if (!formData.name || !formData.mobile || !formData.email || !formData.pin || !formData.companyName || !formData.role) {
            toast.error("Please fill in all required fields.");
            return;
        }

        if (formData.pin.length !== 4) {
            toast.error("PIN must be exactly 4 digits.");
            return;
        }

        setLoading(true);
        try {
            // API integration pattern
            const endpoint = isEdit ? `/api/admin/update/${id}` : '/api/admin/register';
            console.log(`Submitting to ${endpoint}`, formData);

            // Mocking API call for now since endpoint is not provided
            await new Promise(resolve => setTimeout(resolve, 1000));

            toast.success(isEdit ? "Admin updated successfully!" : "Admin registered successfully!");
            navigate('/admin-registration');
        } catch (error) {
            console.error("API Error:", error);
            toast.error("Failed to save admin. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="card h-100 p-0 radius-12">
            <div className="card-header bg-transparent border-bottom px-24 py-16">
                <h4 className="card-title mb-0">{isEdit ? 'Edit Admin' : 'Admin Registration'}</h4>
            </div>

            <div className="card-body p-24">
                <form onSubmit={handleSubmit}>
                    <div className="row gy-3">
                        {/* Section 1: Basic Information */}
                        <div className="col-12">
                            <h6 className="mb-3 text-primary-600 border-bottom pb-2">Basic Information</h6>
                        </div>

                        <div className="col-lg-6">
                            <div className="mb-3">
                                <label className="form-label">Name <span className="text-danger-600">*</span></label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Enter full name"
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Company Name <span className="text-danger-600">*</span></label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="companyName"
                                    value={formData.companyName}
                                    onChange={handleChange}
                                    placeholder="Enter company name"
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Phone Number <span className="text-danger-600">*</span></label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="mobile"
                                    value={formData.mobile}
                                    onChange={handleChange}
                                    placeholder="Enter mobile number"
                                />
                            </div>
                        </div>

                        <div className="col-lg-6">
                            <div className="mb-3">
                                <label className="form-label">Email <span className="text-danger-600">*</span></label>
                                <input
                                    type="email"
                                    className="form-control"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Enter email address"
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">PIN - Enter 4-digit Pin code <span className="text-danger-600">*</span></label>
                                <div className="position-relative">
                                    <input
                                        type="password"
                                        className="form-control"
                                        name="pin"
                                        value={formData.pin}
                                        onChange={handleChange}
                                        placeholder="4-digit PIN"
                                        maxLength={4}
                                    />
                                    <span className="position-absolute top-50 end-0 translate-middle-y me-16 cursor-pointer text-secondary-light">
                                        <Icon icon="solar:eye-outline" />
                                    </span>
                                </div>
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Role <span className="text-danger-600">*</span></label>
                                <select
                                    className="form-select"
                                    name="role"
                                    value={formData.role}
                                    onChange={handleChange}
                                >
                                    <option value="" disabled>Select Role</option>
                                    <option value="Admin">Admin</option>
                                    <option value="Executive">Executive</option>
                                    <option value="Director">Director</option>
                                </select>
                            </div>
                        </div>

                        {/* Section 2: Organisation Details */}
                        <div className="col-12 mt-4">
                            <h6 className="mb-3 text-primary-600 border-bottom pb-2">Create Organisation</h6>
                        </div>

                        <div className="col-lg-6">
                            <div className="mb-3">
                                <label className="form-label">Zone</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="zone"
                                    value={formData.zone}
                                    onChange={handleChange}
                                    placeholder="Enter zone"
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Region</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="region"
                                    value={formData.region}
                                    onChange={handleChange}
                                    placeholder="Enter region"
                                />
                            </div>
                        </div>

                        <div className="col-lg-6">
                            <div className="mb-3">
                                <label className="form-label">ED (Executive Director)</label>
                                <select
                                    className="form-select"
                                    name="ed"
                                    value={formData.ed}
                                    onChange={handleChange}
                                >
                                    <option value="">Select ED</option>
                                    {edOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                </select>
                            </div>

                            <div className="mb-3">
                                <label className="form-label">RD (Regional Director)</label>
                                <select
                                    className="form-select"
                                    name="rd"
                                    value={formData.rd}
                                    onChange={handleChange}
                                >
                                    <option value="">Select RD</option>
                                    {rdOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                </select>
                            </div>
                        </div>

                        {/* Section 3: Additional Details */}
                        <div className="col-12 mt-4">
                            <h6 className="mb-3 text-primary-600 border-bottom pb-2">Additional Status</h6>
                        </div>

                        <div className="col-lg-6">
                            <div className="mb-3">
                                <label className="form-label">Status</label>
                                <div className="d-flex gap-3 mt-2">
                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="status"
                                            id="active"
                                            value="Active"
                                            checked={formData.status === 'Active'}
                                            onChange={handleChange}
                                        />
                                        <label className="form-check-label" htmlFor="active">Active</label>
                                    </div>
                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="status"
                                            id="inactive"
                                            value="Inactive"
                                            checked={formData.status === 'Inactive'}
                                            onChange={handleChange}
                                        />
                                        <label className="form-check-label" htmlFor="inactive">Inactive</label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-6">
                            <div className="mb-3">
                                <label className="form-label">New Message</label>
                                <textarea
                                    className="form-control"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="Enter message"
                                    rows="3"
                                ></textarea>
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="col-12 d-flex justify-content-center gap-3 mt-4 pt-3 border-top">
                            <Link to="/admin-registration" className="btn btn-outline-danger-600 px-32">Cancel</Link>
                            <button
                                type="submit"
                                className="btn btn-primary-600 px-32"
                                disabled={loading}
                            >
                                {loading ? 'Saving...' : isEdit ? 'Update Admin' : 'Create Admin'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminUserFormLayer;
