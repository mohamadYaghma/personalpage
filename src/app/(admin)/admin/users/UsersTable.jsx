import { usersListTableHeads } from '@/constants/tableHeads'
import { toLocalDateStringShort } from '@/utils/toLocaleDate'
import Link from 'next/link'
import React from 'react'
import {  HiCheckCircle } from 'react-icons/hi'

export default function UsersTable({users}) {
  return (
    <div className='overflow-auto shadow-sm my-8'>
        <table className='border-collapse table-auto w-full text-sm min-w-[800px]'>
            <thead>
                <tr>
                   {
                    usersListTableHeads.map((item)=>{
                        return(
                            <th className='whitespace-nowrap table__th' key={item.id}>
                                {item.label}
                            </th>
                        )
                    })
                   }
                </tr>
            </thead>
            <tbody>
                {
                    users.map((user  , index)=>{
                        return(
                            <tr key={user._id}>
                                <td className='table__td'>
                                    {index}
                                </td>

                                <td className='table__td'>
                                    {user.name}
                                </td>
                                <td className='table__td'>
                                    {user.email}
                                </td>
                                <td className='table__td '>
                                    <div className='flex whitespace-nowrap gap-x-2'>
                                        {user.phoneNumber}{" "}
                                        {user.isVerifiedPhoneNumber && (
                                            <HiCheckCircle className='h-6 w-6 text-green-600'/>)
                                        }    
                                    </div>           
                                </td>
                                <td className='table__td'>
                                    <div className='flex flex-col gap-y-2 items-start'>
                                        {
                                            user.Products.map((product  ,index)=>{
                                                return(
                                                    <span 
                                                        key={index}
                                                        className='px-2 py-1 rounded-xl bg-secondary-500 text-white whitespace-nowrap'
                                                    >
                                                            {product.title}
                                                    </span>
                                                )
                                            })
                                        }
                                    </div>
                                </td>
                                <td className='table__td'>
                                    {toLocalDateStringShort(user.createdAt)}
                                </td>
                                <td className='table__td font-bold text-base'>
                                    <Link href={`/admin/users/${user._id}`}>مشاهده جزییات</Link>
                                </td>

                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    </div>
  )
}
