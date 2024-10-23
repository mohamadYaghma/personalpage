import Link from 'next/link';
import React from 'react';
import { FaUser, FaChartBar, FaProductHunt, FaMoneyBill } from 'react-icons/fa';

export default function AdminPage() {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">داشبورد ادمین</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* کارت کاربران */}
        <div className="bg-white shadow rounded-lg p-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-gray-700">کاربران</h2>
            <p className="text-gray-500">تعداد کاربران: 1500</p>
          </div>
          <FaUser className="text-blue-500 text-3xl" />
        </div>

        {/* کارت فروش */}
        <div className="bg-white shadow rounded-lg p-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-gray-700">فروش</h2>
            <p className="text-gray-500">مجموع فروش: 25,000,000 تومان</p>
          </div>
          <FaMoneyBill className="text-green-500 text-3xl" />
        </div>

        {/* کارت محصولات */}
        <div className="bg-white shadow rounded-lg p-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-gray-700">محصولات</h2>
            <p className="text-gray-500">تعداد محصولات: 300</p>
          </div>
          <FaProductHunt className="text-purple-500 text-3xl" />
        </div>

        {/* کارت نمودار‌ها */}
        <div className="bg-white shadow rounded-lg p-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-gray-700">گزارشات</h2>
            <p className="text-gray-500">مشاهده آمار فروش</p>
          </div>
          <FaChartBar className="text-red-500 text-3xl" />
        </div>
      </div>

      {/* قسمت‌های مدیریتی بیشتر */}
      <div className="mt-10">
        <h2 className="text-xl font-bold mb-4">مدیریت</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white shadow rounded-lg p-6">
            <Link href={`/admin/users`} >
              <h3 className="text-lg font-bold">مدیریت کاربران</h3>
              <p className="text-gray-600">مدیریت اطلاعات کاربران و دسترسی‌ها</p>
            </Link>
          </div>
          <div className="bg-white shadow rounded-lg p-6">
            <Link href={`/admin/products`}>
            <h3 className="text-lg font-bold">مدیریت محصولات</h3>
            <p className="text-gray-600">افزودن، ویرایش و حذف محصولات</p>
            </Link>
          </div>
          <div className="bg-white shadow rounded-lg p-6">
            <Link href={`/admin/payments`}>
            <h3 className="text-lg font-bold">مدیریت سفارشات</h3>
            <p className="text-gray-600">مشاهده و پیگیری سفارشات کاربران</p>
            </Link>
          </div>
          <div className="bg-white shadow rounded-lg p-6">
            <Link href={``}>
            <h3 className="text-lg font-bold">گزارشات و آمار</h3>
            <p className="text-gray-600">گزارشات مالی و آماری از عملکرد سایت</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
