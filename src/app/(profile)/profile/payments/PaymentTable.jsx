import { userPaymentTheads } from '@/constants/tableHeads';
import toLocalDateStringShort from '@/utils/toLocaleDate';
import { toPersianNumbersWithComma } from '@/utils/toPersianNumber';
import React, { useState } from 'react';

export default function PaymentTable({  payments = [] }) {
  const [expandedRows, setExpandedRows] = useState({});

  const handleToggle = (id) => {
    setExpandedRows((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const truncateInvoiceNumber = (invoiceNumber, isExpanded) => {
    if (isExpanded) return invoiceNumber;
    return invoiceNumber.length > 3
      ? `${invoiceNumber.slice(0, 3)}...`
      : invoiceNumber;
  };

  return (
    <div className="my-8">
      <div className="hidden md:block overflow-x-auto shadow-sm">
        <table className="table-auto w-full text-sm min-w-[800px]">
          <thead>
            <tr>
              {userPaymentTheads.map((item) => (
                <th className="whitespace-nowrap table__th p-2" key={item.id}>
                  {item.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {payments && payments.length > 0 ?(payments.map((pay, index) => {
              const isExpanded = expandedRows[pay._id];

              return (
                <tr key={pay._id}>
                  <td className="table__td p-2">{index}</td>
                  <td className="table__td p-2 whitespace-nowrap truncate">
                    {truncateInvoiceNumber(pay.invoiceNumber, isExpanded)}
                    {pay.invoiceNumber.length > 3 && (
                      <button
                        onClick={() => handleToggle(pay._id)}
                        className="text-blue-500 hover:underline ml-2"
                      >
                        {isExpanded ? 'کمتر' : 'بیشتر'}
                      </button>
                    )}
                  </td>
                  <td className="table__td p-2 max-w-[280px] whitespace-nowrap truncate">
                    {pay.description}
                  </td>
                  <td className="table__td p-2">
                    <div className="flex flex-col gap-y-2 items-start">
                      {pay.cart.productDetail.map((product) => (
                        <span
                          className="px-2 py-1 rounded-xl bg-secondary-500 text-white whitespace-nowrap"
                          key={product._id}
                        >
                          {product.title}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="table__td p-2 font-bold text-lg">
                    {toPersianNumbersWithComma(pay.amount)}
                  </td>
                  <td className="table__td p-2">{toLocalDateStringShort(pay.createdAt)}</td>
                  <td className="table__td p-2">
                    {pay.status === "COMPLETED" ? (
                      <span className="bg-success text-white px-2 py-0.5 rounded-xl">
                        موفق
                      </span>
                    ) : (
                      <span className="bg-error text-white px-2 py-0.5 rounded-xl">
                        ناموفق
                      </span>
                    )}
                  </td>
                </tr>
              );
            })):( <p>No payments found.</p>)}
          </tbody>
        </table>
      </div>

      {/* Mobile view */}
      <div className="md:hidden">
        {payments.map((pay, index) => {
          const isExpanded = expandedRows[pay._id];

          return (
            <div
              key={pay._id}
              className="mb-4 p-4 border rounded-lg shadow-sm bg-white"
            >
              <div className="mb-2">
                <strong>ردیف: </strong> {index}
              </div>
              <div className="mb-2">
                <strong>شماره فاکتور: </strong>
                {truncateInvoiceNumber(pay.invoiceNumber, isExpanded)}
                {pay.invoiceNumber.length > 3 && (
                  <button
                    onClick={() => handleToggle(pay._id)}
                    className="text-blue-500 hover:underline ml-2"
                  >
                    {isExpanded ? 'کمتر' : 'بیشتر'}
                  </button>
                )}
              </div>
              <div className="mb-2">
                <strong>توضیحات: </strong> {pay.description}
              </div>
              <div className="mb-2">
                <strong>محصولات: </strong>
                <div className="flex flex-wrap gap-2">
                  {pay.cart.productDetail.map((product) => (
                    <span
                      className="px-2 py-1 rounded-xl bg-secondary-500 text-white whitespace-nowrap"
                      key={product._id}
                    >
                      {product.title}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mb-2">
                <strong>مبلغ: </strong>{' '}
                {toPersianNumbersWithComma(pay.amount)}
              </div>
              <div className="mb-2">
                <strong>تاریخ: </strong> {toLocalDateStringShort(pay.createdAt)}
              </div>
              <div>
                <strong>وضعیت: </strong>
                {pay.status === "COMPLETED" ? (
                  <span className="bg-success text-white px-2 py-0.5 rounded-xl">
                    موفق
                  </span>
                ) : (
                  <span className="bg-error text-white px-2 py-0.5 rounded-xl">
                    ناموفق
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
