import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";
import TablePagination from "./TablePagination";
import OrderApi from "../Api/OrderApi";

const OrdersLayer = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);

  const fetchOrders = async () => {
    setLoading(true);
    const params = {
      page: currentPage,
      limit: rowsPerPage,
      search: searchTerm,
    };
    const res = await OrderApi.getOrderList(params);
    if (res.status && res.response && res.response.data) {
      setOrders(res.response.data);
      setTotalRecords(res.response.total || 0);
    } else {
      setOrders([]);
      setTotalRecords(0);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
  }, [currentPage, rowsPerPage, searchTerm]);

  const totalPages = Math.ceil(totalRecords / rowsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(parseInt(e.target.value));
    setCurrentPage(0); // Reset to first page
  };

  const handleStatusChange = async (id, newStatus) => {
    const res = await OrderApi.updateOrderStatus(id, newStatus);
    if (res.status) {
      fetchOrders();
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "Pending":
        return "bg-warning-focus text-warning-main";
      case "Processing":
        return "bg-info-focus text-info-main";
      case "Shipped":
        return "bg-neutral-200 text-neutral-600";
      case "Delivered":
        return "bg-success-focus text-success-main";
      case "Cancelled":
        return "bg-danger-focus text-danger-main";
      default:
        return "bg-neutral-200 text-neutral-600";
    }
  };

  // Format Date Helper
  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // Modal Logic
  const [showModal, setShowModal] = useState(false);
  const [selectedOrderDetails, setSelectedOrderDetails] = useState(null);

  const handleViewOrder = async (id) => {
    const res = await OrderApi.getOrderDetails(id);
    if (res.status) {
      setSelectedOrderDetails(res.response.data);
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedOrderDetails(null);
  };

  return (
    <>
      <div className="card h-100 p-0 radius-12">
        <div className="card-header border-bottom bg-base py-16 px-24 d-flex align-items-center flex-wrap gap-3 justify-content-end">
          <div className="d-flex align-items-center flex-wrap gap-3">
            <form
              className="navbar-search"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="text"
                className="bg-base h-40-px w-auto"
                name="search"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(0);
                }}
              />
              <Icon icon="ion:search-outline" className="icon" />
            </form>
          </div>
        </div>
        <div className="card-body p-24">
          <div className="table-responsive scroll-sm">
            <table className="table bordered-table sm-table mb-0">
              <thead>
                <tr>
                  <th scope="col">SNo</th>
                  <th scope="col">Orderid</th>
                  <th scope="col">customer</th>
                  <th scope="col">phone number</th>
                  <th scope="col" className="text-center">
                    Total Qty
                  </th>
                  <th scope="col">amount</th>
                  <th scope="col">createdDate</th>
                  <th scope="col">Status</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="9" className="text-center py-4">
                      Loading orders...
                    </td>
                  </tr>
                ) : orders.length > 0 ? (
                  orders.map((order, index) => (
                    <tr key={order._id}>
                      <td>
                        <span className="text-md mb-0 fw-medium text-secondary-light">
                          {currentPage * rowsPerPage + index + 1}
                        </span>
                      </td>
                      <td>
                        <span className="text-md mb-0 fw-medium text-primary-600">
                          #{order.orderId}
                        </span>
                      </td>
                      <td>
                        <span className="text-md mb-0 fw-normal text-secondary-light">
                          {order.memberName ? order.memberName : "N/A"}
                        </span>
                      </td>
                      <td>
                        <span className="text-md mb-0 fw-normal text-secondary-light">
                          {order.phoneNumber ? order.phoneNumber : "N/A"}
                        </span>
                      </td>
                      <td className="text-center text-md mb-0 fw-normal text-secondary-light">
                        {order.totalQty ? order.totalQty : 0}
                      </td>
                      <td>
                        <span className="text-md mb-0 fw-normal text-secondary-light">
                          ₹{order.grantTotal}
                        </span>
                      </td>
                      <td>
                        <span className="text-md mb-0 fw-normal text-secondary-light">
                          {formatDate(order.orderDate)}
                        </span>
                      </td>
                      <td>
                        <div className="dropdown">
                          <button
                            className={`badge radius-4 px-10 py-4 border-0 dropdown-toggle text-sm ${getStatusBadgeClass(
                              order.status,
                            )}`}
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            {order.status}
                          </button>
                          <ul className="dropdown-menu">
                            {[
                              "Pending",
                              "Processing",
                              "Shipped",
                              "Delivered",
                              "Cancelled",
                            ].map((status) => (
                              <li key={status}>
                                <button
                                  className="dropdown-item"
                                  onClick={() =>
                                    handleStatusChange(order._id, status)
                                  }
                                >
                                  {status}
                                </button>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex align-items-center gap-10">
                          <button
                            type="button"
                            onClick={() => handleViewOrder(order._id)}
                            className="bg-info-focus bg-hover-info-200 text-info-600 fw-medium w-40-px h-40-px d-flex justify-content-center align-items-center rounded-circle border-0"
                          >
                            <Icon
                              icon="majesticons:eye-line"
                              className="icon text-xl"
                            />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="text-center py-4">
                      No orders found.
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

      {/* Order Details Modal */}
      {showModal && selectedOrderDetails && (
        <div
          className="modal fade show d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          tabIndex="-1"
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  Order Details - #{selectedOrderDetails.orderId}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeModal}
                ></button>
              </div>
              <div className="modal-body">
                <div className="row mb-4">
                  <div className="col-md-6">
                    <h6 className="fw-bold">Client Info:</h6>
                    <p className="mb-1">
                      Name: {selectedOrderDetails.memberName}
                    </p>
                    <p className="mb-1">
                      Phone: {selectedOrderDetails.contactNumber}
                    </p>
                    <p className="mb-1">
                      Zone: {selectedOrderDetails.zoneName}
                    </p>
                    <p className="mb-1">
                      Region: {selectedOrderDetails.regionName}
                    </p>
                    <p className="mb-1">
                      Chapter: {selectedOrderDetails.chapterName}
                    </p>
                  </div>
                  <div className="col-md-6 text-md-end">
                    <h6 className="fw-bold">Order Info:</h6>
                    <p className="mb-1">
                      Date: {formatDate(selectedOrderDetails.orderDate)}
                    </p>
                    <p className="mb-1">
                      Status:{" "}
                      <span
                        className={`badge ${getStatusBadgeClass(selectedOrderDetails.status)}`}
                      >
                        {selectedOrderDetails.status}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="table-responsive">
                  <table className="table table-bordered">
                    <thead className="table-light">
                      <tr>
                        <th>Product Name</th>
                        <th className="text-center">Quantity</th>
                        <th className="text-end">Price</th>
                        <th className="text-end">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedOrderDetails.products.map((item, idx) => (
                        <tr key={idx}>
                          <td>{item.productName}</td>
                          <td className="text-center">{item.qty}</td>
                          <td className="text-end">₹{item.price}</td>
                          <td className="text-end">₹{item.total}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr>
                        <td colSpan="3" className="text-end fw-bold">
                          Grand Total:
                        </td>
                        <td className="text-end fw-bold">
                          ₹{selectedOrderDetails.grantTotal}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={closeModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OrdersLayer;
