import React, { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";
import TablePagination from "./TablePagination";

const ChapterReportListLayer = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    // Sample chapter name based on ID
    const chapterName = id === '1' ? 'ARAM' : id === '2' ? 'Chapter testing' : id === '3' ? 'Arni' : 'Chapter';

    // Static Dummy Data for Chapter Report Members
    const [members, setMembers] = useState(Array.from({ length: 15 }).map((_, i) => ({
        id: i + 1,
        memberName: ['Logarajan S P', 'Mathiarasu M', 'Mano Neelamegam', 'Kumar Raj S', 'Ramesh Kumar', 'Priya Lakshmi', 'Vijay S', 'Anbu Selvan', 'Revathi S', 'Murugan G', 'Santhosh M', 'Arun Kumar', 'Deepak S', 'Karthik R', 'Suresh P'][i % 15],
        category: ['CCTV & Security', 'Fire & Safety', 'Interior Designer', 'General Insurance', 'Automobile', 'Retail', 'IT Services', 'Manufacturing', 'FMCG', 'Industry', 'Building Materials', 'Real Estate', 'Logistics', 'Education', 'Healthcare'][i % 15],
        oneToOnes: Math.floor(Math.random() * 20),
        referrals: Math.floor(Math.random() * 30),
        visitors: Math.floor(Math.random() * 15),
        chiefGuests: Math.floor(Math.random() * 10),
        thankYouSlip: `₹${(Math.random() * 100000).toLocaleString('en-IN', { maximumFractionDigits: 0 })}`,
        powerDates: Math.floor(Math.random() * 5),
        trainings: Math.floor(Math.random() * 8),
    })));

    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedMember, setSelectedMember] = useState(null);

    const filteredMembers = members.filter(
        (member) =>
            member.memberName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            member.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

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

    const handleViewPopup = (member) => {
        setSelectedMember(member);
        const modal = new window.bootstrap.Modal(document.getElementById('memberDetailsModal'));
        modal.show();
    };

    return (
        <div className="card h-100 p-0 radius-12">
            <div className="card-header border-bottom bg-base py-16 px-24 d-flex align-items-center flex-wrap gap-3 justify-content-between">
                <div className="d-flex align-items-center flex-wrap gap-3">
                    <button
                        onClick={() => navigate(-1)}
                        className="btn btn-outline-primary-600 d-flex align-items-center gap-2 radius-8 px-12 py-8"
                        style={{ border: '1px solid var(--primary-600)', color: 'var(--primary-600)' }}
                    >
                        <Icon icon="ion:arrow-back-outline" />
                        Back
                    </button>
                    <h6 className="text-primary-600 mb-0 ms-2">{chapterName} Chapter Report</h6>
                </div>
                <div className="d-flex align-items-center flex-wrap gap-3">
                    <form className="navbar-search">
                        {/* <input
                            type="text"
                            className="bg-base h-40-px w-auto"
                            name="search"
                            placeholder="Search Member"
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setCurrentPage(1);
                            }}
                        /> */}
                        <Icon icon="ion:search-outline" className="icon" />
                    </form>
                    {/* <button
                        onClick={() => navigate('/member-points-report')}
                        className="btn btn-primary-600 d-flex align-items-center gap-2 radius-8 h-40-px text-nowrap"
                    >
                        <Icon icon="solar:chart-2-bold-duotone" fontSize={20} />
                        Member Points Report
                    </button> */}
                </div>
            </div>
            <div className="card-body p-24">
                <div className="table-responsive scroll-sm">
                    <table className="table bordered-table sm-table mb-0">
                        <thead>
                            <tr>
                                <th scope="col" style={{ color: "black", fontWeight: '600' }}>Sl.No</th>
                                <th scope="col" style={{ color: "black", fontWeight: '600' }}>Member Name</th>
                                <th scope="col" style={{ color: "black", fontWeight: '600' }}>Category</th>
                                <th scope="col" className="text-center" style={{ color: "black", fontWeight: '600' }}>121's</th>
                                <th scope="col" className="text-center" style={{ color: "black", fontWeight: '600' }}>Referral's</th>
                                <th scope="col" className="text-center" style={{ color: "black", fontWeight: '600' }}>Visitor's</th>
                                <th scope="col" className="text-center" style={{ color: "black", fontWeight: '600' }}>Chief Guest's</th>
                                <th scope="col" style={{ color: "black", fontWeight: '600' }}>Thank you Slip Value</th>
                                <th scope="col" className="text-center" style={{ color: "black", fontWeight: '600' }}>Power date's</th>
                                <th scope="col" className="text-center" style={{ color: "black", fontWeight: '600' }}>training's</th>
                                {/* <th scope="col" className="text-center" style={{ color: "black", fontWeight: '600' }}>View pop up</th> */}
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
                                            <span className="text-md mb-0 fw-medium text-primary-600">
                                                {member.memberName}
                                            </span>
                                        </td>
                                        <td>
                                            <span className="text-md mb-0 fw-normal text-secondary-light">
                                                {member.category}
                                            </span>
                                        </td>
                                        <td className="text-center">
                                            <span className="text-md mb-0 fw-normal text-secondary-light">
                                                {member.oneToOnes}
                                            </span>
                                        </td>
                                        <td className="text-center">
                                            <span className="text-md mb-0 fw-normal text-secondary-light">
                                                {member.referrals}
                                            </span>
                                        </td>
                                        <td className="text-center">
                                            <span className="text-md mb-0 fw-normal text-secondary-light">
                                                {member.visitors}
                                            </span>
                                        </td>
                                        <td className="text-center">
                                            <span className="text-md mb-0 fw-normal text-secondary-light">
                                                {member.chiefGuests}
                                            </span>
                                        </td>
                                        <td>
                                            <span className="text-md mb-0 fw-normal text-success-600 fw-bold">
                                                {member.thankYouSlip}
                                            </span>
                                        </td>
                                        <td className="text-center">
                                            <span className="text-md mb-0 fw-normal text-secondary-light">
                                                {member.powerDates}
                                            </span>
                                        </td>
                                        <td className="text-center">
                                            <span className="text-md mb-0 fw-normal text-secondary-light">
                                                {member.trainings}
                                            </span>
                                        </td>
                                        {/* <td className="text-center">
                                            <button
                                                type="button"
                                                onClick={() => handleViewPopup(member)}
                                                className="bg-info-focus bg-hover-info-200 text-info-600 fw-medium w-40-px h-40-px d-flex justify-content-center align-items-center rounded-circle border-0 mx-auto"
                                            >
                                                <Icon
                                                    icon="majesticons:eye-line"
                                                    className="icon text-xl"
                                                />
                                            </button>
                                        </td> */}
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="11" className="text-center py-4">
                                        No data found.
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

            {/* Modal for Overall Details */}
            <div className="modal fade" id="memberDetailsModal" tabIndex="-1" aria-labelledby="memberDetailsModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content radius-16 border-0">
                        <div className="modal-header border-bottom bg-base py-16 px-24">
                            <h6 className="modal-title fw-bold text-primary-600" id="memberDetailsModalLabel">
                                Overall Details - {selectedMember?.memberName}
                            </h6>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body p-24">
                            {selectedMember && (
                                <div className="row g-4">
                                    <div className="col-md-6">
                                        <div className="p-16 radius-12 bg-neutral-50 border">
                                            <h6 className="text-sm fw-bold mb-12 text-secondary-light">Member Information</h6>
                                            <div className="d-flex flex-column gap-2">
                                                <div className="d-flex justify-content-between">
                                                    <span className="text-secondary-light">Name:</span>
                                                    <span className="fw-medium text-dark">{selectedMember.memberName}</span>
                                                </div>
                                                <div className="d-flex justify-content-between">
                                                    <span className="text-secondary-light">Category:</span>
                                                    <span className="fw-medium text-dark">{selectedMember.category}</span>
                                                </div>
                                                <div className="d-flex justify-content-between">
                                                    <span className="text-secondary-light">Chapter:</span>
                                                    <span className="fw-medium text-dark">{chapterName}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="p-16 radius-12 bg-neutral-50 border h-100">
                                            <h6 className="text-sm fw-bold mb-12 text-secondary-light">Performance Summary</h6>
                                            <div className="row g-3">
                                                <div className="col-6">
                                                    <div className="text-xxs text-secondary-light text-uppercase">1-2-1s</div>
                                                    <div className="fw-bold text-lg">{selectedMember.oneToOnes}</div>
                                                </div>
                                                <div className="col-6">
                                                    <div className="text-xxs text-secondary-light text-uppercase">Referrals</div>
                                                    <div className="fw-bold text-lg">{selectedMember.referrals}</div>
                                                </div>
                                                <div className="col-6">
                                                    <div className="text-xxs text-secondary-light text-uppercase">Visitors</div>
                                                    <div className="fw-bold text-lg">{selectedMember.visitors}</div>
                                                </div>
                                                <div className="col-6">
                                                    <div className="text-xxs text-secondary-light text-uppercase">Trainings</div>
                                                    <div className="fw-bold text-lg">{selectedMember.trainings}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="p-16 radius-12 bg-success-focus border border-success-200">
                                            <div className="d-flex justify-content-between align-items-center">
                                                <div>
                                                    <h6 className="text-sm fw-bold mb-4 text-success-main">Total Business Shared</h6>
                                                    <div className="display-6 fw-bold text-success-main">{selectedMember.thankYouSlip}</div>
                                                </div>
                                                <Icon icon="solar:round-transfer-horizontal-bold-duotone" width="48" className="text-success-main opacity-50" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="p-16 radius-12 bg-primary-50 border border-primary-100">
                                            <h6 className="text-sm fw-bold mb-12 text-primary-600">Other Activities</h6>
                                            <div className="d-flex flex-wrap gap-4">
                                                <div className="d-flex align-items-center gap-2">
                                                    <div className="w-8-px h-8-px rounded-circle bg-primary-600"></div>
                                                    <span className="text-sm">Chief Guest Apps: <strong>{selectedMember.chiefGuests}</strong></span>
                                                </div>
                                                <div className="d-flex align-items-center gap-2">
                                                    <div className="w-8-px h-8-px rounded-circle bg-primary-600"></div>
                                                    <span className="text-sm">Power Dates: <strong>{selectedMember.powerDates}</strong></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="modal-footer border-top-0 p-24 pt-0">
                            <button type="button" className="btn btn-secondary radius-8" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChapterReportListLayer;
