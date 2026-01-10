import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";

const ShopAdminListLayer = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Shawl",
      price: 2999,
      category: "Electronics",
      image:
        "https://images.meesho.com/images/products/578705335/lo6fd_512.webp?width=512",
    },
    {
      id: 2,
      name: "Shirt",
      price: 599,
      category: "Clothing",
      image:
        "https://images.meesho.com/images/products/578705335/lo6fd_512.webp?width=512",
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
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteClick = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
    }
  };

  return (
    <div className="card h-100 p-0 radius-12">
      <div className="card-header border-bottom bg-base py-16 px-24 d-flex align-items-center flex-wrap gap-3 justify-content-between">
        <div className="d-flex align-items-center flex-wrap gap-3">
          <span className="text-md fw-medium text-secondary-light mb-0">
            Show
          </span>
          <select
            className="form-select form-select-sm w-auto ps-12 py-6 radius-12 h-40-px"
            value={rowsPerPage}
            onChange={(e) => setRowsPerPage(parseInt(e.target.value))}
          >
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
          </select>
          <form className="navbar-search">
            <input
              type="text"
              className="bg-base h-40-px w-auto"
              name="search"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Icon icon="ion:search-outline" className="icon" />
          </form>
        </div>
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
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <img
                          src={product.image}
                          alt={product.name}
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
                          {product.name}
                        </span>
                      </div>
                    </td>
                    <td>{product.category}</td>
                    <td>₹{product.price}</td>
                    <td className="text-center">
                      <div className="d-flex align-items-center gap-10 justify-content-center">
                        <button
                          type="button"
                          className="bg-info-focus bg-hover-info-200 text-info-600 fw-medium w-40-px h-40-px d-flex justify-content-center align-items-center rounded-circle"
                        >
                          <Icon
                            icon="majesticons:eye-line"
                            className="icon text-xl"
                          />
                        </button>
                        <Link
                          to={`/shop-add`}
                          className="bg-success-focus text-success-600 bg-hover-success-200 fw-medium w-40-px h-40-px d-flex justify-content-center align-items-center rounded-circle"
                        >
                          <Icon icon="lucide:edit" className="menu-icon" />
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleDeleteClick(product.id)}
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
      </div>
    </div>
  );
};

export default ShopAdminListLayer;
