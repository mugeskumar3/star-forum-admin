import { Icon } from '@iconify/react/dist/iconify.js';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import TablePagination from './TablePagination';

const AdminRegistrationListLayer = () => {
    const [users, setUsers] = useState([
        { id: 1, name: 'Rajesh Kumar', email: 'rajesh.kumar@example.com', mobile: '9876543210', company: 'Alpha Corp', role: 'Admin' },
        { id: 2, name: 'Priya Sharma', email: 'priya.sharma@example.com', mobile: '9876543211', company: 'Beta Inc', role: 'Editor' },
        { id: 3, name: 'Amit Patel', email: 'amit.patel@example.com', mobile: '9876543212', company: 'Gamma Ltd', role: 'Viewer' },
        { id: 4, name: 'Sneha Reddy', email: 'sneha.reddy@example.com', mobile: '9876543213', company: 'Delta Co', role: 'Admin' },
        { id: 5, name: 'Vikram Singh', email: 'vikram.singh@example.com', mobile: '9876543214', company: 'Epsilon Org', role: 'Editor' },
        { id: 6, name: 'Ananya Iyer', email: 'ananya.iyer@example.com', mobile: '9876543215', company: 'Zeta Ltd', role: 'Viewer' },
        { id: 7, name: 'Suresh Nair', email: 'suresh.nair@example.com', mobile: '9876543216', company: 'Sigma Co', role: 'Admin' },
        { id: 8, name: 'Megha Gupta', email: 'megha.gupta@example.com', mobile: '9876543217', company: 'Iota Inc', role: 'Editor' },
        { id: 9, name: 'Arjun Verma', email: 'arjun.verma@example.com', mobile: '9876543218', company: 'Kappa Org', role: 'Viewer' },
        { id: 10, name: 'Kavita Joshi', email: 'kavita.joshi@example.com', mobile: '9876543219', company: 'Lambda Ltd', role: 'Admin' },
        { id: 11, name: 'Rahul Deshmukh', email: 'rahul.deshmukh@example.com', mobile: '9876543220', company: 'Mu Corp', role: 'Editor' },
        { id: 12, name: 'Pooja Malhotra', email: 'pooja.malhotra@example.com', mobile: '9876543221', company: 'Nu Inc', role: 'Viewer' },
        { id: 13, name: 'Sandeep Bansal', email: 'sandeep.bansal@example.com', mobile: '9876543222', company: 'Xi Co', role: 'Admin' },
        { id: 14, name: 'Neha Choudhury', email: 'neha.choudhury@example.com', mobile: '9876543223', company: 'Omicron Org', role: 'Editor' },
        { id: 15, name: 'Vijay Ranganathan', email: 'vijay.ranganathan@example.com', mobile: '9876543224', company: 'Pi Ltd', role: 'Viewer' },
        { id: 16, name: 'Shilpa Kulkarni', email: 'shilpa.kulkarni@example.com', mobile: '9876543225', company: 'Rho Co', role: 'Admin' },
        { id: 17, name: 'Manish Tiwari', email: 'manish.tiwari@example.com', mobile: '9876543226', company: 'Sigma Inc', role: 'Editor' },
        { id: 18, name: 'Divya Saxena', email: 'divya.saxena@example.com', mobile: '9876543227', company: 'Tau Org', role: 'Viewer' },
        { id: 19, name: 'Pankaj Agarwal', email: 'pankaj.agarwal@example.com', mobile: '9876543228', company: 'Upsilon Ltd', role: 'Admin' },
        { id: 20, name: 'Swati Bhattacharya', email: 'swati.bhattacharya@example.com', mobile: '9876543229', company: 'Phi Corp', role: 'Editor' },
    ]);

    const [searchTerm, setSearchTerm] = useState('');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.role.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalRecords = filteredUsers.length;
    const totalPages = Math.ceil(totalRecords / rowsPerPage);

    const currentData = filteredUsers.slice(
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

    const confirmDelete = (user) => {
        setUserToDelete(user);
        setShowDeleteModal(true);
    };

    const handleDelete = () => {
        setUsers(users.filter(u => u.id !== userToDelete.id));
        setShowDeleteModal(false);
        setUserToDelete(null);
    };

    const handleClose = () => {
        setShowDeleteModal(false);
        setUserToDelete(null);
    };

    return (
        <>
            <div className="card h-100 p-0 radius-12">
                <div className="card-header border-bottom bg-base py-16 px-24 d-flex align-items-center flex-wrap gap-3 justify-content-between">
                    <div className="d-flex align-items-center flex-wrap gap-3">
                        <h4 className="mb-0">Admin Registration</h4>
                    </div>

                    <div className="d-flex align-items-center flex-wrap gap-3">
                        <form className="navbar-search">
                            <input
                                type="text"
                                className="bg-base h-40-px w-auto"
                                name="search"
                                placeholder="Search"
                                value={searchTerm}
                                onChange={handleSearch}
                            />
                            <Icon icon="ion:search-outline" className="icon" />
                        </form>
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
                </div>
                <div className="card-body p-24">
                    <div className="table-responsive scroll-sm">
                        <table className="table bordered-table sm-table mb-0">
                            <thead>
                                <tr>
                                    <th scope="col" style={{ color: "black" }}>S.No</th>
                                    <th scope="col" style={{ color: "black" }}>Name</th>
                                    <th scope="col" style={{ color: "black" }}>Email</th>
                                    <th scope="col" style={{ color: "black" }}>Mobile Number</th>
                                    <th scope="col" style={{ color: "black" }}>Company Name</th>
                                    <th scope="col" style={{ color: "black" }}>Role</th>
                                    <th scope="col" className="text-center" style={{ color: "black" }}>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentData.length > 0 ? (
                                    currentData.map((user, index) => (
                                        <tr key={user.id}>
                                            <td>{(currentPage - 1) * rowsPerPage + index + 1}.</td>
                                            <td>
                                                <div className="d-flex align-items-center">
                                                    <span className="text-md mb-0 fw-normal text-secondary-light">
                                                        {user.name}
                                                    </span>
                                                </div>
                                            </td>
                                            <td>
                                                <span className="text-md mb-0 fw-normal text-secondary-light">
                                                    {user.email}
                                                </span>
                                            </td>
                                            <td>{user.mobile}</td>
                                            <td>{user.company}</td>
                                            <td>
                                                <span className="badge bg-primary-focus text-primary-600 border border-primary-main px-24 py-4 radius-4 fw-medium text-sm">
                                                    {user.role}
                                                </span>
                                            </td>
                                            <td className="text-center">
                                                <div className="d-flex align-items-center gap-10 justify-content-center">
                                                    <Link
                                                        to={`/admin-registration/view/${user.id}`}
                                                        className="bg-info-focus bg-hover-info-200 text-info-600 fw-medium w-40-px h-40-px d-flex justify-content-center align-items-center rounded-circle"
                                                    >
                                                        <Icon
                                                            icon="majesticons:eye-line"
                                                            className="icon text-xl"
                                                        />
                                                    </Link>
                                                    <Link
                                                        to={`/admin-registration/edit/${user.id}`}
                                                        className="bg-success-focus text-success-600 bg-hover-success-200 fw-medium w-40-px h-40-px d-flex justify-content-center align-items-center rounded-circle"
                                                    >
                                                        <Icon icon="lucide:edit" className="menu-icon" />
                                                    </Link>
                                                    <button
                                                        type="button"
                                                        onClick={() => confirmDelete(user)}
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
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="7" className="text-center py-24">No users found</td>
                                    </tr>
                                )}
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
                    <div className="mt-16 text-secondary-light fw-medium text-end">
                        Total Registered Admins: {users.length}
                    </div>
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
                    <p className="text-secondary-light mb-4">Do you want to delete user "{userToDelete?.name}"? This action cannot be undone.</p>
                    <div className="d-flex justify-content-center gap-3">
                        <Button variant="outline-secondary" className="px-32" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button variant="danger" className="px-32" onClick={handleDelete} style={{ backgroundColor: "#C4161C", borderColor: "#C4161C" }}>
                            Delete
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default AdminRegistrationListLayer;
