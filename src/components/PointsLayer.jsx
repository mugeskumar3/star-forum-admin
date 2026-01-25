import React, { useState } from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Modal, Button } from 'react-bootstrap';
import './PointsLayer.css';

const PointsLayer = () => {
    const [pointsData, setPointsData] = useState([
        { id: 1, title: "121s", points: 0, icon: "solar:users-group-two-rounded-bold", color: "#C4161C", subLabel: "One-to-One Meetings" },
        { id: 2, title: "Referrals", points: 0, icon: "solar:handshake-bold", color: "#fca5a5", subLabel: "Business Referrals" },
        { id: 3, title: "Weekly Meetings", points: 0, icon: "solar:calendar-date-bold", color: "#8252e9", subLabel: "Attendance Points" },
        { id: 4, title: "Thank You Notes", points: 0, icon: "solar:gift-bold", color: "#601eef", subLabel: "Gratitude Points" },
        { id: 5, title: "Visitors", points: 0, icon: "solar:user-plus-bold", color: "#3b82f6", subLabel: "New Guests Invited" },
        { id: 6, title: "Chief Guests", points: 0, icon: "solar:star-bold", color: "#2563eb", subLabel: "Distinguished Guests" },
        { id: 7, title: "Power Dates", points: 0, icon: "solar:calendar-mark-bold", color: "#06b6d4", subLabel: "Strategic Meetings" },
        { id: 8, title: "Inductions", points: 0, icon: "solar:verified-check-bold", color: "#10b981", subLabel: "New Member Welcomes" },
    ]);

    const [showModal, setShowModal] = useState(false);
    const [editItem, setEditItem] = useState(null);
    const [tempValue, setTempValue] = useState(0);

    const handleEditClick = (item) => {
        setEditItem(item);
        setTempValue(item.points);
        setShowModal(true);
    };

    const handleSave = () => {
        setPointsData(prev => prev.map(item =>
            item.id === editItem.id ? { ...item, points: parseInt(tempValue) || 0 } : item
        ));
        setShowModal(false);
    };

    return (
        <div className="card h-100 p-0">
            <div className="card-header border-bottom bg-base py-16 px-24 ">
                <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-3">
                    <h6 className="text-primary-600 pb-2 mb-0">Point Management System</h6>

                </div>

                <div className="card-body p-24">
                    <div className="table-responsive scroll-sm">
                        <table className="table bordered-table sm-table mb-0 custom-table">
                            <thead>
                                <tr>
                                    <th scope="col">S.No</th>
                                    <th scope="col">Activity Type</th>
                                    <th scope="col" className="text-center">Current Points</th>
                                    <th scope="col" className="text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pointsData.map((item, index) => (
                                    <tr key={item.id} className="transition-2 hover-bg-neutral-50">
                                        <td>
                                            <span className="text-lg fw-medium text-secondary-light">
                                                {index + 1}
                                            </span>
                                        </td>
                                        <td>
                                            <div className="d-flex align-items-center gap-3">
                                                {/* <div
                                                    className="w-48-px h-48-px d-flex justify-content-center align-items-center rounded-12 icon-box"
                                                    style={{ background: `${item.color}15`, color: item.color }}
                                                >
                                                    <Icon icon={item.icon} fontSize={24} />
                                                </div> */}
                                                <div>
                                                    <h6 className="text-lg fw-bold mb-0 text-dark">{item.title}</h6>
                                                    <span className="text-sm text-secondary-light">{item.subLabel}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="text-center">
                                            <span
                                                className="badge radius-8 px-20 py-10 fw-bold points-badge"
                                                style={{
                                                    background: `${item.color}10`,
                                                    color: item.color,
                                                    fontSize: '18px',
                                                    minWidth: '100px'
                                                }}
                                            >
                                                {item.points.toLocaleString()}
                                            </span>
                                        </td>
                                        <td className="text-center">
                                            <button
                                                type="button"
                                                onClick={() => handleEditClick(item)}
                                                className="bg-success-focus bg-hover-success-200 text-success-600 fw-medium w-44-px h-44-px d-flex justify-content-center align-items-center rounded-circle border-0 mx-auto transition-2 action-btn shadow-sm"
                                                title="Edit Points"
                                            >
                                                <Icon icon="lucide:edit" className="icon text-2xl" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Edit Points Modal */}
            <Modal
                show={showModal}
                onHide={() => setShowModal(false)}
                centered
                className="modal-custom"
            >
                <Modal.Header closeButton className="border-bottom-0 pb-0">
                    <Modal.Title className="fw-bold h4">Update Points</Modal.Title>
                </Modal.Header>
                <Modal.Body className="pt-2">
                    <div className="d-flex align-items-center gap-3 mb-24 p-20 radius-12 bg-neutral-50 border">
                        {/* <div
                            className="w-56-px h-56-px d-flex justify-content-center align-items-center rounded-12 shadow-sm"
                            style={{ background: `${editItem?.color}15`, color: editItem?.color }}
                        >
                            <Icon icon={editItem?.icon} fontSize={32} />
                        </div> */}
                        <div>
                            <h5 className="mb-0 fw-bold">{editItem?.title}</h5>
                            <p className="text-sm text-secondary-light mb-0">{editItem?.subLabel}</p>
                        </div>
                    </div>

                    <div className="form-group mb-4">
                        <label className="form-label fw-bold text-dark fs-5 mb-12">Point Configuration</label>
                        <div className="input-group input-group-lg shadow-sm">
                            <span className="icon-border input-group-text bg-white border-end-0 radius-start-12" style={{ borderColor: '#C4161C' }} >
                                <Icon icon="solar:star-bold" className="text-warning" fontSize={24} />
                            </span>
                            <input
                                type="number"
                                className=" icon-border form-control radius-end-12 border-start-0 ps-0 fw-bold text-center"
                                value={tempValue}
                                onChange={(e) => setTempValue(e.target.value)}
                                placeholder="0"
                                autoFocus
                                style={{ fontSize: '24px' }}
                            />
                        </div>
                        <small className="text-sm text-secondary-light mt-12 d-block">
                            Set the numeric value for this activity type.
                        </small>
                    </div>
                </Modal.Body>
                <Modal.Footer className="border-top-0 pt-0 pb-24 px-24">
                    <Button
                        variant="outline-secondary"
                        onClick={() => setShowModal(false)}
                        className="radius-12 px-32 py-12 fw-bold text-lg border-0"
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="primary-600"
                        onClick={handleSave}
                        className="radius-12 px-32 py-12 fw-bold text-lg shadow-md"
                        style={{ backgroundColor: "#C4161C", borderColor: "#C4161C" }}
                    >
                        Save Configuration
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default PointsLayer;
