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
    const [members] = useState(Array.from({ length: 15 }).map((_, i) => ({
        id: i + 1,
        memberId: `MBR-${1000 + i}`,
        memberName: ['Rahul Sharma', 'Anjali Devi', 'Sanjay Singh', 'Kavita Iyer', 'Vikram Prabhu'][i % 5],
        chapter: ['ARAM Chapter', 'Arni Chapter', 'Salem Chapter'][i % 3],
        category: ['Architecture', 'Plumbing', 'Electrical', 'Interior Designer'][i % 4],
        status: i % 3 === 0 ? 'Absent' : 'Present'
    })));

    const filteredMembers = members.filter(member => {
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
                            {['All', 'Present', 'Absent'].map(status => (
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
                    <form className="navbar-search ms-2">
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
                    </form>
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
                                            <span className={`badge radius-4 px-12 py-6 text-sm ${member.status === 'Present' ? 'bg-success-focus text-success-main' : 'bg-danger-focus text-danger-main'
                                                }`}>
                                                {member.status}
                                            </span>
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
