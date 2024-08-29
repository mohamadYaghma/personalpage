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
    <div className="mx-10">
        <div className="flex justify-between items-center">

          <h1 className="text-xl font-bold mb-5">دسته بندی ها</h1>

          <Link href={`/admin/categories/add`} className="flex flex-row-reverse gap-x-2">
            <span>اضافه کردن دسته بندی جدید</span>
            <span> <HiPlusCircle className="h-6 w-6 text-primary-900"/> </span>
          </Link>

        </div>
        <CategoriesListTable categories={categories} />
    </div>
  )
}
