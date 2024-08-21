"use client";
import Loading from '@/common/Loading';
import TextFild from '@/common/TextFild';
import { useGetUser } from '@/hooks/useAuth';
import { updateProfile } from '@/services/autchServices';
import includeObject from '@/utils/objectUtils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

export default function MePage() {

    const {data , isLoading} = useGetUser();
    const [formData , setFormData] = useState({});

    const queryClient = useQueryClient()

    const {mutateAsync , isLoading:isUpdateing} = useMutation({mutationFn:updateProfile})
    //for loading
    const {user} = data || {};
    
    const includeskey = ["name", "email", "phoneNumber", "biography"];
    useEffect(()=>{
      if(user) return setFormData(includeObject(user , includeskey))
    },[user])
    
    
    
    const submitHandler =async (e) => {
      e.preventDefault();
      try {
        const {message} = await mutateAsync(formData);
        queryClient.invalidateQueries({queryKey:["get-user"]})
        toast.success(message);
      } catch (error) {
        toast.error(error?.response?.data?.message);
      }
    }

    if (isLoading) return <Loading/> ;
  return (
    <div className='max-w-sm'>
        <h1 className='text-xl font-bold mb-4'>اطلاعات کاربر</h1>
        <form onSubmit={submitHandler} className='space-y-5'>
            {
              Object.keys(includeObject(user , includeskey)).map((key)=>{
                return(
                  <TextFild 
                    label={key} 
                    name={key} 
                    key={key} 
                    value={formData[key] ||""}
                    onChange={ (e) => 
                      setFormData({ ...formData, [e.target.name]: e.target.value }) }

                  />
                )
              })
            }

          <div>
              {(
                  isUpdateing ? (<Loading />): (
                  <button type="submit" className="btn btn--primary w-full">
                    تایید و ارسال
                  </button>
              ))}
          </div>

        </form>
    </div>
  )
}
