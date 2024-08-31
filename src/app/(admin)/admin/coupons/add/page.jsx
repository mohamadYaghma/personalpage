"use client"


import { useAddCoupon } from '@/hooks/useCoupons'
import { useGetProducts } from '@/hooks/useProducts';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import CouponForm from '@/constants/CouponForm';


export default function CouponeAddPage() {

  const {data} = useGetProducts();
  const {products} = data || {} ;

  const [formData , setFormData] = useState({
    code:"" ,
    amount : "" ,
    usageLimit : "",
  });
 
  const [type , setType] = useState("percent");
  const [productIds , setProductIds] = useState([]);
  const [expireDate , setExpireDate] = useState(new Date());
  const {isLoading , mutateAsync} =  useAddCoupon();
  const router = useRouter();
  
  const handleChange = e =>{
    setFormData({...formData , [e.target.name]: e.target.value})
  }

  const handleSubmit =async (e) =>{
    e.preventDefault();
    try {
      
      const {message} = await mutateAsync({
        ...formData , 
        type,
        expireDate: new Date(expireDate).toISOString(),
        productIds: productIds.map( (p) => p._id) ,
      });
      toast.success(message);
      router.push("/admin/coupons");

    } catch (error) {
      toast.error(error?.response?.data?.message)

    }
  }
  return (
    
    <div className='mb-10'>
        <h1 className='mb-4 font-bold text-xl'>اضافه کردن کپن تخفیف</h1>
        <CouponForm 
        expireDate= {expireDate}
        setExpireDate= {setExpireDate}
        type= {type}
        setType= {setType}
        formData = {formData} 
        isLoading = {isLoading}
        selectOnChange={setProductIds}
        onFormChange= {handleChange}
        onSubmit= {handleSubmit}
        options= {products}
        />
    </div>
  )
}
