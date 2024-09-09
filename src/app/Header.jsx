"use client";
import { useState } from 'react';
import { useGetUser } from '@/hooks/useAuth';
import { toPersianNumbers } from '@/utils/toPersianNumber';
import Link from 'next/link';
import { HiShoppingBag } from 'react-icons/hi';
import { User } from "@nextui-org/react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data, isLoading } = useGetUser();
  const { user, cart } = data || {};

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header
      className={`backdrop-blur-md bg-white/80 shadow-md mb-10 sticky top-0 z-50 transition-all duration-200 ${
        isLoading ? "blur-sm opacity-70" : "opacity-100 blur-0"
      }`}
    >
      <nav className="container xl:max-w-screen-xl">
        <div className="flex items-center justify-between py-2">
          {/* آیکون منوی همبرگری - فقط در موبایل */}
          <div className="md:hidden mr-4">
            <button
              onClick={toggleMenu}
              className="text-gray-800 focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>

          {/* لینک‌های منو - در دسکتاپ و موبایل */}
          <ul
            className={`${
              isMenuOpen ? 'block' : 'hidden'
            } md:flex items-center space-y-4 md:space-y-0 md:space-x-6 text-right w-full flex justify-around align-middle `}
          >
            <li className="md:block hidden">
              <Link className="block py-2" href={"/"}>
                خانه
              </Link>
            </li>
            <li className="md:block hidden">
              <Link className="block py-2" href={"/products"}>
                محصولات
              </Link>
            </li>
            <li className="md:block hidden">
              <Link className="block py-2" href={"/profile"}>
                پنل کاربر
              </Link>
            </li>
            <li className="md:block hidden">
              <Link className="block py-2" href={"/admin"}>
                پنل ادمین
              </Link>
            </li>
            
            {/* سبد خرید با آیکون - فقط در دسکتاپ */}
            <li className="relative hidden md:block">
              <Link href={"/cart"} className="block py-2">
                <HiShoppingBag className='h-8 w-8 mx-auto md:mx-0'/>
                {/* نشان تعداد محصولات */}
                {cart && cart.payDetail.productIds.length > 0 && (
                  <span className="absolute bottom-0 right-2 inline-flex items-center 
                  justify-center px-2 py-0.5 text-xs font-bold leading-none
                   text-white bg-red-600 rounded-full transform translate-x-1/2 -translate-y-1/2">
                    {toPersianNumbers(cart.payDetail.productIds.length)}
                  </span>
                )}
              </Link>
            </li>

            {data ? (
              <li className="md:block hidden">
                <div className='flex gap-x-5'>
                  <Link className="block py-2" href={"/profile"}>              
                    <User
                      dir='ltr'
                      name={user.name}
                      description="Product Designer"
                      avatarProps={{
                        src: "https://avatars.githubusercontent.com/u/30373425?v=4"
                      }}
                    />
                  </Link>
                </div>
              </li>
            ) : (
              <li className="md:block hidden">
                <Link className="block py-2" href={"/auth"}>
                  ورود
                </Link>
              </li>
            )}
          </ul>
        </div>

        {/* لینک‌ها در حالت موبایل - زیر دکمه همبرگری */}
        {isMenuOpen && (
          <ul className="flex flex-col items-end justify-center align-middle pl-8 gap-y-4">
            {data ? (
              <li>
                <User
                  dir='ltr'
                  name={user.name}
                  avatarProps={{
                    src: "https://avatars.githubusercontent.com/u/30373425?v=4",
                    size: "sm",
                  }}
                />
              </li>
            ) : (
              <li>
                <Link className="block py-2" href={"/auth"}>
                  ورود
                </Link>
              </li>
            )}
            <li>
              <Link className="block py-2" href={"/"}>
                خانه
              </Link>
            </li>
            <li>
              <Link className="block py-2" href={"/products"}>
                محصولات
              </Link>
            </li>
            <li>
              <Link className="block py-2" href={"/profile"}>
                پنل کاربر
              </Link>
            </li>
            <li>
              <Link className="block py-2" href={"/admin"}>
                پنل ادمین
              </Link>
            </li>
            {/* سبد خرید با آیکون - فقط در موبایل */}
            <li className="relative md:hidden">
              <Link href={"/cart"} className="block py-2">
                <HiShoppingBag className='h-8 w-8 mx-auto'/>
                {/* نشان تعداد محصولات */}
                {cart && cart.payDetail.productIds.length > 0 && (
                  <span className="absolute bottom-0 right-2 inline-flex items-center 
                  justify-center px-2 py-0.5 text-xs font-bold leading-none
                   text-white bg-red-600 rounded-full transform translate-x-1/2 -translate-y-1/2">
                    {toPersianNumbers(cart.payDetail.productIds.length)}
                  </span>
                )}
              </Link>
            </li>
            
          </ul>
        )}
      </nav>
    </header>
  );
}
