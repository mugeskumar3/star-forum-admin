import React, { useEffect, useState, useRef } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Link, NavLink, useLocation } from "react-router-dom";
import ThemeToggleButton from "../helper/ThemeToggleButton";

const MasterLayout = ({ children }) => {
  let [sidebarActive, seSidebarActive] = useState(false);
  let [mobileMenu, setMobileMenu] = useState(false);
  const location = useLocation(); // Hook to get the current route
  const sidebarRef = useRef(null);

  useEffect(() => {
    const handleDropdownClick = (event) => {
      event.preventDefault();
      const clickedLink = event.currentTarget;
      const clickedDropdown = clickedLink.closest(".dropdown");

      if (!clickedDropdown) return;

      const isActive = clickedDropdown.classList.contains("open");

      // Close all dropdowns
      const allDropdowns = document.querySelectorAll(".sidebar-menu .dropdown");
      allDropdowns.forEach((dropdown) => {
        dropdown.classList.remove("open");
        const submenu = dropdown.querySelector(".sidebar-submenu");
        if (submenu) {
          submenu.style.maxHeight = "0px"; // Collapse submenu
        }
      });

      // Toggle the clicked dropdown
      if (!isActive) {
        clickedDropdown.classList.add("open");
        const submenu = clickedDropdown.querySelector(".sidebar-submenu");
        if (submenu) {
          submenu.style.maxHeight = `${submenu.scrollHeight}px`; // Expand submenu
        }
      }
    };

    // Attach click event listeners to all dropdown triggers
    const dropdownTriggers = document.querySelectorAll(
      ".sidebar-menu .dropdown > a, .sidebar-menu .dropdown > Link",
    );

    dropdownTriggers.forEach((trigger) => {
      trigger.addEventListener("click", handleDropdownClick);
    });

    const openActiveDropdown = () => {
      const allDropdowns = document.querySelectorAll(".sidebar-menu .dropdown");
      allDropdowns.forEach((dropdown) => {
        const submenuLinks = dropdown.querySelectorAll(".sidebar-submenu li a");
        submenuLinks.forEach((link) => {
          const path = link.getAttribute("href") || link.getAttribute("to");
          if (
            (path &&
              (location.pathname === path ||
                location.pathname.startsWith(path + "/"))) ||
            link.classList.contains("active-page")
          ) {
            dropdown.classList.add("open");
            const submenu = dropdown.querySelector(".sidebar-submenu");
            if (submenu) {
              submenu.style.maxHeight = `${submenu.scrollHeight}px`; // Expand submenu
            }
          }
        });
      });

      // Scroll active link into view
      setTimeout(() => {
        const activeLink = document.querySelector(".sidebar-menu .active-page");
        if (activeLink && sidebarRef.current) {
          activeLink.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }
      }, 300);
    };

    // Open the submenu that contains the active route
    openActiveDropdown();

    // Cleanup event listeners on unmount
    return () => {
      dropdownTriggers.forEach((trigger) => {
        trigger.removeEventListener("click", handleDropdownClick);
      });
    };
  }, [location.pathname]);

  useEffect(() => {
    // Restore scroll position
    const savedScrollPos = sessionStorage.getItem("sidebarScroll");
    if (savedScrollPos && sidebarRef.current) {
      sidebarRef.current.scrollTop = parseInt(savedScrollPos, 10);
    }

    const handleScroll = () => {
      if (sidebarRef.current) {
        sessionStorage.setItem("sidebarScroll", sidebarRef.current.scrollTop);
      }
    };

    const sidebar = sidebarRef.current;
    if (sidebar) {
      sidebar.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (sidebar) {
        sidebar.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  let sidebarControl = () => {
    seSidebarActive(!sidebarActive);
  };

  let mobileMenuControl = () => {
    setMobileMenu(!mobileMenu);
  };

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const dateStr = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  })
    .format(currentTime)
    .replace(/ /g, "-");

  const timeStr = new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Kolkata",
  }).format(currentTime);

  const formattedTime = `${dateStr} ${timeStr}`;

  return (
    <section className={mobileMenu ? "overlay active" : "overlay "}>
      {/* sidebar */}
      <aside
        className={
          sidebarActive
            ? "sidebar active "
            : mobileMenu
              ? "sidebar sidebar-open"
              : "sidebar"
        }
      >
        <button
          onClick={mobileMenuControl}
          type="button"
          className="sidebar-close-btn"
        >
          <Icon icon="radix-icons:cross-2" />
        </button>
        <div>
          <Link to="/" className="sidebar-logo">
            <img
              src="/assets/images/logo.png"
              alt="site logo"
              className="light-logo"
            />
            <img
              src="/assets/images/logo.png"
              alt="site logo"
              className="dark-logo"
            />
            <img
              src="/assets/images/logo-icon.png"
              alt="site logo"
              className="logo-icon"
            />
          </Link>
        </div>
        <div className="sidebar-menu-area" ref={sidebarRef}>
          <ul className="sidebar-menu" id="sidebar-menu">
            {/* Dashboard */}
            <li>
              <NavLink
                to="/"
                className={(navData) => (navData.isActive ? "active-page" : "")}
              >
                <Icon
                  icon="solar:home-smile-angle-outline"
                  className="menu-icon"
                />
                <span>Dashboard</span>
              </NavLink>
            </li>


            {/* Master Creation */}
            <li className="dropdown">
              <Link to="#">
                <i className="ri-folder-settings-line menu-icon" />
                <span>Master Creation</span>
              </Link>
              <ul className="sidebar-submenu">
                <li>
                  <NavLink
                    to="/user-roles"
                    className={(navData) =>
                      navData.isActive ? "active-page" : ""
                    }
                  >
                    <i className="ri-circle-fill circle-icon text-primary-600 w-auto" />{" "}
                    Roles & Permissions
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/admin-registration"
                    className={(navData) =>
                      navData.isActive ? "active-page" : ""
                    }
                  >
                    <i className="ri-circle-fill circle-icon text-primary-600 w-auto" />{" "}
                    Admin Registration
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/organisation"
                    className={(navData) =>
                      navData.isActive ? "active-page" : ""
                    }
                  >
                    <i className="ri-circle-fill circle-icon text-primary-600 w-auto" />{" "}
                    Organisation
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/badge"
                    className={(navData) =>
                      navData.isActive ? "active-page" : ""
                    }
                  >
                    <i className="ri-circle-fill circle-icon text-primary-600 w-auto" />{" "}
                    Badge Creation
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/award"
                    className={(navData) =>
                      navData.isActive ? "active-page" : ""
                    }
                  >
                    <i className="ri-circle-fill circle-icon text-primary-600 w-auto" />{" "}
                    Award
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/business-category"
                    className={(navData) =>
                      navData.isActive ? "active-page" : ""
                    }
                  >
                    <i className="ri-circle-fill circle-icon text-primary-600 w-auto" />{" "}
                    Business Category
                  </NavLink>
                </li>
              </ul>
            </li>

            {/* Chapter Creation */}
            <li>
              <NavLink
                to="/chapter-creation"
                className={(navData) =>
                  navData.isActive || location.pathname.startsWith("/chapter-view")
                    ? "active-page"
                    : ""
                }
              >
                <i className="ri-community-line menu-icon" />
                <span>Chapter Creation</span>
              </NavLink>
            </li>

            {/* Members Registration */}
            <li>
              <NavLink
                to="/members-registration"
                className={(navData) => (navData.isActive ? "active-page" : "")}
              >
                <i className="ri-user-add-line menu-icon" />
                <span>Members Registration</span>
              </NavLink>
            </li>

            {/* Meeting Creation */}
            <li>
              <NavLink
                to="/meeting-creation"
                className={(navData) => (navData.isActive ? "active-page" : "")}
              >
                <i className="ri-calendar-event-line menu-icon" />
                <span>Meeting Creation</span>
              </NavLink>
            </li>

            {/* Attendance List */}
            <li>
              <NavLink
                to="/attendance-report"
                className={(navData) =>
                  navData.isActive ||
                    location.pathname.startsWith("/meeting-attendance") ||
                    location.pathname.startsWith("/member-history")
                    ? "active-page"
                    : ""
                }
              >
                <i className="ri-file-list-3-line menu-icon" />
                <span>Attendance List</span>
              </NavLink>
            </li>

            {/* Announcement */}
            <li className="dropdown">
              <Link to="#">
                <i className="ri-megaphone-line menu-icon" />
                <span>Announcement</span>
              </Link>
              <ul className="sidebar-submenu">
                <li>
                  <NavLink
                    to="/general-update"
                    className={(navData) =>
                      navData.isActive ? "active-page" : ""
                    }
                  >
                    <i className="ri-circle-fill circle-icon text-primary-600 w-auto" />{" "}
                    General Update
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/community-update"
                    className={(navData) =>
                      navData.isActive ? "active-page" : ""
                    }
                  >
                    <i className="ri-circle-fill circle-icon text-primary-600 w-auto" />{" "}
                    Community Update
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/star-update"
                    className={(navData) =>
                      navData.isActive ? "active-page" : ""
                    }
                  >
                    <i className="ri-circle-fill circle-icon text-primary-600 w-auto" />{" "}
                    Star Update
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/points"
                    className={(navData) =>
                      navData.isActive ? "active-page" : ""
                    }
                  >
                    <i className="ri-circle-fill circle-icon text-primary-600 w-auto" />{" "}
                    Points
                  </NavLink>
                </li>
              </ul>
            </li>

            {/* Training */}
            <li>
              <NavLink
                to="/training"
                className={(navData) =>
                  navData.isActive ||
                    location.pathname === "/training-list" ||
                    location.pathname === "/training-create" ||
                    location.pathname.startsWith("/training-edit") ||
                    location.pathname.startsWith("/training-view")
                    ? "active-page"
                    : ""
                }
              >
                <i className="ri-presentation-line menu-icon" />
                <span>Training</span>
              </NavLink>
            </li>

            {/* Shop */}
            {/* Shop */}
            <li className="dropdown">
              <Link to="#">
                <i className="ri-store-2-line menu-icon" />
                <span>Shop</span>
              </Link>
              <ul className="sidebar-submenu">
                <li>
                  <NavLink
                    to="/shop-create"
                    className={(navData) =>
                      navData.isActive || location.pathname === "/shop-add"
                        ? "active-page"
                        : ""
                    }
                  >
                    <i className="ri-circle-fill circle-icon text-primary-600 w-auto" />{" "}
                    Create Product
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/shop-list"
                    className={(navData) =>
                      navData.isActive ? "active-page" : ""
                    }
                  >
                    <i className="ri-circle-fill circle-icon text-primary-600 w-auto" />{" "}
                    Place Order
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/orders"
                    className={(navData) =>
                      navData.isActive ? "active-page" : ""
                    }
                  >
                    <i className="ri-circle-fill circle-icon text-primary-600 w-auto" />{" "}
                    Orders List
                  </NavLink>
                </li>
              </ul>
            </li>

            {/* Log Report */}
            <li>
              <NavLink
                to="/log-report"
                className={(navData) => (navData.isActive ? "active-page" : "")}
              >
                <i className="ri-file-history-line menu-icon" />
                <span>Log Report</span>
              </NavLink>
            </li>

            {/* Renewal Report */}
            <li>
              <NavLink
                to="/renewal-report"
                className={(navData) => (navData.isActive ? "active-page" : "")}
              >
                <i className="ri-refresh-line menu-icon" />
                <span>Renewal Report</span>
              </NavLink>
            </li>

            {/* Chapter Report */}
            <li>
              <NavLink
                to="/chapter-report"
                className={(navData) => (navData.isActive ? "active-page" : "")}
              >
                <i className="ri-building-line menu-icon" />
                <span>Chapter Report</span>
              </NavLink>
            </li>

            {/* ED Report */}
            <li>
              <NavLink
                to="/ed-report"
                className={(navData) => (navData.isActive ? "active-page" : "")}
              >
                <i className="ri-user-star-line menu-icon" />
                <span>ED Report</span>
              </NavLink>
            </li>

            {/* RD Report */}
            <li>
              <NavLink
                to="/rd-report"
                className={(navData) => (navData.isActive ? "active-page" : "")}
              >
                <i className="ri-global-line menu-icon" />
                <span>RD Report</span>
              </NavLink>
            </li>

            {/* Visitors Report */}
            <li>
              <NavLink
                to="/visitors-report"
                className={(navData) => (navData.isActive ? "active-page" : "")}
              >
                <i className="ri-group-line menu-icon" />
                <span>Visitors Report</span>
              </NavLink>
            </li>

            {/* Chapter Activity Report */}
            <li className="dropdown">
              <Link to="#">
                <i className="ri-pulse-line menu-icon" />
                <span>Chapter Activity Report</span>
              </Link>
              <ul className="sidebar-submenu">
                <li>
                  <NavLink
                    to="/note-121"
                    className={(navData) =>
                      navData.isActive ? "active-page" : ""
                    }
                  >
                    <i className="ri-circle-fill circle-icon text-primary-600 w-auto" />{" "}
                    121 Note
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/referral-note"
                    className={(navData) =>
                      navData.isActive ? "active-page" : ""
                    }
                  >
                    <i className="ri-circle-fill circle-icon text-primary-600 w-auto" />{" "}
                    Referral Note
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/thank-you-slip"
                    className={(navData) =>
                      navData.isActive ? "active-page" : ""
                    }
                  >
                    <i className="ri-circle-fill circle-icon text-primary-600 w-auto" />{" "}
                    Thank you Slip
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/power-date"
                    className={(navData) =>
                      navData.isActive ? "active-page" : ""
                    }
                  >
                    <i className="ri-circle-fill circle-icon text-primary-600 w-auto" />{" "}
                    Power date
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/testimonials"
                    className={(navData) =>
                      navData.isActive ? "active-page" : ""
                    }
                  >
                    <i className="ri-circle-fill circle-icon text-primary-600 w-auto" />{" "}
                    Testimonials
                  </NavLink>
                </li>
              </ul>
            </li>

            {/* Chief Guest List */}
            <li>
              <NavLink
                to="/chief-guest-list"
                className={(navData) => (navData.isActive ? "active-page" : "")}
              >
                <i className="ri-vip-diamond-line menu-icon" />
                <span>Chief Guest List</span>
              </NavLink>
            </li>


            {/* Locations */}
            <li className="dropdown">
              <Link to="#">
                <i className="ri-map-pin-line menu-icon" />
                <span>Locations</span>
              </Link>
              <ul className="sidebar-submenu">
                <li>
                  <NavLink
                    to="/office-location"
                    className={(navData) =>
                      navData.isActive ? "active-page" : ""
                    }
                  >
                    <i className="ri-circle-fill circle-icon text-primary-600 w-auto" />{" "}
                    Office
                  </NavLink>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </aside>

      <main
        className={sidebarActive ? "dashboard-main active" : "dashboard-main"}
      >
        <div className="navbar-header">
          <div className="row align-items-center justify-content-between">
            <div className="col-auto">
              <div className="d-flex flex-wrap align-items-center gap-4">
                <button
                  type="button"
                  className="sidebar-toggle"
                  onClick={sidebarControl}
                >
                  {sidebarActive ? (
                    <Icon
                      icon="iconoir:arrow-right"
                      className="icon text-2xl non-active"
                    />
                  ) : (
                    <Icon
                      icon="heroicons:bars-3-solid"
                      className="icon text-2xl non-active "
                    />
                  )}
                </button>
                <button
                  onClick={mobileMenuControl}
                  type="button"
                  className="sidebar-mobile-toggle"
                >
                  <Icon icon="heroicons:bars-3-solid" className="icon" />
                </button>
              </div>
            </div>
            <div className="col-auto">
              <div className="d-flex flex-wrap align-items-center gap-3">
                <span
                  style={{
                    color: "#C4161C",
                    fontWeight: "600",
                    fontSize: "16px",
                  }}
                >
                  {formattedTime}
                </span>
                {/* <ThemeToggleButton /> */}
                <div className="dropdown d-none d-sm-inline-block">
                  <button
                    className="has-indicator w-40-px h-40-px bg-neutral-200 rounded-circle d-flex justify-content-center align-items-center"
                    type="button"
                    data-bs-toggle="dropdown"
                  >
                    <Icon
                      icon="iconoir:bell"
                      className="text-primary-light text-xl"
                    />
                  </button>
                  <div className="dropdown-menu to-top dropdown-menu-lg p-0">
                    <div className="m-16 py-12 px-16 radius-8 bg-primary-50 mb-16 d-flex align-items-center justify-content-between gap-2">
                      <div>
                        <h6 className="text-lg text-primary-light fw-semibold mb-0">
                          Notifications
                        </h6>
                      </div>
                      <span className="text-primary-600 fw-semibold text-lg w-40-px h-40-px rounded-circle bg-base d-flex justify-content-center align-items-center">
                        05
                      </span>
                    </div>
                    <div className="max-h-400-px overflow-y-auto scroll-sm pe-4">
                      <Link
                        to="#"
                        className="px-24 py-12 d-flex align-items-start gap-3 mb-2 justify-content-between"
                      >
                        <div className="text-black hover-bg-transparent hover-text-primary d-flex align-items-center gap-3">
                          <span className="w-44-px h-44-px bg-success-subtle text-success-main rounded-circle d-flex justify-content-center align-items-center flex-shrink-0">
                            <Icon
                              icon="bitcoin-icons:verify-outline"
                              className="icon text-xxl"
                            />
                          </span>
                          <div>
                            <h6 className="text-md fw-semibold mb-4">
                              Congratulations
                            </h6>
                            <p className="mb-0 text-sm text-secondary-light text-w-200-px">
                              Your profile has been Verified. Your profile has
                              been Verified
                            </p>
                          </div>
                        </div>
                        <span className="text-sm text-secondary-light flex-shrink-0">
                          23 Mins ago
                        </span>
                      </Link>
                      <Link
                        to="#"
                        className="px-24 py-12 d-flex align-items-start gap-3 mb-2 justify-content-between bg-neutral-50"
                      >
                        <div className="text-black hover-bg-transparent hover-text-primary d-flex align-items-center gap-3">
                          <span className="w-44-px h-44-px bg-success-subtle text-success-main rounded-circle d-flex justify-content-center align-items-center flex-shrink-0">
                            <img
                              src="/assets/images/notification/profile-1.png"
                              alt=""
                            />
                          </span>
                          <div>
                            <h6 className="text-md fw-semibold mb-4">
                              Ronald Richards
                            </h6>
                            <p className="mb-0 text-sm text-secondary-light text-w-200-px">
                              You can stitch between artboards
                            </p>
                          </div>
                        </div>
                        <span className="text-sm text-secondary-light flex-shrink-0">
                          23 Mins ago
                        </span>
                      </Link>
                      <Link
                        to="#"
                        className="px-24 py-12 d-flex align-items-start gap-3 mb-2 justify-content-between"
                      >
                        <div className="text-black hover-bg-transparent hover-text-primary d-flex align-items-center gap-3">
                          <span className="w-44-px h-44-px bg-info-subtle text-info-main rounded-circle d-flex justify-content-center align-items-center flex-shrink-0">
                            AM
                          </span>
                          <div>
                            <h6 className="text-md fw-semibold mb-4">
                              Arlene McCoy
                            </h6>
                            <p className="mb-0 text-sm text-secondary-light text-w-200-px">
                              Invite you to prototyping
                            </p>
                          </div>
                        </div>
                        <span className="text-sm text-secondary-light flex-shrink-0">
                          23 Mins ago
                        </span>
                      </Link>
                      <Link
                        to="#"
                        className="px-24 py-12 d-flex align-items-start gap-3 mb-2 justify-content-between bg-neutral-50"
                      >
                        <div className="text-black hover-bg-transparent hover-text-primary d-flex align-items-center gap-3">
                          <span className="w-44-px h-44-px bg-success-subtle text-success-main rounded-circle d-flex justify-content-center align-items-center flex-shrink-0">
                            <img
                              src="/assets/images/notification/profile-2.png"
                              alt=""
                            />
                          </span>
                          <div>
                            <h6 className="text-md fw-semibold mb-4">
                              Annette Black
                            </h6>
                            <p className="mb-0 text-sm text-secondary-light text-w-200-px">
                              Invite you to prototyping
                            </p>
                          </div>
                        </div>
                        <span className="text-sm text-secondary-light flex-shrink-0">
                          23 Mins ago
                        </span>
                      </Link>
                      <Link
                        to="#"
                        className="px-24 py-12 d-flex align-items-start gap-3 mb-2 justify-content-between"
                      >
                        <div className="text-black hover-bg-transparent hover-text-primary d-flex align-items-center gap-3">
                          <span className="w-44-px h-44-px bg-info-subtle text-info-main rounded-circle d-flex justify-content-center align-items-center flex-shrink-0">
                            DR
                          </span>
                          <div>
                            <h6 className="text-md fw-semibold mb-4">
                              Darlene Robertson
                            </h6>
                            <p className="mb-0 text-sm text-secondary-light text-w-200-px">
                              Invite you to prototyping
                            </p>
                          </div>
                        </div>
                        <span className="text-sm text-secondary-light flex-shrink-0">
                          23 Mins ago
                        </span>
                      </Link>
                    </div>
                    <div className="text-center py-12 px-16">
                      <Link
                        to="#"
                        className="text-primary-600 fw-semibold text-md"
                      >
                        See All Notification
                      </Link>
                    </div>
                  </div>
                </div>
                {/* Notification dropdown end */}

                <div className="dropdown">
                  <button
                    className="d-flex justify-content-center align-items-center rounded-circle"
                    type="button"
                    data-bs-toggle="dropdown"
                  >
                    <img
                      src="/assets/images/user.png"
                      alt="image_user"
                      className="w-40-px h-40-px object-fit-cover rounded-circle"
                    />
                  </button>
                  <div className="dropdown-menu to-top dropdown-menu-sm">
                    <div className="py-12 px-16 radius-8 bg-primary-50 mb-16 d-flex align-items-center justify-content-between gap-2">
                      <div>
                        <h6 className="text-lg text-primary-light fw-semibold mb-2">
                          Shaidul Islam
                        </h6>
                        <span className="text-secondary-light fw-medium text-sm">
                          Admin
                        </span>
                      </div>
                      <button type="button" className="hover-text-danger">
                        <Icon
                          icon="radix-icons:cross-1"
                          className="icon text-xl"
                        />
                      </button>
                    </div>
                    <ul className="to-top-list">
                      <li>
                        <Link
                          className="dropdown-item text-black px-0 py-8 hover-bg-transparent hover-text-primary d-flex align-items-center gap-3"
                          to="/view-profile"
                        >
                          <Icon
                            icon="solar:user-linear"
                            className="icon text-xl"
                          />{" "}
                          My Profile
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="dropdown-item text-black px-0 py-8 hover-bg-transparent hover-text-primary d-flex align-items-center gap-3"
                          to="/email"
                        >
                          <Icon
                            icon="tabler:message-check"
                            className="icon text-xl"
                          />{" "}
                          Inbox
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="dropdown-item text-black px-0 py-8 hover-bg-transparent hover-text-primary d-flex align-items-center gap-3"
                          to="/company"
                        >
                          <Icon
                            icon="icon-park-outline:setting-two"
                            className="icon text-xl"
                          />
                          Setting
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="dropdown-item text-black px-0 py-8 hover-bg-transparent hover-text-danger d-flex align-items-center gap-3"
                          to="#"
                        >
                          <Icon icon="lucide:power" className="icon text-xl" />{" "}
                          Log Out
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
                {/* Profile dropdown end */}
              </div>
            </div>
          </div>
        </div>

        {/* dashboard-main-body */}
        <div className="dashboard-main-body">{children}</div>

        {/* Footer section */}
        <footer className="d-footer">
          <div className="row align-items-center justify-content-between">
            <p className="mb-0 text-end">
              © {new Date().getFullYear()}{" "}
              <span className="text-primary-600">Star Business.</span> All
              Rights Reserved.
            </p>
          </div>
        </footer>
      </main>
    </section>
  );
};

export default MasterLayout;
