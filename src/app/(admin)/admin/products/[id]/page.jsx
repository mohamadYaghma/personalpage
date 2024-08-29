"use client"

import Loading from "@/common/Loading";
import { useGetProductById } from "@/hooks/useProducts";
import { useParams } from "next/navigation"

export default function page() {
    
    const {id} = useParams();    
    const {isLoading , data} = useGetProductById(id);
    const {product} = data || {} ;


    if (isLoading) return <Loading />

    return (
    <div>
        <h1 className="font-bold mb-4">{product.title}</h1>
        <div className="grid grid-cols-2"> 
          {/* اطلاعات محصول */}
          <div className="col-span-1">
            <span>
              توضیحات &nbsp;:  &nbsp; 
              {product.description}
              </span>
          </div>
          {/* اطلاعات مالی محصول */}
          <div className="col-span-1">
            <div className='mb-4 flex items-center justify-center'>
              <span>قیمت محصول &nbsp;: &nbsp;</span>
              <span>{product.price}</span>
            </div>
            <div className='mb-4 flex items-center justify-center'>
            <span>قیمت محصول با تخفیف &nbsp;:&nbsp; </span>
            <span>{product.offPrice}</span>
            </div>
          </div>
        </div>
    </div>
  )
}
