import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Modal, Button, Spinner } from 'react-bootstrap';
import './PointsLayer.css';
import PointsApi from '../Api/Points';

const PointsLayer = () => {
    const [pointsData, setPointsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editItem, setEditItem] = useState(null);
    const [tempValue, setTempValue] = useState(0);

    const fetchPoints = async () => {
        setLoading(true);
        const response = await PointsApi.getPoints();
        if (response.status) {
            setPointsData(response.data.data || []);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchPoints();
    }, []);

    const handleEditClick = (item) => {
        setEditItem(item);
        setTempValue(item.value);
        setShowModal(true);
    };

    const handleSave = async () => {
        if (!editItem) return;

        const response = await PointsApi.updatePoint(editItem._id, { value: parseInt(tempValue) || 0 });
        if (response.status) {
            setPointsData(prev => prev.map(item =>
                item._id === editItem._id ? { ...item, value: parseInt(tempValue) || 0 } : item
            ));
            setShowModal(false);
        }
    };

    return (
        <div className="card h-100 p-0">
            <div className="card-header border-bottom bg-base py-16 px-24 ">
                <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-3">
                    <h6 className="text-primary-600 pb-2 mb-0">Point Management System</h6>
                </div>

                <div className="card-body p-24">
                    {loading ? (
                        <div className="d-flex justify-content-center py-50">
                            <Spinner animation="border" variant="danger" />
                        </div>
                    ) : (
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
                                    {pointsData.length > 0 ? (
                                        pointsData.map((item, index) => (
                                            <tr key={item._id} className="transition-2 hover-bg-neutral-50">
                                                <td>
                                                    <span className="text-lg fw-medium text-secondary-light">
                                                        {item.order}
                                                    </span>
                                                </td>
                                                <td>
                                                    <div className="d-flex align-items-center gap-3">
                                                        <div>
                                                            <h6 className="text-lg fw-bold mb-0 text-dark">{item.name}</h6>
                                                            <span className="text-sm text-secondary-light">{item.description || "Configuration"}</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="text-center">
                                                    <span
                                                        className="badge radius-8 px-20 py-10 fw-bold points-badge"
                                                        style={{
                                                            background: `${item.color || '#C4161C'}10`,
                                                            color: item.color || '#C4161C',
                                                            fontSize: '18px',
                                                            minWidth: '100px'
                                                        }}
                                                    >
                                                        {(item.value || 0).toLocaleString()}
                                                    </span>
                                                </td>
                                                <td
                                                    style={{
                                                        textAlign: 'center',
                                                        verticalAlign: 'middle',
                                                    }}
                                                >

                                                    <button
                                                        type="button"
                                                        onClick={() => handleEditClick(item)}
                                                        className="bg-success-focus text-success-600 bg-hover-success-200 fw-medium w-40-px h-40-px d-flex justify-content-center align-items-center rounded-circle mx-auto"
                                                        title="Edit Points"
                                                    >
                                                        <Icon icon="lucide:edit" className="icon text-l" />
                                                    </button>
                                                </td>

                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="4" className="text-center py-4">No points found.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
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
                    <span className="fw-bold" style={{ color: '#C4161C', fontSize: '24px' }}>Update Points</span>
                </Modal.Header>
                <Modal.Body className="pt-2">
                    <div className="d-flex align-items-center gap-3 mb-24 p-20 radius-12 bg-neutral-50 border">
                        <div>
                            <h5 className="mb-0 fw-bold">{editItem?.name}</h5>
                            <p className="text-sm text-secondary-light mb-0">{editItem?.description || "Configuration"}</p>
                        </div>
                    </div>

                    <div className="form-group mb-4">
                        <label className="form-label fw-bold text-dark fs-5 mb-12">Point Configuration</label>
                        <div className="input-group input-group-lg shadow-sm">
                            <span className="icon-border input-group-text bg-white border-end-0 radius-start-12" >
                                <Icon icon="solar:star-bold" className="text-warning" fontSize={24} />
                            </span>
                            <input
                                type="number"
                                min="0"
                                onKeyDown={(e) => {
                                    if (e.key === '-' || e.key === 'e') {
                                        e.preventDefault()
                                    }
                                }}
                                className="icon-border form-control radius-end-12 border-start-0 ps-0 fw-bold text-center"
                                value={tempValue}
                                onChange={(e) => setTempValue(Math.max(0, e.target.value))}
                                placeholder="0"
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
                        className="radius-12 px-28 py-12 fw-bold text-lg shadow-md"
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="primary-600"
                        onClick={handleSave}
                        className="radius-12 px-32 py-12 fw-bold text-lg shadow-md"
                        style={{ backgroundColor: "#C4161C", borderColor: "#C4161C" }}
                    >
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default PointsLayer;
