"use client"
import TextFild from '@/common/TextFild'
import { AddproductListTableHeads } from '@/constants/tableHeads'
import { useGetCategories } from '@/hooks/useCategories';
import { useState } from 'react'
import { TagsInput } from "react-tag-input-component";
import Select from 'react-select';
import { useAddProduct } from '@/hooks/useProducts';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Loading from '@/common/Loading';

export default function addProductPage() {

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

    const { isLoading , mutateAsync} = useAddProduct();

    const router = useRouter();

    const {data} = useGetCategories();
    const {categories} = data || {};

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
    <div className='max-w-sm mb-10'>
        <h1 className='mb-4 font-bold text-xl'>اضافه کردن محصول</h1>
        <form className='space-y-4' onSubmit={handelSubmit}>
            {
                AddproductListTableHeads.map((item)=>{
                    return(
                        <TextFild 
                            key={item.id}
                            label={item.label}
                            name={item.name}
                            value={formData[item.name]} 
                            onChange={handelChange}
                        />
                    )
                })
            }
            <div>
                <label htmlFor='tags' className='mb-2'>تگ محصولات</label>
                <TagsInput
                id="tags"
                value={tags}
                onChange={setTags}
                name="fruits"
                // placeHolder="تگ"
            />
            </div>
            <div>
                <label htmlFor='category' className='mb-2'>دسته بندی</label>
                <Select
                    instanceId='category'
                    onChange={setSelectedCategory}
                    options={categories}
                    getOptionLabel={(option) => option.title }
                    getOptionValue={(option) => option._id }
                />
            </div>
            <div>
                {
                    isLoading ? (
                        <Loading />) : (
                        <button className='btn btn--primary w-full' type='submit'>
                            اضافه کردن محصول
                        </button>
                    )
                }   
            </div>
        </form>
    </div>
  )
}
