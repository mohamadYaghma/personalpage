"use client"
import { useGetUser } from '@/hooks/useAuth';
import { toPersianNumbers } from '@/utils/toPersianNumber';
import Link from 'next/link'

export default function Header() {
   const {data , error , isLoading} = useGetUser()

    const {user , cart} = data || {} ;

  return (
    <header className={`shadow-md mb-10 sticky top-0   transition-all duration-200 ${ isLoading?"blur-sm opacity-70" : "opacity-100 blur-0"}`}>
        <nav>
            <ul className='flex items-center justify-between py-2 container xl:max-w-screen-xl'>
                <li>
                    <Link className='block py-2' href={"/"}> 
                        خانه
                    </Link>
                </li>
                <li>
                    <Link className='block py-2' href={"/products"}> 
                        محصولات
                    </Link>
                </li>
                <li>
                    <Link className='block py-2' href={"/profile"}> 
                        پنل کاربر
                    </Link>
                </li>
                <li>
                    <Link className='block py-2' href={"/admin"}> 
                        پنل ادمین
                    </Link>
                </li>
                <li>
                    <Link className='block py-2' href={"/cart"}> 
                        سبدخرید - ({cart ? toPersianNumbers(cart.payDetail.productIds.length) : 0})
                    </Link>
                </li>
            {
                data?(
                    <span>{user.name}</span>
                ):(
                    <li>
                    <Link className='block py-2' href={"/auth"}> 
                        ورود
                    </Link>
                </li>
                )
            }
            </ul>
        </nav>
    </header>
  )
}
