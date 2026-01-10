import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Icon } from '@iconify/react/dist/iconify.js';
import { MockDataService } from '../helper/MockDataService';

const OrganisationFormLayer = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // Get ID from URL for edit mode

    // Mock "Memory" for Zones (This would normally come from an API)
    const [knownZones, setKnownZones] = useState(['Tamil Nadu', 'Kerala', 'Karnataka']);

    const [formData, setFormData] = useState({
        zone: '',
        region: '',
        ed: '',
        rds: [] // Array to store multiple RD names
    });

    const [rdInput, setRdInput] = useState('');

    useEffect(() => {
        if (id) {
            const org = MockDataService.getOrganisationById(id);
            if (org) {
                setFormData(org);
            }
        }
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle RD Tag Input (Enter key to add)
    const handleRdKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (rdInput.trim() !== '') {
                setFormData({
                    ...formData,
                    rds: [...formData.rds, rdInput.trim()]
                });
                setRdInput('');
            }
        }
    };

    const removeRd = (indexToRemove) => {
        setFormData({
            ...formData,
            rds: formData.rds.filter((_, index) => index !== indexToRemove)
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Simulating "Remembering" the Zone if it's new
        if (formData.zone && !knownZones.includes(formData.zone)) {
            const newZones = [...knownZones, formData.zone];
            setKnownZones(newZones);
        }

        MockDataService.saveOrganisation(formData);

        // Redirect back to list
        navigate('/master-creation/organisation');
    };

    return (
        <div className="card h-100 p-0 radius-12 col-lg-10 mx-auto">
            {/* Card Header with Title and optional back button */}
            <div className="card-header border-bottom bg-base py-16 px-24 d-flex align-items-center justify-content-between">
                <h5 className="text-lg fw-semibold mb-0">Create Organisation</h5>
                <Link to="/master-creation/organisation" className="btn btn-outline-secondary btn-sm">
                    Back to List
                </Link>
            </div>

            <div className="card-body p-24">
                <form onSubmit={handleSubmit}>
                    <div className="row gy-4">
                        {/* Column 1 */}
                        <div className="col-md-6">
                            <div className="mb-4">
                                <label className="form-label fw-medium">Zone <span className="text-danger-600">*</span></label>
                                <input
                                    list="zone-options"
                                    name="zone"
                                    className="form-control"
                                    placeholder="Enter or Select Zone"
                                    value={formData.zone}
                                    onChange={handleInputChange}
                                    required
                                />
                                <datalist id="zone-options">
                                    {knownZones.map((z, i) => (
                                        <option key={i} value={z} />
                                    ))}
                                </datalist>
                                <div className="form-text">Select from dropdown or type new zone</div>
                            </div>

                            <div className="mb-4">
                                <label className="form-label fw-medium">ED (Executive Director) <span className="text-danger-600">*</span></label>
                                <input
                                    type="text"
                                    name="ed"
                                    className="form-control"
                                    placeholder="Enter ED Name"
                                    value={formData.ed}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                        </div>

                        {/* Column 2 */}
                        <div className="col-md-6">
                            <div className="mb-4">
                                <label className="form-label fw-medium">Region <span className="text-danger-600">*</span></label>
                                <input
                                    type="text"
                                    name="region"
                                    className="form-control"
                                    placeholder="Enter Region"
                                    value={formData.region}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            {/* RD Multi-Select - Placed in second column */}
                            <div className="mb-4" style={{ marginTop: "30px" }}>
                                <label className="form-label fw-medium">RD (Regional Director) <span className="text-danger-600">*</span></label>
                                <div className="form-control d-flex flex-wrap gap-2 align-items-center min-height-48">
                                    {formData.rds.map((rd, index) => (
                                        <span key={index} className="badge bg-primary-100 text-primary-600 radius-4 text-sm d-flex align-items-center gap-1">
                                            {rd}
                                            <Icon
                                                icon="iconamoon:close-bold"
                                                className="cursor-pointer fs-6"
                                                onClick={() => removeRd(index)}
                                            />
                                        </span>
                                    ))}
                                    <input
                                        type="text"
                                        className="border-0 bg-transparent flex-grow-1"
                                        style={{ outline: "none", minWidth: "100px" }}
                                        placeholder={formData.rds.length === 0 ? "Type RD Name and Press Enter" : ""}
                                        value={rdInput}
                                        onChange={(e) => setRdInput(e.target.value)}
                                        onKeyDown={handleRdKeyDown}
                                    />
                                </div>
                                <div className="form-text">Type a name and press <strong>Enter</strong> to add multiple RDs</div>
                            </div>
                        </div>

                        {/* Full Width Buttons */}
                        <div className="col-12 mt-4 pt-4 border-top">
                            <div className="d-flex justify-content-end gap-3">
                                <Link to="/master-creation/organisation" className="btn btn-outline-secondary px-32">Cancel</Link>
                                <button type="submit" className="btn btn-primary px-32">
                                    <i className="fas fa-save me-2"></i>Save Organisation
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default OrganisationFormLayer;
