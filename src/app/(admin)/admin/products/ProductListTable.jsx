import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useQuery } from '@tanstack/react-query'; // اضافه کردن این import
import { productListTableHeads } from "@/constants/tableHeads";
import { useRemoveProduct } from "@/hooks/useProducts";
import { useQueryClient } from "@tanstack/react-query";
import { toPersianNumbers, toPersianNumbersWithComma } from "@/utils/toPersianNumber";
import Link from "next/link";
import { HiEye, HiTrash } from "react-icons/hi";
import { RiEdit2Line } from "react-icons/ri";
import toast from "react-hot-toast";
import { useGetCategories } from '@/hooks/useCategories';

export default function ProductListTable({ products }) {

    // تنظیم کردن عنصر اپلیکیشن برای Modal
    useEffect(() => {
        const appElement = document.getElementById('__next') || document.querySelector('.app-container');
        Modal.setAppElement(appElement);
    }, []);
    

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const { data: categories, isLoading } = useQuery(['categories'], useGetCategories); // دریافت دسته‌بندی‌ها

    const { mutateAsync } = useRemoveProduct();
    const queryClient = useQueryClient();

    const removeProductHandler = async (id) => {
        try {
            const { message } = await mutateAsync(id);
            toast.success(message);
            queryClient.invalidateQueries({ queryKey: ['get-products'] });
        } catch (error) {
            toast.error(error?.response?.data?.message || 'خطایی رخ داد');
        }
    };

    const productArray = Array.isArray(products) ? products : products?.products || [];

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        closeModal();
        // console.log(`Selected Category: ${category}`);
    };

    return (
        <div className="overflow-x-auto shadow-md my-8 rounded-lg app-container" id="__next">
            <button 
                onClick={openModal} 
                className="bg-blue-600 text-white px-4 py-2 rounded-lg mb-4"
            >
                تغییر دسته‌بندی
            </button>

            <table className="hidden md:table table-auto w-full text-sm min-w-[900px] bg-white">
                <thead>
                    <tr className="bg-gray-200">
                        {productListTableHeads.map((item) => (
                            <th
                                className="py-4 px-6 text-gray-700 font-semibold text-center text-base border-b border-gray-300"
                                key={item.id}
                            >
                                {item.label}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {productArray.length > 0 ? (
                        productArray.map((product, index) => (
                            <tr key={product._id} className="hover:bg-gray-50 transition-colors">
                                <td className="py-3 px-6 text-center border-b border-gray-200">
                                    {toPersianNumbers(index + 1)}
                                </td>
                                <td className="py-3 px-6 font-bold text-center border-b border-gray-200 whitespace-nowrap">
                                    {product.title}
                                </td>
                                <td className="py-3 px-6 text-center border-b border-gray-200">
                                    {product.category?.title || 'بدون دسته'}
                                </td>
                                <td className="py-3 px-6 text-center border-b border-gray-200">
                                    {toPersianNumbersWithComma(product.price)}
                                </td>
                                <td className="py-3 px-6 text-center border-b border-gray-200">
                                    {toPersianNumbersWithComma(product.discount)}
                                </td>
                                <td className="py-3 px-6 text-center border-b border-gray-200">
                                    {toPersianNumbersWithComma(product.offPrice)}
                                </td>
                                <td className="py-3 px-6 text-center border-b border-gray-200">
                                    {toPersianNumbersWithComma(product.countInStock)}
                                </td>
                                <td className="py-3 px-6 text-center border-b border-gray-200">
                                    <div className="flex justify-center items-center gap-x-4">
                                        <Link href={`/admin/products/${product._id}`}>
                                            <HiEye className="w-6 h-6 text-primary-900 hover:text-primary-700" />
                                        </Link>
                                        <button onClick={() => removeProductHandler(product._id)}>
                                            <HiTrash className="w-6 h-6 text-red-600 hover:text-red-800" />
                                        </button>
                                        <Link href={`/admin/products/edit/${product._id}`}>
                                            <RiEdit2Line className="w-6 h-6 text-green-600 hover:text-green-800" />
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={8} className="py-3 px-6 text-center border-b border-gray-200">
                                محصولی یافت نشد.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Mobile View */}
            <div className="md:hidden space-y-4">
                {productArray.length > 0 ? (
                    productArray.map((product, index) => (
                        <div key={product._id} className="bg-white shadow-lg rounded-lg p-4">
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-gray-500 text-sm">ردیف: {toPersianNumbers(index + 1)}</span>
                            </div>
                            <div className="space-y-2 border-b-2 pb-2">
                                <p className="font-bold text-lg">{product.title}</p>
                                <p className="text-gray-600 text-sm">دسته‌بندی: {product.category?.title || 'بدون دسته'}</p>
                                <p className="text-gray-600 text-sm">قیمت: {toPersianNumbersWithComma(product.price)}</p>
                                <p className="text-gray-600 text-sm">تخفیف: {toPersianNumbersWithComma(product.discount)}</p>
                                <p className="text-gray-600 text-sm">قیمت نهایی: {toPersianNumbersWithComma(product.offPrice)}</p>
                                <p className="text-gray-600 text-sm">موجودی: {toPersianNumbersWithComma(product.countInStock)}</p>
                            </div>
                            <div className="flex items-center gap-6 justify-center pt-2">
                                <Link href={`/admin/products/${product._id}`}>
                                    <HiEye className="w-5 h-5 text-primary-900 hover:text-primary-700" />
                                </Link>
                                <button onClick={() => removeProductHandler(product._id)}>
                                    <HiTrash className="w-5 h-5 text-red-600 hover:text-red-800" />
                                </button>
                                <Link href={`/admin/products/edit/${product._id}`}>
                                    <RiEdit2Line className="w-5 h-5 text-green-600 hover:text-green-800" />
                                </Link>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="bg-white shadow-lg rounded-lg p-4 text-center">
                        محصولی یافت نشد.
                    </div>
                )}
            </div>

            {/* مودال انتخاب دسته‌بندی */}
            <Modal 
                isOpen={modalIsOpen} 
                onRequestClose={closeModal} 
                className="modal"
                overlayClassName="overlay"
            >
                <h2 className="text-lg font-bold mb-4">دسته‌بندی را انتخاب کنید</h2>
                {isLoading ? (
                    <p>در حال بارگذاری...</p> // پیام بارگذاری
                ) : (
                    <div className="space-y-2">
                        {categories?.map((category) => (
                            <button 
                                key={category.id} 
                                onClick={() => handleCategorySelect(category.title)} 
                                className="block w-full text-left px-4 py-2 hover:bg-gray-200 rounded"
                                aria-hidden="false" // برای اطمینان از اینکه فوکوس صحیح مدیریت می‌شود
                            >
                                {category.title}
                            </button>
                        ))}
                    </div>
                )}
                <button onClick={closeModal} className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg">
                    بستن
                </button>
            </Modal>
        </div>
    );
}
