import React from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useNavigate } from 'react-router-dom';

const Note121Layer = () => {
    const navigate = useNavigate();

    // Mock data
    const chapters = [
        {
            id: 1,
            name: 'ARAM',
            count: 5,
            members: [
                { id: 1, name: 'Logar ajan S P', company: 'e-intellisafe & Security Solutions', category: 'CCTV & Security systems', count: 32, avatar: null },
                { id: 2, name: 'Mathiarasu M', company: 'TECHMAXX ENGINEERING', category: 'Fire & Safety', count: 27, avatar: null },
                { id: 3, name: 'Mano Neelamegam', company: 'WUDFE INC', category: 'Interior Designer', count: 27, avatar: null },
                { id: 4, name: 'Kumar Raj S', company: 'Insure Tech Serv', category: 'General Insurance', count: 25, avatar: null },
                { id: 5, name: 'Mohamed Umar', company: 'Harxa Tech', category: 'Software Developer', count: 24, avatar: null }
            ]
        },
        {
            id: 2,
            name: 'Chapter testing',
            count: 1,
            members: [
                { id: 6, name: 'Aarthi S', company: 'test', category: 'test', count: 1, avatar: null }
            ]
        }
    ];

    const handleCountClick = (chapterId, memberName) => {
        // Navigate to detailed list page
        console.log(`View details for ${memberName} in chapter ${chapterId}`);
        // You can implement navigation to a detailed list page here
    };

    return (
        <div className="card h-100 p-0 radius-12">
            <div className="card-header border-bottom bg-base py-16 px-24">
                <h6 className="text-lg fw-semibold mb-0">121's</h6>
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
                                                <div className="fw-bold fs-5 text-primary" style={{ minWidth: '40px', textAlign: 'right' }}>
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

export default Note121Layer;
