import { categoriesListTableHeads } from '@/constants/tableHeads'
import Link from 'next/link'
import { HiEye, HiTrash } from 'react-icons/hi'
import {  RiEdit2Line } from 'react-icons/ri'


export default function CategoriesListTable({categories}) {
  return (
    <div className='overflow-auto shadow-sm my-8'>
        <table className='border-collapse table-auto w-full text-sm min-w-[800px]'>
            <thead>
                <tr>
                   {
                    categoriesListTableHeads.map((item)=>{
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
                    categories.map((category  , index)=>{
                        return(
                            <tr key={category._id}>
                                <td className='table__td'>
                                    {index + 1}
                                </td>

                                <td className='table__td font-bold whitespace-nowrap'>
                                    {category.title}
                                </td>
                                <td className='table__td'>
                                    {category.englishTitle}
                                </td>
                                <td className='table__td '>
                                    {category.description}          
                                </td>
                                <td className='table__td' >
                                    <span  className='px-2 py-1 rounded-xl bg-secondary-500 text-white whitespace-nowrap'>
                                         {category.type}
                                    </span>
                                </td>
                                
                                <td className='table__td font-bold text-base'>
                                    <div className='flex items-center gap-x-4'>
                                        <Link href={`/admin/categories/${category._id}`}>
                                            <HiEye className='w-6 h-6 text-primary-900' />
                                        </Link>
                                        <button>
                                            <HiTrash className='text-rose-600 w-6 h-6'/>
                                        </button>
                                        <Link href={`/admin/categories/edit/${category._id}`}>
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
