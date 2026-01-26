import React, { useState } from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';
import Select from "react-select";
import TablePagination from './TablePagination';

const MemberPointsReportLayer = () => {
    // Filter states
    const [selectedRegion, setSelectedRegion] = useState(null);
    const [selectedZone, setSelectedZone] = useState(null);
    const [selectedEd, setSelectedEd] = useState(null);
    const [selectedRd, setSelectedRd] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    // Filter Options for react-select
    const regionOptions = ['Tamil Nadu', 'Kerala', 'Karnataka', 'Andhra Pradesh'].map(r => ({ value: r, label: r }));
    const zoneOptions = ['Zone 1', 'Zone 2', 'Zone 3', 'Zone 4'].map(z => ({ value: z, label: z }));
    const edOptions = ['ED Rajesh', 'ED Priya', 'ED Amit'].map(ed => ({ value: ed, label: ed }));
    const rdOptions = ['RD Suresh', 'RD Megha', 'RD Arjun'].map(rd => ({ value: rd, label: rd }));

    const customStyles = {
        control: (provided) => ({
            ...provided,
            minHeight: "40px",
            borderRadius: "8px",
            border: "1px solid #dee2e6",
            boxShadow: "none",
            "&:hover": {
                border: "1px solid #dee2e6",
            },
        }),
        menu: (provided) => ({
            ...provided,
            zIndex: 9999,
        }),
    };

    // Static Dummy Data for Member Points Report
    const [reportData] = useState(Array.from({ length: 30 }).map((_, i) => ({
        id: i + 1,
        name: ['Logarajan S P', 'Mathiarasu M', 'Mano Neelamegam', 'Kumar Raj S', 'Ramesh Kumar', 'Priya Sharma', 'Arun Kumar', 'Divya Patel'][i % 8],
        oneToOnes: Math.floor(Math.random() * 20) + 5,
        referrals: Math.floor(Math.random() * 15) + 3,
        weeklyMeetings: Math.floor(Math.random() * 12) + 8,
        thankYouNotes: Math.floor(Math.random() * 10) + 2,
        visitors: Math.floor(Math.random() * 8) + 1,
        chiefGuests: Math.floor(Math.random() * 5),
        powerDates: Math.floor(Math.random() * 6) + 1,
        inductions: Math.floor(Math.random() * 3),
        region: regionOptions[i % 4].value,
        zone: zoneOptions[i % 4].value,
        ed: edOptions[i % 3].value,
        rd: rdOptions[i % 3].value,
    })));

    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleRowsPerPageChange = (e) => {
        setRowsPerPage(parseInt(e.target.value));
        setCurrentPage(1);
    };

    const handleClearFilters = () => {
        setSelectedRegion(null);
        setSelectedZone(null);
        setSelectedEd(null);
        setSelectedRd(null);
        setSearchTerm("");
        setCurrentPage(1);
    };

    const filteredData = reportData.filter(item => {
        const matchesSearch = searchTerm === '' ||
            item.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRegion = selectedRegion ? item.region === selectedRegion.value : true;
        const matchesZone = selectedZone ? item.zone === selectedZone.value : true;
        const matchesEd = selectedEd ? item.ed === selectedEd.value : true;
        const matchesRd = selectedRd ? item.rd === selectedRd.value : true;

        return matchesSearch && matchesRegion && matchesZone && matchesEd && matchesRd;
    });

    const totalRecords = filteredData.length;
    const totalPages = Math.ceil(totalRecords / rowsPerPage);

    const currentData = filteredData.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    );

    // Calculate total points for each member
    const calculateTotalPoints = (member) => {
        return member.oneToOnes + member.referrals + member.weeklyMeetings +
            member.thankYouNotes + member.visitors + member.chiefGuests +
            member.powerDates + member.inductions;
    };

    return (
        <div className="card h-100 p-0 radius-12 overflow-hidden">
            <div className="card-header border-bottom bg-base py-16 px-24">
                <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-3">
                    <h6 className="text-primary-600 pb-2 mb-0">Member Points Report</h6>
                    <div className="d-flex align-items-center flex-wrap gap-3">
                        <form className="navbar-search">
                            <input
                                type="text"
                                className="bg-base h-40-px w-auto"
                                name="search"
                                placeholder="Search Member Name"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <Icon icon="ion:search-outline" className="icon" />
                        </form>
                    </div>
                </div>

                {/* Top Filters */}
                <div className="row g-3 align-items-end">
                    <div className="col-xl col-md-4 col-sm-6">
                        <label className="form-label fw-bold text-secondary-light">Region</label>
                        <Select
                            options={regionOptions}
                            value={selectedRegion}
                            onChange={setSelectedRegion}
                            placeholder="Region"
                            styles={customStyles}
                            isClearable
                        />
                    </div>
                    <div className="col-xl col-md-4 col-sm-6">
                        <label className="form-label fw-bold text-secondary-light">Zone</label>
                        <Select
                            options={zoneOptions}
                            value={selectedZone}
                            onChange={setSelectedZone}
                            placeholder="Zone"
                            styles={customStyles}
                            isClearable
                        />
                    </div>
                    <div className="col-xl col-md-4 col-sm-6">
                        <label className="form-label fw-bold text-secondary-light">ED</label>
                        <Select
                            options={edOptions}
                            value={selectedEd}
                            onChange={setSelectedEd}
                            placeholder="ED"
                            styles={customStyles}
                            isClearable
                        />
                    </div>
                    <div className="col-xl col-md-4 col-sm-6">
                        <label className="form-label fw-bold text-secondary-light">RD</label>
                        <Select
                            options={rdOptions}
                            value={selectedRd}
                            onChange={setSelectedRd}
                            placeholder="RD"
                            styles={customStyles}
                            isClearable
                        />
                    </div>
                    <div className="col-xl-auto col-md-4 col-sm-6 d-flex align-items-end">
                        <button
                            type="button"
                            onClick={handleClearFilters}
                            className="btn btn-outline-danger d-flex align-items-center gap-2 radius-8 h-40-px text-nowrap w-100"
                            title="Clear All Filters"
                        >
                            <Icon icon="solar:filter-remove-bold-duotone" fontSize={20} />
                            Clear Filter
                        </button>
                    </div>
                </div>
            </div>

            <div className="card-body p-24">
                <div className="table-responsive scroll-sm">
                    <table className="table bordered-table sm-table mb-0">
                        <thead>
                            <tr>
                                <th scope="col" style={{ color: "black", fontWeight: '600' }}>Sl.No</th>
                                <th scope="col" style={{ color: "black", fontWeight: '600' }}>Name</th>
                                <th scope="col" style={{ color: "black", fontWeight: '600' }}>Total Points</th>
                                <th scope="col" style={{ color: "black", fontWeight: '600' }}>121's</th>
                                <th scope="col" style={{ color: "black", fontWeight: '600' }}>Referral's</th>
                                <th scope="col" style={{ color: "black", fontWeight: '600' }}>Meetings</th>
                                <th scope="col" style={{ color: "black", fontWeight: '600' }}>Thank You Notes</th>
                                <th scope="col" style={{ color: "black", fontWeight: '600' }}>Visitor's</th>
                                <th scope="col" style={{ color: "black", fontWeight: '600' }}>Chief Guest's</th>
                                <th scope="col" style={{ color: "black", fontWeight: '600' }}>Power date's</th>
                                <th scope="col" style={{ color: "black", fontWeight: '600' }}>Inductions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentData.length > 0 ? (
                                currentData.map((item, index) => (
                                    <tr key={item.id}>
                                        <td>
                                            <span className="text-md mb-0 fw-medium text-secondary-light">
                                                {(currentPage - 1) * rowsPerPage + index + 1}
                                            </span>
                                        </td>
                                        <td>
                                            <span className="text-md mb-0 fw-medium text-primary-600">
                                                {item.name}
                                            </span>
                                        </td>
                                        <td>
                                            <span className="text-md mb-0 fw-bold text-success-main">
                                                {calculateTotalPoints(item)}
                                            </span>
                                        </td>
                                        <td>
                                            <span className="text-md mb-0 fw-normal text-secondary-light">
                                                {item.oneToOnes}
                                            </span>
                                        </td>
                                        <td>
                                            <span className="text-md mb-0 fw-normal text-secondary-light">
                                                {item.referrals}
                                            </span>
                                        </td>
                                        <td>
                                            <span className="text-md mb-0 fw-normal text-secondary-light">
                                                {item.weeklyMeetings}
                                            </span>
                                        </td>
                                        <td>
                                            <span className="text-md mb-0 fw-normal text-secondary-light">
                                                {item.thankYouNotes}
                                            </span>
                                        </td>
                                        <td>
                                            <span className="text-md mb-0 fw-normal text-secondary-light">
                                                {item.visitors}
                                            </span>
                                        </td>
                                        <td>
                                            <span className="text-md mb-0 fw-normal text-secondary-light">
                                                {item.chiefGuests}
                                            </span>
                                        </td>
                                        <td>
                                            <span className="text-md mb-0 fw-normal text-secondary-light">
                                                {item.powerDates}
                                            </span>
                                        </td>
                                        <td>
                                            <span className="text-md mb-0 fw-normal text-secondary-light">
                                                {item.inductions}
                                            </span>
                                        </td>

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
        </div>
    );
};

export default MemberPointsReportLayer;
