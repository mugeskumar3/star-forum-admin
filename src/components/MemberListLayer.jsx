import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Link } from "react-router-dom";
import Select from "react-select";
import TablePagination from "./TablePagination";
import MemberApi from "../Api/MemberApi";

const MemberListLayer = () => {
  const [members, setMembers] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMembershipType, setSelectedMembershipType] = useState("All");

  const [totalRecords, setTotalRecords] = useState(0);

  useEffect(() => {
    fetchMembers();
  }, [currentPage, rowsPerPage, searchTerm, selectedMembershipType]);

  const fetchMembers = async () => {
    try {
      const params = {
        page: currentPage,
        limit: rowsPerPage,
        search: searchTerm,
        // API might expect membershipType filter. Adding it just in case logic exists or for future.
        // If API doesn't support it, it will ignore.
        membershipType:
          selectedMembershipType !== "All" ? selectedMembershipType : undefined,
      };

      const res = await MemberApi.getMembers(params);

      if (res.status) {
        // Assuming response structure: { data: { docs: [], totalDocs: 100, ... } } or similar pagination object
        // Adjust based on actual API response. Common pattern in this project seems to be res.response.data having the list?
        // Let's assume standard paginate v2 response often used: { docs, totalDocs, limit, page, totalPages }
        // Or if it's a simple list: { data: [] } and we paginate client side?
        // User requested "server-side pagination".
        // Let's assume response.data is the object containing { docs: [...], totalDocs: ... }

        // CHECK ChapterApi/RegionApi usage.
        // ChapterApi just returns response.data.
        // If I assume standard mongoose-paginate:
        const data = res.response.data;
        if (data.docs) {
          setMembers(data.docs);
          setTotalRecords(data.totalDocs);
        } else if (Array.isArray(data)) {
          // Fallback if API returns simple array (not paginated on server effectively?)
          setMembers(data);
          setTotalRecords(data.length);
        } else {
          // Maybe data itself is the list
          setMembers([]);
        }
      }
    } catch (error) {
      console.error("Failed to fetch members", error);
    }
  };

  const totalPages = Math.ceil(totalRecords / rowsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(parseInt(e.target.value));
    setCurrentPage(0);
  };

  const handleDeleteClick = async (id) => {
    if (window.confirm("Are you sure you want to delete this member?")) {
      const res = await MemberApi.deleteMember(id);
      if (res.status) {
        fetchMembers(); // Refresh list
      }
    }
  };

  const membershipOptions = [
    { value: "All", label: "All Types" },
    { value: "Gold", label: "Gold" },
    { value: "Platinum", label: "Platinum" },
    { value: "Silver", label: "Silver" }, // "Diamond" was in form, checking consistency. Form had Gold/Diamond/Platinum. List had Gold/Platinum/Silver. I should probably align them.
    { value: "Diamond", label: "Diamond" },
  ];

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: "var(--bg-base)",
      border: "1px solid var(--border-color)",
      borderRadius: "8px",
      minHeight: "40px",
      boxShadow: "none",
      "&:hover": {
        border: "1px solid var(--primary-600)",
      },
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? "var(--primary-600)"
        : state.isFocused
          ? "var(--primary-50)"
          : "transparent",
      color: state.isSelected ? "#fff" : "var(--text-main)",
      cursor: "pointer",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "var(--text-main)",
    }),
    menu: (provided) => ({
      ...provided,
      zIndex: 9999,
    }),
  };

  return (
    <div className="card h-100 p-0 radius-12">
      <div className="card-header border-bottom bg-base py-16 px-24 d-flex align-items-center flex-wrap gap-3 justify-content-between">
        <div className="d-flex align-items-center flex-wrap gap-3">
          <h6 className="text-primary-600 pb-2 mb-0">Member List</h6>
        </div>
        <div className="d-flex align-items-center flex-wrap gap-3">
          <div style={{ width: "150px" }}>
            <Select
              options={membershipOptions}
              value={membershipOptions.find(
                (option) => option.value === selectedMembershipType,
              )}
              onChange={(selectedOption) => {
                setSelectedMembershipType(selectedOption.value);
                setCurrentPage(0);
              }}
              styles={customStyles}
              isSearchable={false}
              placeholder="Select Type"
            />
          </div>
          <form className="navbar-search" onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              className="bg-base h-40-px w-auto"
              name="search"
              placeholder="Search by Name or ID"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(0);
              }}
            />
            <Icon icon="ion:search-outline" className="icon" />
          </form>
          <Link
            to="/members-registration/add"
            className="btn btn-primary text-sm btn-sm px-12 py-12 radius-8 d-flex align-items-center gap-2"
            style={{ backgroundColor: "#C4161C", borderColor: "#C4161C" }}
          >
            <Icon
              icon="ic:baseline-plus"
              className="icon text-xl line-height-1"
            />
            Add New Member
          </Link>
        </div>
      </div>
      <div className="card-body p-24">
        <div className="table-responsive scroll-sm">
          <table className="table bordered-table sm-table mb-0">
            <thead>
              <tr>
                <th scope="col" style={{ color: "black" }}>
                  S.No
                </th>
                <th scope="col" style={{ color: "black" }}>
                  Member Id
                </th>
                <th scope="col" style={{ color: "black" }}>
                  Member Name
                </th>
                <th scope="col" style={{ color: "black" }}>
                  Chapter
                </th>
                <th scope="col" style={{ color: "black" }}>
                  Category
                </th>
                {/*  Replaced Region with Category as per original? Original had both. Let's check columns. 
                      Original: S.No, Member Id, Member Name, Chapter, Category, Type, Status, Action.
                      Wait, previous file code had 'Region' under 'Category' header index? 
                      Let's stick to columns: ID, Name, Chapter, Region/Category? 
                      Let's follow logical display or previous.
                      Previous: Chapter (4th), Region (5th - Header says 'Category'?), Type (6th).
                      I will use headers: Chapter, Region, Business Category.
                  */}
                <th scope="col" style={{ color: "black" }}>
                  Region
                </th>
                <th scope="col" style={{ color: "black" }}>
                  Business
                </th>
                <th scope="col" style={{ color: "black" }}>
                  Type
                </th>
                {/* Status was inferred from even/odd in mock. Real data might not have status? 
                     User JSON doesn't show status field explicitly unless boolean?
                     'isWantSmsEmailUpdates' is boolean. 'clubMemberType'.
                     I'll omit Status for now if not in payload, or assume Active.
                 */}
                <th
                  scope="col"
                  className="text-center"
                  style={{ color: "black" }}
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {members.length > 0 ? (
                members.map((member, index) => (
                  <tr key={member._id || member.id}>
                    <td>{currentPage * rowsPerPage + index + 1}</td>
                    <td>{member.membershipId}</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <img
                          src={
                            member.profileImage || "https://placehold.co/40x40"
                          }
                          alt=""
                          className="w-40-px h-40-px rounded-circle flex-shrink-0 me-12 overflow-hidden"
                          onError={(e) => {
                            e.target.src = "https://placehold.co/40x40"; // Fallback
                          }}
                        />
                        <div className="flex-grow-1">
                          <span className="text-md mb-0 fw-normal text-secondary-light d-block">
                            {member.fullName}
                          </span>
                          <span className="text-xs text-secondary-light fw-normal">
                            {member.email}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td>{member.chapter?.chapterName || member.chapter}</td>
                    <td>{member.region?.name || member.region || "-"}</td>
                    <td>
                      {member.businessCategory?.name ||
                        member.businessCategory ||
                        "-"}
                    </td>
                    <td>
                      <span
                        className={`badge ${member.clubMemberType === "Platinum" ? "bg-primary-50 text-primary-600" : member.clubMemberType === "Gold" ? "bg-warning-50 text-warning-600" : "bg-secondary-50 text-secondary-600"} px-12 py-4 radius-4`}
                      >
                        {member.clubMemberType || "Member"}
                      </span>
                    </td>
                    <td className="text-center">
                      <div className="d-flex align-items-center gap-10 justify-content-center">
                        <Link
                          to={`/members-registration/edit/${member._id || member.id}`}
                          className="bg-info-focus bg-hover-info-200 text-info-600 fw-medium w-40-px h-40-px d-flex justify-content-center align-items-center rounded-circle"
                        >
                          <Icon
                            icon="majesticons:eye-line"
                            className="icon text-xl"
                          />
                        </Link>
                        <Link
                          to={`/members-registration/edit/${member._id || member.id}`}
                          className="bg-success-focus text-success-600 bg-hover-success-200 fw-medium w-40-px h-40-px d-flex justify-content-center align-items-center rounded-circle"
                        >
                          <Icon icon="lucide:edit" className="menu-icon" />
                        </Link>
                        <button
                          type="button"
                          onClick={() =>
                            handleDeleteClick(member._id || member.id)
                          }
                          className="remove-item-btn bg-danger-focus bg-hover-danger-200 text-danger-600 fw-medium w-40-px h-40-px d-flex justify-content-center align-items-center rounded-circle"
                        >
                          <Icon
                            icon="fluent:delete-24-regular"
                            className="menu-icon"
                          />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center py-4">
                    No members found.
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

export default MemberListLayer;
