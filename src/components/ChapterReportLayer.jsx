import React from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';

const ChapterReportLayer = () => {
    // Mock data for chapters
    const chapters = [
        {
            id: 1,
            name: 'ARAM',
            members: 31,
            stats: {
                referrals: 154,
                visitors: 60,
                events: 0,
                trainings: 0,
                absents: 0,
                thankYouSlip: '₹1,34,11,533',
                oneToOne: 150,
                testimonials: 6
            }
        },
        {
            id: 2,
            name: 'Chapter testing',
            members: 1,
            stats: {
                referrals: 1,
                visitors: 0,
                events: 0,
                trainings: 0,
                absents: 0,
                thankYouSlip: '₹8,000',
                oneToOne: 1,
                testimonials: 0
            }
        },
        {
            id: 3,
            name: 'Arni',
            members: 12,
            stats: {
                referrals: 50,
                visitors: 77,
                events: 0,
                trainings: 0,
                absents: 0,
                thankYouSlip: '₹67,29,71,600',
                oneToOne: 47,
                testimonials: 18
            }
        }
    ];

    return (
        <div className="card border-0 shadow-sm rounded-3">
            <div className="card-header bg-white border-bottom py-3 px-4">
                <h6 className="mb-0 fw-bold text-dark">Chapter Performance</h6>
                <p className="text-muted small mb-0 mt-1">Activity summary of all chapters</p>
            </div>

            <div className="card-body p-4 bg-light">
                <div className="row g-3">
                    {chapters.map((chapter, index) => (
                        <div key={chapter.id} className="col-xl-4 col-lg-6 col-md-12">
                            <div className="card border-0 h-100 hover-lift"
                                style={{
                                    borderRadius: '12px',
                                    backgroundColor: 'white',
                                    border: '1px solid rgba(196, 22, 28, 0.1)'
                                }}>

                                {/* Color accent top */}
                                <div style={{
                                    height: '4px',
                                    background: 'linear-gradient(90deg, #c4161c 0%, #e53e3e 100%)',
                                    borderTopLeftRadius: '12px',
                                    borderTopRightRadius: '12px'
                                }}></div>

                                {/* Card content */}
                                <div className="p-3">
                                    {/* Header */}
                                    <div className="d-flex align-items-center mb-3">
                                        <div className="rounded-circle d-flex align-items-center justify-content-center me-3"
                                            style={{
                                                width: '40px',
                                                height: '40px',
                                                background: 'linear-gradient(135deg, #c4161c 0%, #e53e3e 100%)',
                                                color: 'white',
                                                fontWeight: '600',
                                                fontSize: '14px'
                                            }}>
                                            {chapter.name.charAt(0)}
                                        </div>
                                        <div>
                                            <h6 className="mb-0 fw-bold text-dark">{chapter.name}</h6>
                                            <div className="d-flex align-items-center gap-2 mt-1">
                                                <span className="badge rounded-pill px-2 py-1"
                                                    style={{
                                                        backgroundColor: '#fee2e2',
                                                        color: '#c4161c',
                                                        fontSize: '11px'
                                                    }}>
                                                    {chapter.members} Members
                                                </span>
                                                <span className="text-muted small">• {chapter.region}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Stats in compact grid */}
                                    <div className="row g-2 mb-3">
                                        {[
                                            { label: 'Referrals', value: chapter.stats.referrals, color: '#c4161c' },
                                            { label: 'Visitors', value: chapter.stats.visitors, color: '#e53e3e' },
                                            { label: 'Events', value: chapter.stats.events, color: '#f56565' },
                                            { label: 'Trainings', value: chapter.stats.trainings, color: '#c4161c' },
                                            { label: 'Absents', value: chapter.stats.absents, color: '#e53e3e' },
                                            { label: 'Thank Slips', value: chapter.stats.thankYouSlip, color: '#48bb78' },
                                            { label: 'One to One', value: chapter.stats.oneToOne, color: '#f56565' },
                                            { label: 'Testimonials', value: chapter.stats.testimonials, color: '#c4161c' }
                                        ].map((stat, idx) => (
                                            <div key={idx} className="col-6">
                                                <div className="d-flex justify-content-between align-items-center p-2 rounded"
                                                    style={{
                                                        backgroundColor: idx % 2 === 0 ? 'rgba(196, 22, 28, 0.02)' : 'transparent'
                                                    }}>
                                                    <span className="small text-muted">{stat.label}</span>
                                                    <span className="fw-bold" style={{
                                                        color: stat.color,
                                                        fontSize: '14px'
                                                    }}>
                                                        {stat.value}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Mini summary */}
                                    <div className="border-top pt-2">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <span className="small text-muted">Total Activity</span>
                                            <span className="fw-bold" style={{ color: '#c4161c' }}>
                                                {Object.values(chapter.stats).reduce((a, b) => a + b, 0)}
                                            </span>
                                        </div>
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

export default ChapterReportLayer;
