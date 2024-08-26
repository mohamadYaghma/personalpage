import { getOneProductsBySlug, getProducts } from '@/services/productService'
import AddToCart from './AddToCart';
export const dynamic = "force-static"; // this page convert to ssg static side generat 
export default async function page({params}) {
    const {slug} = params;
    const {product} = await getOneProductsBySlug(slug);

    


  return (
    <div>
      {/* name of product */}
      <h1 className='font-bold text-2xl mb-6'>{product.title}</h1>
      {/* discription of product */}
      <p className='mb-6'>{product.description}</p>
      {/* price of product */}
      <p className='mb-6'>
        قیمت محصول : {" "}
        <span className={`${product.discount ? "line-through" : "font-bold"}`}>
          {" "}
          {product.price}
        </span>
      </p>
      {/* Off price */}
      {!!product.discount && (
        <div className='flex items-center gap-x-2 mb-6'>
          <p className='text-xl font-bold'>
          قیمت با تخفیف : {product.offPrice}
          </p>
          <div className='bg-rose-500 px-2 py-0.5 rounded-xl text-white text-sm'>
            {product.discount}%
          </div>
        </div>
)}
  <div>
    <AddToCart product={product} />
  </div>
    </div>
  )
}


// این بخش برا نکست بفهمه صفحه خودکار ساخته میشه 
export async function generateStaticParams() {

        const {products} = await getProducts();

        return products.map((product)=>({
            slug: product.slug,
        }))
}

