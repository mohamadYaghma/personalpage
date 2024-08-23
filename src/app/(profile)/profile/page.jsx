"use client"
import Loading from '@/common/Loading';
import { useGetUser } from '@/hooks/useAuth'
import toLocaleDate from '@/utils/toLocaleDate';
import React from 'react'

export default function Profile() {

  const {data , isLoading} = useGetUser();

  if (isLoading) return <Loading/> ;

  const {user} = data || {};

  return (

    <div className='p-8'>      
      <h1 className='mb-5'>سلام <sapn className="font-bold">{user.name}</sapn> خوش آمدی ! </h1>

      <p>
        <span> تاریخ پیوستن : </span>
        <span> {toLocaleDate(user.createdAt)} </span>
      </p>
      
    </div>
  )
}
