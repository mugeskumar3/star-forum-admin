import { Icon } from '@iconify/react/dist/iconify.js';
import React from 'react';
import { Link } from 'react-router-dom';

const AdminUserFormLayer = () => {
    return (
        <div className="card h-100 p-0 radius-12">
            <div className="card-header bg-transparent border-bottom px-24 py-16">
                <h4 className="card-title mb-0">Add Admin</h4>
            </div>

            <div className="card-body p-24">
                <div className="row justify-content-center mb-24">
                    <div className="col-auto text-center">
                        <label className="form-label fw-semibold">Profile Image</label>
                        <div className="position-relative d-inline-block">
                            <div className="w-120-px h-120-px rounded-circle overflow-hidden border border-secondary-light d-flex justify-content-center align-items-center bg-neutral-100">
                                <span className="text-secondary-light">150X150</span>
                            </div>
                            <label htmlFor="profile-upload" className="position-absolute bottom-0 end-0 bg-base w-32-px h-32-px rounded-circle shadow-md d-flex justify-content-center align-items-center cursor-pointer border border-neutral-200">
                                <Icon icon="solar:camera-outline" className="text-primary-600" />
                                <input type="file" id="profile-upload" hidden />
                            </label>
                        </div>
                    </div>
                </div>

                <div className="row gy-3">
                    {/* Left Column */}
                    <div className="col-lg-6">
                        <div className="mb-3">
                            <label className="form-label">Name <span className="text-danger-600">*</span></label>
                            <input type="text" className="form-control" placeholder="Enter full name" />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Company Name <span className="text-danger-600">*</span></label>
                            <input type="text" className="form-control" placeholder="Enter company name" />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Mobile Number <span className="text-danger-600">*</span></label>
                            <input type="text" className="form-control" placeholder="Enter mobile number" />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Email <span className="text-danger-600">*</span></label>
                            <input type="email" className="form-control" placeholder="Enter email address" />
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="col-lg-6">
                        <div className="mb-3">
                            <label className="form-label">Username <span className="text-danger-600">*</span></label>
                            <input type="text" className="form-control" placeholder="Enter username" />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">PIN <span className="text-danger-600">*</span></label>
                            <div className="position-relative">
                                <input type="password" className="form-control" placeholder="Enter 4-digit PIN" />
                                <span className="position-absolute top-50 end-0 translate-middle-y me-16 cursor-pointer text-secondary-light">
                                    <Icon icon="solar:eye-outline" />
                                </span>
                            </div>
                            <small className="text-secondary-light">Must be exactly 4 digits (numbers only)</small>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Role <span className="text-danger-600">*</span></label>
                            <select className="form-select">
                                <option value="" disabled selected>Select Role</option>
                                <option value="Admin">Admin</option>
                                <option value="Editor">Editor</option>
                                <option value="User">User</option>
                            </select>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Status</label>
                            <div className="d-flex gap-3">
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="status" id="active" defaultChecked />
                                    <label className="form-check-label" htmlFor="active">Active</label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="status" id="inactive" />
                                    <label className="form-check-label" htmlFor="inactive">Inactive</label>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Full Width Buttons */}
                    <div className="col-12 d-flex justify-content-center gap-3 mt-4 pt-3 border-top">
                        <Link to="/admin-registration" className="btn btn-outline-danger-600 px-32">Cancel</Link>
                        <button type="submit" className="btn btn-primary-600 px-32">Save Admin</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminUserFormLayer;
