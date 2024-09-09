"use client"

import Loading from "@/common/Loading";
import { useGetCategories } from "@/hooks/useCategories";
import Link from "next/link";
import { HiPlusCircle } from "react-icons/hi";
import CategoriesListTable from "./CategoriesListTable";

export default function CategoryAdminPanel() {

  const {data , isLoading} = useGetCategories();
  const {categories} = data || {};

  if(isLoading) return <Loading />
  
  return (
    <div className="mx-4 md:mx-10 my-5">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <h1 className="text-lg md:text-xl font-bold">دسته بندی ها</h1>

          <Link href={`/admin/categories/add`} className="flex items-center gap-x-2 text-primary-900">
            <span>اضافه کردن دسته بندی جدید</span>
            <HiPlusCircle className="h-6 w-6"/>
          </Link>
        </div>
        
        <div className="mt-5">
          <CategoriesListTable categories={categories} />
        </div>
    </div>
  )
}
