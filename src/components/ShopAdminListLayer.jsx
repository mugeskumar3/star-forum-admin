import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Modal } from "react-bootstrap";
import TablePagination from "./TablePagination";
import ProductApi from "../Api/ProductApi";
import ShowNotifications from "../helper/ShowNotifications";
import { IMAGE_BASE_URL } from "../Config/Index";

const ShopAdminListLayer = () => {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const fetchProducts = async () => {
    setLoading(true);
    const response = await ProductApi.getProducts();
    if (response.status) {
      setProducts(response.data.data || response.data); // Adjust based on actual API response
    }
    setLoading(false);
  };

  const handleViewProduct = (product) => {
    setSelectedProduct(product);
    setShowViewModal(true);
  };



  useEffect(() => {
    fetchProducts();
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = products.filter(
    (product) =>
      (product.productName && product.productName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (product.category && product.category.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const totalRecords = filteredProducts.length;
  const totalPages = Math.ceil(totalRecords / rowsPerPage);

  const currentData = filteredProducts.slice(
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
    if (window.confirm("Are you sure you want to delete this product?")) {
      const response = await ProductApi.deleteProduct(id);
      if (response.status) {
        fetchProducts(); // Refresh list
      }
    }
  };

  return (
    <div className="card h-100 p-0 radius-12">
      <div className="card-header border-bottom bg-base py-16 px-24 d-flex align-items-center flex-wrap gap-3 justify-content-between">
        <h6 className="text-primary-600 pb-2 mb-0">Product List</h6>
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
            to="/shop-add"
            className="btn btn-primary text-sm btn-sm px-12 py-12 radius-8 d-flex align-items-center gap-2"
            style={{ backgroundColor: "#C4161C", borderColor: "#C4161C" }}
          >
            <Icon
              icon="ic:baseline-plus"
              className="icon text-xl line-height-1"
            />
            Add New Product
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
                <th scope="col">Product Name</th>
                <th scope="col">Category</th>
                <th scope="col">Price</th>
                <th scope="col" className="text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {currentData.length > 0 ? (
                currentData.map((product, index) => (
                  <tr key={index}>
                    <td>{(currentPage - 1) * rowsPerPage + index + 1}</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <img
                          src={product.productImage && product.productImage.path ? `${IMAGE_BASE_URL}/${product.productImage.path}` : "https://placehold.co/40x40?text=IMG"}
                          alt={product.productName}
                          className="w-40-px h-40-px rounded-circle object-fit-cover"
                          onError={(e) => {
                            e.target.src =
                              "https://placehold.co/40x40?text=IMG"; // Fallback
                          }}
                        />
                      </div>
                    </td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="text-md mb-0 fw-normal text-secondary-light">
                          {product.productName}
                        </span>
                      </div>
                    </td>
                    <td>{product.category || product.categoryId}</td>
                    <td>₹{product.price}</td>
                    <td className="text-center">
                      <div className="d-flex align-items-center gap-10 justify-content-center">
                        <button
                          type="button"
                          onClick={() => handleViewProduct(product)}
                          className="bg-info-focus bg-hover-info-200 text-info-600 fw-medium w-40-px h-40-px d-flex justify-content-center align-items-center rounded-circle"
                        >
                          <Icon
                            icon="majesticons:eye-line"
                            className="icon text-xl"
                          />
                        </button>
                        <Link
                          to={`/shop-edit/${product._id || product.id}`}
                          className="bg-success-focus text-success-600 bg-hover-success-200 fw-medium w-40-px h-40-px d-flex justify-content-center align-items-center rounded-circle"
                        >
                          <Icon icon="lucide:edit" className="menu-icon" />
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleDeleteClick(product._id || product.id)}
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
                  <td colSpan="6" className="text-center py-4">
                    No products found.
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

      {/* View Product Modal */}
      <Modal show={showViewModal} onHide={() => setShowViewModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Product Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedProduct && (
            <div className="d-flex flex-column gap-3">
              <div className="text-center">
                <img
                  src={selectedProduct.productImage && selectedProduct.productImage.path ? `${IMAGE_BASE_URL}/${selectedProduct.productImage.path}` : "https://placehold.co/150x150?text=No+Image"}
                  alt={selectedProduct.productName}
                  className="rounded object-fit-cover"
                  style={{ width: '150px', height: '150px' }}
                  onError={(e) => {
                    e.target.src = "https://placehold.co/150x150?text=No+Image";
                  }}
                />
              </div>
              <div>
                <strong>Product Name:</strong> {selectedProduct.productName}
              </div>
              <div>
                <strong>Category:</strong> {selectedProduct.category || selectedProduct.categoryId}
              </div>
              <div>
                <strong>Price:</strong> ₹{selectedProduct.price}
              </div>
              <div>
                <strong>Status:</strong> <span className={selectedProduct.isActive ? "text-success" : "text-danger"}>{selectedProduct.isActive ? "Active" : "Inactive"}</span>
              </div>
              <div>
                <strong>Description:</strong>
                <p className="mb-0 text-secondary">{selectedProduct.description || "No description available."}</p>
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={() => setShowViewModal(false)}>
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ShopAdminListLayer;
