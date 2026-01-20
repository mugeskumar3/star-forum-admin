import { Icon } from '@iconify/react/dist/iconify.js';
import React, { useState } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import TablePagination from './TablePagination';

const LogReportLayer = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [activeTab, setActiveTab] = useState('web');

    const [data, setData] = useState({
        web: Array.from({ length: 20 }).map((_, i) => ({
            id: i + 1,
            name: ['Rajesh Kumar', 'Priya Sharma', 'Amit Patel', 'Sneha Reddy', 'Vikram Singh', 'Ananya Iyer', 'Suresh Nair', 'Megha Gupta', 'Arjun Verma', 'Kavita Joshi', 'Rahul Deshmukh', 'Pooja Malhotra', 'Sandeep Bansal', 'Neha Choudhury', 'Vijay Ranganathan', 'Shilpa Kulkarni', 'Manish Tiwari', 'Divya Saxena', 'Pankaj अग्रवाल', 'Swati Bhattacharya'][i],
            contact: `98765432${10 + i}`,
            location: ['Chennai', 'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Kolkata', 'Pune', 'Ahmedabad', 'Jaipur', 'Lucknow', 'Chandigarh', 'Coimbatore', 'Madurai', 'Trichy', 'Salem', 'Erode', 'Vellore', 'Nellore', 'Vizag', 'Kochi'][i],
            date: '12 Jan 2026',
            time: '10:30 AM'
        })),
        mobile: Array.from({ length: 20 }).map((_, i) => ({
            id: i + 21,
            name: ['Rajesh Kumar', 'Priya Sharma', 'Amit Patel', 'Sneha Reddy', 'Vikram Singh', 'Ananya Iyer', 'Suresh Nair', 'Megha Gupta', 'Arjun Verma', 'Kavita Joshi', 'Rahul Deshmukh', 'Pooja Malhotra', 'Sandeep Bansal', 'Neha Choudhury', 'Vijay Ranganathan', 'Shilpa Kulkarni', 'Manish Tiwari', 'Divya Saxena', 'Pankaj अग्रवाल', 'Swati Bhattacharya'][i],
            contact: `98765432${30 + i}`,
            location: ['Trichy', 'Salem', 'Erode', 'Madurai', 'Chennai', 'Coimbatore', 'Vellore', 'Nellore', 'Vizag', 'Kochi', 'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Kolkata', 'Pune', 'Ahmedabad', 'Jaipur', 'Lucknow', 'Chandigarh'][i],
            date: '12 Jan 2026',
            time: '08:20 AM'
        }))
    });

    const currentTabData = data[activeTab];
    const totalRecords = currentTabData.length;
    const totalPages = Math.ceil(totalRecords / rowsPerPage);

    const currentData = currentTabData.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    );

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleRowsPerPageChange = (e) => {
        setRowsPerPage(parseInt(e.target.value));
        setCurrentPage(1);
    };

    function renderTable(items) {
        return (
            <div className="table-responsive scroll-sm">
                <table className="table bordered-table sm-table mb-0">
                    <thead>
                        <tr>
                            <th scope="col" style={{ color: "black" }}>S.No</th>
                            <th scope="col" style={{ color: "black" }}>User Name</th>
                            <th scope="col" style={{ color: "black" }}>Contact</th>
                            <th scope="col" style={{ color: "black" }}>Location</th>
                            <th scope="col" style={{ color: "black" }}>Login Date</th>
                            <th scope="col" style={{ color: "black" }}>Login Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.length > 0 ? (
                            items.map((item, index) => (
                                <tr key={item.id}>
                                    <td>{(currentPage - 1) * rowsPerPage + index + 1}</td>
                                    <td>{item.name}</td>
                                    <td>{item.contact}</td>
                                    <td>{item.location}</td>
                                    <td>{item.date}</td>
                                    <td>{item.time}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center py-24">No records found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        );
    }

    return (
        <div className="card h-100 p-0 radius-12">
            <div className="card-header border-bottom bg-base py-16 px-24 d-flex align-items-center flex-wrap gap-3 justify-content-between">
                <div className="d-flex align-items-center flex-wrap gap-3">
                    <h6 className="text-primary-600 pb-2 mb-0">Log Report</h6>
                </div>
            </div>
            <div className="card-body p-24">
                <Tabs
                    activeKey={activeTab}
                    onSelect={(k) => { setActiveTab(k); setCurrentPage(1); }}
                    className="mb-3 custom-tabs"
                >
                    <Tab eventKey="web" title="Web Login">
                        {renderTable(currentData)}
                    </Tab>
                    <Tab eventKey="mobile" title="Mobile Login">
                        {renderTable(currentData)}
                    </Tab>
                </Tabs>

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

export default LogReportLayer;
