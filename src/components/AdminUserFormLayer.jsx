import { Icon } from '@iconify/react/dist/iconify.js';
import React from 'react';
import { Link } from 'react-router-dom';

const AdminUserFormLayer = () => {
    return (
        <div className="card h-100 p-0 radius-12 col-lg-8 mx-auto">
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
                    <div className="col-12">
                        <label className="form-label">Name <span className="text-danger-600">*</span></label>
                        <input type="text" className="form-control" placeholder="" />
                    </div>
                    <div className="col-12">
                        <label className="form-label">Company Name <span className="text-danger-600">*</span></label>
                        <input type="text" className="form-control" placeholder="" />
                    </div>
                    <div className="col-12">
                        <label className="form-label">Mobile Number <span className="text-danger-600">*</span></label>
                        <input type="text" className="form-control" placeholder="" />
                    </div>
                    <div className="col-12">
                        <label className="form-label">Email <span className="text-danger-600">*</span></label>
                        <input type="email" className="form-control" placeholder="" />
                    </div>
                    <div className="col-12">
                        <label className="form-label">Username <span className="text-danger-600">*</span></label>
                        <input type="text" className="form-control" placeholder="" />
                    </div>
                    <div className="col-12">
                        <label className="form-label">PIN <span className="text-danger-600">*</span></label>
                        <div className="position-relative">
                            <input type="password" className="form-control" placeholder="Enter 4-digit PIN" />
                            <span className="position-absolute top-50 end-0 translate-middle-y me-16 cursor-pointer text-secondary-light">
                                <Icon icon="solar:eye-outline" />
                            </span>
                        </div>
                        <small className="text-secondary-light">Must be exactly 4 digits (numbers only)</small>
                    </div>
                    <div className="col-12">
                        <label className="form-label">Role <span className="text-danger-600">*</span></label>
                        <select className="form-select">
                            <option value="" disabled selected>Select Role</option>
                            <option value="Admin">Admin</option>
                            <option value="Editor">Editor</option>
                            <option value="User">User</option>
                        </select>
                    </div>

                    <div className="col-12 d-flex justify-content-center gap-3 mt-4">
                        <Link to="/admin-registration" className="btn btn-outline-danger-600 px-32">Cancel</Link>
                        <button type="submit" className="btn btn-primary-600 px-32">Save</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminUserFormLayer;
