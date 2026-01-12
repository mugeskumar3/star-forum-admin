import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";
import TablePagination from "./TablePagination";

const ShopListLayer = () => {
  const [orderState, setOrderState] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(8); // Default 8 for grid

  const products = [
    {
      id: 1,
      name: "Shawl",
      price: 2999,
      category: "Electronics",
      image:
        "https://m.media-amazon.com/images/I/81FZ+wSFtKL._AC_UY350_.jpg",
    },
    {
      id: 2,
      name: "Shirt",
      price: 599,
      category: "Clothing",
      image:
        "https://m.media-amazon.com/images/I/81FZ+wSFtKL._AC_UY350_.jpg",
    },
    {
      id: 3,
      name: "Smart Watch",
      price: 4500,
      category: "Electronics",
      image: "assets/images/products/watch.jpg",
    },
    {
      id: 4,
      name: "Leather Wallet",
      price: 1200,
      category: "Accessories",
      image: "assets/images/products/wallet.jpg",
    },
    {
      id: 5,
      name: "Running Shoes",
      price: 3499,
      category: "Clothing",
      image: "assets/images/products/shoes.jpg",
    },
    {
      id: 6,
      name: "Desk Lamp",
      price: 899,
      category: "Home & Garden",
      image: "assets/images/products/lamp.jpg",
    },
  ];

  const handleOrderClick = (id) => {
    setOrderState((prev) => ({
      ...prev,
      [id]: { ordering: true, count: 1 },
    }));
  };

  const handleCountChange = (id, delta) => {
    setOrderState((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        count: Math.max(1, (prev[id]?.count || 1) + delta),
      },
    }));
  };

  const handlePlaceOrder = (product) => {
    const qty = orderState[product.id]?.count || 1;
    alert(
      `Order placed successfully!\nProduct: ${product.name
      }\nQuantity: ${qty}\nTotal: ₹${product.price * qty}`
    );
    setOrderState((prev) => ({
      ...prev,
      [product.id]: { ordering: false, count: 1 },
    }));
  };

  const totalRecords = products.length;
  const totalPages = Math.ceil(totalRecords / rowsPerPage);

  const currentData = products.slice(
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
    <div className="d-flex flex-column gap-4">
      <div className="row gy-4">
        {/* Client View - No "Add Product" button here */}
        {currentData.map((product) => {
          const isOrdering = orderState[product.id]?.ordering;
          const count = orderState[product.id]?.count || 1;

          return (
            <div key={product.id} className="col-xxl-3 col-xl-4 col-sm-6 col-12">
              <div className="card h-100 radius-12 overflow-hidden hover-scale-img">
                <div className="card-img-top position-relative m-0">
                  <div className="w-100 h-200-px bg-neutral-100 d-flex justify-content-center align-items-center text-secondary-light">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-100 h-100 object-fit-contain"
                      onError={(e) => {
                        e.target.src =
                          "https://placehold.co/200x200?text=No+Image";
                      }}
                    />
                  </div>
                  {!isOrdering && (
                    <span className="position-absolute inset-0"></span>
                  )}
                </div>
                <div className="card-body p-24 d-flex flex-column">
                  <div className="d-flex align-items-center justify-content-between gap-2 mb-16">
                    <span className="text-secondary-light text-sm fw-medium px-12 py-4 bg-base radius-4 border">
                      {product.category}
                    </span>
                    <span className="text-primary-600 fw-bold text-md">
                      ₹{product.price}
                    </span>
                  </div>
                  <h6 className="text-lg fw-bold mb-16 text-line-2">
                    <Link to="#" className="text-heading hover-text-primary-600">
                      {product.name}
                    </Link>
                  </h6>

                  <div className="mt-auto">
                    {isOrdering ? (
                      <div className="d-flex flex-column gap-2">
                        <div className="d-flex align-items-center justify-content-between bg-base radius-8 border p-1">
                          <button
                            type="button"
                            className="btn btn-icon btn-sm text-secondary-light hover-text-primary-600"
                            onClick={() => handleCountChange(product.id, -1)}
                          >
                            <Icon icon="ic:round-minus" />
                          </button>
                          <span className="fw-semibold text-md">{count}</span>
                          <button
                            type="button"
                            className="btn btn-icon btn-sm text-secondary-light hover-text-primary-600"
                            onClick={() => handleCountChange(product.id, 1)}
                          >
                            <Icon icon="ic:round-plus" />
                          </button>
                        </div>
                        <button
                          type="button"
                          className="btn btn-primary w-100 radius-8 py-2 text-sm"
                          onClick={() => handlePlaceOrder(product)}
                        >
                          Place Order
                        </button>
                      </div>
                    ) : (
                      <div className="d-flex align-items-center justify-content-between gap-2">
                        <button
                          type="button"
                          className="btn btn-outline-primary w-100 radius-8 py-2 text-sm fw-medium"
                          onClick={() => handleOrderClick(product.id)}
                        >
                          Order Now
                        </button>
                        <div className="d-flex gap-2">
                          <Link
                            to="#"
                            className="w-32-px h-32-px bg-info-100 text-info-600 rounded-circle d-flex justify-content-center align-items-center hover-bg-info-600 hover-text-white transition-2"
                          >
                            <Icon icon="heroicons:eye" className="text-md" />
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="card p-24 radius-12">
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

export default ShopListLayer;
