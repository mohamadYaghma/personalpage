"use client";
import { useGetPaymentsByIds } from "@/hooks/usePayment";
import { useParams } from "next/navigation";
import Link from "next/link";
import { AiOutlinePrinter } from "react-icons/ai";

export default function PaymentDetailPage() {
  const { id } = useParams();
  const { isLoading, data } = useGetPaymentsByIds(id);

  const handlePrint = () => {
    const printWindow = window.open("", "_blank", "width=800,height=600");
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>پرینت فاکتور</title>
            <style>
              body { font-family: Arial, sans-serif; padding: 20px; direction: rtl; }
              h1 { font-size: 24px; color: #1a202c; text-align: center; }
              h2 { font-size: 20px; color: #2b6cb0; }
              p, li { font-size: 16px; color: #4a5568; margin-bottom: 10px; }
              .font-semibold { font-weight: 600; }
              .mt-8 { margin-top: 32px; }
              .text-gray-600 { color: #4a5568; }
              table {
                width: 100%;
                border-collapse: collapse;
                margin-top: 20px;
              }
              th, td {
                border: 1px solid #ccc;
                padding: 8px;
                text-align: center;
              }
              th {
                background-color: #f7fafc;
                color: #2d3748;
              }
              .footer { text-align: center; font-size: 12px; color: #777; margin-top: 20px; }
              @media print {
                .no-print { display: none; }
                body { margin: 0; padding: 0; }
                h1, h2 { margin: 0; }
                table { page-break-inside: auto; }
                tr { page-break-inside: avoid; page-break-after: auto; }
              }
            </style>
          </head>
          <body>
            <div>
              <div class="header">
                <h1>فاکتور فروش</h1>
                <p>تاریخ صدور: ${new Date().toLocaleDateString("fa-IR")}</p>
              </div>
              <div class="info-section">
                <p class="font-semibold">شماره فاکتور:</p>
                <p>${payment.invoiceNumber || "ناموجود"}</p>
                <p class="font-semibold">نام کاربر:</p>
                <p>${payment.user?.name || "ناموجود"}</p>
                <p class="font-semibold">ایمیل:</p>
                <p>${payment.user?.email || "ناموجود"}</p>
                <p class="font-semibold">تلفن:</p>
                <p>${payment.user?.phoneNumber || "ناموجود"}</p>
                <p class="font-semibold">آدرس:</p>
                <p>${payment.user?.address || "ناموجود"}</p>
              </div>
              <h2 class="mt-8">لیست محصولات</h2>
              <table>
                <thead>
                  <tr>
                    <th>نام محصول</th>
                    <th>قیمت واحد (تومان)</th>
                    <th>تعداد</th>
                    <th>تخفیف (تومان)</th>
                    <th>قیمت نهایی (تومان)</th>
                  </tr>
                </thead>
                <tbody>
                  ${payment.cart?.productDetail && payment.cart.productDetail.length > 0
                    ? payment.cart.productDetail.map(product => `
                      <tr>
                        <td>${product.title}</td>
                        <td>${product.price || "ناموجود"}</td>
                        <td>${product.quantity || 1}</td>
                        <td>${product.discount || 0}</td>
                        <td>${(product.price * (product.quantity || 1)) - (product.discount || 0)}</td>
                      </tr>
                    `).join("") : `
                      <tr>
                        <td colspan="5">محصولی برای نمایش وجود ندارد.</td>
                      </tr>
                    `}
                </tbody>
              </table>
              <div class="total-section text-right mt-8">
                <p class="font-bold">جمع کل تخفیف‌ها: ${payment?.cart?.payDetail?.totalOffAmount || "۰"} تومان</p>
                <p class="font-bold">جمع کل بدون تخفیف: ${payment?.cart?.payDetail?.totalGrossPrice || "ناموجود"} تومان</p>
                <p class="font-bold text-lg">جمع کل پرداختی: ${payment?.cart?.payDetail?.totalPrice || "ناموجود"} تومان</p>
              </div>
              <div class="footer">
                این فاکتور به صورت الکترونیکی صادر شده است و نیاز به مهر و امضا ندارد.
              </div>
            </div>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  if (isLoading) return <p className="text-center mt-8">در حال بارگذاری...</p>;

  const payment = data?.payment?.[0];
  if (!payment) return <p className="text-center mt-8">اطلاعاتی برای نمایش وجود ندارد.</p>;

  return (
    <div className="container mx-auto p-4 max-w-3xl">
      {/* دکمه پرینت */}
      <div className="flex justify-between items-center mb-6 no-print">
        <h1 className="text-3xl font-extrabold text-blue-700">جزئیات فاکتور</h1>
        <button
          onClick={handlePrint}
          className="text-blue-500 hover:text-blue-700 flex items-center"
        >
          <AiOutlinePrinter className="mr-1 text-2xl" />
          <span>پرینت</span>
        </button>
      </div>

      {/* فاکتور */}
      <div className="bg-white shadow-lg rounded-lg p-8 border border-gray-200">
        <div className="header text-center mb-8">
          <h1 className="text-2xl font-bold">فاکتور فروش</h1>
          <p>تاریخ صدور: {new Date().toLocaleDateString("fa-IR")}</p>
        </div>

        {/* بخش اطلاعات کاربر */}
        <div className="info-section grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-700 mb-8">
          <div className="info-item">
            <p className="font-semibold">شماره فاکتور:</p>
            <p>{payment.invoiceNumber || "ناموجود"}</p>
          </div>
          <div className="info-item">
            <p className="font-semibold">نام کاربر:</p>
            <p>{payment.user?.name || "ناموجود"}</p>
          </div>
          <div className="info-item">
            <p className="font-semibold">ایمیل:</p>
            <p>{payment.user?.email || "ناموجود"}</p>
          </div>
          <div className="info-item">
            <p className="font-semibold">تلفن:</p>
            <p>{payment.user?.phoneNumber || "ناموجود"}</p>
          </div>
          <div className="info-item">
            <p className="font-semibold">آدرس:</p>
            <p>{payment.user?.address || "ناموجود"}</p>
          </div>
        </div>

        {/* بخش محصولات */}
        <div className="products-section">
          <h2 className="text-xl font-bold text-gray-700 mb-4">لیست محصولات</h2>
          <table className="table-auto w-full border border-gray-300 text-center">
            <thead>
              <tr className="bg-gray-100 text-gray-800">
                <th className="border border-gray-300 px-4 py-2">نام محصول</th>
                <th className="border border-gray-300 px-4 py-2">قیمت واحد (تومان)</th>
                <th className="border border-gray-300 px-4 py-2">تعداد</th>
                <th className="border border-gray-300 px-4 py-2">تخفیف (تومان)</th>
                <th className="border border-gray-300 px-4 py-2">قیمت نهایی (تومان)</th>
              </tr>
            </thead>
            <tbody>
              {payment.cart?.productDetail && payment.cart.productDetail.length > 0 ? (
                payment.cart.productDetail.map((product, index) => (
                  <tr key={index} className="border-b border-gray-300">
                    <td className="border border-gray-300 px-4 py-2">{product.title}</td>
                    <td className="border border-gray-300 px-4 py-2">{product.price || "ناموجود"}</td>
                    <td className="border border-gray-300 px-4 py-2">{product.quantity || 1}</td>
                    <td className="border border-gray-300 px-4 py-2">{product.discount || 0}</td>
                    <td className="border border-gray-300 px-4 py-2">
                      {product.price * (product.quantity || 1) - (product.discount || 0)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-gray-500">محصولی برای نمایش وجود ندارد.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* بخش جمع مبالغ */}
        <div className="total-section text-right mt-8 text-gray-800">
          <p className="font-bold">جمع کل تخفیف‌ها: {payment?.cart?.payDetail?.totalOffAmount || "۰"} تومان</p>
          <p className="font-bold">جمع کل بدون تخفیف: {payment?.cart?.payDetail?.totalGrossPrice || "ناموجود"} تومان</p>
          <p className="font-bold text-lg">جمع کل پرداختی: {payment?.cart?.payDetail?.totalPrice || "ناموجود"} تومان</p>
        </div>

        <div className="footer text-center text-xs text-gray-600 mt-6">
          این فاکتور به صورت الکترونیکی صادر شده است و نیاز به مهر و امضا ندارد.
        </div>
      </div>

      {/* دکمه بازگشت */}
      <div className="text-center mt-6">
        <Link href="/admin/payments" className="text-blue-500 hover:underline">بازگشت به لیست فاکتورها</Link>
      </div>
    </div>
  );
}
