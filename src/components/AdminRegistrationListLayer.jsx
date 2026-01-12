import { Icon } from '@iconify/react/dist/iconify.js';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import TablePagination from './TablePagination';

const AdminRegistrationListLayer = () => {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    // Mock data for demonstration
    const allData = Array.from({ length: 45 }, (_, i) => i + 1);
    const totalRecords = allData.length;
    const totalPages = Math.ceil(totalRecords / rowsPerPage);

    const currentData = allData.slice(
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

    const handleDelete = () => setShowDeleteModal(true);
    const handleClose = () => setShowDeleteModal(false);

    return (
        <>
            <div className="card h-100 p-0 radius-12">
                <div className="card-header border-bottom bg-base py-16 px-24 d-flex align-items-center flex-wrap gap-3 justify-content-between">
                    <div className="d-flex align-items-center flex-wrap gap-3">
                        <select
                            className="form-select form-select-sm w-auto ps-12 py-6 radius-12 h-40-px"
                            value={rowsPerPage}
                            onChange={handleRowsPerPageChange}
                        >
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="50">50</option>
                        </select>
                        <form className="navbar-search">
                            <input
                                type="text"
                                className="bg-base h-40-px w-auto"
                                name="search"
                                placeholder="Search"
                            />
                            <Icon icon="ion:search-outline" className="icon" />
                        </form>
                    </div>
                    <Link
                        to="/admin-registration/add"
                        className="btn btn-primary text-sm btn-sm px-12 py-12 radius-8 d-flex align-items-center gap-2"
                        style={{ backgroundColor: "#C4161C", borderColor: "#C4161C" }}
                    >
                        <Icon
                            icon="ic:baseline-plus"
                            className="icon text-xl line-height-1"
                        />
                        Add New User
                    </Link>
                </div>
                <div className="card-body p-24">
                    <div className="table-responsive scroll-sm">
                        <table className="table bordered-table sm-table mb-0">
                            <thead>
                                <tr>
                                    <th scope="col">S.No</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Mobile Number</th>
                                    <th scope="col">Company Name</th>
                                    <th scope="col" className="text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentData.map((item, index) => (
                                    <tr key={index}>
                                        <td>{(currentPage - 1) * rowsPerPage + index + 1}.</td>
                                        <td>
                                            <div className="d-flex align-items-center">
                                                <span className="text-md mb-0 fw-normal text-secondary-light">
                                                    User Name {item}
                                                </span>
                                            </div>
                                        </td>
                                        <td>
                                            <span className="text-md mb-0 fw-normal text-secondary-light">
                                                user{item}@example.com
                                            </span>
                                        </td>
                                        <td>987654321{index}</td>
                                        <td>Company {item}</td>
                                        <td className="text-center">
                                            <div className="d-flex align-items-center gap-10 justify-content-center">
                                                <Link
                                                    to={`/admin-registration/view/${item}`}
                                                    className="bg-info-focus bg-hover-info-200 text-info-600 fw-medium w-40-px h-40-px d-flex justify-content-center align-items-center rounded-circle"
                                                >
                                                    <Icon
                                                        icon="majesticons:eye-line"
                                                        className="icon text-xl"
                                                    />
                                                </Link>
                                                <Link
                                                    to={`/admin-registration/edit/${item}`}
                                                    className="bg-success-focus text-success-600 bg-hover-success-200 fw-medium w-40-px h-40-px d-flex justify-content-center align-items-center rounded-circle"
                                                >
                                                    <Icon icon="lucide:edit" className="menu-icon" />
                                                </Link>
                                                <button
                                                    type="button"
                                                    onClick={handleDelete}
                                                    className="remove-item-btn bg-danger-focus bg-hover-danger-200 text-danger-600 fw-medium w-40-px h-40-px d-flex justify-content-center align-items-center rounded-circle"
                                                >
                                                    <Icon
                                                        icon="fluent:delete-24-regular"
                                                        className="menu-icon"
                                                    />
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
            </div>

            <Modal show={showDeleteModal} onHide={handleClose} centered>
                <Modal.Body className="text-center p-5">
                    <div className="d-flex justify-content-center mb-3">
                        <div className="bg-danger-focus rounded-circle d-flex justify-content-center align-items-center w-64-px h-64-px">
                            <Icon icon="mingcute:delete-2-line" className="text-danger-600 text-xxl" />
                        </div>
                    </div>
                    <h5 className="mb-3">Are you sure?</h5>
                    <p className="text-secondary-light mb-4">Do you want to delete this user? This action cannot be undone.</p>
                    <div className="d-flex justify-content-center gap-3">
                        <Button variant="outline-secondary" className="px-4" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button variant="danger" className="px-4" onClick={handleClose}>
                            Delete
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default AdminRegistrationListLayer;
