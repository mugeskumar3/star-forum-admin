import React, { useState } from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';
import './PointsLayer.css';

const PointsLayer = () => {
    const [activeTab, setActiveTab] = useState('Points');

    const tabs = ['General', 'Community', 'Star Update', 'Points'];

    const pointsData = [
        { id: 1, name: "121s", value: 725, icon: "solar:users-group-two-rounded-bold", color: "#C4161C", subLabel: "One-to-One Meetings" },
        { id: 2, name: "Referrals", value: 2550, icon: "solar:handshake-bold", color: "#fca5a5", subLabel: "Business Referrals" },
        { id: 3, name: "Weekly Meetings", value: 2750, icon: "solar:calendar-date-bold", color: "#8252e9", subLabel: "Attendance Points" },
        { id: 4, name: "TYNs", value: 5250, icon: "solar:gift-bold", color: "#601eef", subLabel: "Thank You Notes" },
        { id: 5, name: "Visitors", value: 0, icon: "solar:user-plus-bold", color: "#3b82f6", subLabel: "New Guests Invited" },
        { id: 6, name: "Chief Guests", value: 0, icon: "solar:star-bold", color: "#2563eb", subLabel: "Distinguished Guests" },
        { id: 7, name: "Power Dates", value: 0, icon: "solar:calendar-mark-bold", color: "#06b6d4", subLabel: "Strategic Meetings" },
        { id: 8, name: "Inductions", value: 0, icon: "solar:verified-check-bold", color: "#10b981", subLabel: "New Member Welcomes" },
    ];

    const totalPoints = pointsData.reduce((acc, curr) => acc + (typeof curr.value === 'number' ? curr.value : 0), 0);

    return (
        <div className="d-flex flex-column gap-4">
            {/* Header Card with Tabs */}
            <div className="card h-100 p-0 radius-12">
                <div className="card-header border-bottom bg-base py-16 px-24 d-flex align-items-center justify-content-between flex-wrap gap-3">
                    <div className="d-flex align-items-center flex-wrap gap-3">
                        <h6 className="text-primary-600 pb-2 mb-0">Notifications & Points</h6>
                    </div>
                    {/* <div className="d-flex align-items-center gap-2">
                        {tabs.map(tab => (
                            <button
                                key={tab}
                                className={`points-tab-btn ${activeTab === tab ? 'active' : ''}`}
                                onClick={() => setActiveTab(tab)}
                                type="button"
                            >
                                {tab}
                            </button>
                        ))}
                    </div> */}
                </div>
            </div>

            {/* Overall Achievement Stats */}
            <div className="row gy-4">
                <div className="col-12">
                    <div className="card h-100 p-0 radius-12 overall-points-stats shadow-sm border-0">
                        <div className="card-body p-24">
                            <div className="d-flex align-items-center justify-content-between">
                                <div>
                                    <span className="fw-medium text-white text-sm mb-4 d-block text-uppercase spacing-1 opacity-75">Your Achievement</span>
                                    <h1 className="fw-bolder mb-4 text-white display-4">{totalPoints.toLocaleString()}</h1>
                                    <div className="d-flex align-items-center gap-2">
                                        <Icon icon="solar:medal-star-bold" className="text-warning" fontSize={20} />
                                        <p className="mb-0 text-white text-sm">Lifetime membership achievement points</p>
                                    </div>
                                </div>
                                <div className="points-card-icon shadow-lg bg-white-20 text-white" style={{ width: '100px', height: '100px', borderRadius: '24px' }}>
                                    <Icon icon="solar:cup-bold" fontSize={64} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Detailed Points Grid */}
            <div className="card h-100 p-0 radius-12">
                <div className="card-header border-bottom bg-base py-16 px-24">
                    <h6 className="text-lg fw-semibold mb-0">Points Breakdown</h6>
                </div>
                <div className="card-body p-24">
                    <div className="row gy-4 row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-4">
                        {pointsData.map((item) => (
                            <div className="col" key={item.id}>
                                <div
                                    className="card h-100 shadow-hover-md transition-2 radius-12"
                                    style={{
                                        border: '1px solid #f0f0f0',
                                        borderLeft: `5px solid ${item.color}`
                                    }}
                                >
                                    <div className="card-body p-20">
                                        <div className="d-flex align-items-center justify-content-between mb-16">
                                            <div className="w-48-px h-48-px d-flex justify-content-center align-items-center rounded-12" style={{ background: `${item.color}15`, color: item.color }}>
                                                <Icon icon={item.icon} fontSize={28} />
                                            </div>
                                            <span className="badge py-6 px-12 radius-8" style={{ background: `${item.color}10`, color: item.color, fontWeight: '700', fontSize: '18px' }}>
                                                {item.value.toLocaleString()}
                                            </span>
                                        </div>
                                        <h6 className="fw-bold mb-4 text-dark">{item.name}</h6>
                                        <p className="text-sm text-secondary-light mb-0">{item.subLabel}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PointsLayer;
