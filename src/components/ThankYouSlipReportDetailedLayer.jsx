import React, { useState } from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';
import Select from "react-select";
import TablePagination from './TablePagination';

const ThankYouSlipReportDetailedLayer = () => {
    // Filter states
    const [selectedRegion, setSelectedRegion] = useState(null);
    const [selectedZone, setSelectedZone] = useState(null);
    const [selectedEd, setSelectedEd] = useState(null);
    const [selectedRd, setSelectedRd] = useState(null);
    const [selectedChapter, setSelectedChapter] = useState(null);

    // Filter Options for react-select
    const regionOptions = ['West Tamil Nadu', 'East Kerala', 'South Karnataka', 'North Andhra'].map(r => ({ value: r, label: r }));
    const zoneOptions = ['Zone A', 'Zone B', 'Zone C', 'Zone D'].map(z => ({ value: z, label: z }));
    const edOptions = ['ED Rajesh', 'ED Priya', 'ED Amit'].map(ed => ({ value: ed, label: ed }));
    const rdOptions = ['RD Suresh', 'RD Megha', 'RD Arjun'].map(rd => ({ value: rd, label: rd }));
    const chapterOptions = ['Alpha Chapter', 'Beta Chapter', 'Gamma Chapter', 'Delta Chapter'].map(c => ({ value: c, label: c }));

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

    // Static Dummy Data for Thank You Slip Report
    const [reportData] = useState(Array.from({ length: 25 }).map((_, i) => ({
        id: i + 1,
        date: `2025-01-${(i % 25) + 1 < 10 ? '0' + ((i % 25) + 1) : (i % 25) + 1}`,
        giverName: ['Logarajan S P', 'Mathiarasu M', 'Mano Neelamegam', 'Kumar Raj S', 'Ramesh Kumar'][i % 5],
        receiverName: ['Receiver John', 'Receiver Jane', 'Receiver Robert', 'Receiver Emily', 'Receiver Michael'][i % 5],
        amount: (i + 1) * 1000,
        type: i % 2 === 0 ? 'Inside' : 'Outside',
        businessType: i % 3 === 0 ? 'New' : i % 3 === 1 ? 'Repeat' : 'Bonus',
        comments: i % 4 === 0 ? 'Excellent service' : 'Regular business transaction',
        region: regionOptions[i % 4].value,
        zone: zoneOptions[i % 4].value,
        ed: edOptions[i % 3].value,
        rd: rdOptions[i % 3].value,
        chapter: chapterOptions[i % 4].value
    })));

    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState("");

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
        setSelectedChapter(null);
        setSearchTerm("");
        setCurrentPage(1);
    };

    const filteredData = reportData.filter(item => {
        const matchesSearch = item.giverName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.receiverName.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesRegion = selectedRegion ? item.region === selectedRegion.value : true;
        const matchesZone = selectedZone ? item.zone === selectedZone.value : true;
        const matchesEd = selectedEd ? item.ed === selectedEd.value : true;
        const matchesRd = selectedRd ? item.rd === selectedRd.value : true;
        const matchesChapter = selectedChapter ? item.chapter === selectedChapter.value : true;

        return matchesSearch && matchesRegion && matchesZone && matchesEd && matchesRd && matchesChapter;
    });

    const totalRecords = filteredData.length;
    const totalPages = Math.ceil(totalRecords / rowsPerPage);

    const currentData = filteredData.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    );

    const renderStars = (rating) => {
        return (
            <div className="d-flex gap-1 text-warning-main">
                {Array.from({ length: 5 }).map((_, i) => (
                    <Icon key={i} icon={i < rating ? "solar:star-bold" : "solar:star-outline"} width="18" />
                ))}
            </div>
        );
    };

    return (
        <div className="card h-100 p-0 radius-12 overflow-hidden">
            <div className="card-header border-bottom bg-base py-16 px-24">
                <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-3">
                    <h6 className="text-primary-600 pb-2 mb-0">Thank You Slip Report</h6>
                    <div className="d-flex align-items-center flex-wrap gap-3">
                        <form className="navbar-search">
                            <input
                                type="text"
                                className="bg-base h-40-px w-auto"
                                name="search"
                                placeholder="Search Member or Referral To"
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
                        <Select
                            options={rdOptions}
                            value={selectedRd}
                            onChange={setSelectedRd}
                            placeholder="RD"
                            styles={customStyles}
                            isClearable
                        />
                    </div>
                    <div className="col-xl-2 col-md-4 col-sm-6">
                        <Select
                            options={chapterOptions}
                            value={selectedChapter}
                            onChange={setSelectedChapter}
                            placeholder="Select Chapter"
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
                                <th scope="col" style={{ color: "black", fontWeight: '600' }}>Date</th>
                                <th scope="col" style={{ color: "black", fontWeight: '600' }}>Member Name</th>
                                <th scope="col" style={{ color: "black", fontWeight: '600' }}>Thank to</th>
                                <th scope="col" style={{ color: "black", fontWeight: '600' }}>Type</th>
                                <th scope="col" style={{ color: "black", fontWeight: '600' }}>Amount</th>
                                <th scope="col" style={{ color: "black", fontWeight: '600' }}>Comments</th>
                                <th scope="col" style={{ color: "black", fontWeight: '600' }}>Star Rating</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentData.length > 0 ? (
                                currentData.map((item) => (
                                    <tr key={item.id}>
                                        <td>
                                            <span className="text-md mb-0 fw-medium text-secondary-light">
                                                {item.date}
                                            </span>
                                        </td>
                                        <td>
                                            <span className="text-md mb-0 fw-medium text-primary-600">
                                                {item.giverName}
                                            </span>
                                        </td>
                                        <td>
                                            <span className="text-md mb-0 fw-medium text-dark">
                                                {item.receiverName}
                                            </span>
                                        </td>
                                        <td>
                                            <span className={`badge radius-4 px-10 py-4 text-sm ${item.type === 'Inside' ? 'bg-success-focus text-success-main' : 'bg-info-focus text-info-main'
                                                }`}>
                                                {item.type}
                                            </span>
                                        </td>
                                        <td>
                                            <span className="text-md mb-0 fw-bold text-success-main">
                                                {item.amount}
                                            </span>
                                        </td>
                                        <td>
                                            <div className="text-md mb-0 fw-normal text-secondary-light" style={{ maxWidth: '200px' }}>
                                                {item.comments}
                                            </div>
                                        </td>
                                        <td>
                                            {renderStars(item.starRating)}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="text-center py-4">
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

export default ThankYouSlipReportDetailedLayer;
