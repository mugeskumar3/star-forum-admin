import React from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';
import './ThankYouSlipLayer.css';

const VisitorsReportLayer = () => {
    const visitorsData = {
        chapters: [
            {
                id: 1,
                name: 'ARAM Chapter',
                count: 60,
                members: [
                    { id: 1, name: 'Logarajan S P', company: 'e-intellisafe & Security', category: 'CCTV & Security', count: 15 },
                    { id: 2, name: 'Mathiarasu M', company: 'TECHMAXX ENGINEERING', category: 'Fire & Safety', count: 12 },
                    { id: 3, name: 'Mano Neelamegam', company: 'WUDFE INC', category: 'Interior Designer', count: 18 },
                    { id: 4, name: 'Kumar Raj S', company: 'Insure Tech Serv', category: 'General Insurance', count: 15 }
                ]
            },
            {
                id: 2,
                name: 'Arni Chapter',
                count: 77,
                members: [
                    { id: 5, name: 'Ramesh Kumar', company: 'Auto Solutions', category: 'Automobile', count: 25 },
                    { id: 6, name: 'Priya Lakshmi', company: 'Fashion Trends', category: 'Retail', count: 30 },
                    { id: 7, name: 'Vijay S', company: 'Tech Innovations', category: 'IT Services', count: 22 }
                ]
            },
            {
                id: 3,
                name: 'Salem Chapter',
                count: 45,
                members: [
                    { id: 8, name: 'Anbu Selvan', company: 'Textile Hub', category: 'Manufacturing', count: 25 },
                    { id: 9, name: 'Revathi S', company: 'Organic Foods', category: 'FMCG', count: 20 }
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
        ]
    };

    return (
        <div className="d-flex flex-column gap-4">
            {/* Header section */}
            <div className="d-flex align-items-center justify-content-between mb-24 px-12">
                <div className="d-flex align-items-center">
                    <div className="bg-danger-600 radius-2" style={{ width: '4px', height: '32px' }}></div>
                    <div className="ms-12">
                        <h5 className="fw-bold mb-0" style={{ color: '#101828' }}>Visitors Report</h5>
                        <p className="text-sm text-secondary-light mb-0">Chapter-wise visitor details</p>
                    </div>
                </div>
            </div>

            {/* Grid of Chapter Slips */}
            <div className="row gy-3 px-12">
                {visitorsData.chapters.map(chapter => (
                    <div key={chapter.id} className="col-xl-3 col-lg-4 col-md-6 col-12">
                        <div className="card h-100 p-0 radius-12 shadow-hover-sm transition-2 overflow-hidden border-0">
                            {/* Chapter Header with Primary Gradient */}
                            <div className="p-12 bg-primary-600 text-white">
                                <div className="d-flex justify-content-between align-items-center mb-1">
                                    <h6 className="fw-bold mb-0 text-white text-truncate" style={{ maxWidth: '140px' }}>{chapter.name}</h6>
                                    <div className="w-28-px h-28-px rounded-circle bg-white-20 d-flex align-items-center justify-content-center">
                                        <Icon icon="solar:user-rounded-outline" fontSize={16} />
                                    </div>
                                </div>
                                <div className="mt-8">
                                    <span className="text-xxs opacity-75 text-uppercase spacing-1 d-block">Total Visitors</span>
                                    <h5 className="fw-bolder mb-0 text-white">{chapter.count}</h5>
                                </div>
                            </div>

                            {/* Members List */}
                            <div className="card-body p-12 bg-base">
                                <h6 className="text-xxs fw-bold text-secondary-light text-uppercase spacing-1 mb-12">Visitor Breakdown</h6>
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

export default VisitorsReportLayer;
