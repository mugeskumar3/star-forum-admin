import React, { useState } from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useNavigate } from 'react-router-dom';
import Select from "react-select";
import TablePagination from './TablePagination';

const TrainingsReportLayer = () => {
    const navigate = useNavigate();
    // Filter states
    const [selectedRegion, setSelectedRegion] = useState(null);
    const [selectedZone, setSelectedZone] = useState(null);
    const [selectedEd, setSelectedEd] = useState(null);
    const [selectedRd, setSelectedRd] = useState(null);
    const [selectedChapter, setSelectedChapter] = useState(null);

    // Options for react-select
    const regionOptions = ['Tamil Nadu', 'Kerala', 'Karnataka', 'Andhra Pradesh'].map(r => ({ value: r, label: r }));
    const zoneOptions = ['Zone 1', 'Zone 2', 'Zone 3', 'Zone 4'].map(z => ({ value: z, label: z }));
    const edOptions = ['ED Rajesh', 'ED Priya', 'ED Amit'].map(ed => ({ value: ed, label: ed }));
    const rdOptions = ['RD Suresh', 'RD Megha', 'RD Arjun'].map(rd => ({ value: rd, label: rd }));
    const chapterOptions = ['ARAM Chapter', 'Arni Chapter', 'Salem Chapter', 'Coimbatore Chapter'].map(c => ({ value: c, label: c }));

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

    // Static Dummy Data for Trainings Report
    const [reportData] = useState(Array.from({ length: 25 }).map((_, i) => ({
        id: i + 1,
        trainingTitle: ['Member Success Program', 'Leadership Team Training', 'Advanced Networking', 'Presentation Skills', 'Social Media Training'][i % 5],
        date: `2025-01-${(i % 25) + 1 < 10 ? '0' + ((i % 25) + 1) : (i % 25) + 1}`,
        // time: i % 2 === 0 ? '10:00 AM - 01:00 PM' : '02:00 PM - 05:00 PM',
        trainerName: ['Trainer Rajesh', 'Trainer Priya', 'Trainer Amit', 'Trainer Sneha', 'Trainer Vikram'][i % 5],
        location: i % 2 === 0 ? 'Online (Zoom)' : 'Hotel Residency, Chennai',
        totalRegistered: 20 + (i % 30),
        status: i % 3 === 0 ? 'Upcoming' : i % 3 === 1 ? 'Completed' : 'Cancelled',
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
        const matchesSearch = item.trainingTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.trainerName.toLowerCase().includes(searchTerm.toLowerCase());

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

    const handleActionClick = (item) => {
        // Redirection to the new page instead of modal
        navigate(`/trainings-report/interested-members/${item.id}`);
    };

    return (
        <div className="card h-100 p-0 radius-12 overflow-hidden">
            <div className="card-header border-bottom bg-base py-16 px-24">
                <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-3">
                    <h6 className="text-primary-600 pb-2 mb-0">Trainings Report</h6>
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
                            placeholder="Chapter"
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
                                <th scope="col" style={{ color: "black", fontWeight: '600' }}>Training Title</th>
                                <th scope="col" style={{ color: "black", fontWeight: '600' }}>Trainer Name</th>
                                <th scope="col" style={{ color: "black", fontWeight: '600' }}>Location</th>
                                <th scope="col" style={{ color: "black", fontWeight: '600' }}>Status</th>
                                <th scope="col" className="text-center" style={{ color: "black", fontWeight: '600' }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentData.length > 0 ? (
                                currentData.map((item) => (
                                    <tr key={item.id}>
                                        <td>
                                            <span className="text-md mb-0 fw-medium text-secondary-light">
                                                {item.date} {item.time}
                                            </span>
                                        </td>
                                        <td>
                                            <span className="text-md mb-0 fw-normal text-secondary-light">
                                                {item.trainingTitle}
                                            </span>
                                        </td>
                                        <td>
                                            <span className="text-md mb-0 fw-normal text-secondary-light">
                                                {item.trainerName}
                                            </span>
                                        </td>
                                        <td>
                                            <span className="text-md mb-0 fw-normal text-secondary-light">
                                                {item.location}
                                            </span>
                                        </td>
                                        <td>
                                            <span className={`badge radius-4 px-10 py-4 text-sm ${item.status === 'Completed' ? 'bg-success-focus text-success-main' : item.status === 'Upcoming' ? 'bg-info-focus text-info-600' : 'bg-danger-focus text-danger-600'
                                                }`}>
                                                {item.status}
                                            </span>
                                        </td>
                                        <td className="text-center">
                                            <button
                                                type="button"
                                                onClick={() => handleActionClick(item)}
                                                className="btn btn-primary-600 text-sm radius-8 px-12 py-8 d-inline-flex align-items-center gap-2"
                                            >
                                                <Icon icon="solar:users-group-rounded-bold-duotone" width="18" />
                                                Interested Members
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="text-center py-4">
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
        </div >
    );
};

export default TrainingsReportLayer;
