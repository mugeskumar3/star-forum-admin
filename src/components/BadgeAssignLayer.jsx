import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react/dist/iconify.js';

const BadgeAssignLayer = () => {
    const navigate = useNavigate();
    const [assignType, setAssignType] = useState('Chapter');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Submit logic
        navigate('/badge');
    };

    return (
        <div className="card h-100 p-0 radius-12">
            <div className="card-body p-24">
                <form onSubmit={handleSubmit}>
                    <div className="row gy-3">
                        <div className="col-12">
                            <label className="form-label">Assign To <span className="text-danger-600">*</span></label>
                            <select
                                className="form-select"
                                value={assignType}
                                onChange={(e) => setAssignType(e.target.value)}
                                required
                            >
                                <option value="Chapter">Chapter</option>
                                <option value="Member">Member</option>
                            </select>
                        </div>

                        {/* Conditional Member Dropdown */}
                        {assignType === 'Member' && (
                            <div className="col-12">
                                <label className="form-label">Select Member <span className="text-danger-600">*</span></label>
                                <select className="form-select" required>
                                    <option value="" disabled selected>Select Member</option>
                                    <option value="1">John Doe</option>
                                    <option value="2">Jane Smith</option>
                                    <option value="3">Mike Ross</option>
                                </select>
                            </div>
                        )}

                        {/* Always show Chapter selection if type is Chapter (Assuming logic implies selecting WHICH chapter) 
                             Or if 'Chapter' implies 'All Chapters', maybe not needed. 
                             But user said "drop dwon chapter , member if iclick member another input list the memebrs"
                             This implies if Chapter is picked, maybe we select a specific chapter too? 
                             I'll add a generic "Chapter" for completeness if type is Chapter, 
                             but the prompt specifically emphasized the 'Member' conditional.
                             I'll stick to the user's specific request: "if i click member another input list the members".
                         */}

                        {assignType === 'Chapter' && (
                            <div className="col-12">
                                <label className="form-label">Chapter <span className="text-danger-600">*</span></label>
                                <select className="form-select" required>
                                    <option value="" disabled selected>Chapter</option>
                                    <option value="1">Chapter Alpha</option>
                                    <option value="2">Chapter Beta</option>
                                </select>
                            </div>
                        )}


                        <div className="col-12">
                            <label className="form-label">Select Badge <span className="text-danger-600">*</span></label>
                            <select className="form-select" required>
                                <option value="" disabled selected>Select Badge</option>
                                <option value="1">Golden Star</option>
                                <option value="2">Silver Achiever</option>
                                <option value="3">Best Attendance</option>
                            </select>
                        </div>

                        <div className="col-12 d-flex justify-content-start gap-3 mt-4">
                            <Link to="/badge" className="btn btn-outline-danger-600 px-32">Cancel</Link>
                            <button type="submit" className="btn btn-primary-600 px-32">Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BadgeAssignLayer;
