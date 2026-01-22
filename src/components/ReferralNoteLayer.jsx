import React from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';
import './ThankYouSlipLayer.css';

const ReferralNoteLayer = () => {
    // Mock data
    const chapters = [
        {
            id: 1,
            name: 'ARAM Chapter',
            count: 154,
            members: [
                { id: 1, name: 'Raj Kumar', company: 'Tech Solutions Inc', category: 'IT Services', count: 45 },
                { id: 2, name: 'Priya Sharma', company: 'Design Studio', category: 'Graphic Design', count: 38 },
                { id: 3, name: 'Arun Vijay', company: 'Marketing Pro', category: 'Digital Marketing', count: 35 },
                { id: 4, name: 'Sneha Reddy', company: 'Finance Corp', category: 'Financial Services', count: 22 },
                { id: 5, name: 'Karthik M', company: 'Build Tech', category: 'Construction', count: 14 }
            ]
        },
        {
            id: 2,
            name: 'Arni Chapter',
            count: 50,
            members: [
                { id: 6, name: 'Ramesh K', company: 'Auto Parts Ltd', category: 'Automobile', count: 18 },
                { id: 7, name: 'Lakshmi P', company: 'Fashion Hub', category: 'Retail', count: 15 },
                { id: 8, name: 'Vignesh S', company: 'Food Express', category: 'Food & Beverage', count: 17 }
            ]
        },
        {
            id: 4,
            name: 'Coimbatore Chapter',
            count: 112,
            members: [
                { id: 11, name: 'Murugan G', company: 'Pump Works', category: 'Industry', count: 60 },
                { id: 12, name: 'Santhosh M', company: 'Jewels & Co', category: 'Retail', count: 52 }
            ]
        }
    ];

    return (
        <div className="d-flex flex-column gap-4">
            {/* Header section */}
            <div className="d-flex align-items-center justify-content-between mb-24 px-12">
                <div className="d-flex align-items-center">
                    <div className="bg-danger-600 radius-2" style={{ width: '4px', height: '32px' }}></div>
                    <div className="ms-12">
                        <h5 className="fw-bold mb-0" style={{ color: '#101828' }}>Referrals Report</h5>
                        <p className="text-sm text-secondary-light mb-0">Chapter-wise referral details</p>
                    </div>
                </div>
            </div>

            {/* Grid of Chapter Slips */}
            <div className="row gy-3 px-12">
                {chapters.map(chapter => (
                    <div key={chapter.id} className="col-xl-3 col-lg-4 col-md-6 col-12">
                        <div className="card h-100 p-0 radius-12 shadow-hover-sm transition-2 overflow-hidden border-0">
                            {/* Chapter Header with Primary Gradient */}
                            <div className="p-12 bg-primary-600 text-white">
                                <div className="d-flex justify-content-between align-items-center mb-1">
                                    <h6 className="fw-bold mb-0 text-white text-truncate" style={{ maxWidth: '140px' }}>{chapter.name}</h6>
                                    <div className="w-28-px h-28-px rounded-circle bg-white-20 d-flex align-items-center justify-content-center">
                                        <Icon icon="solar:share-circle-outline" fontSize={16} />
                                    </div>
                                </div>
                                <div className="mt-8">
                                    <span className="text-xxs opacity-75 text-uppercase spacing-1 d-block">Total Referrals</span>
                                    <h5 className="fw-bolder mb-0 text-white">{chapter.count}</h5>
                                </div>
                            </div>

                            {/* Members List */}
                            <div className="card-body p-12 bg-base">
                                <h6 className="text-xxs fw-bold text-secondary-light text-uppercase spacing-1 mb-12">Referral Activity</h6>
                                <div className="d-flex flex-column gap-2">
                                    {chapter.members.map(member => (
                                        <div
                                            key={member.id}
                                            className="p-10 radius-8 border transition-2 hover-bg-neutral-50"
                                            style={{ borderColor: '#f5f5f5' }}
                                        >
                                            <div className="d-flex justify-content-between align-items-start gap-1">
                                                <div className="flex-grow-1 overflow-hidden">
                                                    <h6 className="text-sm fw-bold mb-0 text-dark text-truncate">{member.name}</h6>
                                                    <span className="text-xxs text-secondary-light d-block text-truncate">
                                                        {member.category}
                                                    </span>
                                                </div>
                                                <div className="text-end">
                                                    <span className="text-primary-600 fw-bold text-sm d-block">{member.count}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Card Footer Action */}
                            <div className="card-footer bg-neutral-50 border-top-0 p-8 text-center">
                                <button type="button" className="btn p-0 text-primary-600 fw-bold text-xs hover-text-primary-700 d-flex align-items-center gap-1 mx-auto">
                                    View Full List
                                    <Icon icon="solar:arrow-right-outline" fontSize={12} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ReferralNoteLayer;
