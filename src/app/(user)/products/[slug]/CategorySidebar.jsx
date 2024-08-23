"use client"
import CheckBox from '@/common/CheckBox'
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react'

export default function CategorySidebar({categories}) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [selectedCategories , setSelectedCategories] = useState(
        searchParams.get("category")?.split(",") || []
        // searchParams.getAll("categories")[0].split(",") 
    );

    const categoryHandler=(e)=>{
        const value = e.target.value ;
        if(selectedCategories.includes(value)){
            const categories = selectedCategories.filter((c)=> c !== value);
            setSelectedCategories(categories); 

            const params = new URLSearchParams(searchParams.toString())
            params.set("category", categories)
            router.push(pathname + "?" + params.toString());

        }else{
            setSelectedCategories([...selectedCategories , value]);
            
            const params = new URLSearchParams(searchParams.toString())
            params.set("category", [...selectedCategories , value])
            router.push(pathname + "?" + params.toString());
        }
    }

  return (
    <div className="col-span-1">
        <p className="font-bold mb-4">دسته بندی محصولات</p>
        <ul className='space-y-4'>
            {categories.map((category)=>{
                return (
                    <CheckBox 
                        key={category._id} 
                        id={category._id} 
                        value={category.englishTitle} 
                        name="product-category"
                        label={category.title}
                        onChange={categoryHandler}
                        checked={selectedCategories.includes(category.englishTitle)}
                        />
                )
            })}
        </ul>
    </div>
  )
}
