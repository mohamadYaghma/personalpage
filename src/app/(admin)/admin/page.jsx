"use client";
import Link from "next/link";
import React from "react";
import { FaUser, FaChartBar, FaProductHunt, FaMoneyBill } from "react-icons/fa";
import { useGetProducts } from "@/hooks/useProducts";
import { useGetUsers } from "@/hooks/useAuth";
import { useGetPayments } from "@/hooks/usePayment";

export default function AdminPage() {
  const { data: productsData, isLoading: productsLoading } = useGetProducts();
  const { data: usersData, isLoading: usersLoading } = useGetUsers();
  const { data: paymentsData, isLoading: paymentsLoading } = useGetPayments();

  const users = Array.isArray(usersData) ? usersData : usersData?.users || [];
  const products = Array.isArray(productsData)
    ? productsData
    : productsData?.products || [];
  const payments = Array.isArray(paymentsData)
    ? paymentsData
    : paymentsData?.payments || [];

  const userCount = users.length;
  const productCount = products.length;
  const totalSales = payments.reduce((acc, payment) => acc + payment.amount, 0);

  return (
    <div className="p-6 bg-gray-200 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">داشبورد ادمین</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
  {/* کارت کاربران */}
  <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center transition-transform transform hover:scale-105">
    <FaUser className="text-blue-600 text-4xl mb-4" />
    <h2 className="text-xl font-semibold text-gray-700">کاربران</h2>
    {usersLoading ? (
      <p className="text-gray-500">در حال بارگذاری...</p>
    ) : (
      <p className="text-gray-600 whitespace-nowrap">تعداد کاربران: {userCount}</p>
    )}
  </div>

  {/* کارت فروش */}
  <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center transition-transform transform hover:scale-105">
    <FaMoneyBill className="text-green-600 text-4xl mb-4" />
    <h2 className="text-xl font-semibold text-gray-700">فروش</h2>
    {paymentsLoading ? (
      <p className="text-gray-500">در حال بارگذاری...</p>
    ) : (
      <p className="text-gray-600 whitespace-nowrap">مجموع فروش: {totalSales.toLocaleString()} تومان</p>
    )}
  </div>

  {/* کارت محصولات */}
  <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center transition-transform transform hover:scale-105">
    <FaProductHunt className="text-purple-600 text-4xl mb-4" />
    <h2 className="text-xl font-semibold text-gray-700">محصولات</h2>
    {productsLoading ? (
      <p className="text-gray-500">در حال بارگذاری...</p>
    ) : (
      <p className="text-gray-600 whitespace-nowrap">تعداد محصولات: {productCount}</p>
    )}
  </div>

  {/* کارت نمودار‌ها */}
  <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center transition-transform transform hover:scale-105">
    <FaChartBar className="text-red-600 text-4xl mb-4" />
    <h2 className="text-xl font-semibold text-gray-700">گزارشات</h2>
    <p className="text-gray-600 whitespace-nowrap">مشاهده آمار فروش</p>
  </div>
</div>


      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">مدیریت</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105">
            <Link href={`/admin/users`}>
              <h3 className="text-lg font-bold text-gray-700">
                مدیریت کاربران
              </h3>
              <p className="text-gray-600">
                مدیریت اطلاعات کاربران و دسترسی‌ها
              </p>
            </Link>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105">
            <Link href={`/admin/products`}>
              <h3 className="text-lg font-bold text-gray-700">
                مدیریت محصولات
              </h3>
              <p className="text-gray-600">افزودن، ویرایش و حذف محصولات</p>
            </Link>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105">
            <Link href={`/admin/payments`}>
              <h3 className="text-lg font-bold text-gray-700">
                مدیریت سفارشات
              </h3>
              <p className="text-gray-600">مشاهده و پیگیری سفارشات کاربران</p>
            </Link>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105">
            <Link href={``}>
              <h3 className="text-lg font-bold text-gray-700">
                گزارشات و آمار
              </h3>
              <p className="text-gray-600">
                گزارشات مالی و آماری از عملکرد سایت
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
