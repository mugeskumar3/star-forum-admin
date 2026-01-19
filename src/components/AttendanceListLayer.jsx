import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AttendanceFilter from "./AttendanceFilter";

const AttendanceListLayer = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    zone: null,
    region: null,
    chapter: null,
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

  const meetingData = [
    {
      id: 1,
      zone: "Zone 1",
      region: "Region 1",
      date: "2024-03-20",
      chapter: "ARAM",
      totalMembers: 50,
      present: 45,
      absent: 5,
      type: "Weekly Meeting",
    },
    {
      id: 2,
      zone: "Zone 1",
      region: "Region 1",
      date: "2024-03-15",
      chapter: "STAR",
      totalMembers: 40,
      present: 35,
      absent: 5,
      type: "Training",
    },
    {
      id: 3,
      zone: "Zone 2",
      region: "Region 2",
      date: "2024-03-10",
      chapter: "GALAXY",
      totalMembers: 60,
      present: 55,
      absent: 5,
      type: "Weekly Meeting",
    },
    {
      id: 4,
      zone: "Zone 2",
      region: "Region 2",
      date: "2024-03-05",
      chapter: "ELITE",
      totalMembers: 30,
      present: 28,
      absent: 2,
      type: "Weekly Meeting",
    },
    {
      id: 5,
      zone: "Zone 1",
      region: "Region 2",
      date: "2024-03-01",
      chapter: "TITAN",
      totalMembers: 45,
      present: 40,
      absent: 5,
      type: "Training",
    },
  ];

  return (
    <div className="card h-100 p-0 radius-12">
      <AttendanceFilter
        filters={filters}
        setFilters={setFilters}
        onFilterChange={handleFilterChange}
      />

      <div className="card-body p-24">
        <h6 className="text-primary-600 pb-2 mb-3">Recent Meeting List</h6>
        <div className="table-responsive scroll-sm">
          <table className="table bordered-table sm-table mb-0">
            <thead>
              <tr>
                <th scope="col">Zone</th>
                <th scope="col">Region</th>
                <th scope="col">Date</th>
                <th scope="col">Chapter</th>
                <th scope="col" className="text-center">Total Members</th>
                <th scope="col" className="text-center">Present</th>
                <th scope="col" className="text-center">Absent</th>
                <th scope="col">Type</th>
                <th scope="col" className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {meetingData.map((meeting) => (
                <tr key={meeting.id}>
                  <td>{meeting.zone}</td>
                  <td>{meeting.region}</td>
                  <td>{meeting.date}</td>
                  <td>{meeting.chapter}</td>
                  <td className="text-center">{meeting.totalMembers}</td>
                  <td className="text-center text-success-main fw-semibold">{meeting.present}</td>
                  <td className="text-center text-danger-main fw-semibold">{meeting.absent}</td>
                  <td>{meeting.type}</td>
                  <td className="text-center">
                    <button
                      onClick={() => navigate(`/meeting-attendance/${meeting.id}`)}
                      className="btn btn-primary-600 btn-sm radius-8 px-12 py-6 d-flex align-items-center gap-2 mx-auto"
                    >
                      <Icon icon="lucide:eye" />
                      View
                    </button>
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

export default AttendanceListLayer;
