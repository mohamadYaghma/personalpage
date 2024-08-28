import { productListTableHeads } from '@/constants/tableHeads'
import Link from 'next/link'


export default function ProductListTable({products}) {
  return (
    <div className='overflow-auto shadow-sm my-8'>
        <table className='border-collapse table-auto w-full text-sm min-w-[800px]'>
            <thead>
                <tr>
                   {
                    productListTableHeads.map((item)=>{
                        return(
                            <th className='whitespace-nowrap table__th' key={item.id}>
                                {item.label}
                            </th>
                        )
                    })
                   }
                </tr>
            </thead>
            <tbody>
                {
                    products.map((product  , index)=>{
                        return(
                            <tr key={product._id}>
                                <td className='table__td'>
                                    {index}
                                </td>

                                <td className='table__td font-bold whitespace-nowrap'>
                                    {product.title}
                                </td>
                                <td className='table__td'>
                                    {product.category.title}
                                </td>
                                <td className='table__td '>
                                    {product.price}          
                                </td>
                                <td className='table__td'>
                                    {product.discount}
                                </td>
                                <td className='table__td'>
                                    {product.offPrice}
                                </td>
                                <td className='table__td'>
                                    {product.countInStock}
                                </td>
                                <td className='table__td font-bold text-base'>
                                    <Link href={`/admin/products/${product._id}`}>مشاهده جزییات</Link>
                                </td>

                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    </div>
  )
}
