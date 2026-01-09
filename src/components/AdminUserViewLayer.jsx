import { Icon } from '@iconify/react/dist/iconify.js';
import React from 'react';
import { Link } from 'react-router-dom';

const AdminUserViewLayer = () => {
    return (
        <div className="card h-100 p-0 radius-12 col-lg-8 mx-auto">
            <div className="card-header border-bottom bg-base py-16 px-24 d-flex align-items-center justify-content-between">
                <h6 className="text-lg fw-semibold mb-0">User Details</h6>
                <Link to="/admin-registration" className="btn btn-outline-secondary px-32">
                    Back
                </Link>
            </div>
            <div className="card-body p-24">
                <div className="row justify-content-center mb-24">
                    <div className="col-auto text-center">
                        <div className="w-120-px h-120-px rounded-circle overflow-hidden border border-secondary-light d-flex justify-content-center align-items-center bg-neutral-100 mx-auto">
                            <span className="text-secondary-light">150X150</span>
                        </div>
                        <h6 className="mt-16 mb-0">User Name</h6>
                        <span className="text-secondary-light">Admin</span>
                    </div>
                </div>

                <div className="row gy-3">
                    <div className="col-12">
                        <label className="form-label fw-semibold">Name</label>
                        <p className="border-bottom pb-8 text-secondary-light">User Name</p>
                    </div>
                    <div className="col-12">
                        <label className="form-label fw-semibold">Company Name</label>
                        <p className="border-bottom pb-8 text-secondary-light">Company Name Inc.</p>
                    </div>
                    <div className="col-12">
                        <label className="form-label fw-semibold">Mobile Number</label>
                        <p className="border-bottom pb-8 text-secondary-light">+1 234 567 890</p>
                    </div>
                    <div className="col-12">
                        <label className="form-label fw-semibold">Email</label>
                        <p className="border-bottom pb-8 text-secondary-light">user@example.com</p>
                    </div>
                    <div className="col-12">
                        <label className="form-label fw-semibold">Role</label>
                        <p className="border-bottom pb-8 text-secondary-light">Admin</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminUserViewLayer;
