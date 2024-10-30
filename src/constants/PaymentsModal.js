// components/ProductsModal.js

import React from "react";

export default function ProductsModal({ products, onClose }) {
  const handleBackdropClick = (e) => {
    if (e.target.id === "backdrop") {
      onClose();
    }
  };

  return (
    <div
      id="backdrop"
      onClick={handleBackdropClick}
      className="fixed inset-0 bg-gray-900 bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50"
    >
      <div
        className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md mx-4 md:mx-auto max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()} // جلوگیری از بسته شدن با کلیک داخل مودال
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4 border-b pb-3">
          <h2 className="text-xl font-semibold text-gray-800">محصولات</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition"
            aria-label="بستن"
          >
            ✕
          </button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {products.map((product, index) => (
            <div
              key={index}
              className="bg-blue-100 rounded-lg p-3 text-center text-gray-800 shadow-sm"
            >
              {product.title}
            </div>
          ))}
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="mt-4 w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition"
        >
          بستن
        </button>
      </div>
    </div>
  );
}
