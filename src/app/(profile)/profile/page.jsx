"use client"
import Loading from '@/common/Loading';
import { useGetUser } from '@/hooks/useAuth'
import toLocaleDate from '@/utils/toLocaleDate';
import React, { use } from 'react'
import PaymentTable from './payments/PaymentTable';
import Link from 'next/link';

export default function Profile() {

  const {data , isLoading} = useGetUser();

  if (isLoading) return <Loading/> ;

  const {user , payments} = data || {};

  return (
    <div className='p-4 md:p-8 max-w-4xl mx-auto'>
      <h1 className='mb-4 text-xl md:text-2xl font-semibold text-gray-800'>سلام <span className="font-bold text-primary">{user.name}</span> <span className='block text-center md:inline-block'>خوش آمدی!</span></h1>

      <p className='text-sm md:text-base text-gray-600 mb-6'>
        <span className='font-medium'>تاریخ پیوستن:</span>
        <span className='ml-2'>{toLocaleDate(user.createdAt)}</span>
      </p>

      <div className='border rounded-lg p-4 md:p-6 mt-6 bg-white shadow'>
        <div className='flex flex-col md:flex-row items-center justify-between mb-4 space-y-10  md:space-y-0'>
          {
            payments.length === 0 ? (
              <p className='text-gray-600'>شما سفارش نداشته‌اید</p>
            ) : (
              <h2 className='text-lg font-semibold text-gray-700 mb-2 md:mb-0'>آخرین سفارشات</h2>
            )
          }
          <Link href={"/profile/payments"} className='btn btn--primary h-10 md:h-12 w-full md:w-auto text-center'>
            مشاهده همه سفارشات
          </Link>
        </div>

        {
          payments.length === 0 ? (
            ""
          ) : (
            <PaymentTable payments={
              payments
              .sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt))
              .slice(0,3) 
            }/>
          )
        }
      </div>
    </div>
  )
}
