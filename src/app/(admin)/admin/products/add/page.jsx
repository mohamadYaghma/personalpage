"use client"
import { useGetCategories } from '@/hooks/useCategories';
import { useState } from 'react'
import { useAddProduct } from '@/hooks/useProducts';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import ProductForm from '@/constants/ProductForm';

export default function addProductPage() {

    
    const { isLoading , mutateAsync} = useAddProduct();
    
    
    const {data} = useGetCategories();
    const {categories} = data || {};
    
    const [formData , setFormData] = useState({
        title:"",
        description:"",
        slug:"",
        brand:"",
        price:"",
        discount:"",
        offPrice:"",
        countInStock:"",
        imageLink:"",
    });
    const router = useRouter();
    const [tags , setTags] = useState([]);
    const [selectedCategory , setSelectedCategory] = useState("");

    const handelChange = (e) =>{
        setFormData({...formData ,[e.target.name] : e.target.value })
    }

    const handelSubmit = async (e) =>{
        e.preventDefault();
        try{
            const {message} = await mutateAsync({...formData , 
                                                 tags , 
                                                 category : selectedCategory._id
                                                }) ;
            toast.success(message);
            router.push("/admin/products")
            
        }catch (error){
            toast.error(error?.response?.data?.message)
        }
    }
  return (
    <div className='mb-10'>
        <h1 className='mb-4 font-bold text-xl'>اضافه کردن محصول</h1>
        <ProductForm 
            onSubmit={handelSubmit}
            categories={categories}
            setSelectedCategory={setSelectedCategory}
            tags={tags}
            setTags={setTags}
            isLoading={isLoading}
            productData={formData}
            productDataOnChange={handelChange}
        />
    </div>
  )
}
