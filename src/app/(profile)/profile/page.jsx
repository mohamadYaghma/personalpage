"use client"
import Loading from '@/common/Loading';
import { useGetUser } from '@/hooks/useAuth'
import toLocaleDate from '@/utils/toLocaleDate';
import React from 'react'
import PaymentTable from './payments/PaymentTable';
import Link from 'next/link';

export default function Profile() {

  const {data , isLoading} = useGetUser();

  if (isLoading) return <Loading/> ;

  const {user , payments} = data || {};

  return (

    <div className='p-8'>      
      <h1 className='mb-5'>سلام <sapn className="font-bold">{user.name}</sapn> خوش آمدی ! </h1>

      <p>
        <span> تاریخ پیوستن : </span>
        <span> {toLocaleDate(user.createdAt)} </span>
      </p>
      <div className='border rounded-xl p-4 mt-8'>
        <div className='flex items-center justify-between'>
        <h2>آخرین سفارشات</h2>
        <Link href={"/profile/payments"} className='btn btn--primary h-12 w-auto'> مشاهده همه سفارشات </Link>
        </div>
          <PaymentTable payments={
            payments
            .sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt))
            .slice(0,3) 
            }/>
      </div>
      
    </div>
  )
}
