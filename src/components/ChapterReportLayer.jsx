import React, { useState } from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';
import Select from "react-select";
import TablePagination from './TablePagination';
import { useNavigate } from 'react-router-dom';

const ChapterReportLayer = () => {
    const navigate = useNavigate();

    // Filter states
    const [selectedRegion, setSelectedRegion] = useState(null);
    const [selectedZone, setSelectedZone] = useState(null);
    const [selectedEd, setSelectedEd] = useState(null);
    const [selectedRd, setSelectedRd] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    // Options mapping for react-select
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

    const chapters = [
        {
            id: 1,
            name: 'ARAM',
            members: 31,
            region: 'Tamil Nadu',
            zone: 'Zone 1',
            ed: 'ED Rajesh',
            rd: 'RD Suresh',
            stats: {
                referrals: 154,
                visitors: 60,
                events: 0,
                trainings: 0,
                absents: 0,
                thankYouSlip: '₹1,34,11,533',
                oneToOne: 150,
                testimonials: 6
            }
        },
        {
            id: 2,
            name: 'Chapter testing',
            members: 1,
            region: 'Tamil Nadu',
            zone: 'Zone 2',
            ed: 'ED Priya',
            rd: 'RD Megha',
            stats: {
                referrals: 1,
                visitors: 0,
                events: 0,
                trainings: 0,
                absents: 0,
                thankYouSlip: '₹8,000',
                oneToOne: 1,
                testimonials: 0
            }
        },
        {
            id: 3,
            name: 'Arni',
            members: 12,
            region: 'Tamil Nadu',
            zone: 'Zone 3',
            ed: 'ED Amit',
            rd: 'RD Arjun',
            stats: {
                referrals: 50,
                visitors: 77,
                events: 0,
                trainings: 0,
                absents: 0,
                thankYouSlip: '₹67,29,71,600',
                oneToOne: 47,
                testimonials: 18
            }
        },
        {
            id: 4,
            name: 'Salem',
            members: 45,
            region: 'Tamil Nadu',
            zone: 'Zone 4',
            ed: 'ED Rajesh',
            rd: 'RD Suresh',
            stats: {
                referrals: 210,
                visitors: 85,
                events: 5,
                trainings: 12,
                absents: 2,
                thankYouSlip: '₹2,45,67,890',
                oneToOne: 180,
                testimonials: 15
            }
        }
    ];

    const filteredChapters = chapters.filter(chapter => {
        const matchesSearch = searchTerm === '' ||
            chapter.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRegion = selectedRegion ? chapter.region === selectedRegion.value : true;
        const matchesZone = selectedZone ? chapter.zone === selectedZone.value : true;
        const matchesEd = selectedEd ? chapter.ed === selectedEd.value : true;
        const matchesRd = selectedRd ? chapter.rd === selectedRd.value : true;

        return matchesSearch && matchesRegion && matchesZone && matchesEd && matchesRd;
    });

    const statItems = [
        { key: 'oneToOne', label: 'One to One', icon: 'mdi:account-multiple' },
        { key: 'referrals', label: 'Referrals', icon: 'mdi:handshake' },
        { key: 'visitors', label: 'Visitors', icon: 'mdi:account-check' },
        { key: 'testimonials', label: "Chief Guest's", icon: 'mdi:star-circle' },
        { key: 'events', label: "Power date's", icon: 'mdi:calendar-star' },
        { key: 'trainings', label: 'Trainings', icon: 'mdi:school' },
        // { key: 'absents', label: "Member's", icon: 'mdi:account-remove' },
    ];

    const handleCardClick = (id) => {
        navigate(`/chapter-report-list/${id}`);
    };

    const handleClearFilters = () => {
        setSelectedRegion(null);
        setSelectedZone(null);
        setSelectedEd(null);
        setSearchTerm("");
        setSelectedRd(null);
    };

    return (
        <div className="card h-100 p-0 radius-12">
            <div className="card-header border-bottom bg-base py-16 px-24">
                <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-3">
                    <h6 className="text-primary-600 pb-2 mb-0">Chief Guest's Report</h6>
                    <div className="d-flex align-items-center flex-wrap gap-3">
                        <form className="navbar-search">
                            <input
                                type="text"
                                className="bg-base h-40-px w-auto"
                                name="search"
                                placeholder="Search Chief Guest, Business or Member"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <Icon icon="ion:search-outline" className="icon" />
                        </form>
                    </div>
                </div>

                {/* Filters */}
                <div className="row g-3 align-items-end">
                    <div className="col-xl col-md-6">
                        <Select
                            options={regionOptions}
                            value={selectedRegion}
                            onChange={setSelectedRegion}
                            placeholder="Region"
                            styles={customStyles}
                            isClearable
                        />
                    </div>
                    <div className="col-xl col-md-6">
                        <Select
                            options={zoneOptions}
                            value={selectedZone}
                            onChange={setSelectedZone}
                            placeholder="Zone"
                            styles={customStyles}
                            isClearable
                        />
                    </div>
                    <div className="col-xl col-md-6">
                        <Select
                            options={edOptions}
                            value={selectedEd}
                            onChange={setSelectedEd}
                            placeholder="ED"
                            styles={customStyles}
                            isClearable
                        />
                    </div>
                    <div className="col-xl col-md-6">
                        <Select
                            options={rdOptions}
                            value={selectedRd}
                            onChange={setSelectedRd}
                            placeholder="RD"
                            styles={customStyles}
                            isClearable
                        />
                    </div>
                    <div className="col-xl-auto col-md-6 d-flex align-items-end">
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

            {/* Cards Section */}
            <div className="p-24">
                <div className="row g-4">
                    {filteredChapters.length > 0 ? (
                        filteredChapters.map(chapter => (
                            <div key={chapter.id} className="col-xl-4 col-lg-6 col-md-6">
                                <div
                                    className="h-100 shadow-sm transition-2 hover-shadow-md "

                                    style={{
                                        backgroundColor: 'var(--white)',
                                        borderRadius: '16px',
                                        border: '1px solid var(--border-color)',
                                        position: 'relative',
                                        overflow: 'hidden'
                                    }}
                                >
                                    <div className="p-20">
                                        {/* Chapter Header */}
                                        <div
                                            className="rounded-3 p-16 mb-20"
                                            style={{
                                                background: 'linear-gradient(135deg, var(--primary-600), #1f1e46)',
                                                color: '#fff'
                                            }}
                                        >
                                            <div className="d-flex align-items-center justify-content-between cursor-pointer"
                                                onClick={() => handleCardClick(chapter.id)}>
                                                <div>
                                                    <h6 className="mb-4 text-white fw-bold text-uppercase" style={{ fontSize: '18px', letterSpacing: '0.5px' }}>
                                                        {chapter.name}
                                                    </h6>
                                                    <div className="d-flex align-items-center gap-2 opacity-80">
                                                        <Icon icon="mdi:map-marker" width="14" />
                                                        <span className="text-xs">{chapter.region} | {chapter.zone}</span>
                                                    </div>
                                                </div>
                                                <div className="text-end">
                                                    <div className="fw-bold" style={{ fontSize: '24px', lineHeight: 1 }}>{chapter.members}</div>
                                                    <div className="text-xxs text-uppercase opacity-70 mt-4">Members</div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Leadership Info */}
                                        <div className="d-flex gap-3 mb-20 p-12 bg-neutral-50 radius-8 border">
                                            <div className="flex-grow-1">
                                                <div className="text-xxs text-uppercase text-secondary-light fw-bold mb-4">Executive Director</div>
                                                <div className="text-sm fw-bold text-dark">{chapter.ed}</div>
                                            </div>
                                            <div className="vr opacity-10"></div>
                                            <div className="flex-grow-1">
                                                <div className="text-xxs text-uppercase text-secondary-light fw-bold mb-4">Regional Director</div>
                                                <div className="text-sm fw-bold text-dark">{chapter.rd}</div>
                                            </div>
                                        </div>

                                        {/* Stats Grid */}
                                        <div className="row g-2 mb-20">
                                            {statItems.map(item => (
                                                <div key={item.key} className="col-6">
                                                    <div className="p-12 rounded-3 border bg-base transition-1 hover-bg-neutral-50 h-100">
                                                        <div className="d-flex justify-content-between align-items-center mb-4">
                                                            <Icon icon={item.icon} width="16" className="text-primary-600" />
                                                            <span className="fw-bold text-dark" style={{ fontSize: '16px' }}>
                                                                {chapter.stats[item.key]}
                                                            </span>
                                                        </div>
                                                        <div className="text-secondary-light fw-medium" style={{ fontSize: '14px' }}>{item.label}</div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Thank You Slip */}
                                        <div
                                            className="p-16 rounded-3"
                                            style={{
                                                background: 'var(--success-50)',
                                                border: '1px solid var(--success-100)'
                                            }}
                                        >
                                            <div className="d-flex align-items-center justify-content-between">
                                                <div>
                                                    <small className="fw-bold text-success-main text-uppercase" style={{ fontSize: '14px' }}>Thank You Slips</small>
                                                    <div className="fw-bold text-dark mt-4" style={{ fontSize: '18px' }}>
                                                        {chapter.stats.thankYouSlip}
                                                    </div>
                                                </div>
                                                <div className="bg-success-main text-white p-8 radius-8">
                                                    <Icon icon="mdi:cash-multiple" width="20" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-12 py-60">
                            <div className="text-center">
                                <Icon icon="solar:document-text-outline" width="64" className="text-neutral-300 mb-16" />
                                <h5 className="text-secondary-light">No chapters found matching your filters</h5>
                                <button
                                    className="btn btn-primary-600 mt-16"
                                    onClick={handleClearFilters}
                                >
                                    Clear All Filters
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ChapterReportLayer;
