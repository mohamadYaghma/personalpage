import { getCategories } from "@/services/categortService";
import { getProducts } from "@/services/productService";
import CategorySidebar from "./CategorySidebar";
import queryString from "query-string";
import Link from "next/link";
import { toLocalDateStringShort } from "@/utils/toLocaleDate";
import AddToCart from "./[slug]/AddToCart";
import LikeProduct from "./LikeProduct";
import { cookies } from "next/headers";
import { toStringCookies } from "@/utils/toStringCookies,";
import Image from "next/image";
import { toPersianNumbersWithComma } from "@/utils/toPersianNumber";

export const dynamic = "force-dynamic"; // use this code for this page used ssr Like cache no-store

export default async function Products({ searchParams }) {
  const cookieStore = cookies();
  const strCookies = toStringCookies(cookieStore);

  const productPromises = getProducts(
    queryString.stringify(searchParams),
    strCookies
  );

  const categoryPromises = getCategories();

  const [{ products }, { categories }] = await Promise.all([
    productPromises,
    categoryPromises,
  ]);

  return (
    <div className="p-4">
      <h1 className="font-bold mb-6 text-xl">صفحه محصولات</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar for categories */}
        <CategorySidebar categories={categories} />

        {/* Products */}
        <div className="col-span-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => {
              return (
                <div
                  className="bg-white rounded-lg overflow-hidden shadow-lg ring-4 ring-secondary-500 ring-opacity-40"
                  key={product._id}
                >
                  <div className="relative">
                    <img  src="/images/ebrahim.jpg" alt="" className="w-full"/> 
                    <div className="absolute top-0 left-0 bg-primary-700 text-white px-2 py-1 m-2 rounded-md text-sm font-medium">
                      موجود
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between">
                      <h3 className="text-lg font-medium mb-2">{product.title}</h3>
                      <LikeProduct product={product}/>
                    </div>
                    <p className="text-gray-600 text-sm mb-4">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-lg">
                        {toPersianNumbersWithComma(product.price)} تومان
                      </span>
                      <Link href={`/products/${product.slug}`}>
                        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                          مشاهده
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
