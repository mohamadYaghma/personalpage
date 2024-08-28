"use client"
import { logote } from '@/services/autchServices'
import Link from 'next/link'
import React from 'react'

export default function AdminSideBar() {

    const logouteHandler = async () =>{
        await logote();
        document.location.href = "/";
    }

  return (
    <div> 
        <ul className='flex flex-col space-y-8 '>
            <li>
                <Link href={"/"}>صفحه اصلی</Link>
            </li>
            <li>
                <Link href={"/admin"}>داشبورد</Link>
            </li>
            <li>
                <Link href={"/admin/users"}>کاربران</Link>
            </li>
            <li>
                <Link href={"/admin/products"}>محصولات</Link>
            </li>
            <li>
                <Link href={"/admin/categories"}>دسته بندی</Link>
            </li>
            <li>
                <Link href={"/admin/coupons"}>کد تخفیف</Link>
            </li>
            <li>
                <Link href={"/admin/payments"}>سفارشات</Link>
            </li>
            <li>
                <button onClick={logouteHandler}>خروج از حساب کاربری</button>
            </li>
        </ul>
    </div>
  )
}
