"use client"
import Loading from '@/common/Loading';
import CouponForm from '@/constants/CouponForm'
import { useAddCoupon, useGetCouponById, useUpdateCoupon } from '@/hooks/useCoupons';
import { useGetProducts } from '@/hooks/useProducts';
import { updateCoupon } from '@/services/CouponServices'
import includeObject from '@/utils/objectUtils';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function UpdateCouponPage() {
    
    const {id} =  useParams();
    const {isLoading , data : couponData} = useGetCouponById(id);
    const {coupon} = couponData || {};
    // ///////////////////////////////////////////////////////////////////////////////////////////
    const {data : productsData} = useGetProducts();
    const {products} = productsData || {} ;
  
    const [formData , setFormData] = useState({});
   
    const [type , setType] = useState("");
    const [productIds , setProductIds] = useState([]);
    const [expireDate , setExpireDate] = useState(new Date());
    const {isLoading : isLoadingNewCode , mutateAsync} =  useUpdateCoupon();
    const router = useRouter();
    
    const handleChange = e =>{
      setFormData({...formData , [e.target.name]: e.target.value})
    }
  
    const handleSubmit =async (e) =>{
      e.preventDefault();
      try {
        
        const {message} = await mutateAsync({
          id:coupon._id,
          data:{
          ...formData , 
          type,
          expireDate: new Date(expireDate).toISOString(),
          productIds: productIds.map( (p) => p._id) ,
          }
        });
        toast.success(message);
        router.push("/admin/coupons");
  
      } catch (error) {
        toast.error(error?.response?.data?.message)
  
      }
    }

    // /////////////////////////////////////////////////////////////////////////////
    useEffect(()=>{
      if(coupon) {
        setType(coupon.type)
        setProductIds(coupon.productIds)
        setFormData({
          code: coupon.code ,
          amount: coupon.amount,
          usageLimit: coupon.usageLimit,
        }) ;
        setExpireDate( new Date(coupon.expireDate))
      }
      },[couponData])

    if(isLoading) return <Loading />
    
    return (
    <div>
      <h1 className='text-secondary-700 font-bold text-lg mb-4'>ویرایشکد تخفیف :</h1>

      <CouponForm 
        expireDate= {expireDate}
        setExpireDate= {setExpireDate}
        type= {type}
        setType= {setType}
        formData = {formData} 
        isLoading = {isLoadingNewCode}
        selectOnChange={setProductIds}
        onFormChange= {handleChange}
        onSubmit= {handleSubmit}
        options= {products}
        defaultValue={coupon.productIds}
        />
      
    </div>
  )
}
