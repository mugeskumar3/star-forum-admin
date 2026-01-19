import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AttendanceFilter from "./AttendanceFilter";

const MeetingAttendanceLayer = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [searchTerm, setSearchTerm] = useState("");
    const [filters, setFilters] = useState({
        zone: null,
        region: null,
        chapter: { value: id, label: id === "1" ? "ARAM" : id.toUpperCase() },
        member: null,
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

    // Mock chapter mapping
    const chapterMap = {
        "1": "ARAM",
        "aram": "ARAM",
        "2": "STAR",
        "star": "STAR",
        "3": "GALAXY",
        "galaxy": "GALAXY",
        "4": "ELITE",
        "elite": "ELITE",
        "5": "TITAN",
        "titan": "TITAN"
    };

    const chapterName = chapterMap[id.toLowerCase()] || id.toUpperCase();

    const attendanceData = Array.from({ length: 15 }).map((_, i) => ({
        id: i + 1,
        name: ['Rajesh Kumar', 'Priya Sharma', 'Amit Patel', 'Sneha Reddy', 'Vikram Singh', 'Ananya Iyer', 'Suresh Nair', 'Megha Gupta', 'Arjun Verma', 'Kavita Joshi', 'Rahul Deshmukh', 'Pooja Malhotra', 'Sandeep Bansal', 'Neha Choudhury', 'Vijay Ranganathan'][i % 15],
        mobile: `9876543${100 + i}`,
        company: ['Alpha Tech', 'Beta Solutions', 'Gamma University', 'Delta Research', 'Epsilon Labs', 'Zeta Corp', 'Sigma Industries', 'Iota Systems', 'Kappa Ventures', 'Lambda Group', 'Mu Software', 'Nu Enterprises', 'Xi Services', 'Omicron Networks', 'Pi Healthcare'][i % 15],
        category: ['Fire & Safety', 'Software Developer', 'Tax Consultant', 'Electrical Contractor', 'Interior Designer', 'Water Proofing', 'Plan Approval Consultant', 'Computer Sales', 'Insurance', 'Real Estate', 'Education', 'Marketing', 'Healthcare', 'Logistics', 'Agriculture'][i % 15],
        status: i % 3 === 0 ? "Absent" : "Present",
    }));

    const filteredData = attendanceData.filter(
        (item) =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.mobile.includes(searchTerm)
    );

    return (
        <div className="card h-100 p-0 radius-12">
            <div className="card-header border-bottom bg-base py-16 px-24 d-flex align-items-center flex-wrap gap-3 justify-content-between">
                <div className="d-flex align-items-center gap-3">
                    <button
                        onClick={() => navigate(-1)}
                        className="btn btn-outline-secondary-light btn-sm radius-8 d-flex align-items-center justify-content-center p-8"
                        title="Back"
                    >
                        <Icon icon="ion:arrow-back-outline" className="text-xl" />
                    </button>
                    <h6 className="text-primary-600 pb-2 mb-3">{chapterName} Attendance List</h6>
                </div>

                <form className="navbar-search mr-0">
                    <input
                        type="text"
                        className="bg-base h-40-px w-auto"
                        name="search"
                        placeholder="Search Member"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Icon icon="ion:search-outline" className="icon" />
                </form>
            </div>
            <div className="card-body p-24">
                <div className="table-responsive scroll-sm">
                    <table className="table bordered-table sm-table mb-0">
                        <thead>
                            <tr>
                                <th scope="col">S.No</th>
                                <th scope="col">Name</th>
                                <th scope="col">Mobile Number</th>
                                <th scope="col">Company Name</th>
                                <th scope="col">Category</th>
                                <th scope="col" className="text-center">Status</th>
                                <th scope="col" className="text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.length > 0 ? (
                                filteredData.map((item, index) => (
                                    <tr key={item.id}>
                                        <td>{index + 1}</td>
                                        <td>{item.name}</td>
                                        <td>{item.mobile}</td>
                                        <td>{item.company}</td>
                                        <td>{item.category}</td>
                                        <td className="text-center">
                                            <span className={`px-24 py-4 rounded-pill fw-medium text-sm ${item.status === 'Present' ? 'bg-success-focus text-success-main' : 'bg-danger-focus text-danger-main'}`}>
                                                {item.status}
                                            </span>
                                        </td>
                                        <td className="text-center">
                                            <button
                                                onClick={() => navigate(`/member-history/${item.id}`)}
                                                className="btn btn-warning-600 btn-sm radius-8 px-12 py-6 d-flex align-items-center gap-2 mx-auto"
                                            >
                                                <Icon icon="lucide:history" />
                                                History
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="text-center py-3">No records found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default MeetingAttendanceLayer;
