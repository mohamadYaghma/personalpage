import Loading from '@/common/Loading';
import createPaymnet from '@/services/PaymentServices';
import { toPersianNumbers, toPersianNumbersWithComma } from '@/utils/toPersianNumber';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import React from 'react'
import toast from 'react-hot-toast';

export default function CartSummary({payDetail}) {
    const queryClient= useQueryClient();
    const {totalOffAmount , totalPrice , totalGrossPrice} = payDetail;

    // اطلاعات پرداخت
    const {isLoading , mutateAsync} = useMutation({mutationFn:createPaymnet});

    const createPaymentHandler = async () =>{
        try {
            const {message} = await mutateAsync();
            toast.success(message);
            queryClient.invalidateQueries({queryKey:["get-user"]});

        } catch (error) {
            if(error?.response?.data){
                toast.error(error.response.data.message);
            }
        }   
    }
    // end payment
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
        <div>
            {
                isLoading ? (
                    <Loading />
                ) : (
                <button 
                    onClick={createPaymentHandler}
                    className='btn btn--primary w-full'>ثبت سفارش و پرداخت
                </button>
                )
            }
        </div>
    </div>
  )
}
