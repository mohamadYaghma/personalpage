"use client"
import Loading from '@/common/Loading';
import TextFild from '@/common/TextFild'
import { completeProfile } from '@/services/autchServices';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import toast from 'react-hot-toast';

export default function CompleteProfile() {
    const [name , setName] = useState(""); 
    const [email , setEmail] = useState(""); 

    const {isLoading,mutateAsync} = useMutation({mutationFn:completeProfile})

    const router =  useRouter();

    const submitHandler =async e =>{
        e.preventDefault();
    try{
      const {message} = await mutateAsync({name , email});  

      toast.success(message);

      router.push("/")

    }catch(error){

      toast.error(error?.response?.data.message)

    }
    }
  return (
    <div className='flex justify-center'>
        <div className='w-full sm:max-w-sm'>
          <form className="space-y-8" onSubmit={submitHandler}>
            <TextFild 
                name="name"
                label="نام و نام خانوادگی"
                value={name}
                onChange={(e)=>setName(e.target.value)}
            />
            <TextFild 
                name="email"
                label="ایمیل"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
            />
            <div>
            {(
            isLoading ? <Loading />: (
            <button type="submit" className="btn btn--primary w-full bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-full transition duration-300 hover:-translate-y-1 shadow-xl">
              ارسال  
            </button>
          ))}
             </div>
          </form>
        </div>
    </div>
  )
}
