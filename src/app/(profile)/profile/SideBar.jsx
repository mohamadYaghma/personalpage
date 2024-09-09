"use client";

import Link from "next/link";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { logOut } from "@/services/autchServices";

export default function SideBar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const logoutHandler = async () => {
    await logOut()
    document.location.href = "/";
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const isActive = (path) => {
    return pathname === path;
  };

  const navItems = [
    { name: "صفحه اصلی", path: "/" },
    { name: "داشبورد", path: "/profile" },
    { name: "اطلاعات کاربری", path: "/profile/me" },
    { name: "سابقه سفارش", path: "/profile/payments" },
  ];

  return (
    <nav className="flex flex-col md:min-h-full bg-white shadow-md">
      <div className="flex justify-between items-center p-4 md:p-6">
        {/* دکمه همبرگری برای موبایل */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="focus:outline-none">
            <svg
              className="w-8 h-8 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>

        {/* منو برای دسکتاپ */}
        <div className="hidden md:block w-full">
          <ul className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <li
                key={item.path}
                className={`block py-2 px-4 text-gray-700 hover:bg-primary-100 rounded transition-colors ${
                  isActive(item.path)
                    ? "text-primary-700 font-medium border-r-4 border-primary-600 pl-1"
                    : "hover:text-primary-600"
                } `}
              >
                <Link href={item.path}>{item.name}</Link>
              </li>
            ))}
            <li className="py-2 text-lg text-red-600 hover:bg-red-50 rounded-lg transition-all">
              <button onClick={logoutHandler}>خروج از حساب کاربری</button>
            </li>
          </ul>
        </div>
      </div>

      {/* منو برای موبایل */}
      <div
        className={`fixed inset-0 bg-white shadow-lg z-50 transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 md:hidden`}
      >
        <div className="flex flex-col space-y-4 text-gray-700 p-6">
          <button onClick={toggleMenu} className="self-end mb-4 text-primary">
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <ul className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <li
                key={item.path}
                className={`text-lg ${
                  isActive(item.path)
                    ? "text-primary-700 font-medium border-r-4 border-primary-600"
                          : "hover:text-primary-600"
                } `}
              >
                <Link href={item.path}>{item.name}</Link>
              </li>
            ))}
            <li className="text-lg text-red-500 hover:text-red-600 transition-colors">
              <button onClick={logoutHandler}>خروج از حساب کاربری</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
