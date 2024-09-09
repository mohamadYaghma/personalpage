"use client"

import Loading from "@/common/Loading";
import { useGetProductById } from "@/hooks/useProducts";
import { useParams } from "next/navigation"

export default function ProductPage() {
    
    const { id } = useParams();    
    const { isLoading, data } = useGetProductById(id);
    const { product } = data || {};

    if (isLoading) return <Loading />

    return (
        <div className="p-4">
            <h1 className="font-bold text-xl mb-4 text-center sm:text-left">{product.title}</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* اطلاعات محصول */}
                <div className="col-span-1 p-4 border rounded-lg shadow-sm">
                    <h2 className="font-semibold mb-2">توضیحات:</h2>
                    <p>{product.description}</p>
                </div>
                {/* اطلاعات مالی محصول */}
                <div className="col-span-1 p-4 border rounded-lg shadow-sm">
                    <h2 className="font-semibold mb-2 text-center sm:text-left">اطلاعات مالی محصول</h2>
                    <div className='mb-4 flex justify-between'>
                        <span>قیمت محصول:</span>
                        <span>{product.price} تومان</span>
                    </div>
                    <div className='mb-4 flex justify-between'>
                        <span>قیمت با تخفیف:</span>
                        <span>{product.offPrice} تومان</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
