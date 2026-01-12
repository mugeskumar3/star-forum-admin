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
        <div
            style={{
                background: 'var(--bg-color)',
                minHeight: '100vh',
                padding: '1.25rem'
            }}
        >
            {/* Header */}
            <div className="container-fluid mb-2">
                <div className="d-flex align-items-center">
                    <div
                        style={{
                            width: '4px',
                            height: '32px',
                            background: 'var(--primary-600)',
                            borderRadius: '2px',
                            marginRight: '0.75rem'
                        }}
                    />
                    <div>
                        <p className="fw-bold mb-0" style={{ fontSize: '24px', color: 'var(--text-primary-light)' }}>
                            Referrals Report
                        </p>
                        <p className="mb-0 small" style={{ color: 'var(--text-secondary-light)' }}>Chapter-wise referral details</p>
                    </div>
                </div>
            </div>

            {/* Cards */}
            <div className="container-fluid">
                <div className="row g-2">
                    {chapters.map(chapter => (
                        <div key={chapter.id} className="col-xl-4 col-lg-4 col-md-6 col-sm-12">
                            <div
                                className="h-100 shadow-sm"
                                style={{ backgroundColor: 'var(--white)', borderRadius: '14px', border: '1px solid var(--border-color)' }}
                            >
                                <div className="p-2">
                                    {/* Chapter Header */}
                                    <div className="d-flex align-items-center justify-content-between mb-1">
                                        <h6 className="mb-0 fw-semibold" style={{ color: 'var(--text-primary-light)' }}>{chapter.name}</h6>
                                        <span className="fw-bold" style={{ color: 'var(--primary-600)', fontSize: '14px' }}>
                                            {chapter.count}
                                        </span>
                                    </div>

                                    {/* Total Referrals */}
                                    <div
                                        className="rounded-3 p-2 mb-2"
                                        style={{ background: 'var(--primary-600)', color: '#fff' }}
                                    >
                                        <div className="d-flex align-items-center justify-content-between" style={{ padding: '0px 5px' }}>
                                            <span
                                                style={{
                                                    fontSize: '11px',
                                                    fontWeight: 500,
                                                    textTransform: 'uppercase',
                                                    opacity: 0.85,
                                                }}
                                            >
                                                Total Referrals
                                            </span>
                                            <span style={{ fontSize: '18px', fontWeight: 700 }}>
                                                {chapter.count}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Members */}
                                    <div className="d-flex flex-column gap-1">
                                        {chapter.members.map(member => (
                                            <div
                                                key={member.id}
                                                className="d-flex align-items-center justify-content-between border rounded-3 p-2"
                                                style={{ background: 'var(--neutral-50)', borderColor: 'var(--border-color)', padding: '0px 5px' }}
                                            >
                                                {/* Left */}
                                                <div className="flex-grow-1">
                                                    <div className="fw-semibold" style={{ fontSize: '13px', padding: '0px 5px', color: 'var(--text-primary-light)' }}>
                                                        {member.name}
                                                    </div>
                                                    <div style={{ fontSize: '11px', padding: '0px 5px', color: 'var(--text-secondary-light)' }}>
                                                        {member.company}
                                                    </div>
                                                    <div style={{ fontSize: '10px', padding: '0px 5px', color: 'var(--text-secondary-light)', opacity: 0.8 }}>
                                                        {member.category}
                                                    </div>
                                                </div>

                                                {/* Right */}
                                                <div
                                                    className="fw-bold"
                                                    style={{
                                                        fontSize: '15px',
                                                        color: 'var(--primary-600)',
                                                        minWidth: '30px',
                                                        textAlign: 'right',
                                                        padding: '0px 5px'
                                                    }}
                                                >
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
