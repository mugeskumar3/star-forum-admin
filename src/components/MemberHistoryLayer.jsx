import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AttendanceFilter from "./AttendanceFilter";

const MemberHistoryLayer = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [filters, setFilters] = useState({
        zone: null,
        region: null,
        chapter: null,
        member: { value: id, label: id === "1" ? "Rajesh Kumar" : "Member " + id },
        type: null,
        dateRange: "month",
        fromDate: "",
        toDate: "",
        month: { value: new Date().getMonth() + 1, label: new Intl.DateTimeFormat('en-US', { month: 'long' }).format(new Date()) },
        year: { value: new Date().getFullYear(), label: new Date().getFullYear().toString() },
    });

    const handleFilterChange = (name, selectedOption) => {
        setFilters({ ...filters, [name]: selectedOption });
    };

    // Mock member mapping
    const memberNames = {
        "1": "Rajesh Kumar",
        "rajesh": "Rajesh Kumar",
        "2": "Priya Sharma",
        "3": "Amit Patel"
    };

    const memberName = memberNames[id.toLowerCase()] || (id === "1" ? "Rajesh Kumar" : "Member " + id);

    // Mock data for history
    const historyData = [
        { date: "2024-03-20", chapter: "ARAM", type: "Weekly Meeting", status: "Present" },
        { date: "2024-03-15", chapter: "ARAM", type: "Training", status: "Present" },
        { date: "2024-03-08", chapter: "ARAM", type: "Weekly Meeting", status: "Absent" },
        { date: "2024-03-01", chapter: "ARAM", type: "Weekly Meeting", status: "Present" },
        { date: "2024-02-22", chapter: "ARAM", type: "Weekly Meeting", status: "Present" },
    ];

    const totalMeetings = 25;
    const presentCount = 22;
    const absentCount = 3;

    return (
        <div className="card h-100 p-0 radius-12">
            <div className="card-header border-bottom bg-base py-16 px-24">
                <div className="d-flex align-items-center gap-3 mb-24">
                    <button
                        onClick={() => navigate(-1)}
                        className="btn btn-outline-secondary-light btn-sm radius-8 d-flex align-items-center justify-content-center p-8"
                        title="Back"
                    >
                        <Icon icon="ion:arrow-back-outline" className="text-xl" />
                    </button>
                    <h6 className="text-primary-600 pb-2 mb-3">{memberName} Attendance History</h6>
                </div>

                <div className="row g-3">
                    <div className="col-lg-4 col-sm-6">
                        <div className="p-16 radius-8 border d-flex align-items-center gap-3 bg-primary-50">
                            <span className="w-48-px h-48-px radius-8 bg-primary-600 text-white d-flex justify-content-center align-items-center text-2xl">
                                <Icon icon="lucide:calendar-check" />
                            </span>
                            <div>
                                <h6 className="mb-0">{totalMeetings}</h6>
                                <span className="text-secondary-light">Total Meetings</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-sm-6">
                        <div className="p-16 radius-8 border d-flex align-items-center gap-3 bg-success-50">
                            <span className="w-48-px h-48-px radius-8 bg-success-600 text-white d-flex justify-content-center align-items-center text-2xl">
                                <Icon icon="lucide:check-circle" />
                            </span>
                            <div>
                                <h6 className="mb-0">{presentCount}</h6>
                                <span className="text-secondary-light">Total Present</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-sm-6">
                        <div className="p-16 radius-8 border d-flex align-items-center gap-3 bg-danger-50">
                            <span className="w-48-px h-48-px radius-8 bg-danger-600 text-white d-flex justify-content-center align-items-center text-2xl">
                                <Icon icon="lucide:x-circle" />
                            </span>
                            <div>
                                <h6 className="mb-0">{absentCount}</h6>
                                <span className="text-secondary-light">Total Absent</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="card-body p-24">
                <h6 className="text-primary-600 pb-2 mb-3">Detailed History</h6>
                <div className="table-responsive scroll-sm">
                    <table className="table bordered-table sm-table mb-0">
                        <thead>
                            <tr>
                                <th scope="col">Date</th>
                                <th scope="col">Chapter</th>
                                <th scope="col">Meeting Type</th>
                                <th scope="col" className="text-center">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {historyData.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.date}</td>
                                    <td>{item.chapter}</td>
                                    <td>{item.type}</td>
                                    <td className="text-center">
                                        <span className={`px-24 py-4 rounded-pill fw-medium text-sm ${item.status === 'Present' ? 'bg-success-focus text-success-main' : 'bg-danger-focus text-danger-main'}`}>
                                            {item.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default MemberHistoryLayer;
