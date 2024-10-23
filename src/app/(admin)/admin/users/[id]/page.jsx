"use client";

import Loading from "@/common/Loading";
import { useGetUser } from "@/hooks/useAuth";
import { convertShamsiToGregorian } from "@/utils/convertDate";
import toLocaleDate, { toLocalDateStringShort } from "@/utils/toLocaleDate";
import { toPersianNumbers, toPersianNumbersWithComma } from "@/utils/toPersianNumber";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaTag, FaDollarSign, FaShoppingCart, FaChevronDown, FaChevronUp } from 'react-icons/fa';

export default function Page() {
  const { id } = useParams();
  const { data, isLoading } = useGetUser(id);
  const { user, payments } = data || {};

  const [openSections, setOpenSections] = useState({}); // وضعیت باز و بسته بودن هر بخش

  useEffect(() => {
    if (payments) {
      console.log("Payments data after load:", payments);
    }
  }, [payments]);

  const toggleSection = (index) => {
    setOpenSections((prevState) => ({
      ...prevState,
      [index]: !prevState[index], // تغییر وضعیت باز یا بسته بودن
    }));
  };

  if (isLoading) return <Loading />;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4 text-center">اطلاعات کاربری {user?.name}</h1>
      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <div className="flex flex-col space-y-2">
          <span className="text-gray-700"><strong>شماره تلفن:</strong> {user?.phoneNumber}</span>
          <span className="text-gray-700"><strong>ایمیل:</strong> {user?.email}</span>
          <span className="text-gray-700"><strong>تاریخ ایجاد حساب:</strong> {toLocaleDate(user?.createdAt)}</span>
          <span className="text-gray-700"><strong>نوع کاربر:</strong> {user?.role}</span>
        </div>
      </div>

      <h2 className="text-2xl font-semibold mb-4 text-center">خریدها</h2>
      <div className="grid grid-cols-1 gap-4">
        {payments && payments.length > 0 ? payments.map((payment, index) => (
          <div key={index} className="bg-white shadow-lg rounded-lg p-4">
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleSection(index)}
            >
              <h3 className="text-lg font-semibold mb-2">
                تاریخ خرید: {convertShamsiToGregorian(payment.paymentDate)}
              </h3>
              <button className="focus:outline-none">
                {openSections[index] ? <FaChevronUp /> : <FaChevronDown />}
              </button>
            </div>

            {openSections[index] && (
              <ul className="list-none space-y-2">
                {payment.cart?.productDetail?.length > 0 ? (
                  payment.cart.productDetail.map((product) => (
                    <li key={product._id} className="p-4 border border-gray-200 rounded-lg shadow-sm flex items-start justify-between">
                      <div className="flex flex-col">
                        <span className="text-lg font-medium">{product.title}</span>
                        <span className="text-gray-500"><FaDollarSign className="inline mr-1" /> قیمت: {toPersianNumbersWithComma(product.price)} تومان</span>
                        <span className="text-gray-500"><FaShoppingCart className="inline mr-1" /> تعداد: {toPersianNumbersWithComma(product.quantity)} عدد</span>
                        <span className="text-gray-500"><FaTag className="inline mr-1" /> تخفیف: {product.discount ? toPersianNumbersWithComma(product.discount) : toPersianNumbers(0)} تومان</span>
                      </div>
                    </li>
                  ))
                ) : (
                  <li className="text-gray-500">محصولی وجود ندارد</li>
                )}
              </ul>
            )}
          </div>
        )) : (
          <div className="text-center text-gray-500">خریدی وجود ندارد.</div>
        )}
      </div>
    </div>
  );
}
