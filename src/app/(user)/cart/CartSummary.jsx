import React from 'react'

export default function CartSummary({payDetail}) {
    const {totalOffAmount , totalPrice , totalGrossPrice} = payDetail;
    return (
    <div className='border p-2 rounded-xl mt-12'>
        <p className='mb-4 font-bold'>اطلاعات پرداخت</p>
        <div className='mb-4 flex items-center justify-between'>
            <span>جمع کل : </span>
            <span>{totalGrossPrice}</span>
        </div>
        <div className='mb-4 flex items-center justify-between'>
            <span> تخفیف : </span>
            <span>{totalOffAmount}-</span>
        </div>
        <div className='mb-4 flex items-center justify-between font-bold'>
            <span> مبلغ قابل پرداخت : </span>
            <span>{totalPrice}</span>
        </div>
        <button className='btn btn--primary w-full'>ثبت سفارش و پرداخت</button>
    </div>
  )
}
