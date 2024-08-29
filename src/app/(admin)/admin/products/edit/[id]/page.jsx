"use client"

import Loading from "@/common/Loading";
import ProductForm from "@/constants/ProductForm";
import { useGetCategories } from "@/hooks/useCategories";
import { useGetProductById, useUpdateProduct } from "@/hooks/useProducts"
import includeObject from "@/utils/objectUtils";
import { useParams } from "next/navigation"
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const includesProductKey = [
  "title" ,
  "description" ,
  "slug" , 
  "brand" , 
  "price" , 
  "offPrice" ,
  "discount" ,
  "countInStock" ,
  "imageLink",
]

export default function EditProductPage() {

    const {id} = useParams()
    const {isLoading:isLoadingProduct , data:productData} = useGetProductById(id);
    const {product} = productData || {};

    const {data : categoryData} = useGetCategories();
    const {categories} = categoryData || {};
    const [formData , setFormData] = useState({});
    const router = useRouter();
    const [tags , setTags] = useState([]);
    const [selectedCategory , setSelectedCategory] = useState("");

    const { isLoading:isLoadingUpdate , mutateAsync:muUpdate} =  useUpdateProduct();

  const handelChange = (e) =>{
    setFormData({...formData ,[e.target.name] : e.target.value })
  }

  const handelSubmit = async (e) =>{
      e.preventDefault();
      try{
          const {message} = await muUpdate({productId:product._id,
            data:{
            ...formData , 
            tags , 
            category : selectedCategory._id
          },
          }) ;
          toast.success(message);
          router.push("/admin/products")
          
      }catch (error){
          toast.error(error?.response?.data?.message)
      }
  }

  useEffect(()=>{
    if(product) {
      setTags(product.tags);
      setSelectedCategory(product.category);
      setFormData(includeObject(product , includesProductKey)) ;
    }
    },[productData])

    if(isLoadingProduct) return <Loading />
    return (
    <div>
        <h1 className="font-bold mb-4">
          ویرایش اطلاعات محصول
        </h1>
        <ProductForm 
            onSubmit={handelSubmit}
            categories={categories}
            setSelectedCategory={setSelectedCategory}
            tags={tags}
            setTags={setTags}
            isLoading={isLoadingUpdate}
            productData={formData}
            productDataOnChange={handelChange}
            selectedCategory={product.category}
        />
    </div>
  )
}
