"use client";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { userPaymentTheads } from "@/constants/tableHeads";
import toLocalDateStringShort from "@/utils/toLocaleDate";
import { toPersianNumbersWithComma } from "@/utils/toPersianNumber";
import {
  FaTimes,
  FaDollarSign,
  FaPercentage,
  FaShoppingCart,
} from "react-icons/fa";

export default function PaymentTable({ payments = [] }) {
  useEffect(() => {
    const appElement =
      document.getElementById("__next") ||
      document.querySelector(".app-container");
    Modal.setAppElement(appElement);
  }, []);

  const [expandedRows, setExpandedRows] = useState({});
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);

  const handleToggle = (id) => {
    setExpandedRows((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const openModal = (products) => {
    setSelectedProducts(products);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedProducts([]);
  };

  const truncateInvoiceNumber = (invoiceNumber, isExpanded) => {
    if (isExpanded) return invoiceNumber;
    return invoiceNumber.length > 3
      ? `${invoiceNumber.slice(0, 3)}...`
      : invoiceNumber;
  };

  return (
    <div className="my-8">
      {/* جدول پرداخت‌ها */}
      <div className="hidden md:block overflow-x-auto shadow-lg">
        <table className="table-auto w-full text-sm min-w-[1000px] bg-white rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              {userPaymentTheads.map((item) => (
                <th
                  className="whitespace-nowrap table__th p-4 text-gray-600 font-semibold"
                  key={item.id}
                >
                  {item.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {payments.map((pay, index) => {
              const isExpanded = expandedRows[pay._id];
              const productCount = pay.cart.productDetail.length;

              return (
                <tr
                  key={pay._id}
                  className="border-b hover:bg-gray-50 transition-all"
                >
                  <td className="table__td p-4 text-center">
                    {toPersianNumbersWithComma(index + 1)}
                  </td>
                  <td className="table__td p-4">
                    {truncateInvoiceNumber(pay.invoiceNumber, isExpanded)}
                    {pay.invoiceNumber.length > 3 && (
                      <button
                        onClick={() => handleToggle(pay._id)}
                        className="text-blue-500 hover:underline ml-2"
                      >
                        {isExpanded ? "کمتر" : "بیشتر"}
                      </button>
                    )}
                  </td>
                  <td className="table__td p-4 max-w-[300px] truncate">
                    {pay.description || "بدون توضیحات"}
                  </td>
                  <td className="table__td p-4">
                    <div className="flex flex-col gap-y-2">
                      <button
                        onClick={() => openModal(pay.cart.productDetail)}
                        className="text-blue-500 hover:underline"
                      >
                        {productCount} محصول - نمایش جزئیات
                      </button>
                    </div>
                  </td>
                  <td className="table__td p-4 font-bold text-lg text-right">
                    {toPersianNumbersWithComma(pay.amount)}
                  </td>
                  <td className="table__td p-4 text-gray-600">
                    {toLocalDateStringShort(pay.createdAt)}
                  </td>
                  <td className="table__td p-4">
                    {pay.status === "COMPLETED" ? (
                      <span className="bg-green-500 text-white px-2 py-1 rounded-full">
                        موفق
                      </span>
                    ) : (
                      <span className="bg-red-500 text-white px-2 py-1 rounded-full">
                        ناموفق
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* مودال برای نمایش جزئیات محصولات */}
      <Modal
  isOpen={modalIsOpen}
  onRequestClose={closeModal}
  contentLabel="جزئیات محصولات"
  className="modal-content bg-white p-6 rounded-lg shadow-lg max-w-3xl mx-auto mt-20 transition-transform transform ease-out duration-300"
  overlayClassName="modal-overlay fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center"
>
  <div className="flex justify-between items-center mb-6">
    <h2 className="text-2xl font-bold text-gray-800">جزئیات محصولات</h2>
    <button
      onClick={closeModal}
      className="text-gray-500 hover:text-red-500 transition-all"
    >
      <FaTimes size={24} /> {/* آیکون بستن */}
    </button>
  </div>

  <div className="overflow-y-auto max-h-80 space-y-4"> {/* فاصله بین محصولات */}
    {selectedProducts.map((product) => (
      <div
        key={product._id}
        className="grid grid-cols-4 gap-x-4 gap-y-2 p-2 border-b pb-2" // تنظیم فاصله ستون‌ها و ردیف‌ها
      >
        {/* عنوان محصول */}
        <div className="flex items-center col-span-2">
          <FaShoppingCart className="text-blue-500 ml-2" size={16} /> {/* آیکون با فاصله از متن */}
          <span className="font-semibold text-gray-700">{product.title}</span>
        </div>

        {/* قیمت محصول */}
        <div className="flex items-center col-span-1">
          <FaDollarSign className="text-green-600 mr-2" size={14} /> {/* فاصله آیکون قیمت */}
          <span className="text-gray-600">{toPersianNumbersWithComma(product.price)} تومان</span>
        </div>

        {/* تعداد محصول */}
        {product.quantity && (
          <div className="col-span-1">
            <span className="text-gray-500">تعداد: </span>
            <span className="font-semibold text-gray-700">
              {toPersianNumbersWithComma(product.quantity)} عدد
            </span>
          </div>
        )}

        {/* تخفیف محصول - زیر تعداد نمایش داده می‌شود */}
        {product.discount > 0 && (
          <div className="col-span-4 flex justify-end items-center mt-2"> {/* تمام عرض ردیف */}
            <FaPercentage className="text-red-500 ml-1" size={14} /> {/* آیکون تخفیف */}
            <span className="text-red-500">
              {toPersianNumbersWithComma(product.discount)}% تخفیف
            </span>
          </div>
        )}
      </div>
    ))}
  </div>
</Modal>
      {/* نسخه موبایل */}
      <div className="md:hidden space-y-4">
        {payments.map((pay, index) => (
          <div
            key={pay._id}
            className="border rounded-lg p-4 shadow-sm bg-white"
          >
            <div className="mb-2">
              <strong>ردیف: </strong> {toPersianNumbersWithComma(index + 1)}
            </div>
            <div className="mb-2">
              <strong>شماره فاکتور: </strong>
              {truncateInvoiceNumber(pay.invoiceNumber, expandedRows[pay._id])}
              {pay.invoiceNumber.length > 3 && (
                <button
                  onClick={() => handleToggle(pay._id)}
                  className="text-blue-500 hover:underline ml-2"
                >
                  {expandedRows[pay._id] ? "کمتر" : "بیشتر"}
                </button>
              )}
            </div>
            <div className="mb-2">
              <strong>توضیحات: </strong> {pay.description || "بدون توضیحات"}
            </div>
            <div className="mb-2">
              <button
                onClick={() => openModal(pay.cart.productDetail)}
                className="text-blue-500 hover:underline"
              >
                {pay.cart.productDetail.length} محصول - نمایش جزئیات
              </button>
            </div>
            <div className="mb-2">
              <strong>مبلغ: </strong> {toPersianNumbersWithComma(pay.amount)}{" "}
              تومان
            </div>
            <div className="mb-2">
              <strong>تاریخ: </strong> {toLocalDateStringShort(pay.createdAt)}
            </div>
            <div>
              <strong>وضعیت: </strong>
              {pay.status === "COMPLETED" ? (
                <span className="bg-green-500 text-white px-2 py-1 rounded-full">
                  موفق
                </span>
              ) : (
                <span className="bg-red-500 text-white px-2 py-1 rounded-full">
                  ناموفق
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
