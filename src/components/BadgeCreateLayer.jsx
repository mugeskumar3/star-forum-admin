import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react/dist/iconify.js';
import { MockDataService } from '../helper/MockDataService';

const BadgeCreateLayer = () => {
    const navigate = useNavigate();
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);

    // Form state
    const [type, setType] = useState('');
    const [name, setName] = useState('');

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const fileObj = e.target.files[0];
            const reader = new FileReader();

            // Read file as Data URL (Mock storage for images)
            reader.onloadend = () => {
                setFile(reader.result); // This matches the format we need for local storage mock
                setPreview(URL.createObjectURL(fileObj)); // For immediate preview
            };
            reader.readAsDataURL(fileObj);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const badgeData = {
            type,
            name,
            image: file // Saving Base64 string to local storage
        };

        MockDataService.saveBadge(badgeData);
        navigate('/badge');
    };

    return (
        <div className="card h-100 p-0 radius-12">

            {/* 🔹 HEADER */}
            <div className="card-header bg-transparent border-bottom">
                <h6 className="text-primary-600 pb-2 mb-0">Badge Creation</h6>
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
                            <div className="position-relative">
                                <input
                                    type="file"
                                    className="form-control"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    required
                                />
                            </div>

                            {preview && (
                                <div className="mt-2 text-center">
                                    <img
                                        src={preview}
                                        alt="Preview"
                                        className="w-100-px h-100-px object-fit-cover rounded-8 border"
                                    />
                                </div>
                            )}
                        </div>

                        <div className="col-12 d-flex justify-content-start gap-3 mt-4">
                            <Link
                                to="/badge"
                                className="btn btn-outline-danger-600 px-32"
                            >
                                Cancel
                            </Link>
                            <button type="submit" className="btn btn-primary-600 px-32">
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
