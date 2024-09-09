import { productListTableHeads } from '@/constants/tableHeads';
import { useRemoveProduct } from '@/hooks/useProducts';
import { toPersianNumbers, toPersianNumbersWithComma } from '@/utils/toPersianNumber';
import { useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { HiEye, HiTrash } from 'react-icons/hi';
import { RiEdit2Line } from 'react-icons/ri';

export default function ProductListTable({ products }) {
    const { mutateAsync } = useRemoveProduct();
    const queryClient = useQueryClient();

    const removeProductHandler = async (id) => {
        try {
            const { message } = await mutateAsync(id);
            toast.success(message);
            queryClient.invalidateQueries({ queryKey: ['get-products'] });
        } catch (error) {
            toast.error(error?.response?.data?.message);
        }
    };

    return (
        <div className='overflow-x-auto shadow-md my-8 rounded-lg'>
            <table className='hidden md:table table-auto w-full text-sm min-w-[900px] bg-white'>
                <thead>
                    <tr className='bg-gray-200'>
                        {productListTableHeads.map((item) => (
                            <th
                                className='py-4 px-6 text-gray-700 font-semibold text-center text-base border-b border-gray-300'
                                key={item.id}
                            >
                                {item.label}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {products.map((product, index) => (
                        <tr key={product._id} className='hover:bg-gray-50 transition-colors'>
                            <td className='py-3 px-6 text-center border-b border-gray-200'>
                                {toPersianNumbers(index + 1)}
                            </td>
                            <td className='py-3 px-6 font-bold text-center border-b border-gray-200 whitespace-nowrap'>
                                {product.title}
                            </td>
                            <td className='py-3 px-6 text-center border-b border-gray-200'>
                                {product.category.title}
                            </td>
                            <td className='py-3 px-6 text-center border-b border-gray-200'>
                                {toPersianNumbersWithComma(product.price)}
                            </td>
                            <td className='py-3 px-6 text-center border-b border-gray-200'>
                                {toPersianNumbersWithComma(product.discount)}
                            </td>
                            <td className='py-3 px-6 text-center border-b border-gray-200'>
                                {toPersianNumbersWithComma(product.offPrice)}
                            </td>
                            <td className='py-3 px-6 text-center border-b border-gray-200'>
                                {toPersianNumbersWithComma(product.countInStock)}
                            </td>
                            <td className='py-3 px-6 text-center border-b border-gray-200'>
                                <div className='flex justify-center items-center gap-x-4'>
                                    <Link href={`/admin/products/${product._id}`}>
                                        <HiEye className='w-6 h-6 text-primary-900 hover:text-primary-700' />
                                    </Link>
                                    <button onClick={() => removeProductHandler(product._id)}>
                                        <HiTrash className='w-6 h-6 text-red-600 hover:text-red-800' />
                                    </button>
                                    <Link href={`/admin/products/edit/${product._id}`}>
                                        <RiEdit2Line className='w-6 h-6 text-green-600 hover:text-green-800' />
                                    </Link>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Mobile View */}
            <div className='md:hidden space-y-4'>
                {products.map((product, index) => (
                    <div key={product._id} className='bg-white shadow-lg rounded-lg p-4'>
                        <div className='flex justify-between items-center mb-4'>
                            <span className='text-gray-500 text-sm'>ردیف: {toPersianNumbers(index + 1)}</span>
                           
                        </div>
                        <div className='space-y-2 border-b-2 pb-2'>
                            <p className='font-bold text-lg'>{product.title}</p>
                            <p className='text-gray-600 text-sm'>دسته‌بندی: {product.category.title}</p>
                            <p className='text-gray-600 text-sm'>قیمت: {toPersianNumbersWithComma(product.price)}</p>
                            <p className='text-gray-600 text-sm'>تخفیف: {toPersianNumbersWithComma(product.discount)}</p>
                            <p className='text-gray-600 text-sm'>قیمت نهایی: {toPersianNumbersWithComma(product.offPrice)}</p>
                            <p className='text-gray-600 text-sm'>موجودی: {toPersianNumbersWithComma(product.countInStock)}</p>
                        </div>
                        <div className='flex items-center gap-6 justify-center pt-2'>
                                <Link href={`/admin/products/${product._id}`}>
                                    <HiEye className='w-5 h-5 text-primary-900 hover:text-primary-700' />
                                </Link>
                                <button onClick={() => removeProductHandler(product._id)}>
                                    <HiTrash className='w-5 h-5 text-red-600 hover:text-red-800' />
                                </button>
                                <Link href={`/admin/products/edit/${product._id}`}>
                                    <RiEdit2Line className='w-5 h-5 text-green-600 hover:text-green-800' />
                                </Link>
                            </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
