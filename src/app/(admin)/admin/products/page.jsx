"use client";

import { useState, useEffect } from "react";
import Loading from "@/common/Loading";
import { useGetProducts, useSearchProducts } from "@/hooks/useProducts";
import ProductListTable from "./ProductListTable";
import Link from "next/link";
import { HiPlusCircle } from "react-icons/hi";

export default function Products() {
  const {
    data: productData,
    isLoading: productLoading,
    isError: productError,
  } = useGetProducts();
  const [searchQuery, setSearchQuery] = useState(""); // مقدار جستجو ورودی کاربر
  const [query, setQuery] = useState(""); // مقدار نهایی که باید جستجو شود
  const [isSearchActive, setIsSearchActive] = useState(false); // وضعیت جستجوی فعال

  const {
    data: searchData,
    isLoading: searchLoading,
    isError: searchError,
  } = useSearchProducts(query);

  // وقتی کاربر دکمه جستجو را کلیک کرد، `query` به مقدار ورودی کاربر تنظیم می‌شود
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setQuery(searchQuery.trim());
      setIsSearchActive(true); // جستجو فعال می‌شود
    } else {
      setQuery("");
      setIsSearchActive(false); // اگر ورودی خالی باشد، جستجو غیرفعال می‌شود
    }
  };

  // ترکیب وضعیت لودینگ برای جستجو و لیست محصولات
  const isLoading = productLoading || (isSearchActive && searchLoading);

  useEffect(() => {
    // اگر جستجو خالی بود، جستجو را غیرفعال کنیم و به محصولات پیش‌فرض برگردیم
    if (!query) {
      setIsSearchActive(false);
    }
  }, [query]);

  if (isLoading) return <Loading />;

  if (productError || searchError) {
    console.error("Product Error: ", productError);
    console.error("Search Error: ", searchError);
    return <div>خطایی در بارگذاری داده‌ها رخ داده است</div>;
  }

  const products = productData || [];
  const searchResults = searchData || [];
  const displayedProducts = isSearchActive ? searchResults : products;

  return (
    <div className="px-4 sm:px-6 lg:px-10 py-5">
      <h1 className="text-lg sm:text-xl font-bold mb-4 sm:mb-0">محصولات</h1>
      <div className="flex flex-col sm:flex-row justify-between items-center my-5">
        <form
          onSubmit={handleSearch}
          className="flex items-center max-w-lg shadow-lg rounded-lg overflow-hidden border"
        >
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="جستجوی محصولات..."
            className="flex-1 border-none px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 transition duration-300 ease-in-out hover:bg-blue-500"
          >
            جستجو
          </button>
        </form>

        <Link
          href={`/admin/products/add`}
          className="flex items-center justify-center sm:justify-end gap-x-2 text-sm sm:text-base"
        >
          <span>اضافه کردن محصول جدید</span>
          <HiPlusCircle className="h-5 w-5 sm:h-6 sm:w-6 text-primary-900" />
        </Link>
      </div>

      {displayedProducts.length === 0 ? (
        <div>محصولی پیدا نشد</div>
      ) : (
        <ProductListTable products={displayedProducts} />
      )}
    </div>
  );
}
