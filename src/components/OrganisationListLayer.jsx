import { Icon } from '@iconify/react/dist/iconify.js';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import { MockDataService } from '../helper/MockDataService';
import TablePagination from './TablePagination';

const OrganisationListLayer = () => {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        setData(MockDataService.getOrganisations());
    };

    const confirmDelete = (id) => {
        setDeleteId(id);
        setShowDeleteModal(true);
    };

    const handleDelete = () => {
        if (deleteId) {
            MockDataService.deleteOrganisation(deleteId);
            loadData();
            setShowDeleteModal(false);
            setDeleteId(null);
        }
    };

    const totalRecords = data.length;
    const totalPages = Math.ceil(totalRecords / rowsPerPage);

    const currentData = data.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    );

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleRowsPerPageChange = (e) => {
        setRowsPerPage(parseInt(e.target.value));
        setCurrentPage(1);
    };

    return (
        <div className="card h-100 p-0 radius-12">
            <div className="card-header border-bottom bg-base py-16 px-24 d-flex align-items-center flex-wrap gap-3 justify-content-between">
                <div className="d-flex align-items-center flex-wrap gap-3">
                    <h6 className="text-lg fw-semibold mb-0">Organisation List</h6>
                    <select
                        className="form-select form-select-sm w-auto ps-12 py-6 radius-12 h-40-px ms-3"
                        value={rowsPerPage}
                        onChange={handleRowsPerPageChange}
                    >
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="50">50</option>
                    </select>
                </div>
                <Link
                    to="/organisation/add"
                    className="btn btn-primary text-sm btn-sm px-12 py-12 radius-8 d-flex align-items-center gap-2"
                    style={{ backgroundColor: "#C4161C", borderColor: "#C4161C" }}
                >
                    <Icon icon="ic:baseline-plus" className="icon text-xl line-height-1" />
                    Add Organisation
                </Link>
            </div>
            <div className="card-body p-24">
                <div className="table-responsive scroll-sm">
                    <table className="table bordered-table sm-table mb-0">
                        <thead>
                            <tr>
                                <th scope="col">S.No</th>
                                <th scope="col">Zone</th>
                                <th scope="col">Region</th>
                                <th scope="col">ED</th>
                                <th scope="col">RD</th>
                                <th scope="col" className="text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentData.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="text-center">No organisations found.</td>
                                </tr>
                            ) : currentData.map((item, index) => (
                                <tr key={item.id}>
                                    <td>{(currentPage - 1) * rowsPerPage + index + 1}.</td>
                                    <td>{item.zone}</td>
                                    <td>{item.region}</td>
                                    <td>{item.ed}</td>
                                    <td>
                                        <div className="d-flex flex-wrap gap-1">
                                            {item.rd && (
                                                <span className="badge bg-neutral-200 text-neutral-600 radius-4 text-xs">
                                                    {item.rd}
                                                </span>
                                            )}
                                            {item.rds && item.rds.map((r, i) => (
                                                <span key={i} className="badge bg-neutral-200 text-neutral-600 radius-4 text-xs">
                                                    {r}
                                                </span>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="text-center">
                                        <div className="d-flex align-items-center gap-10 justify-content-center">
                                            <Link
                                                to={`/organisation/edit/${item.id}`}
                                                className="bg-success-focus text-success-600 bg-hover-success-200 fw-medium w-40-px h-40-px d-flex justify-content-center align-items-center rounded-circle"
                                            >
                                                <Icon icon="lucide:edit" className="menu-icon" />
                                            </Link>
                                            <button
                                                type="button"
                                                onClick={() => confirmDelete(item.id)}
                                                className="remove-item-btn bg-danger-focus bg-hover-danger-200 text-danger-600 fw-medium w-40-px h-40-px d-flex justify-content-center align-items-center rounded-circle"
                                            >
                                                <Icon icon="fluent:delete-24-regular" className="menu-icon" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <TablePagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleRowsPerPageChange}
                    totalRecords={totalRecords}
                />
            </div>

            {/* Delete Confirmation Modal */}
            <Modal centered show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title className="text-lg fw-semibold">Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p className="text-secondary-light">Are you sure you want to delete this organisation? This action cannot be undone.</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleDelete} style={{ backgroundColor: "#C4161C", borderColor: "#C4161C" }}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default OrganisationListLayer;
