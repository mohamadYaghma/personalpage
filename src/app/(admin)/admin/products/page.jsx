"use client"

import Loading from "@/common/Loading";
import { useGetProducts } from "@/hooks/useProducts";
import ProductListTable from "./ProductListTable";
import Link from "next/link";
import { HiPlusCircle } from "react-icons/hi";

export default function Products() {
    const { data, isLoading } = useGetProducts();
    const { products } = data || {};

    if (isLoading) return <Loading />;
    return (
        <div className="px-4 sm:px-6 lg:px-10 py-5 ">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-5">
                <h1 className="text-lg sm:text-xl font-bold mb-4 sm:mb-0">محصولات</h1>
                <Link href={`/admin/products/add`} className="flex items-center justify-center sm:justify-end gap-x-2 text-sm sm:text-base">
                    <span>اضافه کردن محصول جدید</span>
                    <HiPlusCircle className="h-5 w-5 sm:h-6 sm:w-6 text-primary-900" />
                </Link>
            </div>
            <ProductListTable products={products} />
        </div>
    );
}
