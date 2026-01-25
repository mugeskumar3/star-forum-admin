import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";
import TablePagination from "./TablePagination";

const OrdersLayer = () => {
  const [orders, setOrders] = useState([
    {
      id: "#ORD-001",
      customer: "John Doe",
      phoneNumber: "9876543210",
      product: "Wireless Headphones",
      quantity: 1,
      amount: 2999,
      date: "10 Jan 2025",
      status: "Delivered",
    },
    {
      id: "#ORD-002",
      customer: "Jane Smith",
      phoneNumber: "9876543211",
      product: "Cotton T-Shirt",
      quantity: 2,
      amount: 1198,
      date: "09 Jan 2025",
      status: "Processing",
    },
    {
      id: "#ORD-003",
      customer: "Robert Brown",
      phoneNumber: "9876543212",
      product: "Smart Watch",
      quantity: 1,
      amount: 4500,
      date: "08 Jan 2025",
      status: "Pending",
    },
    {
      id: "#ORD-004",
      customer: "Emily Davis",
      phoneNumber: "9876543213",
      product: "Running Shoes",
      quantity: 1,
      amount: 3499,
      date: "08 Jan 2025",
      status: "Shipped",
    },
    {
      id: "#ORD-005",
      customer: "Michael Wilson",
      phoneNumber: "9876543214",
      product: "Desk Lamp",
      quantity: 1,
      amount: 899,
      date: "07 Jan 2025",
      status: "Cancelled",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Filter logic (optional for UI demo, but good for consistency)
  const filteredOrders = orders.filter(
    (order) =>
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const totalRecords = filteredOrders.length;
  const totalPages = Math.ceil(totalRecords / rowsPerPage);

  const currentData = filteredOrders.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage,
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(parseInt(e.target.value));
    setCurrentPage(1);
  };

  const handleStatusChange = (id, newStatus) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === id ? { ...order, status: newStatus } : order,
      ),
    );
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

  return (
    <div className="card h-100 p-0 radius-12">
      <div className="card-header border-bottom bg-base py-16 px-24 d-flex align-items-center flex-wrap gap-3 justify-content-end">
        <div className="d-flex align-items-center flex-wrap gap-3">
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
        </div>
        {/* No Add Button for Orders typically, but header structure maintained */}
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
                <th scope="col" className="text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {currentData.length > 0 ? (
                currentData.map((order, index) => (
                  <tr key={order.id}>
                    <td>
                      <span className="text-md mb-0 fw-medium text-secondary-light">
                        {index + 1}
                      </span>
                    </td>
                    <td>
                      <span className="text-md mb-0 fw-medium text-primary-600">
                        {order.id}
                      </span>
                    </td>
                    <td>
                      <span className="text-md mb-0 fw-normal text-secondary-light">
                        {order.customer}
                      </span>
                    </td>
                    <td>
                      <span className="text-md mb-0 fw-normal text-secondary-light">
                        {order.phoneNumber}
                      </span>
                    </td>
                    <td className="text-center text-md mb-0 fw-normal text-secondary-light">
                      {order.quantity}
                    </td>
                    <td>
                      <span className="text-md mb-0 fw-normal text-secondary-light">
                        ₹{order.amount}
                      </span>
                    </td>
                    <td>
                      <span className="text-md mb-0 fw-normal text-secondary-light">
                        {order.date}
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
                                  handleStatusChange(order.id, status)
                                }
                              >
                                {status}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </td>
                    <td className="text-center">
                      <div className="d-flex align-items-center gap-10 justify-content-center">
                        <Link
                          to="#"
                          className="bg-info-focus bg-hover-info-200 text-info-600 fw-medium w-40-px h-40-px d-flex justify-content-center align-items-center rounded-circle"
                        >
                          <Icon
                            icon="majesticons:eye-line"
                            className="icon text-xl"
                          />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center py-4">
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
  );
};

export default OrdersLayer;
