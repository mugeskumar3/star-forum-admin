import React from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';

const ChapterReportDesign5 = () => {
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

    const calculateTotal = (stats) => {
        return stats.referrals + stats.visitors + stats.events +
            stats.trainings + stats.absents + stats.oneToOne + stats.testimonials;
    };

    const statItems = [
        { key: 'referrals', label: 'Referrals', icon: 'mdi:handshake', gradient: 'linear-gradient(135deg, #c4161c, #dc2626)' },
        { key: 'visitors', label: 'Visitors', icon: 'mdi:account-check', gradient: 'linear-gradient(135deg, #dc2626, #ef4444)' },
        { key: 'events', label: 'Events', icon: 'mdi:calendar-star', gradient: 'linear-gradient(135deg, #b91c1c, #c4161c)' },
        { key: 'trainings', label: 'Trainings', icon: 'mdi:school', gradient: 'linear-gradient(135deg, #991b1b, #b91c1c)' },
        { key: 'absents', label: 'Absents', icon: 'mdi:account-remove', gradient: 'linear-gradient(135deg, #7f1d1d, #991b1b)' },
        { key: 'oneToOne', label: 'One to One', icon: 'mdi:account-multiple', gradient: 'linear-gradient(135deg, #c4161c, #e53e3e)' },
        { key: 'testimonials', label: 'Testimonials', icon: 'mdi:star-circle', gradient: 'linear-gradient(135deg, #dc2626, #f87171)' }
    ];

    return (
        <div className="d-flex flex-column gap-4">
            {/* Header section */}
            <div className="d-flex align-items-center justify-content-between mb-24 px-12">
                <div className="d-flex align-items-center">
                    <div className="bg-danger-600 radius-2" style={{ width: '4px', height: '32px' }}></div>
                    <div className="ms-12">
                        <h5 className="fw-bold mb-0" style={{ color: '#101828' }}>Chapter Performance</h5>
                        <p className="text-sm text-secondary-light mb-0">Live analytics</p>
                    </div>
                </div>
            </div>

            {/* Cards */}
            <div className="px-12">
                <div className="row g-3">
                    {chapters.map(chapter => (
                        <div key={chapter.id} className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                            <div
                                className="h-100 shadow-sm"
                                style={{
                                    backgroundColor: 'var(--white)',
                                    borderRadius: '16px',
                                    border: '1px solid var(--border-color)',
                                    transition: '0.3s ease'
                                }}
                            >
                                <div className="p-3">
                                    {/* Header */}
                                    <div
                                        className="d-flex align-items-center justify-content-between mb-2"
                                    >
                                        <h6 className="mb-0 fw-semibold" style={{ color: 'var(--text-primary-light)' }}>
                                            {chapter.name}
                                        </h6>

                                        <span
                                            style={{
                                                fontSize: '12px',
                                                fontWeight: 500,
                                                color: 'var(--text-secondary-light)'
                                            }}
                                        >
                                            {chapter.members} Members
                                        </span>
                                    </div>


                                    {/* Total */}
                                    <div
                                        className="rounded-3 p-3 mb-3"
                                        style={{
                                            background: 'var(--primary-600)',
                                            color: '#fff'
                                        }}
                                    >
                                        <div
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between'
                                            }}
                                        >
                                            <span
                                                style={{
                                                    fontSize: '11px',
                                                    fontWeight: 500,
                                                    textTransform: 'uppercase',
                                                    opacity: 0.8
                                                }}
                                            >
                                                Total Activities
                                            </span>

                                            <span
                                                style={{
                                                    fontSize: '20px',
                                                    fontWeight: 700,
                                                    lineHeight: 1
                                                }}
                                            >
                                                {calculateTotal(chapter.stats)}
                                            </span>
                                        </div>
                                    </div>


                                    {/* Stats */}
                                    <div className="row g-2 mb-3">
                                        {statItems.map(item => (
                                            <div key={item.key} className="col-6">
                                                <div
                                                    className="p-2 rounded-3 border"
                                                    style={{ backgroundColor: 'var(--neutral-50)', borderColor: 'var(--border-color)' }}
                                                >
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <Icon icon={item.icon} width="16" color="var(--primary-600)" />
                                                        <span className="fw-bold" style={{ fontSize: '18px', color: 'var(--text-primary-light)' }}>
                                                            {chapter.stats[item.key]}
                                                        </span>
                                                    </div>
                                                    <div className="small" style={{ color: 'var(--text-secondary-light)' }}>{item.label}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Thank You Slip */}
                                    <div
                                        className="p-3 rounded-3"
                                        style={{
                                            background: 'var(--success-50)',
                                            border: '1px solid var(--success-100)'
                                        }}
                                    >
                                        <div className="d-flex align-items-center justify-content-between">
                                            <div>
                                                <small className="fw-semibold text-success">Thank You Slips</small>
                                                <div className="fw-bold" style={{ fontSize: '16px', color: 'var(--text-primary-light)' }}>
                                                    {chapter.stats.thankYouSlip}
                                                </div>
                                            </div>
                                            <Icon icon="mdi:cash-multiple" width="24" color="var(--success-600)" />
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

export default ChapterReportDesign5;