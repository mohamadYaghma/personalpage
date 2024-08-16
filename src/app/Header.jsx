import Link from 'next/link'
import React from 'react'

export default function Header() {
  return (
    <header className='shadow-md mb-10'>
        <nav>
            <ul className='flex items-center justify-between py-2 container xl:max-w-screen-xl'>
                <li>
                    <Link className='block py-2' href={"/"}> 
                        خانه
                    </Link>
                </li>
                <li>
                    <Link className='block py-2' href={"/producs"}> 
                        محصولات
                    </Link>
                </li>
                <li>
                    <Link className='block py-2' href={"/auth"}> 
                        ورود
                    </Link>
                </li>
            </ul>
        </nav>
    </header>
  )
}
