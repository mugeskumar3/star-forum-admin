import { Icon } from '@iconify/react/dist/iconify.js';
import React from 'react';
import { Link } from 'react-router-dom';

const AdminUserViewLayer = () => {
    return (
        <div className="card border-0 shadow-lg rounded-3 overflow-hidden">
            <div className="card-header bg-white py-4 border-bottom">
                <div className="d-flex justify-content-between align-items-center">
                    <div>
                        <h4 className="fw-bold mb-0 text-dark">
                            <i className="fas fa-user-tie text-primary me-2"></i>
                            Admin Profile
                        </h4>
                    </div>
                    <div className="d-flex gap-2">
                        <Link to="/admin-registration" className="btn btn-outline-secondary btn-sm">
                            <i className="fas fa-arrow-left me-1"></i>Back
                        </Link>
                        {/* <button className="btn btn-primary btn-sm">
                            <i className="fas fa-edit me-1"></i>Edit
                        </button> */}
                    </div>
                </div>
            </div>

            <div className="row g-0">
                {/* Sidebar */}
                <div className="col-lg-3 bg-light">
                    <div className="p-4 text-center">
                        <div className="position-relative d-inline-block mb-4">
                            <div className="avatar-xxl rounded-circle border border-4 border-white shadow">
                                <div className="w-100 h-100 rounded-circle bg-primary d-flex align-items-center justify-content-center">
                                    <span className="text-white fs-2 fw-bold">UN</span>
                                </div>
                            </div>
                        </div>

                        <h4 className="fw-bold mb-2">User Name</h4>
                        <p className="text-muted mb-4">Administrator</p>

                        {/* <div className="d-grid gap-2">
                            <button className="btn btn-outline-primary">
                                <i className="fas fa-envelope me-2"></i>Send Message
                            </button>
                            <button className="btn btn-outline-secondary">
                                <i className="fas fa-download me-2"></i>Export Data
                            </button>
                        </div> */}
                    </div>
                </div>

                {/* Main Content */}
                <div className="col-lg-9">
                    <div className="p-4">
                        <h5 className="fw-bold mb-4 border-bottom pb-3">Profile Details</h5>

                        <div className="row g-4">
                            <div className="col-md-6">
                                <div className="info-box p-3 border rounded bg-white">
                                    <div className="d-flex align-items-center">
                                        <div className="icon-box bg-primary bg-opacity-10 p-3 rounded me-3">
                                            <i className="fas fa-user text-primary"></i>
                                        </div>
                                        <div>
                                            <p className="text-muted small mb-1">Full Name</p>
                                            <p className="fw-bold mb-0">User Name</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="info-box p-3 border rounded bg-white">
                                    <div className="d-flex align-items-center">
                                        <div className="icon-box bg-info bg-opacity-10 p-3 rounded me-3">
                                            <i className="fas fa-building text-info"></i>
                                        </div>
                                        <div>
                                            <p className="text-muted small mb-1">Company</p>
                                            <p className="fw-bold mb-0">Company Name Inc.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="info-box p-3 border rounded bg-white">
                                    <div className="d-flex align-items-center">
                                        <div className="icon-box bg-success bg-opacity-10 p-3 rounded me-3">
                                            <i className="fas fa-phone text-success"></i>
                                        </div>
                                        <div>
                                            <p className="text-muted small mb-1">Mobile Number</p>
                                            <p className="fw-bold mb-0">+1 234 567 890</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="info-box p-3 border rounded bg-white">
                                    <div className="d-flex align-items-center">
                                        <div className="icon-box bg-warning bg-opacity-10 p-3 rounded me-3">
                                            <i className="fas fa-envelope text-warning"></i>
                                        </div>
                                        <div>
                                            <p className="text-muted small mb-1">Email Address</p>
                                            <p className="fw-bold mb-0">user@example.com</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="info-box p-3 border rounded bg-white">
                                    <div className="d-flex align-items-center">
                                        <div className="icon-box bg-danger bg-opacity-10 p-3 rounded me-3">
                                            <i className="fas fa-user-tag text-danger"></i>
                                        </div>
                                        <div>
                                            <p className="text-muted small mb-1">User Role</p>
                                            <p className="fw-bold mb-0">Administrator</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="info-box p-3 border rounded bg-white">
                                    <div className="d-flex align-items-center">
                                        <div className="icon-box bg-dark bg-opacity-10 p-3 rounded me-3">
                                            <i className="fas fa-toggle-on text-dark"></i>
                                        </div>
                                        <div>
                                            <p className="text-muted small mb-1">Status</p>
                                            <p className="fw-bold mb-0">Active</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-12 mt-4">
                                <h6 className="fw-bold mb-3 text-primary border-bottom pb-2">Organisation Details</h6>
                            </div>

                            <div className="col-md-6">
                                <div className="info-box p-3 border rounded bg-white">
                                    <div className="d-flex align-items-center">
                                        <div className="icon-box bg-primary bg-opacity-10 p-3 rounded me-3">
                                            <i className="fas fa-map-marker-alt text-primary"></i>
                                        </div>
                                        <div>
                                            <p className="text-muted small mb-1">Zone</p>
                                            <p className="fw-bold mb-0">North Zone</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="info-box p-3 border rounded bg-white">
                                    <div className="d-flex align-items-center">
                                        <div className="icon-box bg-secondary bg-opacity-10 p-3 rounded me-3">
                                            <i className="fas fa-layer-group text-secondary"></i>
                                        </div>
                                        <div>
                                            <p className="text-muted small mb-1">Region</p>
                                            <p className="fw-bold mb-0">National Capital Region</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="info-box p-3 border rounded bg-white">
                                    <div className="d-flex align-items-center">
                                        <div className="icon-box bg-info bg-opacity-10 p-3 rounded me-3">
                                            <i className="fas fa-user-shield text-info"></i>
                                        </div>
                                        <div>
                                            <p className="text-muted small mb-1">ED (Executive Director)</p>
                                            <p className="fw-bold mb-0">ED John Doe</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="info-box p-3 border rounded bg-white">
                                    <div className="d-flex align-items-center">
                                        <div className="icon-box bg-warning bg-opacity-10 p-3 rounded me-3">
                                            <i className="fas fa-user-tie text-warning"></i>
                                        </div>
                                        <div>
                                            <p className="text-muted small mb-1">RD (Regional Director)</p>
                                            <p className="fw-bold mb-0">RD Michael Brown</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-12 mt-4">
                                <h6 className="fw-bold mb-3 text-primary border-bottom pb-2">Additional Information</h6>
                            </div>

                            <div className="col-12">
                                <div className="info-box p-3 border rounded bg-white">
                                    <div className="d-flex align-items-start">
                                        <div className="icon-box bg-danger bg-opacity-10 p-3 rounded me-3">
                                            <i className="fas fa-comment-alt text-danger"></i>
                                        </div>
                                        <div>
                                            <p className="text-muted small mb-1">New Message</p>
                                            <p className="mb-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminUserViewLayer;
