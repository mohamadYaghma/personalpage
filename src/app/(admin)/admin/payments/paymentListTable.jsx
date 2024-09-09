import { PaymentListTableHeads } from '@/constants/tableHeads';
import { toLocalDateStringShort } from '@/utils/toLocaleDate';
import { toPersianNumbers, toPersianNumbersWithComma } from '@/utils/toPersianNumber';
import React, { useState } from 'react';

export default function PaymentsListTable({ payments }) {
  return (
    <div className="overflow-x-auto shadow-sm my-8 rounded-lg">
      {/* Desktop View */}
      <table className="w-full text-sm bg-white rounded-lg hidden md:table">
        <thead className="bg-gray-50 text-gray-700">
          <tr>
            {PaymentListTableHeads.map((item) => (
              <th className="px-4 py-3 text-center text-sm font-semibold uppercase tracking-wider" key={item.id}>
                {item.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {payments.map((payment, index) => (
            <tr key={payment._id} className="hover:bg-gray-100 transition-colors">
              <td className="px-4 py-4 text-center">
                {toPersianNumbers(index + 1)}
              </td>
              <td className="px-4 py-4 font-bold text-gray-900">
                <InvoiceNumber invoiceNumber={payment.invoiceNumber} />
              </td>
              <td className="px-4 py-4 text-gray-700 truncate max-w-xs">
                {payment.description}
              </td>
              <td className="px-4 py-4 text-gray-800">
                <div className="flex flex-col items-center md:items-start">
                  <span>{payment.user.name}</span>
                  <span className="text-gray-600">{payment.user.email}</span>
                  <span className="font-bold">{payment.user.phoneNumber}</span>
                </div>
              </td>
              <td className="px-4 py-4">
                <div className="flex flex-wrap gap-2 justify-center">
                  {payment.cart.productDetail.map((product) => (
                    <span key={product.title} className="bg-blue-600 text-white rounded-md px-2 py-1 text-xs">
                      {product.title}
                    </span>
                  ))}
                </div>
              </td>
              <td className="flex gap-1 px-4 py-4 font-bold text-lg text-gray-900">
                {toPersianNumbersWithComma(payment.amount)}<span>تومان</span>
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
            </tr>
          ))}
        </tbody>
      </table>

      {/* Mobile View */}
      <div className="md:hidden space-y-4">
        {payments.map((payment, index) => (
          <div key={payment._id} className="bg-white shadow-lg rounded-lg p-4 hover:shadow-xl transition-shadow">
            <div className="flex justify-between items-center mb-2">
              <InvoiceNumber invoiceNumber={payment.invoiceNumber} index={index} />
              <span className={`text-xs px-2 py-1 rounded-full ${payment.status === "COMPLETED" ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}>
                {payment.status === "COMPLETED" ? "موفق" : "ناموفق"}
              </span>
            </div>
            <div className="text-sm text-gray-600 mb-2">
              {payment.description}
            </div>
            <div className="text-sm text-gray-800 mb-3">
              <div><span className="font-bold">نام کاربر: </span>{payment.user.name}</div>
              <div><span className="font-bold">ایمیل: </span>{payment.user.email}</div>
              <div><span className="font-bold">تلفن: </span>{payment.user.phoneNumber}</div>
            </div>
            <div className="text-sm text-gray-800 mb-3">
              <span className="font-bold">محصولات:</span>
              {payment.cart.productDetail.map((product) => (
                <div key={product.title} className="bg-gray-600 text-white rounded-md text-center mt-2 p-2">
                  {product.title}
                </div>
              ))}
            </div>
            <div className="flex gap-1 text-lg font-bold text-gray-900 mb-3">
              <span className="font-bold">مبلغ:</span> {toPersianNumbersWithComma(payment.amount)}<span>تومان</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Component to display invoice number with "show more" functionality
function InvoiceNumber({ invoiceNumber }) {
  const [showFull, setShowFull] = useState(false);

  const shortInvoiceNumber = invoiceNumber.slice(0, 3); // Show only the first 3 digits
  const handleShowMore = () => setShowFull(!showFull);

  return (
    <span className="font-bold text-gray-900">
      {showFull ? invoiceNumber : `${shortInvoiceNumber}...`}
      {invoiceNumber.length > 3 && (
        <button onClick={handleShowMore} className="text-blue-500 ml-2 text-sm">
          {showFull ? 'کوتاه' : 'بیشتر'}
        </button>
      )}
    </span>
  );
}
