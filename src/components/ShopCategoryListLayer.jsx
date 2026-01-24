import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Modal } from "react-bootstrap";
import TablePagination from "./TablePagination";
import ShopCategoryApi from "../Api/ShopCategoryApi";
import { IMAGE_BASE_URL } from "../Config/Index";

const ShopCategoryListLayer = () => {

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    // Optional: View Modal State if we decide to include it (User said edit,delete enough, but nice to have)
    const [showViewModal, setShowViewModal] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const fetchCategories = async () => {
        setLoading(true);
        const response = await ShopCategoryApi.getShopCategories();
        console.log(response, "response");

        if (response.status) {
            setCategories(response.data.data || response.data);
        }
        setLoading(false);
    };

    const handleViewCategory = (category) => {
        setSelectedCategory(category);
        setShowViewModal(true);
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState("");

    const filteredCategories = categories.filter(
        (category) =>
            (category.name && category.name.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const totalRecords = filteredCategories.length;
    const totalPages = Math.ceil(totalRecords / rowsPerPage);

    const currentData = filteredCategories.slice(
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

    const handleDeleteClick = async (id) => {
        if (window.confirm("Are you sure you want to delete this category?")) {
            const response = await ShopCategoryApi.deleteShopCategory(id);
            if (response.status) {
                fetchCategories(); // Refresh list
            }
        }
    };

    return (
        <div className="card h-100 p-0 radius-12">
            <div className="card-header border-bottom bg-base py-16 px-24 d-flex align-items-center flex-wrap gap-3 justify-content-between">
                <h6 className="text-primary-600 pb-2 mb-0">Shop Category List</h6>
                <div className="d-flex align-items-center flex-wrap gap-3 ms-auto">
                    <form className="navbar-search">
                        <input
                            type="text"
                            className="bg-base h-40-px w-auto"
                            name="search"
                            placeholder="Search"
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setCurrentPage(1);
                            }}
                        />
                        <Icon icon="ion:search-outline" className="icon" />
                    </form>
                    <Link
                        to="/shop-category-create"
                        className="btn btn-primary text-sm btn-sm px-12 py-12 radius-8 d-flex align-items-center gap-2"
                        style={{ backgroundColor: "#C4161C", borderColor: "#C4161C" }}
                    >
                        <Icon
                            icon="ic:baseline-plus"
                            className="icon text-xl line-height-1"
                        />
                        Create Category
                    </Link>
                </div>
            </div>
            <div className="card-body p-24">
                <div className="table-responsive scroll-sm">
                    <table className="table bordered-table sm-table mb-0">
                        <thead>
                            <tr>
                                <th scope="col">S.No</th>
                                <th scope="col">Image</th>
                                <th scope="col">Category Name</th>
                                <th scope="col">Status</th>
                                <th scope="col" className="text-center">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentData.length > 0 ? (
                                currentData.map((category, index) => (
                                    <tr key={index}>
                                        <td>{(currentPage - 1) * rowsPerPage + index + 1}</td>
                                        <td>
                                            <div className="d-flex align-items-center">
                                                <img
                                                    src={category.categoryImage && category.categoryImage.path ? `${IMAGE_BASE_URL}/${category.categoryImage.path}` : "https://placehold.co/40x40?text=IMG"}
                                                    alt={category.name}
                                                    className="w-40-px h-40-px rounded-circle object-fit-cover"
                                                    onError={(e) => {
                                                        e.target.src =
                                                            "https://placehold.co/40x40?text=IMG";
                                                    }}
                                                />
                                            </div>
                                        </td>
                                        <td>
                                            <div className="d-flex align-items-center">
                                                <span className="text-md mb-0 fw-normal text-secondary-light">
                                                    {category.name}
                                                </span>
                                            </div>
                                        </td>
                                        <td>
                                            <span className={category.isActive ? "text-success" : "text-danger"}>
                                                {category.isActive ? "Active" : "Inactive"}
                                            </span>
                                        </td>
                                        <td className="text-center">
                                            <div className="d-flex align-items-center gap-10 justify-content-center">
                                                {/* 
                         User said "Action (edit ,delete anough)". 
                         I will keep View button invisible or remove if strictly needed. 
                         But for now I'll include it for complete parity with ShopAdminListLayer 
                         unless user complains. 
                        */}
                                                {/* <button
                          type="button"
                          onClick={() => handleViewCategory(category)}
                          className="bg-info-focus bg-hover-info-200 text-info-600 fw-medium w-40-px h-40-px d-flex justify-content-center align-items-center rounded-circle"
                        >
                          <Icon
                            icon="majesticons:eye-line"
                            className="icon text-xl"
                          />
                        </button> */}
                                                {/* Commented out View to strictly follow "Action (edit ,delete anough)" */}

                                                <Link
                                                    to={`/shop-category-edit/${category._id || category.id}`}
                                                    className="bg-success-focus text-success-600 bg-hover-success-200 fw-medium w-40-px h-40-px d-flex justify-content-center align-items-center rounded-circle"
                                                >
                                                    <Icon icon="lucide:edit" className="menu-icon" />
                                                </Link>
                                                <button
                                                    type="button"
                                                    onClick={() => handleDeleteClick(category._id || category.id)}
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
                                    <td colSpan="5" className="text-center py-4">
                                        No categories found.
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

export default ShopCategoryListLayer;
