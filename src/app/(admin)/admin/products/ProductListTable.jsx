import { productListTableHeads } from '@/constants/tableHeads'
import { useRemoveProduct } from '@/hooks/useProducts'
import { toPersianNumbers, toPersianNumbersWithComma } from '@/utils/toPersianNumber'
import { QueryClient, useQueryClient } from '@tanstack/react-query'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { HiEye, HiTrash } from 'react-icons/hi'
import {  RiEdit2Line } from 'react-icons/ri'


export default function ProductListTable({products}) {


    const {mutateAsync} = useRemoveProduct()
    const QueryClient  = useQueryClient();
const removeProductHandler = async (id) =>{
    try {
        const {message} = await mutateAsync(id);
        toast.success(message) ;
        QueryClient.invalidateQueries({queryKey:["get-products"]})    
        
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
}

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
                                    {toPersianNumbers(index + 1)}
                                </td>

                                <td className='table__td font-bold whitespace-nowrap'>
                                    {product.title}
                                </td>
                                <td className='table__td'>
                                    {product.category.title}
                                </td>
                                <td className='table__td '>
                                    {toPersianNumbersWithComma(product.price)}          
                                </td>
                                <td className='table__td'>
                                    {toPersianNumbersWithComma(product.discount)}
                                </td>
                                <td className='table__td'>
                                    {toPersianNumbersWithComma(product.offPrice)}
                                </td>
                                <td className='table__td'>
                                    {toPersianNumbersWithComma(product.countInStock)}
                                </td>
                                <td className='table__td font-bold text-base'>
                                    <div className='flex items-center gap-x-4'>
                                        <Link href={`/admin/products/${product._id}`}>
                                            <HiEye className='w-6 h-6 text-primary-900' />
                                        </Link>
                                        <button onClick={()=>removeProductHandler(product._id)}>
                                            <HiTrash className='text-rose-600 w-6 h-6'/>
                                        </button>
                                        <Link href={`/admin/products/edit/${product._id}`}>
                                            <RiEdit2Line className="w-6 h-6 text-secondary-600" />
                                        </Link>
                                    </div>
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
