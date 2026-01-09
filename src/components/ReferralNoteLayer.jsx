import React from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';

const ReferralNoteLayer = () => {
    // Mock data
    const chapters = [
        {
            id: 1,
            name: 'ARAM',
            count: 154,
            members: [
                { id: 1, name: 'Raj Kumar', company: 'Tech Solutions Inc', category: 'IT Services', count: 45, avatar: null },
                { id: 2, name: 'Priya Sharma', company: 'Design Studio', category: 'Graphic Design', count: 38, avatar: null },
                { id: 3, name: 'Arun Vijay', company: 'Marketing Pro', category: 'Digital Marketing', count: 35, avatar: null },
                { id: 4, name: 'Sneha Reddy', company: 'Finance Corp', category: 'Financial Services', count: 22, avatar: null },
                { id: 5, name: 'Karthik M', company: 'Build Tech', category: 'Construction', count: 14, avatar: null }
            ]
        },
        {
            id: 2,
            name: 'Arni',
            count: 50,
            members: [
                { id: 6, name: 'Ramesh K', company: 'Auto Parts Ltd', category: 'Automobile', count: 18, avatar: null },
                { id: 7, name: 'Lakshmi P', company: 'Fashion Hub', category: 'Retail', count: 15, avatar: null },
                { id: 8, name: 'Vignesh S', company: 'Food Express', category: 'Food & Beverage', count: 17, avatar: null }
            ]
        }
    ];

    return (
        <div className="card h-100 p-0 radius-12">
            <div className="card-header border-bottom bg-base py-16 px-24">
                <h6 className="text-lg fw-semibold mb-0">Referrals</h6>
            </div>

            <div className="card-body p-24">
                <div className="row g-4">
                    {chapters.map((chapter) => (
                        <div key={chapter.id} className="col-lg-6 col-md-12">
                            <div className="card border shadow-sm h-100">
                                {/* Chapter Header */}
                                <div className="card-header text-white p-3 d-flex justify-content-between align-items-center" style={{
                                    background: 'linear-gradient(135deg, #B91C1C 0%, #7F1D1D 100%)'
                                }}>
                                    <h5 className="mb-0 fw-bold">{chapter.name}</h5>
                                    <div className="bg-white rounded-circle d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px' }}>
                                        <span className="text-dark fw-bold fs-5">{chapter.count}</span>
                                        <Icon icon="mdi:chevron-right" className="text-dark" />
                                    </div>
                                </div>

                                {/* Members List */}
                                <div className="card-body p-3">
                                    <div className="d-flex flex-column gap-3">
                                        {chapter.members.map((member) => (
                                            <div key={member.id} className="d-flex align-items-center justify-content-between p-2 border-bottom">
                                                <div className="d-flex align-items-center gap-3 flex-grow-1">
                                                    <div className="avatar-circle bg-neutral-200 rounded-circle d-flex align-items-center justify-content-center" style={{ width: '48px', height: '48px', flexShrink: 0 }}>
                                                        <Icon icon="mdi:account" className="text-neutral-600" style={{ fontSize: '24px' }} />
                                                    </div>
                                                    <div className="flex-grow-1">
                                                        <h6 className="mb-0 fw-semibold">{member.name}</h6>
                                                        <p className="mb-0 text-sm text-secondary-light fw-medium">{member.company}</p>
                                                        <p className="mb-0 text-xs text-secondary-light">{member.category}</p>
                                                    </div>
                                                </div>
                                                <div className="fw-bold fs-5 text-success" style={{ minWidth: '40px', textAlign: 'right' }}>
                                                    {member.count}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ReferralNoteLayer;
