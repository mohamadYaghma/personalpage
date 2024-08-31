"use client"
import CheckBox from '@/common/CheckBox';
import RadioInput from '@/common/radioInput';
import TextFild from '@/common/TextFild';
import { useAddCoupon } from '@/hooks/useCoupons'
import React, { useState } from 'react'

export default function CouponeAddPage() {

  const {isLoading , mutateAsync} =  useAddCoupon();

  const [formData , setFormData] = useState({
    code:"" ,
    amount : "" ,
    description : 0, 
    usageLimit : "",
  });

  const [type , setType] = useState("percent")

  const handChange = e =>{
    setFormData({...formData , [e.target.name]: e.target.value})
  }
  return (
    
    <div className='mb-10'>
        <h1 className='mb-4 font-bold text-xl'>اضافه کردن کپن تخفیف</h1>
        <div className='max-w-sm'>
          <form className='space-y-4'>
            <TextFild 
              label="کد" 
              name="code" 
              value={formData.code} 
              onChange={handChange}
            />
            <TextFild 
              label="مقدار" 
              name="amount" 
              value={formData.code} 
              onChange={handChange}
            />
            <TextFild 
              label="ظرفیت کد تخفیف" 
              name="usageLimit" 
              value={formData.code} 
              onChange={handChange}
            />

            <div className='space-y-5'>
              <span>نوع کد تخفیف</span>
              <div className='flex items-center justify-between'>  
                <RadioInput 
                  checked={type === "percent"} 
                  id="percentType" 
                  name="type" 
                  label="درصد"
                   value="percent" 
                   onChange={(e)=> setType(e.target.value)} 
                />
                <RadioInput 
                  checked={type === "fiexdProduct"} 
                  id="fiexdProduct-type" 
                  name="type" 
                  label="قیمت ثابت"
                   value="fiexdProduct" 
                   onChange={(e)=> setType(e.target.value)} 
                />
            </div>
            </div>
          </form>
        </div>
    </div>
  )
}
