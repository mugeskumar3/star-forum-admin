import { Icon } from '@iconify/react/dist/iconify.js';
import React from 'react';
import { Link } from 'react-router-dom';

const TablePagination = ({
    currentPage,
    totalPages,
    onPageChange,
    rowsPerPage,
    onRowsPerPageChange,
    totalRecords
}) => {
    if (totalPages <= 1 && totalRecords <= rowsPerPage) return null;

    const renderPageNumbers = () => {
        let pages = [];
        for (let i = 1; i <= totalPages; i++) {
            pages.push(
                <li key={i} className="page-item">
                    <button
                        className={`page-link fw-medium radius-8 border-0 py-10 d-flex align-items-center justify-content-center h-48-px w-48-px ${currentPage === i ? 'bg-primary-600 text-white' : 'bg-primary-50 text-secondary-light'
                            }`}
                        onClick={() => onPageChange(i)}
                    >
                        {i}
                    </button>
                </li>
            );
        }
        return pages;
    };

    return (
        <div className="d-flex align-items-center justify-content-end flex-wrap gap-3 mt-24">
            <div className="d-flex align-items-center gap-2 me-8">
                <span className="text-secondary-light fw-medium">Show</span>
                <select
                    className="form-select form-select-sm w-auto ps-12 py-6 radius-12 h-40-px"
                    value={rowsPerPage}
                    onChange={onRowsPerPageChange}
                >
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                    <option value="70">70</option>
                    <option value="100">100</option>
                </select>
            </div>
            <span className="text-secondary-light">
                Showing {Math.min((currentPage - 1) * rowsPerPage + 1, totalRecords)} to {Math.min(currentPage * rowsPerPage, totalRecords)} of {totalRecords} entries
            </span>
            <ul className="pagination d-flex flex-wrap align-items-center gap-2 justify-content-center mb-0">
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <button
                        className="page-link bg-primary-50 text-secondary-light fw-medium radius-8 border-0 py-10 d-flex align-items-center justify-content-center h-48-px w-48-px"
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        <Icon icon="ep:d-arrow-left" className="text-xl" />
                    </button>
                </li>
                {renderPageNumbers()}
                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                    <button
                        className="page-link bg-primary-50 text-secondary-light fw-medium radius-8 border-0 py-10 d-flex align-items-center justify-content-center h-48-px w-48-px"
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        <Icon icon="ep:d-arrow-right" className="text-xl" />
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default TablePagination;
