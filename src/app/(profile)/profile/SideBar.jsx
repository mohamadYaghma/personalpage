"use client"
import { logote } from '@/services/autchServices'
import Link from 'next/link'
import React from 'react'

export default function SideBar() {

    const logouteHandler = async () =>{
        await logote();
        // localStorage.removeItem("userInfo");
        // localStorage.removeItem("cartItems");
        // localStorage.removeItem("token");
        document.location.href = "/";
    }

  return (
    <div> 
        <ul className='flex flex-col space-y-8 '>
            <li>
                <Link href={"/"}>صفحه اصلی</Link>
            </li>
            <li>
                <Link href={"/profile"}>داشبورد</Link>
            </li>
            <li>
                <Link href={"/profile/me"}>اطلاعات کاربری</Link>
            </li>
            <li>
                <Link href={"/profile/payments"}>سابقه سفارش</Link>
            </li>
            <li>
                <button onClick={logouteHandler}>خروج از حساب کاربری</button>
            </li>
        </ul>
    </div>
  )
}
