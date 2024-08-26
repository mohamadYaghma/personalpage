import { getCategories } from "@/services/categortService";
import { getProducts } from "@/services/productService";
import CategorySidebar from "./CategorySidebar";
import queryString from "query-string";
import Link from "next/link";
import {toLocalDateStringShort } from "@/utils/toLocaleDate"
import AddToCart from "./[slug]/AddToCart";

export const dynamic = "force-dynamic"; // use this code for this page used ssr Like cash in fetch no-store 

export default async function Products({searchParams}) {

    const {products} = await getProducts(queryString.stringify(searchParams));
    const {categories} = await getCategories();
  return (
    <div>
        <h1 className="font-bold mb-6 text-xl">صفحه محصولات</h1>
        <div className='grid grid-cols-4'>
            <CategorySidebar categories={categories} />
            <div className='col-span-3 '>
                <div className="grid grid-cols-3 gap-4">
                    {products.map((product)=>{
                        return(
                            <div className="col-span-1 border rounded-xl shadow-md p-4 flex flex-col gap-5" key={product._id}>
                                <h2 className="font-bold text-xl text-secondary-700">{product.title}</h2>
                                <div>
                                    <span>زمان انتشار محصول :</span>
                                    <span>{toLocalDateStringShort(product.createdAt)} </span>    
                                </div>
                                <Link href={`/products/${product.slug}`} 
                                    className="text-sm text-primary-900"
                                >مشاهده محصول</Link>
                                
                                    <AddToCart product={product} />
                            </div>
                        );
                    })}
                </div>             
            </div>
        </div>
    </div>
  )
}
