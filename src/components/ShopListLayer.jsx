import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";
import Select from "react-select";

const ShopListLayer = () => {
  const [formData, setFormData] = useState({
    zone: "",
    region: "",
    chapter: "",
    member: "",
    date: new Date().toISOString().split("T")[0],
  });

  const [cart, setCart] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Mock Data
  const zoneOptions = [
    { value: "Zone A", label: "Zone A" },
    { value: "Zone B", label: "Zone B" },
  ];
  const regionOptions = [
    { value: "North Region", label: "North Region" },
    { value: "South Region", label: "South Region" },
  ];
  const chapterOptions = [
    { value: "Star Chapter", label: "Star Chapter" },
    { value: "Galaxy Chapter", label: "Galaxy Chapter" },
  ];
  const memberOptions = [
    { value: "John Doe", label: "John Doe" },
    { value: "Jane Smith", label: "Jane Smith" },
    { value: "Alice Johnson", label: "Alice Johnson" },
  ];

  const productOptions = [
    { value: 1, label: "T-Shirt", price: 500 },
    { value: 2, label: "Jeans", price: 1200 },
    { value: 3, label: "Cap", price: 300 },
    { value: 4, label: "Jacket", price: 2500 },
    { value: 5, label: "Sneakers", price: 3000 },
  ];

  const handleSelectChange = (selectedOption, { name }) => {
    setFormData((prev) => ({
      ...prev,
      [name]: selectedOption ? selectedOption.value : "",
    }));
  };

  const handleProductSelect = (selectedOption) => {
    if (!selectedOption) return;

    // Check if product already exists in cart
    const existingItem = cart.find((item) => item.id === selectedOption.value);
    if (existingItem) {
      // Increment quantity
      setCart((prev) =>
        prev.map((item) =>
          item.id === selectedOption.value
            ? { ...item, count: item.count + 1 }
            : item
        )
      );
    } else {
      // Add new item
      setCart((prev) => [
        ...prev,
        {
          id: selectedOption.value,
          name: selectedOption.label,
          price: selectedOption.price,
          count: 1,
        },
      ]);
    }
    setSelectedProduct(null); // Reset dropdown
  };

  const updateQuantity = (id, delta) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newCount = Math.max(1, item.count + delta);
          return { ...item, count: newCount };
        }
        return item;
      })
    );
  };

  const removeItem = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.count, 0);
  };

  const calculateTotal = (items) => {
    return items.reduce((total, item) => total + item.price * item.count, 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Order Submitted:", { ...formData, cart });
    // Navigate to orders list just like the request asked
    window.location.href = "/orders";
  };

  const customStyles = {
    control: (provided) => ({
      ...provided,
      minHeight: "40px",
      borderRadius: "8px",
      borderColor: "#dee2e6",
      boxShadow: "none",
      "&:hover": {
        borderColor: "#dee2e6",
      },
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#495057",
    }),
    valueContainer: (provided) => ({
      ...provided,
      paddingLeft: "16px",
    }),
  };

  const getSelectedOption = (options, value) => {
    return options.find((option) => option.value === value) || null;
  };

  return (
    <div className="card h-100 p-0 radius-12">
      <div className="card-header border-bottom bg-base py-16 px-24">
        <h6 className="text-primary-600 pb-2 mb-0">Place New Order</h6>
      </div>
      <div className="card-body p-24">
        <form onSubmit={handleSubmit}>
          <div className="row gy-4">

            {/* Zone Selection */}
            <div className="col-md-6">
              <label className="form-label fw-semibold">
                Zone <span className="text-danger">*</span>
              </label>
              <Select
                name="zone"
                options={zoneOptions}
                value={getSelectedOption(zoneOptions, formData.zone)}
                onChange={handleSelectChange}
                styles={customStyles}
                placeholder="Select Zone"
                isClearable={false}
                required
              />
            </div>

            {/* Region Selection */}
            <div className="col-md-6">
              <label className="form-label fw-semibold">
                Region <span className="text-danger">*</span>
              </label>
              <Select
                name="region"
                options={regionOptions}
                value={getSelectedOption(regionOptions, formData.region)}
                onChange={handleSelectChange}
                styles={customStyles}
                placeholder="Select Region"
                isClearable={false}
                required
              />
            </div>

            {/* Chapter Selection */}
            <div className="col-md-6">
              <label className="form-label fw-semibold">
                Chapter <span className="text-danger">*</span>
              </label>
              <Select
                name="chapter"
                options={chapterOptions}
                value={getSelectedOption(chapterOptions, formData.chapter)}
                onChange={handleSelectChange}
                styles={customStyles}
                placeholder="Chapter"
                isClearable={false}
                required
              />
            </div>

            {/* Member Selection */}
            <div className="col-md-6">
              <label className="form-label fw-semibold">
                Member <span className="text-danger">*</span>
              </label>
              <Select
                name="member"
                options={memberOptions}
                value={getSelectedOption(memberOptions, formData.member)}
                onChange={handleSelectChange}
                styles={customStyles}
                placeholder="Select Member"
                isClearable={false}
                required
              />
            </div>

            {/* Product Selection */}
            <div className="col-12">
              <label className="form-label fw-semibold">
                Select Product <span className="text-danger">*</span>
              </label>
              <Select
                name="product"
                options={productOptions}
                value={selectedProduct}
                onChange={handleProductSelect}
                styles={customStyles}
                placeholder="Search & Select Product..."
                isClearable={true}
              />
            </div>

            {/* Product Cart Table - Only show if cart has items */}
            {cart.length > 0 && (
              <div className="col-12">
                <div className="table-responsive">
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th
                          className="text-center"
                          style={{
                            backgroundColor: "#C4161C",
                            color: "white",
                            border: "none",
                            width: "60px"
                          }}
                        >
                          S.No
                        </th>
                        <th
                          style={{
                            backgroundColor: "#C4161C",
                            color: "white",
                            border: "none",
                          }}
                        >
                          Product Name
                        </th>
                        <th
                          className="text-center"
                          style={{
                            backgroundColor: "#C4161C",
                            color: "white",
                            border: "none",
                            width: "200px"
                          }}
                        >
                          Price
                        </th>
                        <th
                          className="text-center"
                          style={{
                            backgroundColor: "#C4161C",
                            color: "white",
                            border: "none",
                            width: "240px"
                          }}
                        >
                          Quantity
                        </th>
                        <th
                          className="text-center"
                          style={{
                            backgroundColor: "#C4161C",
                            color: "white",
                            border: "none",
                            width: "220px"
                          }}
                        >
                          Total
                        </th>
                        <th
                          className="text-center"
                          style={{
                            backgroundColor: "#C4161C",
                            color: "white",
                            border: "none",
                            width: "80px"
                          }}
                        >
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {cart.map((item, index) => (
                        <tr key={item.id}>
                          <td className="text-center align-middle fw-medium" style={{ width: "60px" }}>
                            {index + 1}
                          </td>
                          <td className="align-middle">{item.name}</td>
                          <td className="text-center align-middle" style={{ width: "100px" }}>
                            ₹{item.price}
                          </td>
                          <td className="text-center align-middle" style={{ width: "140px" }}>
                            <div className="d-flex justify-content-center">
                              <div className="d-flex border rounded" style={{ width: "120px" }}>
                                <button
                                  type="button"
                                  className="btn btn-light border-0 d-flex align-items-center justify-content-center"
                                  style={{ width: "40px" }}
                                  onClick={() => updateQuantity(item.id, -1)}
                                  disabled={item.count <= 1}
                                >
                                  <Icon icon="mdi:minus" style={{ fontSize: "16px" }} />
                                </button>

                                <div
                                  className="d-flex align-items-center justify-content-center fw-semibold"
                                  style={{
                                    width: "40px",
                                    backgroundColor: "#f8f9fa",
                                    borderLeft: "1px solid #dee2e6",
                                    borderRight: "1px solid #dee2e6"
                                  }}
                                >
                                  {item.count}
                                </div>

                                <button
                                  type="button"
                                  className="btn btn-light border-0 d-flex align-items-center justify-content-center"
                                  style={{ width: "40px" }}
                                  onClick={() => updateQuantity(item.id, 1)}
                                >
                                  <Icon icon="mdi:plus" style={{ fontSize: "16px" }} />
                                </button>
                              </div>
                            </div>
                          </td>
                          <td className="text-center align-middle" style={{ width: "120px" }}>
                            ₹{item.price * item.count}
                          </td>
                          <td className="text-center align-middle">
                            <button
                              type="button"
                              className="btn btn-danger btn-sm p-1 d-flex align-items-center justify-content-center mx-auto"
                              style={{ width: "32px", height: "32px" }}
                              onClick={() => removeItem(item.id)}
                            >
                              <Icon
                                icon="mdi:trash-can-outline"
                                style={{ fontSize: "18px" }}
                              />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr>
                        <td
                          colSpan="4"
                          className="text-end fw-bold align-middle"
                        >
                          Grand Total:
                        </td>
                        <td
                          colSpan="2"
                          className="fw-bold fs-5 text-primary-600 align-middle"
                        >
                          ₹{getTotalPrice()}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            )}

          </div>

          <div className="d-flex justify-content-end gap-2 mt-24">
            <Link
              to="/shop-list"
              className="btn btn-outline-secondary radius-8 px-20 py-11"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="btn btn-primary radius-8 px-20 py-11"
            >
              Confirm Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ShopListLayer;
