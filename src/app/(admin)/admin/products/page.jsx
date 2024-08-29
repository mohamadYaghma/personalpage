"use client"

import Loading from "@/common/Loading";
import { useGetProducts } from "@/hooks/useProducts"
import ProductListTable from "./ProductListTable";
import Link from "next/link";
import { HiPlusCircle } from "react-icons/hi";

export default function Products() {
    const {data , isLoading} = useGetProducts();
    const {products} = data || {};
    
    if(isLoading) return <Loading />
  return (
    <div className="mx-10">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold mb-5">محصولات</h1>
          <Link href={`/admin/products/add`} className="flex flex-row-reverse gap-x-2">
            <span>اضافه کردن محصول جدید</span>
            <span> <HiPlusCircle className="h-6 w-6 text-primary-900"/> </span>
          </Link>
        </div>
        <ProductListTable products={products}/>
    </div>
  )
}
