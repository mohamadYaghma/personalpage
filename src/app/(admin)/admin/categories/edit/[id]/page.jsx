"use client"

import Loading from '@/common/Loading';
import CategoryForm from '@/constants/CategoryForm';
import { useGetCategoryById, useUpdateCategory } from '@/hooks/useCategories';
import includeObject from '@/utils/objectUtils';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';


const includesCategoryKey = [
  "title" ,
  "englishTitle" ,
  "description" , 
  "type" , 
]

export default function CategoryEditPage() {

  const {id} = useParams()
  const {isLoading , data : categoryData} = useGetCategoryById(id);
  const {category} = categoryData || {};

  const [formData , setFormData] = useState({});
  const {isLoading:isLoadingUpdate , mutateAsync} = useUpdateCategory();

  const router = useRouter();

  const [selectedType , setSelectedType] = useState("");


  const handelChange = (e) =>{
    setFormData({...formData ,[e.target.name] : e.target.value })
  }

  const handelSubmit = async (e) =>{
    e.preventDefault();
    try {
      const {message} = await mutateAsync({categoryId:category._id,
        data:{
        ...formData 
        , type:selectedType.value
        }
      })
      toast.success(message);
      router.push('/admin/categories')
    } catch (error) {
      toast.error(error?.response?.data?.message)
    }
  }

  useEffect(()=>{
    if(category) {
      setFormData(includeObject(category , includesCategoryKey)) ;
    }
    },[categoryData])

  if(isLoading) return <Loading />
  return (
    <div>
      <h1 className='text-secondary-700 font-bold text-lg mb-4'
      >ویرایش دسته بندی  : {category.title}
      </h1>
      <CategoryForm 
        onSubmit={handelSubmit}
        categoryDataOnChange={handelChange}
        isLoading={isLoadingUpdate}
        categoryData={formData}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
      />
      
    </div>
  )
}
