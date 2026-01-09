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
        <div className="card h-100 p-0 radius-12">
            <div className="card-header border-bottom bg-base py-16 px-24 d-flex align-items-center justify-content-between">
                <h6 className="text-lg fw-semibold mb-0">{pageTitle}</h6>

                {/* Tab Buttons */}
                <div className="btn-group" role="group">
                    <button
                        type="button"
                        className={`btn ${activeTab === 'given' ? 'btn-primary' : 'btn-outline-primary'}`}
                        style={activeTab === 'given' ? { backgroundColor: "#C4161C", borderColor: "#C4161C" } : {}}
                        onClick={() => setActiveTab('given')}
                    >
                        <Icon icon="mdi:hand-coin-outline" className="me-1" />
                        Given
                    </button>
                    <button
                        type="button"
                        className={`btn ${activeTab === 'received' ? 'btn-primary' : 'btn-outline-primary'}`}
                        style={activeTab === 'received' ? { backgroundColor: "#C4161C", borderColor: "#C4161C" } : {}}
                        onClick={() => setActiveTab('received')}
                    >
                        <Icon icon="mdi:hand-heart-outline" className="me-1" />
                        Received
                    </button>
                </div>
            </div>

            <div className="card-body p-24">
                <div className="row g-4">
                    {currentData.chapters.map((chapter) => (
                        <div key={chapter.id} className="col-lg-6 col-md-12">
                            <div className="card border shadow-sm h-100">
                                {/* Chapter Header */}
                                <div className="card-header text-white p-3 d-flex justify-content-between align-items-center" style={{
                                    background: 'linear-gradient(135deg, #B91C1C 0%, #7F1D1D 100%)'
                                }}>
                                    <h5 className="mb-0 fw-bold">{chapter.name}</h5>
                                    <div className="bg-white text-success px-3 py-1 rounded">
                                        <span className="fw-bold">{chapter.amount}</span>
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
                                                <div className="fw-bold text-success" style={{ minWidth: '100px', textAlign: 'right' }}>
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
