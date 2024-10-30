// components/PaymentsListTable.js
"use client";
import { PaymentListTableHeads } from "@/constants/tableHeads";
import { toLocalDateStringShort } from "@/utils/toLocaleDate";
import { toPersianNumbers, toPersianNumbersWithComma } from "@/utils/toPersianNumber";
import React, { useState } from "react";
import ProductsModal from "@/constants/PaymentsModal";
import Link from "next/link";

export default function PaymentsListTable({ payments }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProducts, setSelectedProducts] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleShowModal = (products) => {
    setSelectedProducts(products);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedProducts(null);
    setIsModalOpen(false);
  };

  // تابع فیلتر کردن پرداخت‌ها براساس جستجو
  const filteredPayments = payments.filter((payment) => {
    const invoiceNumber = payment.invoiceNumber || "";
    const userName = payment.user?.name || "";
    return (
      invoiceNumber.includes(searchTerm) || userName.includes(searchTerm)
    );
  });

  return (
    <div className={`overflow-x-auto shadow-lg rounded-lg my-8 bg-white ${isModalOpen ? "backdrop-blur-sm" : ""}`}>
      {/* جستجو */}
      <div className="flex justify-between items-center p-4 bg-white border-b border-gray-200">
        <h2 className="text-xl font-semibold">لیست پرداخت‌ها</h2>
        <input
          type="text"
          placeholder="جستجو بر اساس نام کاربر یا شماره فاکتور..."
          className="p-2 border border-gray-300 rounded-lg text-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Desktop View */}
      <table className="w-full text-sm bg-white rounded-lg hidden md:table">
        <thead className="bg-blue-500 text-white">
          <tr>
            {PaymentListTableHeads.map((item) => (
              <th
                className="px-4 py-3 text-center text-sm font-semibold uppercase tracking-wide"
                key={item.id}
              >
                {item.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {filteredPayments && filteredPayments.length > 0 ? (
            filteredPayments.map((payment, index) => (
              <tr key={payment._id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-4 text-center font-semibold text-gray-800">
                  {toPersianNumbers(index + 1)}
                </td>
                <td className="px-4 py-4 font-bold text-blue-600">
                  <InvoiceNumber invoiceNumber={payment.invoiceNumber} />
                </td>
                <td className="px-4 py-4 text-gray-800">
                  <div className="flex flex-col items-center md:items-start">
                    <span className="font-semibold text-gray-900">{payment?.user?.name || "نام کاربر موجود نیست"}</span>
                    <span className="text-gray-600">{payment.user?.email || "ایمیل موجود نیست"}</span>
                    <span className="font-bold text-gray-700">{payment.user?.phoneNumber || "تلفن موجود نیست"}</span>
                  </div>
                </td>
                <td className="px-4 py-4 text-center">
                  <button 
                    className="bg-blue-600 hover:bg-blue-700 transition text-white rounded-md px-4 py-1 text-xs font-semibold"
                    onClick={() => handleShowModal(payment.cart.productDetail)}
                  >
                    مشاهده محصولات
                  </button>
                </td>
                <td className="flex gap-1 px-4 py-4 font-bold text-lg text-gray-900">
                  {toPersianNumbersWithComma(payment.amount)}
                  <span>تومان</span>
                </td>
                <td className="px-4 py-4 text-gray-700">
                  {toLocalDateStringShort(payment.createdAt)}
                </td>
                <td className="px-4 py-4 text-center">
                  {payment.status === "COMPLETED" ? (
                    <span className="bg-green-500 text-white rounded-full px-3 py-1 text-xs">
                      موفق
                    </span>
                  ) : (
                    <span className="bg-red-500 text-white rounded-full px-3 py-1 text-xs">
                      ناموفق
                    </span>
                  )}
                </td>
                <td className="px-4 py-4 text-center">
                  <Link href={`/admin/payments/${payment._id}`} >صدور فاکتور</Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="text-center py-4 text-gray-500">نتیجه‌ای یافت نشد.</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Mobile View */}
      <div className="md:hidden space-y-4">
        {filteredPayments.map((payment, index) => (
          <div
            key={payment._id}
            className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow border border-gray-200"
          >
            <div className="flex justify-between items-center mb-2">
              <InvoiceNumber invoiceNumber={payment.invoiceNumber} index={index} />
              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  payment.status === "COMPLETED"
                    ? "bg-green-500 text-white"
                    : "bg-red-500 text-white"
                }`}
              >
                {payment.status === "COMPLETED" ? "موفق" : "ناموفق"}
              </span>
            </div>
            <div className="text-sm text-gray-800 mb-3">
              <span className="font-bold">نام کاربر :</span> {payment.user ? payment.user.name : "ناموجود"}
              <div>
                <span className="font-bold">ایمیل: </span> {payment.user ? payment.user.email : "ناموجود"}
              </div>
              <div>
                <span className="font-bold">تلفن: </span> {payment.user ? payment.user.phoneNumber : "ناموجود"}
              </div>
            </div>
            <div className="text-sm text-gray-800 mb-3">
              <button 
                className="bg-blue-600 hover:bg-blue-700 transition text-white rounded-md px-4 py-1 text-xs font-semibold"
                onClick={() => handleShowModal(payment.cart.productDetail)}
              >
                مشاهده محصولات
              </button>
            </div>
            <div className="flex gap-1 text-lg font-bold text-gray-900 mb-3">
              <span className="font-bold">مبلغ:</span> {toPersianNumbersWithComma(payment.amount)}
              <span>تومان</span>
            </div>
          </div>
        ))}
      </div>

      {/* نمایش مودال در صورت باز بودن */}
      {isModalOpen && <ProductsModal products={selectedProducts} onClose={handleCloseModal} />}
    </div>
  );
}

// کامپوننت شماره فاکتور
function InvoiceNumber({ invoiceNumber }) {
  const [showFull, setShowFull] = useState(false);

  const shortInvoiceNumber = invoiceNumber.slice(0, 3);
  const handleShowMore = () => setShowFull(!showFull);

  return (
    <span className="font-bold text-gray-900">
      {showFull ? invoiceNumber : `${shortInvoiceNumber}...`}
      {invoiceNumber.length > 3 && (
        <button onClick={handleShowMore} className="text-blue-500 ml-2 text-sm">
          {showFull ? "کوتاه" : "بیشتر"}
        </button>
      )}
    </span>
  );
}
