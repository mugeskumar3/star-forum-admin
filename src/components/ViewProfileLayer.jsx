import React, { useState } from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useLocation, useNavigate } from 'react-router-dom';

const ViewProfileLayer = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const passedMember = location.state?.member;
    const [showEditPersonal, setShowEditPersonal] = useState(false);
    const [showEditProfessional, setShowEditProfessional] = useState(false);

    // States for "Show More" logic
    const [asksLimit, setAsksLimit] = useState(4);
    const [givesLimit, setGivesLimit] = useState(4);
    const [showFullAsksModal, setShowFullAsksModal] = useState(false);
    const [showFullGivesModal, setShowFullGivesModal] = useState(false);


    // Member Data
    const member = {
        name: passedMember?.memberName || "Mr. Vigannesh Veerasamy",
        email: passedMember?.email || "v2fcons@gmail.com",
        phone1: passedMember?.phoneNumber || "+918300101620",
        phone2: passedMember?.phone2 || "+919962438255",
        website: passedMember?.website || "http://v2feet.com/",
        address: passedMember?.address || "26 Aarthi nagar main road, Aarthi nagar",
        city: passedMember?.city || "Thirumullaivoyal",
        zip: passedMember?.zip || "600062",
        country: passedMember?.country || "India",
        hierarchy: passedMember?.hierarchy || "India > Chennai CBD (A) > Millionaires",
        roles: passedMember?.roles || "Millionaires-Member, Millionaires-Vice President",
        completion: 98,
        connections: 33,
        testimonialsCount: 1,
        professional: passedMember?.category || "Construction, Builder/General Contractor",
        businessFocus: passedMember?.companyName || "Construction (Our focus is on providing best building solutions...)",
        companyName: passedMember?.companyName || "V2 Feet Construction",
        industry: "Construction",
        classification: "Builder/General Contractor",
        chapter: passedMember?.chapter || "Millionaires",
        renewalDate: "01/05/2026",
        membershipStatus: "Active",
        directNumber: "8300101620",
        gstState: "TAMILNADU",
        gstin: "33AUBPV7727J1Z8",
        keywords: "construction, builder, contractors,civil audit, renovation, house contractors, buildings, beach houses, guest house, farm house, boq. the project To executed based on arrives quantity boq",
        myAsks: [
            "New residential project leads",
            "Interior design collaborations",
            "Architectural partnership",
            "Civil engineering consultants",
            "Electrical contractors for large scale projects",
            "Landscape developers for premium villas",
            "Smart home automation experts",
            "Waterproofing specialist contractors",
            "Prefabricated structure suppliers",
            "Sustainable building material manufacturers",
            "Building information modeling (BIM) experts",
            "Green building certification consultants",
            "High-rise structural designers"
        ],
        myGives: [
            "Reliable material suppliers",
            "Project management expertise",
            "Quality construction workforce",
            "Trusted plumbing & sanitation partners",
            "Efficient HVAC system designers",
            "Safety audit & compliance experts",
            "Structural health monitoring services",
            "On-time project delivery guarantee",
            "Cost-effective renovation solutions",
            "High-end finishing material sources",
            "Site supervision & quality control",
            "Vendor management services"
        ],
        trainingHistory: [
            { title: "BNI Awards Nite/ Social/ Members Day - India", date: "17/01/2026" },
            { title: "Leadership Team Roundtable - India", date: "08/12/2025" }
        ]
    };

    const handleCloseEditPersonal = () => setShowEditPersonal(false);
    const handleCloseEditProfessional = () => setShowEditProfessional(false);

    const handleShowMoreAsks = () => {
        if (asksLimit === 4) {
            setAsksLimit(10);
        } else if (member.myAsks.length > 10) {
            setShowFullAsksModal(true);
        }
    };

    const handleShowMoreGives = () => {
        if (givesLimit === 4) {
            setGivesLimit(10);
        } else if (member.myGives.length > 10) {
            setShowFullGivesModal(true);
        }
    };



    return (
        <div className="container-fluid p-0">
            {/* Top Bar with Back Button */}
            <div className="d-flex align-items-center justify-content-between mb-24">

                {/* LEFT : Heading */}
                <h6 className="text-primary-600 mb-0 ms-2">
                    Member Profile Details
                </h6>

                {/* RIGHT : Back button */}
                <button
                    onClick={() => navigate(-1)}
                    className="btn btn-outline-secondary btn-sm d-flex align-items-center gap-2 radius-8 px-16 py-10 shadow-sm transition-2 hover-bg-neutral-50"
                >
                    <Icon icon="solar:arrow-left-bold" />
                    <span className="fw-bold text-xs uppercase-font">Back to List</span>
                </button>

            </div>


            <div className="row gy-4">
                {/* Left Sidebar Profile Section */}
                <div className="col-xl-3 col-lg-4">
                    <div className="card radius-16 border-0 shadow-sm overflow-hidden text-center p-24 bg-white h-100">
                        <div className="position-relative d-inline-block mx-auto mb-20 mt-16">
                            <img
                                src="assets/images/user-grid/user-grid-img14.png"
                                alt="Profile"
                                className="rounded-circle border border-4 border-white shadow-sm"
                                style={{ width: '130px', height: '130px', objectFit: 'cover' }}
                            />
                            <div className="position-absolute" style={{ top: '-10px', right: '-25px' }}>
                                <img src="assets/images/msp-badge.png" alt="MSP" width="70" />
                            </div>
                        </div>

                        <h5 className="fw-bold mb-8 text-dark h6">{member.name}</h5>
                        <p className="text-secondary-light text-xs mb-12 opacity-75">{member.hierarchy}</p>
                        <p className="fw-medium text-dark text-xs mb-20">{member.roles}</p>

                        <div className="px-16 mb-24">
                            <div className="d-flex justify-content-between text-xxs fw-bold mb-6">
                                <span className="text-success-main">{member.completion}% Complete</span>
                                <button className="btn p-0 text-secondary-light text-xxs border-0">See More <Icon icon="ion:chevron-down" /></button>
                            </div>
                            <div className="progress h-6-px radius-4 bg-neutral-100">
                                <div className="progress-bar bg-success-main" role="progressbar" style={{ width: `${member.completion}%` }}></div>
                            </div>
                        </div>

                        <div className="mb-32">
                            <div className="d-flex justify-content-center align-items-center -space-x-12 mb-16">
                                {[1, 2, 3, 4].map(i => (
                                    <img key={i} src={`assets/images/user-grid/user-grid-img${i + 10}.png`} className="w-36-px h-36-px rounded-circle border border-2 border-white object-fit-cover shadow-sm" alt="" style={{ marginLeft: i === 1 ? 0 : '-10px' }} />
                                ))}
                                <div className="w-36-px h-36-px rounded-circle bg-neutral-200 border border-2 border-white d-flex align-items-center justify-content-center text-xxs fw-bold text-secondary-light shadow-sm" style={{ marginLeft: '-10px' }}>DG</div>
                            </div>
                            <h6 className="text-danger-600 fw-bold mb-4" style={{ fontSize: '13px' }}>{member.connections} Connections</h6>
                            <button className="btn p-0 text-danger-600 fw-bold text-xs border-0 bg-transparent">{member.testimonialsCount} Testimonials</button>
                        </div>

                        <div className="card border radius-12 p-16 bg-neutral-50 text-start border-neutral-100">
                            <div className="d-flex align-items-center gap-2 mb-12">
                                <img src="assets/images/user-grid/user-grid-img12.png" className="w-32-px h-32-px rounded-circle" alt="" />
                                <div>
                                    <h6 className="text-xxs fw-bold mb-0 text-dark">Hema Chandran</h6>
                                    <span className="text-xxxxs text-secondary-light">Millionaires</span>
                                </div>
                            </div>
                            <p className="text-xxxxs text-secondary-light italic-font mb-0 line-height-1-5">
                                <Icon icon="fa:quote-left" className="me-1 opacity-25" />
                                Thanks to Mr Vigannesh, I recently gave him my entire clinic work. As a BNI member...
                            </p>
                        </div>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="col-xl-9 col-lg-8">
                    <div className="row gy-4">
                        <div className="col-xl-6">
                            <div className="card radius-16 border-0 shadow-sm p-32 bg-white mb-24">
                                <div className="d-flex justify-content-between align-items-center mb-24">
                                    <h6 className="fw-bold text-danger-600 mb-0" style={{ fontSize: '15px' }}>Personal Details</h6>
                                    <button onClick={() => setShowEditPersonal(true)} className="btn p-0 text-danger-600 fw-bold text-xs text-uppercase border-0">Edit</button>
                                </div>
                                <div className="d-flex flex-column gap-16">
                                    <div className="d-flex align-items-center gap-3">
                                        <div className="w-18-px"><Icon icon="solar:phone-bold" className="text-secondary-light text-md" /></div>
                                        <span className="text-sm text-secondary-light fw-medium">{member.phone1}</span>
                                    </div>
                                    <div className="d-flex align-items-center gap-3">
                                        <div className="w-18-px"><Icon icon="solar:letter-bold" className="text-secondary-light text-md" /></div>
                                        <span className="text-sm text-secondary-light fw-medium">{member.email}</span>
                                    </div>
                                    <div className="d-flex align-items-center gap-3">
                                        <div className="w-18-px"><Icon icon="solar:phone-bold" className="text-secondary-light text-md" /></div>
                                        <span className="text-sm text-secondary-light fw-medium">{member.phone2}</span>
                                    </div>
                                    <div className="d-flex align-items-center gap-3">
                                        <div className="w-18-px"><Icon icon="solar:global-bold" className="text-secondary-light text-md" /></div>
                                        <a href={member.website} target="_blank" rel="noreferrer" className="text-sm text-info-600 fw-medium text-decoration-none">{member.website}</a>
                                    </div>
                                    <div className="d-flex align-items-center gap-3 mt-4">
                                        <div className="w-18-px"><Icon icon="solar:link-bold" className="text-secondary-light text-md" /></div>
                                        <div className="d-flex gap-3">
                                            <Icon icon="logos:facebook" className="text-md cursor-pointer" />
                                            <Icon icon="logos:linkedin-icon" className="text-md cursor-pointer" />
                                            <Icon icon="logos:youtube-icon" className="text-md cursor-pointer" />
                                            <Icon icon="logos:twitter" className="text-md cursor-pointer" />
                                            <Icon icon="logos:whatsapp-icon" className="text-md cursor-pointer" />
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-start gap-3 mt-8 pt-16 border-top border-neutral-100">
                                        <div className="w-18-px pt-2"><Icon icon="solar:map-point-bold" className="text-secondary-light text-xl" /></div>
                                        <div className="flex-grow-1">
                                            <p className="text-sm text-secondary-light fw-medium mb-16 line-height-1-5">{member.address}</p>
                                            <div className="row g-3">
                                                <div className="col-4 border-end border-neutral-100">
                                                    <span className="text-xxxxs text-secondary-light d-block opacity-75 mb-4 font-weight-bold uppercase-font">City</span>
                                                    <span className="text-xs fw-bold text-dark">{member.city}</span>
                                                </div>
                                                <div className="col-4 border-end border-neutral-100">
                                                    <span className="text-xxxxs text-secondary-light d-block opacity-75 mb-4 font-weight-bold uppercase-font">Zip Code</span>
                                                    <span className="text-xs fw-bold text-dark">{member.zip}</span>
                                                </div>
                                                <div className="col-4">
                                                    <span className="text-xxxxs text-secondary-light d-block opacity-75 mb-4 font-weight-bold uppercase-font">Country</span>
                                                    <span className="text-xs fw-bold text-dark">{member.country}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="card radius-16 border-0 shadow-sm overflow-hidden bg-white">
                                <div className="card-header border-bottom bg-base py-16 px-32 d-flex justify-content-between align-items-center border-neutral-100">
                                    <h6 className="fw-bold text-danger-600 mb-0" style={{ fontSize: '15px' }}>About</h6>
                                    <button onClick={() => setShowEditProfessional(true)} className="btn p-0 text-danger-600 fw-bold text-xs text-uppercase border-0">Edit</button>
                                </div>
                                <div className="card-body p-0">
                                    <div className="list-group list-group-flush">
                                        {['GAINS Profile', 'My Bio', 'Tops Profile', 'Weekly Presentations'].map((item, i) => (
                                            <button key={i} className="list-group-item list-group-item-action border-0 px-32 py-20 d-flex justify-content-between align-items-center transition-2 hover-bg-neutral-50 border-top border-neutral-100">
                                                <span className="text-secondary-light fw-medium text-sm">{item}</span>
                                                <Icon icon="ion:chevron-forward" className="text-secondary-light opacity-50 text-md" />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-6">
                            <div className="card radius-16 border-0 shadow-sm p-32 bg-white mb-24">
                                <div className="d-flex justify-content-between align-items-center mb-24">
                                    <h6 className="fw-bold text-danger-600 mb-0" style={{ fontSize: '15px' }}>Professional Details</h6>
                                    <button onClick={() => setShowEditProfessional(true)} className="btn p-0 text-danger-600 fw-bold text-xs text-uppercase border-0">Edit</button>
                                </div>
                                <div className="d-flex flex-column gap-20">
                                    <div className="d-flex gap-3">
                                        <div className="w-18-px"><Icon icon="solar:case-bold" className="text-secondary-light text-lg flex-shrink-0" /></div>
                                        <span className="text-sm text-secondary-light fw-medium line-height-1-5">{member.professional}</span>
                                    </div>
                                    <div className="d-flex gap-3">
                                        <div className="w-18-px"><Icon icon="solar:bag-bold" className="text-secondary-light text-lg flex-shrink-0" /></div>
                                        <span className="text-sm text-secondary-light fw-medium line-height-1-5">{member.businessFocus}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="row g-4 mb-24">
                                <div className="col-md-6">
                                    <div className="card radius-16 border-0 shadow-sm p-24 bg-white h-100 border-start border-4 border-danger-100">
                                        <div className="d-flex justify-content-between align-items-center mb-20">
                                            <h6 className="fw-bold text-danger-600 mb-0" style={{ fontSize: '14px' }}>My Ask</h6>

                                        </div>
                                        <div className="d-flex flex-column gap-10">
                                            {member.myAsks.slice(0, asksLimit).map((ask, idx) => (
                                                <div key={idx} className="d-flex gap-2 align-items-center">
                                                    <span className="text-xxxxs fw-bold text-danger-600">{idx + 1}.</span>
                                                    <span className="text-xs text-secondary-light fw-medium text-truncate">{ask}</span>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="d-flex justify-content-between align-items-center mt-16">

                                            {/* LEFT BUTTON */}
                                            {member.myAsks.length > asksLimit && (
                                                <button
                                                    onClick={handleShowMoreAsks}
                                                    className="btn p-0 text-danger-600 text-xxs fw-bold border-0 bg-transparent text-uppercase transition-2 d-flex align-items-center gap-1"
                                                >
                                                    {asksLimit === 4 ? 'View More' : 'View All List'}
                                                    <Icon icon="solar:double-alt-arrow-down-bold" />
                                                </button>
                                            )}

                                            {/* RIGHT BUTTON */}
                                            {asksLimit > 4 && (
                                                <button
                                                    onClick={() => setAsksLimit(4)}
                                                    className="btn p-0 text-danger-600 text-xxs fw-bold border-0 bg-transparent text-uppercase transition-2 d-flex align-items-center gap-1 ms-auto"
                                                >
                                                    View Less
                                                    <Icon icon="solar:double-alt-arrow-up-bold" />
                                                </button>
                                            )}

                                        </div>

                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="card radius-16 border-0 shadow-sm p-24 bg-white h-100 border-start border-4 border-success-100">
                                        <div className="d-flex justify-content-between align-items-center mb-20">
                                            <h6 className="fw-bold text-danger-600 mb-0" style={{ fontSize: '14px' }}>My Give</h6>

                                        </div>
                                        <div className="d-flex flex-column gap-10">
                                            {member.myGives.slice(0, givesLimit).map((give, idx) => (
                                                <div key={idx} className="d-flex gap-2 align-items-center">
                                                    <span className="text-xxxxs fw-bold text-success-main">{idx + 1}.</span>
                                                    <span className="text-xs text-secondary-light fw-medium text-truncate">{give}</span>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="d-flex justify-content-between align-items-center mt-16">

                                            {/* LEFT */}
                                            {member.myGives.length > givesLimit && (
                                                <button
                                                    onClick={handleShowMoreGives}
                                                    className="btn p-0 text-success-main text-xxs fw-bold border-0 bg-transparent text-uppercase transition-2 d-flex align-items-center gap-1"
                                                >
                                                    {givesLimit === 4 ? 'View More' : 'View All List'}
                                                    <Icon icon="solar:double-alt-arrow-down-bold" />
                                                </button>
                                            )}

                                            {/* RIGHT */}
                                            {givesLimit > 4 && (
                                                <button
                                                    onClick={() => setGivesLimit(4)}
                                                    className="btn p-0 text-success-main text-xxs fw-bold border-0 bg-transparent text-uppercase transition-2 d-flex align-items-center gap-1"
                                                >
                                                    View Less
                                                    <Icon icon="solar:double-alt-arrow-up-bold" />
                                                </button>
                                            )}

                                        </div>



                                    </div>
                                </div>
                            </div>

                            <div className="card radius-16 border-0 shadow-sm p-32 bg-white mb-24">
                                <h6 className="fw-bold text-danger-600 mb-24" style={{ fontSize: '15px' }}>Training History</h6>
                                <div className="d-flex flex-column gap-24">
                                    {member.trainingHistory.map((training, idx) => (
                                        <div key={idx} className="d-flex justify-content-between align-items-center border-bottom border-neutral-50 pb-12 last-child-border-0">
                                            <span className="text-sm fw-bold text-dark w-75 line-height-1-4">{training.title}</span>
                                            <span className="text-xs text-secondary-light fw-medium opacity-75">{training.date}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Asks All List Modal */}
            {showFullAsksModal && (
                <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.6)', overflowY: 'auto', zIndex: 1100 }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content radius-16 border-0 shadow-lg">
                            <div className="modal-header border-bottom py-16 px-24 bg-white">
                                <h6 className="modal-title fw-bold text-danger-600 mb-0">My Ask List</h6>
                                <button type="button" className="btn-close" onClick={() => setShowFullAsksModal(false)}></button>
                            </div>
                            <div className="modal-body p-24">
                                <div className="d-flex flex-column gap-12">
                                    {member.myAsks.map((ask, idx) => (
                                        <div key={idx} className="d-flex gap-3 align-items-center p-12 radius-8 bg-neutral-50">
                                            <span className="badge bg-danger-600 rounded-circle w-24-px h-24-px d-flex align-items-center justify-content-center text-xxs">{idx + 1}</span>
                                            <span className="text-sm text-secondary-light fw-medium">{ask}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Gives All List Modal */}
            {showFullGivesModal && (
                <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.6)', overflowY: 'auto', zIndex: 1100 }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content radius-16 border-0 shadow-lg">
                            <div className="modal-header border-bottom py-16 px-24 bg-white">
                                <h6 className="modal-title fw-bold text-danger-600 mb-0">My Give List</h6>
                                <button type="button" className="btn-close" onClick={() => setShowFullGivesModal(false)}></button>
                            </div>
                            <div className="modal-body p-24">
                                <div className="d-flex flex-column gap-12">
                                    {member.myGives.map((give, idx) => (
                                        <div key={idx} className="d-flex gap-3 align-items-center p-12 radius-8 bg-neutral-50">
                                            <span className="badge bg-success-main rounded-circle w-24-px h-24-px d-flex align-items-center justify-content-center text-xxs">{idx + 1}</span>
                                            <span className="text-sm text-secondary-light fw-medium">{give}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Personal Details Modal */}
            {showEditPersonal && (
                <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.6)', overflowY: 'auto', zIndex: 1050 }}>
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                        <div className="modal-content radius-16 border-0 shadow-lg">
                            <div className="modal-header border-bottom py-20 px-32 bg-white">
                                <h6 className="modal-title fw-bold text-danger-600 mb-0">Edit Personal Details</h6>
                                <button type="button" className="btn-close" onClick={handleCloseEditPersonal}></button>
                            </div>
                            <div className="modal-body p-32">
                                <form className="row g-4">
                                    <div className="col-md-6">
                                        <label className="form-label fw-bold text-sm text-secondary-light mb-8 uppercase-font spacing-1" style={{ fontSize: '11px' }}>Phone Number 1</label>
                                        <input type="text" className="form-control radius-8 border-neutral-200 py-12" defaultValue={member.phone1} />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label fw-bold text-sm text-secondary-light mb-8 uppercase-font spacing-1" style={{ fontSize: '11px' }}>Phone Number 2</label>
                                        <input type="text" className="form-control radius-8 border-neutral-200 py-12" defaultValue={member.phone2} />
                                    </div>
                                    <div className="col-md-12">
                                        <label className="form-label fw-bold text-sm text-secondary-light mb-8 uppercase-font spacing-1" style={{ fontSize: '11px' }}>Email Address</label>
                                        <input type="email" className="form-control radius-8 border-neutral-200 py-12" defaultValue={member.email} />
                                    </div>
                                    <div className="col-md-12">
                                        <label className="form-label fw-bold text-sm text-secondary-light mb-8 uppercase-font spacing-1" style={{ fontSize: '11px' }}>Website URL</label>
                                        <input type="text" className="form-control radius-8 border-neutral-200 py-12" defaultValue={member.website} />
                                    </div>
                                    <div className="col-md-12">
                                        <label className="form-label fw-bold text-sm text-secondary-light mb-8 uppercase-font spacing-1" style={{ fontSize: '11px' }}>Full Address</label>
                                        <textarea className="form-control radius-8 border-neutral-200 py-12" rows="3" defaultValue={member.address}></textarea>
                                    </div>
                                    <div className="col-md-4">
                                        <label className="form-label fw-bold text-sm text-secondary-light mb-8 uppercase-font spacing-1" style={{ fontSize: '11px' }}>City</label>
                                        <input type="text" className="form-control radius-8 border-neutral-200 py-12" defaultValue={member.city} />
                                    </div>
                                    <div className="col-md-4">
                                        <label className="form-label fw-bold text-sm text-secondary-light mb-8 uppercase-font spacing-1" style={{ fontSize: '11px' }}>Zip Code</label>
                                        <input type="text" className="form-control radius-8 border-neutral-200 py-12" defaultValue={member.zip} />
                                    </div>
                                    <div className="col-md-4">
                                        <label className="form-label fw-bold text-sm text-secondary-light mb-8 uppercase-font spacing-1" style={{ fontSize: '11px' }}>Country</label>
                                        <input type="text" className="form-control radius-8 border-neutral-200 py-12" defaultValue={member.country} />
                                    </div>
                                    <div className="col-12 border-top pt-32 mt-32 d-flex justify-content-end gap-3">
                                        <button type="button" className="btn btn-outline-secondary radius-8 px-32 py-12 fw-bold text-sm" onClick={handleCloseEditPersonal}>Cancel</button>
                                        <button type="button" className="btn btn-danger radius-8 px-40 py-12 fw-bold text-sm shadow-sm" style={{ backgroundColor: '#C4161C' }} onClick={handleCloseEditPersonal}>Save Changes</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Professional Details Edit Modal */}
            {showEditProfessional && (
                <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.6)', overflowY: 'auto', zIndex: 1050 }}>
                    <div className="modal-dialog modal-xl modal-dialog-centered">
                        <div className="modal-content radius-16 border-0 shadow-lg overflow-hidden">
                            <div className="modal-header border-bottom py-16 px-32 bg-white">
                                <h6 className="modal-title fw-bold text-danger-600 mb-0">Edit Professional Details</h6>
                                <button type="button" className="btn-close" onClick={handleCloseEditProfessional}></button>
                            </div>
                            <div className="modal-body p-40 bg-neutral-50">
                                <div className="text-end mb-20">
                                    <span className="text-danger-600 text-xs fw-bold">* Required Field</span>
                                </div>
                                <form className="row g-4">
                                    <div className="col-lg-6">
                                        <div className="mb-24">
                                            <label className="form-label text-secondary-light fw-bold mb-10 uppercase-font" style={{ fontSize: '11px' }}>Company Name</label>
                                            <div className="d-flex gap-2">
                                                <input type="text" className="form-control radius-4 bg-neutral-200 border-0 flex-grow-1 px-16 py-12 fw-medium" defaultValue={member.companyName} />
                                                <button type="button" className="btn btn-danger radius-4 px-24 py-12 text-xs fw-bold text-uppercase border-0 shadow-sm" style={{ backgroundColor: '#C4161C' }}>Request Change</button>
                                            </div>
                                        </div>
                                        <div className="mb-24">
                                            <label className="form-label text-secondary-light fw-bold mb-10 uppercase-font" style={{ fontSize: '11px' }}>Company Logo</label>
                                            <div className="d-flex align-items-end gap-4">
                                                <div className="border p-2 bg-white radius-8 flex-shrink-0 shadow-sm">
                                                    <img src="assets/images/logo-placeholder.png" alt="Company Logo" width="140" className="radius-4" />
                                                </div>
                                                <div className="d-flex flex-column gap-2">
                                                    <button type="button" className="btn btn-danger radius-4 px-20 py-10 text-xs fw-bold text-uppercase border-0 shadow-sm w-100" style={{ backgroundColor: '#C4161C' }}>Change Logo</button>
                                                    <button type="button" className="btn btn-outline-danger radius-4 p-10 d-flex align-items-center justify-content-center transition-2" style={{ width: '44px', height: '44px' }}>
                                                        <Icon icon="solar:trash-bin-trash-bold" className="text-lg" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mb-24">
                                            <label className="form-label text-secondary-light fw-bold mb-10 uppercase-font" style={{ fontSize: '11px' }}>Industry</label>
                                            <input type="text" className="form-control radius-4 bg-neutral-200 border-0 px-16 py-12 fw-medium" defaultValue={member.industry} />
                                        </div>
                                        <div className="mb-24">
                                            <label className="form-label text-secondary-light fw-bold mb-10 uppercase-font" style={{ fontSize: '11px' }}>Classification</label>
                                            <input type="text" className="form-control radius-4 bg-neutral-200 border-0 px-16 py-12 fw-medium" defaultValue={member.classification} />
                                        </div>
                                        <div className="mb-24">
                                            <label className="form-label text-secondary-light fw-bold mb-10 uppercase-font" style={{ fontSize: '11px' }}>Chapter</label>
                                            <input type="text" className="form-control radius-4 bg-neutral-200 border-0 px-16 py-12 fw-medium" defaultValue={member.chapter} />
                                        </div>
                                        <div className="mb-24">
                                            <label className="form-label text-secondary-light fw-bold mb-10 uppercase-font" style={{ fontSize: '11px' }}>Renewal Due Date</label>
                                            <input type="text" className="form-control radius-4 bg-neutral-200 border-0 px-16 py-12 fw-medium" defaultValue={member.renewalDate} />
                                        </div>
                                        <button type="button" className="btn btn-danger radius-4 px-24 py-12 text-xs fw-bold text-uppercase border-0 shadow-sm mt-8" style={{ backgroundColor: '#C4161C' }}>Email Last Invoice</button>
                                    </div>

                                    <div className="col-lg-6">
                                        <div className="mb-24">
                                            <label className="form-label text-secondary-light fw-bold mb-10 uppercase-font" style={{ fontSize: '11px' }}>Membership Status</label>
                                            <input type="text" className="form-control radius-4 bg-neutral-200 border-0 px-16 py-12 fw-medium text-success-main font-weight-bold" defaultValue={member.membershipStatus} />
                                        </div>
                                        <div className="mb-24">
                                            <label className="form-label text-secondary-light fw-bold mb-10 uppercase-font" style={{ fontSize: '11px' }}>Direct Number</label>
                                            <input type="text" className="form-control radius-4 bg-white border border-neutral-200 px-16 py-12 fw-medium" defaultValue={member.directNumber} />
                                        </div>
                                        <div className="mb-24">
                                            <label className="form-label text-secondary-light fw-bold mb-10 uppercase-font" style={{ fontSize: '11px' }}>Fax</label>
                                            <input type="text" className="form-control radius-4 bg-white border border-neutral-200 px-16 py-12 fw-medium" placeholder="Enter Fax" />
                                        </div>
                                        <div className="mb-24">
                                            <label className="form-label text-secondary-light fw-bold mb-10 uppercase-font" style={{ fontSize: '11px' }}>Toll Free</label>
                                            <input type="text" className="form-control radius-4 bg-white border border-neutral-200 px-16 py-12 fw-medium" placeholder="Enter Toll Free Number" />
                                        </div>
                                        <div className="mb-24">
                                            <label className="form-label text-secondary-light fw-bold mb-10 uppercase-font" style={{ fontSize: '11px' }}>GST Registered State</label>
                                            <input type="text" className="form-control radius-4 bg-white border border-neutral-200 px-16 py-12 fw-medium" defaultValue={member.gstState} />
                                        </div>
                                        <div className="mb-24">
                                            <label className="form-label text-secondary-light fw-bold mb-10 uppercase-font" style={{ fontSize: '11px' }}>GSTIN / PAN</label>
                                            <input type="text" className="form-control radius-4 bg-white border border-neutral-200 px-16 py-12 fw-medium" defaultValue={member.gstin} />
                                        </div>
                                        <div className="mb-24">
                                            <label className="form-label text-secondary-light fw-bold mb-10 uppercase-font" style={{ fontSize: '11px' }}>My Business</label>
                                            <textarea className="form-control radius-4 bg-white border border-neutral-200 px-16 py-12 fw-medium" rows="3" defaultValue={member.businessFocus}></textarea>
                                        </div>
                                        <div className="mb-0">
                                            <label className="form-label text-secondary-light fw-bold mb-10 uppercase-font" style={{ fontSize: '11px' }}>Keywords (comma separated)</label>
                                            <textarea className="form-control radius-4 bg-white border border-neutral-200 px-16 py-12 fw-medium text-xs" rows="3" defaultValue={member.keywords}></textarea>
                                        </div>
                                    </div>
                                    <div className="col-12 mt-40 d-flex justify-content-end">
                                        <button type="button" className="btn btn-danger radius-8 px-64 py-16 text-sm fw-bold border-0 shadow-lg text-uppercase spacing-1 transform-scale-link" style={{ backgroundColor: '#C4161C' }} onClick={handleCloseEditProfessional}>Update Profile</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <style>{`
                .-space-x-12 > * {
                    margin-left: -12px;
                }
                .spacing-1 {
                    letter-spacing: 1px;
                }
                .italic-font {
                    font-style: italic;
                }
                .uppercase-font {
                    text-transform: uppercase;
                }
                .text-xxxxxs {
                    font-size: 8px;
                }
                .font-weight-bold {
                    font-weight: 700;
                }
                .last-child-border-0:last-child {
                    border-bottom: 0 !important;
                    padding-bottom: 0 !important;
                }
                .transform-scale-link:hover {
                    transform: scale(1.02);
                    filter: brightness(1.1);
                }
                .radius-4 { border-radius: 4px; }
                .radius-16 { border-radius: 16px; }
            `}</style>
        </div>
    );
};

export default ViewProfileLayer;