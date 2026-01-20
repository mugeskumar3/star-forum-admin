import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Link, useParams } from "react-router-dom";
import ReactApexChart from "react-apexcharts";

const ChapterViewLayer = () => {
    const { id } = useParams();
    const [chapter, setChapter] = useState(null);

    // Mock Data to match List Layer
    useEffect(() => {
        const chaptersData = Array.from({ length: 20 }).map((_, i) => ({
            id: i + 1,
            name: ['Chennai Central', 'Mumbai South', 'Delhi West', 'Bangalore East', 'Hyderabad North', 'Kolkata Metro', 'Pune City', 'Ahmedabad GIDC', 'Jaipur Pink', 'Lucknow Nawabs', 'Chandigarh Royal', 'Coimbatore Elite', 'Madurai Star', 'Trichy Titans', 'Salem Warriors', 'Erode Kings', 'Vellore Fort', 'Nellore Coast', 'Vizag Port', 'Kochi Spice'][i],
            country: "India",
            state: ['Tamil Nadu', 'Maharashtra', 'Delhi', 'Karnataka', 'Telangana', 'West Bengal', 'Maharashtra', 'Gujarat', 'Rajasthan', 'Uttar Pradesh', 'Punjab', 'Tamil Nadu', 'Tamil Nadu', 'Tamil Nadu', 'Tamil Nadu', 'Tamil Nadu', 'Tamil Nadu', 'Andhra Pradesh', 'Andhra Pradesh', 'Kerala'][i],
            zone: `Zone ${i + 1}`,
            type: i % 2 === 0 ? "In Person" : "Online",
            createdDate: "2025-01-01",
        }));

        const foundChapter = chaptersData.find(c => c.id === parseInt(id));
        setChapter(foundChapter || chaptersData[0]); // Fallback to first if not found
    }, [id]);

    // Mock ED/RD Data
    const edRdTeam = [
        { name: "Suresh K", role: "Regional Director", image: "https://i.pravatar.cc/150?u=suresh" },
        { name: "Anita R", role: "Executive Director", image: "https://i.pravatar.cc/150?u=anita" },
        { name: "Dinesh P", role: "Support Ambassador", image: "https://i.pravatar.cc/150?u=dinesh" },
        { name: "Meera S", role: "Launch Director", image: "https://i.pravatar.cc/150?u=meera" },
    ];

    // Mock Core Leadership Data
    const coreTeam = [
        { name: "Prabhu M", role: "President", image: "https://i.pravatar.cc/150?u=prabhu" },
        { name: "Rajesh K", role: "Vice President", image: "https://i.pravatar.cc/150?u=rajesh" },
        { name: "Ibrahim M", role: "Secretary", image: "https://i.pravatar.cc/150?u=ibrahim" },
        { name: "Mahendran M", role: "Treasurer", image: "https://i.pravatar.cc/150?u=mahendran" },
        { name: "Mohamed Umar", role: "Lead Visitor Host", image: "https://i.pravatar.cc/150?u=umar" },
        { name: "Saranya V", role: "Education Coordinator", image: "https://i.pravatar.cc/150?u=saranya" },
        { name: "Manoj V", role: "Events Coordinator", image: "https://i.pravatar.cc/150?u=manoj" },
        { name: "Justin S", role: "Growth Coordinator", image: "https://i.pravatar.cc/150?u=justin" },
    ];

    const stats = [
        { label: "Power Date", value: "30 days", icon: "mdi:calendar-range", color: "bg-primary-50 text-primary-600" },
        { label: "Referrals", value: "94", icon: "mdi:handshake", color: "bg-success-50 text-success-600" },
        { label: "Visitors", value: "03", icon: "mdi:account-eye", color: "bg-warning-50 text-warning-600" },
        { label: "1-2-1s", value: "0", icon: "mdi:account-convert", color: "bg-info-50 text-info-600" },
        { label: "Thank You Slips", value: "118", icon: "mdi:script-text-outline", color: "bg-danger-50 text-danger-600" },
        { label: "Business Given", value: "₹2.5 L", icon: "mdi:currency-inr", color: "bg-purple-50 text-purple-600" },
    ];

    if (!chapter) return <div>Loading...</div>;

    return (
        <div className="d-flex flex-column gap-24">
            {/* Header Section */}
            <div className="card p-24 bg-base radius-12 shadow-sm border-0">
                <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                    {/* Chapter Info */}
                    <div>
                        <h4 className="mb-1 text-primary-600 fw-bold">{chapter.name}</h4>
                        <p className="text-secondary-light mb-0 text-sm">{chapter.city || chapter.state}, {chapter.country}</p>
                        <div className="d-flex align-items-center gap-2 mt-2">
                            <span className={`badge ${chapter.type === "Online" ? "bg-success-focus text-success-main" : "bg-primary-focus text-primary-main"} px-3 py-1 radius-4`}>
                                {chapter.type}
                            </span>
                        </div>
                    </div>

                    {/* Meeting Details */}
                    <div className="text-start text-md-center">
                        <h6 className="mb-2 fw-semibold text-secondary-light">Meeting Details</h6>
                        <div className="d-flex flex-column">
                            <span className="text-sm fw-medium text-primary-600">Wednesday</span>
                            <span className="text-sm text-secondary-light">07:30 AM - 09:30 AM</span>
                        </div>
                    </div>

                    {/* Member Count */}
                    <div className="text-center">
                        <h6 className="mb-1 text-secondary-light">Member Count</h6>
                        <h2 className="mb-0 text-primary-600 fw-bold">30</h2>
                        <Link to="#" className="text-xs text-secondary-light hover-text-primary-600">View Members</Link>
                    </div>

                    {/* Back Button */}
                    <div>
                        <Link to="/chapter-creation" className="btn btn-outline-secondary d-flex align-items-center gap-2 px-20 py-10 radius-8">
                            <Icon icon="mdi:arrow-left" className="text-xl" />
                            Back
                        </Link>
                    </div>

                </div>
            </div>

            {/* Stats Row */}
            <div className="row gy-3">
                {stats.map((stat, index) => (
                    <div key={index} className="col-xxl-2 col-md-4 col-sm-6">
                        <div className={`card p-16 radius-12 border-0 shadow-sm d-flex align-items-center gap-3 ${stat.color.split(' ')[0]} bg-opacity-10`}>
                            <div className={`w-40-px h-40-px rounded-circle d-flex justify-content-center align-items-center ${stat.color}`}>
                                <Icon icon={stat.icon} className="text-2xl" />
                            </div>
                            <div>
                                <h6 className="mb-0 fw-bold">{stat.value}</h6>
                                <span className="text-secondary-light text-sm">{stat.label}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Regional & ED Leadership */}
            <div className="d-flex flex-column gap-3">
                <h6 className="mb-0 fw-bold text-primary-600">Regional & ED Team</h6>
                <div className="row g-4">
                    {edRdTeam.map((leader, index) => (
                        <div key={index} className="col-xl-3 col-lg-4 col-sm-6">
                            <LeadershipCard leader={leader} />
                        </div>
                    ))}
                </div>
            </div>

            {/* Chapter Core Leadership */}
            <div className="d-flex flex-column gap-3">
                <h6 className="mb-0 fw-bold text-primary-600">Chapter Core Leadership</h6>
                <div className="row g-4">
                    {coreTeam.map((leader, index) => (
                        <div key={index} className="col-xl-3 col-lg-4 col-sm-6">
                            <LeadershipCard leader={leader} />
                        </div>
                    ))}
                </div>
            </div>

            {/* Business Achieved Section */}
            <div className="card h-100 p-0 radius-12 shadow-sm border-0 overflow-hidden">
                <div className="card-header bg-transparent border-bottom px-24 py-16 d-flex align-items-center justify-content-between">
                    <h6 className="mb-0 fw-bold text-primary-600">Business Achieved</h6>
                    <span className="text-sm text-secondary-light">Last updated: {new Date().toLocaleDateString()}</span>
                </div>
                <div className="card-body p-24">
                    <div className="row g-4">
                        <div className="col-lg-4">
                            <div className="h-100 d-flex flex-column align-items-center justify-content-center p-24 bg-primary-50 radius-12 border border-primary-100 text-center">
                                <h2 className="display-5 fw-bold text-primary-600 mb-1">₹28.5L</h2>
                                <span className="text-secondary-light fw-medium">Total Revenue Generated</span>
                            </div>
                        </div>
                        <div className="col-lg-8">
                            <BusinessChart />
                        </div>
                    </div>
                </div>
            </div>

            {/* Top Achievers Section */}
            <div className="d-flex flex-column gap-3">
                <h6 className="mb-0 fw-bold text-primary-600">Top Achievers</h6>
                <div className="row g-4">
                    <TopAchieverCard
                        title="Top Testimonials"
                        total={1}
                        icon="mdi:comment-quote"
                        data={[{ name: "Logarajan S P", count: 1, image: "https://i.pravatar.cc/150?u=loga" }]}
                    />
                    <TopAchieverCard
                        title="Top 1-1 Meetings"
                        total={118}
                        icon="mdi:account-multiple-check"
                        data={[
                            { name: "Mathiarasu M", count: 22, image: "https://i.pravatar.cc/150?u=mathi" },
                            { name: "Logarajan S P", count: 15, image: "https://i.pravatar.cc/150?u=loga" },
                            { name: "Mohamed Umar", count: 14, image: "https://i.pravatar.cc/150?u=umar" },
                        ]}
                    />
                    <TopAchieverCard
                        title="Top Referrals"
                        total={96}
                        icon="mdi:handshake"
                        data={[
                            { name: "Naresh Babu R", count: 12, image: "https://i.pravatar.cc/150?u=naresh" },
                            { name: "Hariharan I", count: 10, image: "https://i.pravatar.cc/150?u=hari" },
                            { name: "Saranya ES", count: 10, image: "https://i.pravatar.cc/150?u=saranya" },
                        ]}
                    />
                    <TopAchieverCard
                        title="Top Thank You Notes"
                        total={171}
                        icon="mdi:note-text"
                        data={[
                            { name: "FED", count: 13, image: "https://i.pravatar.cc/150?u=fed" },
                            { name: "GRIP Forum", count: 9, image: "https://i.pravatar.cc/150?u=grip" },
                            { name: "Lokesh Balachander", count: 4, image: "https://i.pravatar.cc/150?u=lokesh" },
                        ]}
                    />
                </div>
            </div>
        </div>
    );
};

export default ChapterViewLayer;

const BusinessChart = () => {
    const options = {
        chart: {
            height: 300,
            type: 'area', // Changed to area for better look
            toolbar: { show: false },
            zoom: { enabled: false },
            fontFamily: 'Inter, sans-serif'
        },
        dataLabels: { enabled: false },
        stroke: { curve: 'smooth', width: 3, colors: ['#C4161C'] }, // Primary Red
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.3,
                opacityTo: 0.05,
                stops: [0, 90, 100]
            }
        },
        grid: {
            borderColor: '#f1f1f1',
            strokeDashArray: 3
        },
        colors: ['#C4161C'],
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            labels: { style: { colors: '#6B7280', fontSize: '12px' } }
        },
        yaxis: {
            min: 0,
            max: 5,
            tickAmount: 5,
            labels: {
                formatter: (value) => { return value.toFixed(1) },
                style: { colors: '#6B7280', fontSize: '12px' }
            }
        },
        tooltip: {
            y: {
                formatter: function (val) {
                    return "₹ " + val + " Lakhs"
                }
            }
        }
    };

    const series = [{
        name: "Revenue",
        data: [0.5, 0.8, 1.2, 0.9, 1.5, 2.0, 1.8, 2.5, 2.8, 3.2, 3.8, 4.5]
    }];

    return (
        <ReactApexChart options={options} series={series} type="area" height={280} />
    );
};

const LeadershipCard = ({ leader }) => {
    return (
        <div className="card h-100 shadow-sm border-0 radius-12 hover-scale-1 transition-2 top-border-card">
            <div className="card-body p-24 text-center">
                <div className="w-80-px h-80-px mx-auto mb-3 p-1 rounded-circle border border-2 border-primary-100 bg-white">
                    <img src={leader.image} alt={leader.name} className="w-100 h-100 rounded-circle object-fit-cover" onError={(e) => e.target.src = `https://ui-avatars.com/api/?name=${leader.name}`} />
                </div>
                <h6 className="text-primary-600 fw-bold mb-1 title-case">{leader.name}</h6>
                <p className="text-secondary-light text-sm mb-3 text-uppercase fw-medium tracking-wide">{leader.role}</p>

                <div className="d-flex justify-content-center gap-2">
                    <button className="btn btn-primary-50 text-primary-600 hover-bg-primary-600 hover-text-white rounded-circle w-32-px h-32-px d-flex justify-content-center align-items-center p-0 transition-2">
                        <Icon icon="mdi:phone" />
                    </button>
                    <button className="btn btn-success-50 text-success-600 hover-bg-success-600 hover-text-white rounded-circle w-32-px h-32-px d-flex justify-content-center align-items-center p-0 transition-2">
                        <Icon icon="mdi:whatsapp" />
                    </button>
                    <button className="btn btn-info-50 text-info-600 hover-bg-info-600 hover-text-white rounded-circle w-32-px h-32-px d-flex justify-content-center align-items-center p-0 transition-2">
                        <Icon icon="mdi:email-outline" />
                    </button>
                </div>
            </div>
        </div>
    );
}

const TopAchieverCard = ({ title, total, data, icon }) => {
    return (
        <div className="col-xl-3 col-md-6">
            <div className="card h-100 border-0 radius-12 shadow-sm overflow-hidden">
                <div className="card-body p-0">
                    <div className="d-flex align-items-center justify-content-between p-20 border-bottom border-neutral-100" style={{ backgroundColor: '#f48989ff' }}>
                        <div className="d-flex align-items-center gap-3">
                            <div className="w-40-px h-40-px rounded-circle bg-white shadow-sm d-flex justify-content-center align-items-center text-primary-600">
                                <Icon icon={icon} className="text-xl" />
                            </div>
                            <h6 className="mb-0 text-primary-600 fw-semibold text-md">{title}</h6>
                        </div>
                        <span className="badge bg-primary-600 text-white fw-bold px-10 py-1 radius-8">{total}</span>
                    </div>
                    <div className="p-16">
                        <ul className="d-flex flex-column gap-2 mb-0">
                            {data.map((item, i) => (
                                <li key={i} className="d-flex align-items-center justify-content-between p-12 radius-8 bg-hover-neutral-50 transition-1 border border-transparent hover-border-neutral-200">
                                    <div className="d-flex align-items-center gap-3">
                                        <div className="position-relative">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-36-px h-36-px rounded-circle object-fit-cover shadow-sm border border-white"
                                            />
                                            {/* {i === 0 && <span className="position-absolute top-0 start-100 translate-middle p-1 bg-warning-main border border-light rounded-circle"><span className="visually-hidden">Top</span></span>} */}
                                        </div>
                                        <div className="d-flex flex-column">
                                            <span className="text-primary-600 fw-medium text-sm title-case">{item.name}</span>
                                        </div>
                                    </div>
                                    <span className="text-primary-600 fw-bold fs-6">{item.count}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
