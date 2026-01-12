import React, { useState } from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';

const ThankYouSlipLayer = () => {
    const [activeTab, setActiveTab] = useState('given'); // 'given' or 'received'

    // Mock data for Given
    const givenData = {
        chapters: [
            {
                id: 1,
                name: 'ARAM',
                amount: '₹1,34,11,533',
                members: [
                    { id: 1, name: 'Logarajan S P', company: 'e-intellisafe & Security', category: 'CCTV & Security', amount: '₹25,00,000' },
                    { id: 2, name: 'Mathiarasu M', company: 'TECHMAXX ENGINEERING', category: 'Fire & Safety', amount: '₹18,50,000' },
                    { id: 3, name: 'Mano Neelamegam', company: 'WUDFE INC', category: 'Interior Designer', amount: '₹22,00,000' }
                ]
            },
            {
                id: 2,
                name: 'Arni',
                amount: '₹67,29,71,600',
                members: [
                    { id: 4, name: 'Ramesh Kumar', company: 'Auto Solutions', category: 'Automobile', amount: '₹30,00,000' },
                    { id: 5, name: 'Priya Lakshmi', company: 'Fashion Trends', category: 'Retail', amount: '₹15,75,000' }
                ]
            }
        ]
    };

    // Mock data for Received
    const receivedData = {
        chapters: [
            {
                id: 1,
                name: 'ARAM',
                amount: '₹95,00,000',
                members: [
                    { id: 6, name: 'Vijay Kumar', company: 'Tech Services', category: 'IT Solutions', amount: '₹45,00,000' },
                    { id: 7, name: 'Anitha R', company: 'Consulting Firm', category: 'Business Consulting', amount: '₹50,00,000' }
                ]
            }
        ]
    };

    const currentData = activeTab === 'given' ? givenData : receivedData;
    const pageTitle = activeTab === 'given' ? 'Thank You Slip - Given' : 'Thank You Slip - Received';

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
                <div className="d-flex align-items-center justify-content-between">
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
                                {pageTitle}
                            </p>
                            <p className="mb-0 small" style={{ color: 'var(--text-secondary-light)' }}>Chapter-wise thank you slip details</p>
                        </div>
                    </div>

                    {/* Tab Buttons */}
                    <div className="btn-group" role="group">
                        <button
                            type="button"
                            className={`btn ${activeTab === 'given' ? 'btn-primary' : 'btn-outline-primary'}`}
                            style={activeTab === 'given' ? { backgroundColor: "var(--primary-600)", borderColor: "var(--primary-600)", color: "#fff" } : { color: "var(--primary-600)", borderColor: "var(--primary-600)" }}
                            onClick={() => setActiveTab('given')}
                        >
                            <Icon icon="mdi:hand-coin-outline" className="me-1" />
                            Given
                        </button>
                        <button
                            type="button"
                            className={`btn ${activeTab === 'received' ? 'btn-primary' : 'btn-outline-primary'}`}
                            style={activeTab === 'received' ? { backgroundColor: "var(--primary-600)", borderColor: "var(--primary-600)", color: "#fff" } : { color: "var(--primary-600)", borderColor: "var(--primary-600)" }}
                            onClick={() => setActiveTab('received')}
                        >
                            <Icon icon="mdi:hand-heart-outline" className="me-1" />
                            Received
                        </button>
                    </div>
                </div>
            </div>

            {/* Cards */}
            <div className="container-fluid">
                <div className="row g-2">
                    {currentData.chapters.map(chapter => (
                        <div key={chapter.id} className="col-xl-4 col-lg-4 col-md-6 col-sm-12">
                            <div
                                className="h-100 shadow-sm"
                                style={{ backgroundColor: 'var(--white)', borderRadius: '14px', border: '1px solid var(--border-color)' }}
                            >
                                <div className="p-2">
                                    {/* Chapter Header */}
                                    <div className="d-flex align-items-center justify-content-between mb-1">
                                        <h6 className="mb-0 fw-semibold" style={{ color: 'var(--text-primary-light)' }}>{chapter.name}</h6>
                                        <span className="fw-bold" style={{ color: 'var(--success-600)', fontSize: '14px' }}>
                                            {chapter.amount}
                                        </span>
                                    </div>

                                    {/* Total Amount */}
                                    <div
                                        className="rounded-3 p-2 mb-2"
                                        style={{ background: 'var(--success-600)', color: '#fff' }}
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
                                                Total Amount
                                            </span>
                                            <span style={{ fontSize: '18px', fontWeight: 700 }}>
                                                {chapter.amount}
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
                                                        color: 'var(--success-600)',
                                                        minWidth: '80px',
                                                        textAlign: 'right',
                                                        padding: '0px 5px'
                                                    }}
                                                >
                                                    {member.amount}
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

export default ThankYouSlipLayer;
