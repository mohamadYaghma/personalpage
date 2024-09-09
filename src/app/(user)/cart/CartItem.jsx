"use client"
import { HiMinus, HiOutlineTrash, HiPlus } from "react-icons/hi";
import './TableStyle.css'; // اضافه کردن فایل استایل سفارشی
import { useAddTocart, useDecrementFromCart } from '@/hooks/useCart';
import toast from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';
import { toPersianNumbers, toPersianNumbersWithComma } from '@/utils/toPersianNumber';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function CartItem({ cartItemm }) {
    const { isLoading, mutateAsync } = useAddTocart();
    const { mutateAsync: mutateDecrement } = useDecrementFromCart();
    const queryClient = useQueryClient();
    const [isRemoving, setIsRemoving] = useState(false);

    const addToCartHandler = async () => {
        try {
            const { message } = await mutateAsync(cartItemm._id);
            toast.success(message);
            queryClient.invalidateQueries({ queryKey: ["get-user"] });
        } catch (error) {
            if (error?.response?.data) {
                toast.error(error.response.data.message);
            }
        }
    }

    const decrementHandler = async () => {
        if (cartItemm.quantity === 1) {
            setIsRemoving(true);
            setTimeout(async () => {
                try {
                    const { message } = await mutateDecrement(cartItemm._id);
                    toast.success(message);
                    queryClient.invalidateQueries({ queryKey: ["get-user"] });
                } catch (error) {
                    if (error?.response?.data) {
                        toast.error(error.response.data.message);
                    }
                }
            }, 500); // مدت زمان انیمیشن (500 میلی‌ثانیه)
        } else {
            try {
                const { message } = await mutateDecrement(cartItemm._id);
                toast.success(message);
                queryClient.invalidateQueries({ queryKey: ["get-user"] });
            } catch (error) {
                if (error?.response?.data) {
                    toast.error(error.response.data.message);
                }
            }
        }
    }

    return (
        <motion.div 
            className="flex flex-col md:flex-row items-center justify-between p-4 border rounded-lg shadow-lg bg-white mb-6 space-y-4 md:space-y-0"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -100 }} // افکت حذف
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.02 }}
        >
            <div className="flex flex-col md:flex-row items-start md:items-center space-y-2 md:space-y-0 md:space-x-6 w-full">
                <div className="flex flex-col w-full">
                    <span className="font-semibold text-lg text-gray-800">{cartItemm.title}</span>
                    <span className="text-md text-gray-600 mt-1">
                        تعداد:{" "}
                        <span className="font-bold text-xl text-gray-900">
                            {toPersianNumbers(cartItemm.quantity)}
                        </span>
                    </span>
                </div>

                <div className="flex flex-col items-start md:items-end w-full">
                    <span className="text-md text-gray-600">
                        قیمت:{" "}
                        <span className={`${cartItemm.discount ? "line-through text-gray-500" : "font-bold text-lg"}`}>
                            {toPersianNumbersWithComma(cartItemm.price)} تومان
                        </span>
                    </span>
                    {!!cartItemm.discount && (
                        <div className="flex items-center gap-x-2 mt-2">
                            <p className="font-bold text-green-600 text-lg">
                                {toPersianNumbersWithComma(cartItemm.offPrice)} تومان
                            </p>
                            <div className="bg-rose-500 px-2 py-0.5 rounded-lg text-white text-sm">
                                {cartItemm.discount}%
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="flex items-center justify-center mt-4 md:mt-0 space-x-4 w-full md:w-auto gap-x-4">
                <motion.button 
                    onClick={addToCartHandler} 
                    className="rounded-full p-3 bg-blue-600 text-white hover:bg-blue-700 transition duration-300"
                    whileTap={{ scale: 0.9 }}
                >
                    <HiPlus className="w-5 h-5"/>
                </motion.button>
                <motion.button 
                    onClick={decrementHandler} 
                    className="rounded-full p-3 bg-gray-200 hover:bg-gray-300 transition duration-300"
                    whileTap={{ scale: 0.9 }}
                >
                    {cartItemm.quantity > 1 ? (
                        <HiMinus className="w-5 h-5"/>
                    ) : (
                        <HiOutlineTrash className="text-rose-500 w-5 h-5"/>
                    )}
                </motion.button>
            </div>
        </motion.div>
    )
}
