import { Icon } from '@iconify/react/dist/iconify.js';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import TablePagination from './TablePagination';

const UsersListLayer = () => {
    const [users, setUsers] = useState(Array.from({ length: 20 }).map((_, i) => ({
        id: i + 1,
        joinDate: '25 Jan 2024',
        name: ['Rajesh Kumar', 'Priya Sharma', 'Amit Patel', 'Sneha Reddy', 'Vikram Singh', 'Ananya Iyer', 'Suresh Nair', 'Megha Gupta', 'Arjun Verma', 'Kavita Joshi', 'Rahul Deshmukh', 'Pooja Malhotra', 'Sandeep Bansal', 'Neha Choudhury', 'Vijay Ranganathan', 'Shilpa Kulkarni', 'Manish Tiwari', 'Divya Saxena', 'Pankaj Agarwal', 'Swati Bhattacharya'][i],
        email: `user${i + 1}@example.com`,
        department: ['HR', 'Design', 'Development', 'Sales', 'Marketing'][i % 5],
        designation: ['Manager', 'UI UX Designer', 'Frontend Developer', 'Sales Head', 'Marketing Lead'][i % 5],
        status: i % 2 === 0 ? 'Active' : 'Inactive',
        image: `assets/images/user-list/user-list${(i % 6) + 1}.png`
    })));

    const [searchTerm, setSearchTerm] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [statusFilter, setStatusFilter] = useState('Select Status');

    const filteredUsers = users.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'Select Status' || user.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

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
    return (
        <div className="card h-100 p-0 radius-12">
            <div className="card-header border-bottom bg-base py-16 px-24 d-flex align-items-center flex-wrap gap-3 justify-content-between">
                <div className="d-flex align-items-center flex-wrap gap-3">
                    <h4 className="mb-0"  >Users List</h4>
                    <form className="navbar-search">
                        <input
                            type="text"
                            className="bg-base h-40-px w-auto"
                            name="search"
                            placeholder="Search"
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setCurrentPage(1);
                            }}
                        />
                        <Icon icon="ion:search-outline" className="icon" />
                    </form>
                    <select
                        className="form-select form-select-sm w-auto ps-12 py-6 radius-12 h-40-px"
                        value={statusFilter}
                        onChange={(e) => {
                            setStatusFilter(e.target.value);
                            setCurrentPage(1);
                        }}
                    >
                        <option value="Select Status">
                            Select Status
                        </option>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                    </select>
                </div>
                <Link
                    to="/add-user"
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
                                <th scope="col">
                                    <div className="d-flex align-items-center gap-10">
                                        <div className="form-check style-check d-flex align-items-center">
                                            <input
                                                className="form-check-input radius-4 border input-form-dark"
                                                type="checkbox"
                                                name="checkbox"
                                                id="selectAll"
                                            />
                                        </div>
                                        S.L
                                    </div>
                                </th>
                                <th scope="col">Join Date</th>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Department</th>
                                <th scope="col">Designation</th>
                                <th scope="col" className="text-center">
                                    Status
                                </th>
                                <th scope="col" className="text-center">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentData.length > 0 ? (
                                currentData.map((user, index) => (
                                    <tr key={user.id}>
                                        <td>
                                            <div className="d-flex align-items-center gap-10">
                                                <div className="form-check style-check d-flex align-items-center">
                                                    <input
                                                        className="form-check-input radius-4 border border-neutral-400"
                                                        type="checkbox"
                                                        name="checkbox"
                                                    />
                                                </div>
                                                {String((currentPage - 1) * rowsPerPage + index + 1).padStart(2, '0')}
                                            </div>
                                        </td>
                                        <td>{user.joinDate}</td>
                                        <td>
                                            <div className="d-flex align-items-center">
                                                <img
                                                    src={user.image}
                                                    alt=""
                                                    className="w-40-px h-40-px rounded-circle flex-shrink-0 me-12 overflow-hidden"
                                                    onError={(e) => {
                                                        e.target.src = "https://placehold.co/40x40?text=USER";
                                                    }}
                                                />
                                                <div className="flex-grow-1">
                                                    <span className="text-md mb-0 fw-normal text-secondary-light">
                                                        {user.name}
                                                    </span>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <span className="text-md mb-0 fw-normal text-secondary-light">
                                                {user.email}
                                            </span>
                                        </td>
                                        <td>{user.department}</td>
                                        <td>{user.designation}</td>
                                        <td className="text-center">
                                            <span className={`${user.status === 'Active' ? 'bg-success-focus text-success-600 border-success-main' : 'bg-neutral-200 text-neutral-600 border-neutral-400'} border px-24 py-4 radius-4 fw-medium text-sm`}>
                                                {user.status}
                                            </span>
                                        </td>
                                        <td className="text-center">
                                            <div className="d-flex align-items-center gap-10 justify-content-center">
                                                <button
                                                    type="button"
                                                    className="bg-info-focus bg-hover-info-200 text-info-600 fw-medium w-40-px h-40-px d-flex justify-content-center align-items-center rounded-circle"
                                                >
                                                    <Icon
                                                        icon="majesticons:eye-line"
                                                        className="icon text-xl"
                                                    />
                                                </button>
                                                <button
                                                    type="button"
                                                    className="bg-success-focus text-success-600 bg-hover-success-200 fw-medium w-40-px h-40-px d-flex justify-content-center align-items-center rounded-circle"
                                                >
                                                    <Icon icon="lucide:edit" className="menu-icon" />
                                                </button>
                                                <button
                                                    type="button"
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
                                    <td colSpan="8" className="text-center py-4">
                                        No users found.
                                    </td>
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
            </div>
        </div>

    );
};

export default UsersListLayer;