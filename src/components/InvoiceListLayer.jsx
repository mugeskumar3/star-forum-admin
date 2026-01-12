import { Icon } from '@iconify/react/dist/iconify.js';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import TablePagination from './TablePagination';

const InvoiceListLayer = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState("");

    // Mock data for demonstration - in real app would come from props or API
    const invoiceData = Array.from({ length: 45 }, (_, i) => ({
        id: i + 1,
        invoice: `#${526534 + i}`,
        name: i % 2 === 0 ? "Kathryn Murphy" : "Annette Black",
        issuedDate: "25 Jan 2024",
        amount: `$${(200 + i * 10).toFixed(2)}`,
        status: i % 5 === 0 ? "Pending" : "Paid",
        image: `assets/images/user-list/user-list${(i % 10) + 1}.png`
    }));

    const filteredData = invoiceData.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.invoice.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalRecords = filteredData.length;
    const totalPages = Math.ceil(totalRecords / rowsPerPage);

    const currentData = filteredData.slice(
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

    return (
        <div className="card">
            <div className="card-header d-flex flex-wrap align-items-center justify-content-between gap-3">
                <div className="d-flex flex-wrap align-items-center gap-3">
                    <h4 className="mb-0"  >Invoice List</h4>
                    <div className="icon-field">
                        <input
                            type="text"
                            name="#0"
                            className="form-control form-control-sm w-auto"
                            placeholder="Search"
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setCurrentPage(1);
                            }}
                        />
                        <span className="icon">
                            <Icon icon="ion:search-outline" />
                        </span>
                    </div>
                </div>
                <div className="d-flex flex-wrap align-items-center gap-3">
                    <select className="form-select form-select-sm w-auto" defaultValue="Select Status">
                        <option value="Select Status" disabled>
                            Select Status
                        </option>
                        <option value="Paid">Paid</option>
                        <option value="Pending">Pending</option>
                    </select>
                    <Link to="/invoice-add" className="btn btn-sm btn-primary-600">
                        <i className="ri-add-line" /> Create Invoice
                    </Link>
                </div>
            </div>
            <div className="card-body">
                <table className="table bordered-table mb-0">
                    <thead>
                        <tr>
                            <th scope="col">
                                <div className="form-check style-check d-flex align-items-center">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        defaultValue=""
                                        id="checkAll"
                                    />
                                    <label className="form-check-label" htmlFor="checkAll">
                                        S.L
                                    </label>
                                </div>
                            </th>
                            <th scope="col">Invoice</th>
                            <th scope="col">Name</th>
                            <th scope="col">Issued Date</th>
                            <th scope="col">Amount</th>
                            <th scope="col">Status</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentData.map((item, index) => (
                            <tr key={index}>
                                <td>
                                    <div className="form-check style-check d-flex align-items-center">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            defaultValue=""
                                            id={`check${item.id}`}
                                        />
                                        <label className="form-check-label" htmlFor={`check${item.id}`}>
                                            {((currentPage - 1) * rowsPerPage + index + 1).toString().padStart(2, '0')}
                                        </label>
                                    </div>
                                </td>
                                <td>
                                    <Link to="#" className="text-primary-600">
                                        {item.invoice}
                                    </Link>
                                </td>
                                <td>
                                    <div className="d-flex align-items-center">
                                        <img
                                            src={item.image}
                                            alt=""
                                            className="flex-shrink-0 me-12 radius-8"
                                            onError={(e) => { e.target.src = "assets/images/user-list/user-list1.png" }}
                                        />
                                        <h6 className="text-md mb-0 fw-medium flex-grow-1">
                                            {item.name}
                                        </h6>
                                    </div>
                                </td>
                                <td>{item.issuedDate}</td>
                                <td>{item.amount}</td>
                                <td>
                                    <span className={`px-24 py-4 rounded-pill fw-medium text-sm ${item.status === 'Paid' ? 'bg-success-focus text-success-main' : 'bg-warning-focus text-warning-main'
                                        }`}>
                                        {item.status}
                                    </span>
                                </td>
                                <td>
                                    <Link
                                        to="#"
                                        className="w-32-px h-32-px  me-8 bg-primary-light text-primary-600 rounded-circle d-inline-flex align-items-center justify-content-center"
                                    >
                                        <Icon icon="iconamoon:eye-light" />
                                    </Link>
                                    <Link
                                        to="#"
                                        className="w-32-px h-32-px  me-8 bg-success-focus text-success-main rounded-circle d-inline-flex align-items-center justify-content-center"
                                    >
                                        <Icon icon="lucide:edit" />
                                    </Link>
                                    <Link
                                        to="#"
                                        className="w-32-px h-32-px  me-8 bg-danger-focus text-danger-main rounded-circle d-inline-flex align-items-center justify-content-center"
                                    >
                                        <Icon icon="mingcute:delete-2-line" />
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
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

export default InvoiceListLayer;