import Link from 'next/link'
import React from 'react'

export default function SideBar() {
  return (
    <div> 
        <ul className='flex flex-col space-y-8 '>
            <li>
                <Link href={"/"}>صفحه اصلی</Link>
            </li>
            <li>
            <Link href={"/profile/me"}>اطلاعات کاربری</Link>
            </li>
            <li>
                <Link href={"/"}>محصولات خریداری شده</Link>
            </li>
            <li>
                <Link href={"/"}>سفارش ها</Link>
            </li>
            <li>
                <Link href={"/"}>خروج</Link>
            </li>
        </ul>
    </div>
  )
}
