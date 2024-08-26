import { toPersianNumbers, toPersianNumbersWithComma } from '@/utils/toPersianNumber';
import React from 'react'

export default function CartSummary({payDetail}) {
    const {totalOffAmount , totalPrice , totalGrossPrice} = payDetail;
    return (
    <div className='border p-2 rounded-xl mt-12'>
        <p className='mb-4 font-bold'>اطلاعات پرداخت</p>
        <div className='mb-4 flex items-center justify-between'>
            <span>جمع کل : </span>
            <span>{toPersianNumbersWithComma(totalGrossPrice)}</span>
        </div>
        <div className='mb-4 flex items-center justify-between'>
            <span> تخفیف : </span>
            <span>{toPersianNumbersWithComma(totalOffAmount)}-</span>
        </div>
        <div className='mb-4 flex items-center justify-between font-bold'>
            <span> مبلغ قابل پرداخت : </span>
            <span>{toPersianNumbersWithComma(totalPrice)}</span>
        </div>
        <button className='btn btn--primary w-full'>ثبت سفارش و پرداخت</button>
    </div>
  )
}
