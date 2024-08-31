import { PaymentListTableHeads } from '@/constants/tableHeads'
import { toLocalDateStringShort } from '@/utils/toLocaleDate'
import { toPersianNumbersWithComma } from '@/utils/toPersianNumber'
import React from 'react'

export default function PayentsListTable({payments}) {
  return (
    <div className='overflow-auto shadow-sm my-8'>
        <table className='border-collapse table-auto w-full text-sm min-w-[800px]'>
            <thead>
                <tr>
                   {
                    PaymentListTableHeads.map((item)=>{
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
                    payments.map((payment  , index)=>{
                        return(
                            <tr key={payment._id}>
                                <td className='table__td'>
                                    {index + 1}
                                </td>

                                <td className='table__td font-bold whitespace-nowrap truncate'>
                                    {payment.invoiceNumber}
                                </td>
                                <td className='table__td truncate max-w-[280px] whitespace-nowrap'>
                                    {payment.description}
                                </td>
                                <td className='table__td whitespace-nowrap truncate'>
                                    <div className='flex flex-col gap-y-2'>
                                        <span>{payment.user.name}</span>
                                        <span>{payment.user.email}</span>
                                        <span className='font-bold'>{payment.user.phoneNumber}</span>
                                    </div>
                                </td>
                                <td>
                                    {
                                        payment.cart.productDetail.map((prouct)=>{
                                            return(
                                                <span  className='flex flex-col my-2 mb-2 px-2 py-1 rounded-xl bg-secondary-700 text-white whitespace-nowrap'>
                                                    {prouct.title}
                                                </span>   
                                            )
                                        })
                                    }
                                </td>
                                <td className='table__td font-bold text-lg'>
                                    {
                                        toPersianNumbersWithComma(payment.amount)
                                    }
                                </td>
                                <td className='table__td'>
                                    {
                                        toLocalDateStringShort(payment.createdAt)
                                    }
                                </td>
                                <td className='table__td'>
                                    {
                                    payment.status === "COMPLETED" ?(
                                        
                                            <span className='text-white bg-green-500 rounded-xl px-2 py-0.5'>موفق</span>
                                        ):(
                                            <span>ناموفق</span>
                                        )
                                    }

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
