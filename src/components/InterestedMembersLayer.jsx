import React, { useState } from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useNavigate, useParams } from 'react-router-dom';
import TablePagination from './TablePagination';

const InterestedMembersLayer = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    // Filter state for Present/Absent
    const [attendanceFilter, setAttendanceFilter] = useState('All');
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    // Mock Data for Interested Members
    const [membersData, setMembersData] = useState(Array.from({ length: 15 }).map((_, i) => ({
        id: i + 1,
        memberId: `MBR-${1000 + i}`,
        memberName: ['Rahul Sharma', 'Anjali Devi', 'Sanjay Singh', 'Kavita Iyer', 'Vikram Prabhu'][i % 5],
        chapter: ['ARAM Chapter', 'Arni Chapter', 'Salem Chapter'][i % 3],
        category: ['Architecture', 'Plumbing', 'Electrical', 'Interior Designer'][i % 4],
        status: i % 4 === 0 ? 'Absent' : i % 4 === 1 ? 'Present' : i % 4 === 2 ? 'Not Updated' : 'Present'
    })));

    const [editingId, setEditingId] = useState(null);

    const handleStatusChange = (id, newStatus) => {
        setMembersData(prev => prev.map(m => m.id === id ? { ...m, status: newStatus } : m));
        setEditingId(null);
    };

    const filteredMembers = membersData.filter(member => {
        const matchesStatus = attendanceFilter === 'All' || member.status === attendanceFilter;
        const matchesSearch = member.memberName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            member.memberId.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesStatus && matchesSearch;
    });

    const totalRecords = filteredMembers.length;
    const totalPages = Math.ceil(totalRecords / rowsPerPage);

    const currentData = filteredMembers.slice(
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
        <div className="card h-100 p-0 radius-12 overflow-hidden">
            <div className="card-header border-bottom bg-base py-16 px-24 d-flex align-items-center flex-wrap gap-3 justify-content-between">
                <div className="d-flex align-items-center gap-3">
                    <button
                        onClick={() => navigate('/trainings-report')}
                        className="btn btn-outline-secondary btn-sm d-flex align-items-center gap-1 radius-8"
                    >
                        <Icon icon="ion:arrow-back-outline" />
                        Back
                    </button>
                    <h6 className="text-primary-600 mb-0">Interested Members List</h6>
                </div>
                <div className="d-flex align-items-center flex-wrap gap-3">
                    <div className="d-flex align-items-center gap-2">
                        <span className="text-secondary-light fw-bold text-sm">Attendance:</span>
                        <div className="btn-group btn-group-sm radius-8 border p-1 bg-neutral-50" role="group">
                            {['All', 'Present', 'Absent', 'Not Updated'].map(status => (
                                <button
                                    key={status}
                                    type="button"
                                    className={`btn btn-sm px-16 radius-6 border-0 ${attendanceFilter === status ? 'btn-primary shadow-sm' : 'text-secondary-light'}`}
                                    onClick={() => {
                                        setAttendanceFilter(status);
                                        setCurrentPage(1);
                                    }}
                                >
                                    {status}
                                </button>
                            ))}
                        </div>
                    </div>
                    {/* <form className="navbar-search ms-2">
                        <input
                            type="text"
                            className="bg-base h-40-px w-auto"
                            placeholder="Search Name/ID"
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setCurrentPage(1);
                            }}
                        />
                        <Icon icon="ion:search-outline" className="icon" />
                    </form> */}
                </div>
            </div>

            <div className="card-body p-24">
                <div className="table-responsive scroll-sm">
                    <table className="table bordered-table sm-table mb-0">
                        <thead>
                            <tr>
                                <th scope="col" style={{ color: "black", fontWeight: '600' }}>Sl.No</th>
                                <th scope="col" style={{ color: "black", fontWeight: '600' }}>Member ID</th>
                                <th scope="col" style={{ color: "black", fontWeight: '600' }}>Member Name</th>
                                <th scope="col" style={{ color: "black", fontWeight: '600' }}>Chapter</th>
                                <th scope="col" style={{ color: "black", fontWeight: '600' }}>Category</th>
                                <th scope="col" className="text-center" style={{ color: "black", fontWeight: '600' }}>Meeting Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentData.length > 0 ? (
                                currentData.map((member, index) => (
                                    <tr key={member.id}>
                                        <td>
                                            <span className="text-md mb-0 fw-medium text-secondary-light">
                                                {(currentPage - 1) * rowsPerPage + index + 1}
                                            </span>
                                        </td>
                                        <td>
                                            <span className="text-md mb-0 fw-bold text-primary-600">
                                                {member.memberId}
                                            </span>
                                        </td>
                                        <td>
                                            <span className="text-md mb-0 fw-medium text-dark">
                                                {member.memberName}
                                            </span>
                                        </td>
                                        <td>
                                            <span className="text-md mb-0 fw-normal text-secondary-light">
                                                {member.chapter}
                                            </span>
                                        </td>
                                        <td>
                                            <span className="text-md mb-0 fw-normal text-secondary-light">
                                                {member.category}
                                            </span>
                                        </td>
                                        <td className="text-center">
                                            <div className="d-flex align-items-center justify-content-center gap-2">
                                                {editingId === member.id ? (
                                                    <select
                                                        className="form-select form-select-sm w-auto"
                                                        value={member.status}
                                                        onChange={(e) => handleStatusChange(member.id, e.target.value)}
                                                        autoFocus
                                                        onBlur={() => setEditingId(null)}
                                                    >
                                                        <option value="Present">Present</option>
                                                        <option value="Absent">Absent</option>
                                                        <option value="Not Updated">Not Updated</option>
                                                    </select>
                                                ) : (
                                                    <>
                                                        <span className={`badge radius-4 px-12 py-6 text-sm ${member.status === 'Present' ? 'bg-success-focus text-success-main' :
                                                            member.status === 'Absent' ? 'bg-danger-focus text-danger-main' : 'bg-neutral-100 text-secondary-light'
                                                            }`}>
                                                            {member.status}
                                                        </span>
                                                        <button
                                                            className="text-primary-600 border-0 bg-transparent p-0 edit-btn shadow-none"
                                                            onClick={() => setEditingId(member.id)}
                                                            title="Edit Status"
                                                        >
                                                            <Icon icon="solar:pen-bold" className="text-lg" />
                                                        </button>
                                                    </>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="text-center py-4">
                                        No members found for this filter.
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

export default InterestedMembersLayer;
