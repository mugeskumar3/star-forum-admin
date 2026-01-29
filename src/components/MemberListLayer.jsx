import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Link } from "react-router-dom";
import Select from "react-select";
import { selectStyles } from "../helper/SelectStyles";
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
        membershipType:
          selectedMembershipType !== "All" ? selectedMembershipType : undefined,
      };

      const res = await MemberApi.getMembers(params);

      if (res.status) {
        const data = res.response.data;
        if (data.docs) {
          setMembers(data.docs);
          setTotalRecords(data.totalDocs);
        } else if (Array.isArray(data)) {
          setMembers(data);
          setTotalRecords(data.length);
        } else {
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
    { value: "Silver", label: "Silver" },
    { value: "Diamond", label: "Diamond" },
  ];

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
              styles={selectStyles()}
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
                <th scope="col" style={{ color: "black" }}>
                  Region
                </th>
                <th scope="col" style={{ color: "black" }}>
                  Business
                </th>
                <th scope="col" style={{ color: "black" }}>
                  Type
                </th>
                <th scope="col" style={{ color: "black" }}>
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
                            e.target.src = "https://placehold.co/40x40";
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
                    <td>{member.tenureDate || "-"}</td>
                    <td>
                      <span
                        className={`badge ${member.clubMemberType === "Platinum" ? "bg-primary-50 text-primary-600" : member.clubMemberType === "Gold" ? "bg-warning-50 text-warning-600" : "bg-secondary-50 text-secondary-600"} px-12 py-4 radius-4`}
                      >
                        {member.clubMemberType || "Member"}
                      </span>
                    </td>
                    <td>
                      <div className="d-flex align-items-center gap-10">
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
