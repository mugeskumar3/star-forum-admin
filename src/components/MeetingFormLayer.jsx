import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { MockDataService } from '../helper/MockDataService';

const MeetingFormLayer = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [formData, setFormData] = useState({
        topic: '',
        amount: '',
        chapter: '',
        hotelName: '',
        startDate: '',
        endDate: '',
        location: ''
    });

    useEffect(() => {
        if (id) {
            const meeting = MockDataService.getMeetingById(id);
            if (meeting) {
                setFormData(meeting);
            }
        }
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        MockDataService.saveMeeting(formData);
        navigate('/meeting-creation');
    };

    return (
        <div className="card h-100 p-0 radius-12 col-lg-10 mx-auto">
            <div className="card-header border-bottom bg-base py-16 px-24 d-flex align-items-center justify-content-between">
                <h5 className="text-lg fw-semibold mb-0">{id ? 'Edit Meeting' : 'Meeting Creation'}</h5>
                <Link to="/meeting-creation" className="btn btn-outline-secondary btn-sm">
                    Back to List
                </Link>
            </div>

            <div className="card-body p-24">
                <form onSubmit={handleSubmit}>
                    <div className="row gy-4">
                        {/* Column 1 */}
                        <div className="col-md-6">
                            <div className="mb-4">
                                <label className="form-label fw-medium">Topic <span className="text-danger-600">*</span></label>
                                <input
                                    type="text"
                                    name="topic"
                                    className="form-control"
                                    placeholder="Enter meeting topic"
                                    value={formData.topic}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label className="form-label fw-medium">Amount <span className="text-danger-600">*</span></label>
                                <input
                                    type="number"
                                    name="amount"
                                    className="form-control"
                                    placeholder="Enter amount"
                                    value={formData.amount}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label className="form-label fw-medium">Start Date & Time <span className="text-danger-600">*</span></label>
                                <input
                                    type="datetime-local"
                                    name="startDate"
                                    className="form-control"
                                    value={formData.startDate}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                        </div>

                        {/* Column 2 */}
                        <div className="col-md-6">
                            <div className="mb-4">
                                <label className="form-label fw-medium">Chapter(s) <span className="text-danger-600">*</span></label>
                                <select
                                    name="chapter"
                                    className="form-select"
                                    value={formData.chapter}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="">Select chapter...</option>
                                    <option value="ARAM">ARAM</option>
                                    <option value="Chapter Alpha">Chapter Alpha</option>
                                    <option value="Chapter Beta">Chapter Beta</option>
                                </select>
                            </div>

                            <div className="mb-4">
                                <label className="form-label fw-medium">Hotel Name <span className="text-danger-600">*</span></label>
                                <input
                                    type="text"
                                    name="hotelName"
                                    className="form-control"
                                    placeholder="Enter hotel name"
                                    value={formData.hotelName}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label className="form-label fw-medium">End Date & Time <span className="text-danger-600">*</span></label>
                                <input
                                    type="datetime-local"
                                    name="endDate"
                                    className="form-control"
                                    value={formData.endDate}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                        </div>

                        {/* Full Width Location Field */}
                        <div className="col-12">
                            <div className="mb-4">
                                <label className="form-label fw-medium">Location <span className="text-danger-600">*</span></label>
                                <input
                                    type="text"
                                    name="location"
                                    className="form-control"
                                    placeholder="Search for a location"
                                    value={formData.location}
                                    onChange={handleInputChange}
                                    required
                                />
                                <div className="form-text">Enter the meeting location address</div>
                            </div>
                        </div>

                        {/* Full Width Buttons */}
                        <div className="col-12 mt-4 pt-4 border-top">
                            <div className="d-flex justify-content-end gap-3">
                                <Link to="/meeting-creation" className="btn btn-outline-secondary px-32">Cancel</Link>
                                <button type="submit" className="btn btn-primary px-32" style={{ backgroundColor: "#C4161C", borderColor: "#C4161C" }}>
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default MeetingFormLayer;
