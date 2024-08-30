"use client"

import CategoryForm from "@/constants/CategoryForm";
import { useAddCategory } from "@/hooks/useCategories"
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";


export default function CategoryAddPage() {

const {isLoading ,mutateAsync} = useAddCategory();
const router = useRouter();

const [formData , setFormData] = useState({
  title:"" ,
  englishTitle : "" ,
  description : "", 
});

const [selectedType , setSelectedType] = useState("");

const handelChange = (e) =>{
  setFormData({...formData ,[e.target.name] : e.target.value })
}

const handelSubmit = async (e) =>{
  e.preventDefault();
  try{
      const {message} = await mutateAsync({...formData , type:selectedType.value}) ;
      toast.success(message);
      router.push("/admin/categories")
      
  }catch (error){
      toast.error(error?.response?.data?.message)
  }
}

  return (
    <div className='mb-10'>
        <h1 className='mb-4 font-bold text-xl'>اضافه کردن دسته بندی</h1>
        <CategoryForm 
            onSubmit={handelSubmit}
            isLoading={isLoading}
            categoryData={formData}
            categoryDataOnChange={handelChange}
            selectedType={selectedType}
            setSelectedType={setSelectedType}
        />
    </div>
  )
}
