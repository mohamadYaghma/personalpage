import Loading from '@/common/Loading';
import createPayment from '@/services/PaymentServices';
import { toPersianNumbersWithComma } from '@/utils/toPersianNumber';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import toast from 'react-hot-toast';

export default function CartSummary({ payDetail }) {
    const queryClient = useQueryClient();
    const { totalOffAmount, totalPrice, totalGrossPrice } = payDetail;

    // اطلاعات پرداخت
    const { isLoading, mutateAsync } = useMutation({ mutationFn: createPayment });

    const createPaymentHandler = async () => {
        try {
            const { message } = await mutateAsync();
            toast.success(message);
            queryClient.invalidateQueries({ queryKey: ["get-user"] });
        } catch (error) {
            if (error?.response?.data) {
                toast.error(error.response.data.message);
            }
        }
    }
    // پایان اطلاعات پرداخت

    return (
        <div className='border p-4 rounded-xl bg-gray-50 shadow-lg'>
            <p className='mb-6 font-semibold text-lg text-gray-800'>اطلاعات پرداخت</p>
            <div className='mb-4 flex items-center justify-between text-gray-700'>
                <span>جمع کل :</span>
                <span>{toPersianNumbersWithComma(totalGrossPrice)} تومان</span>
            </div>
            <div className='mb-4 flex items-center justify-between text-gray-700'>
                <span>تخفیف :</span>
                <span className='text-red-600'>{toPersianNumbersWithComma(totalOffAmount)}- تومان</span>
            </div>
            <div className='mb-6 flex items-center justify-between font-bold text-gray-800'>
                <span>مبلغ قابل پرداخت :</span>
                <span>{toPersianNumbersWithComma(totalPrice)} تومان</span>
            </div>
            <div>
                {
                    isLoading ? (
                        <Loading />
                    ) : (
                        <button
                            onClick={createPaymentHandler}
                            className='w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300'>
                            ثبت سفارش و پرداخت
                        </button>
                    )
                }
            </div>
        </div>
    )
}
