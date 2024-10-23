import { useEffect } from "react";
import { toPersianNumbers } from "@/utils/toPersianNumber";

export default function ProductsModal({ products, isOpen, onClose }) {
  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose(); // Close modal when clicking on the background
    }
  };

  return (
    <div
    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
    onClick={handleBackgroundClick}
  >
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-3xl w-full mx-4 sm:mx-6 relative max-h-screen h-full sm:h-auto sm:max-h-[80vh] overflow-y-auto">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold mb-4">جزئیات محصولات خریداری‌شده</h2>
        {/* Close button */}
        <button
          onClick={onClose}
          className="text-gray-600 text-4xl mb-4 font-bold focus:outline-none z-10 hover:text-red-600 transition-colors duration-300"
          aria-label="بستن"
        >
          ×
        </button>
      </div>
  
      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {products.length > 0 ? (
          products.map((product, index) => (
            <div
              key={index}
              className="flex flex-col justify-between border rounded-lg p-4 shadow-sm"
            >
              <div>
                <p className="font-semibold text-lg mb-1">{product.title}</p>
                <p className="text-sm text-gray-500">
                  تعداد: {toPersianNumbers(product.quantity || 1)}
                </p>
              </div>
              <div className="text-green-600 mt-2">
                <p>قیمت: {toPersianNumbers(product.price || 0)} تومان</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">محصولی خریداری نشده است.</p>
        )}
      </div>
    </div>
  </div>
  
  );
}
