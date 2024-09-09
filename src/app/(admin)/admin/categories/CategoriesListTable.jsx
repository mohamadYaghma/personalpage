import { categoriesListTableHeads } from '@/constants/tableHeads';
import { useRemoveCategory } from '@/hooks/useCategories';
import { useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { HiEye, HiTrash } from 'react-icons/hi';
import { RiEdit2Line } from 'react-icons/ri';
import React from 'react';

export default function CategoriesListTable({ categories }) {
  const { mutateAsync } = useRemoveCategory();
  const queryClient = useQueryClient();

  const removeCtegoryHandler = async (id) => {
    try {
      const { message } = await mutateAsync(id);
      toast.success(message);
      queryClient.invalidateQueries({ queryKey: ['get-categories'] });
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className="my-8">
      <div className="hidden md:block overflow-x-auto shadow-lg rounded-lg">
        <table className="table-auto w-full text-sm bg-white rounded-lg">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              {categoriesListTableHeads.map((item) => (
                <th
                  className="p-4 text-center text-lg font-semibold uppercase tracking-wider"
                  key={item.id}
                >
                  {item.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {categories.map((category, index) => (
              <tr
                key={category._id}
                className="border-b last:border-none"
              >
                <td className="text-center p-4 text-lg text-gray-800">
                  {index + 1}
                </td>
                <td className="text-center p-4 text-lg font-bold text-gray-900">
                  {category.title}
                </td>
                <td className="text-center p-4 text-lg text-gray-700">
                  {category.englishTitle}
                </td>
                <td className="text-center p-4 text-lg text-gray-600">
                  {category.description}
                </td>
                <td className="text-center p-4 text-lg">
                  <span className="inline-block px-3 py-1 text-base rounded-full bg-secondary-500 text-white font-medium">
                    {category.type}
                  </span>
                </td>
                <td className="text-center p-4 text-lg">
                  <div className="flex justify-center items-center gap-3">
                    <Link href={`/admin/categories/${category._id}`} passHref>
                      <HiEye className="w-5 h-5 text-blue-600 cursor-pointer hover:text-blue-800 transition-colors" />
                    </Link>
                    <button onClick={() => removeCtegoryHandler(category._id)}>
                      <HiTrash className="w-5 h-5 text-red-600 cursor-pointer hover:text-red-800 transition-colors" />
                    </button>
                    <Link href={`/admin/categories/edit/${category._id}`} passHref>
                      <RiEdit2Line className="w-5 h-5 text-green-600 cursor-pointer hover:text-green-800 transition-colors" />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile view */}
      <div className="md:hidden">
        {categories.map((category, index) => (
          <div
            key={category._id}
            className="mb-4 p-4 border rounded-lg shadow-sm bg-white"
          >
            <div className="mb-2">
              <strong>ردیف: </strong> {index + 1}
            </div>
            <div className="mb-2">
              <strong>عنوان: </strong> {category.title}
            </div>
            <div className="mb-2">
              <strong>عنوان انگلیسی: </strong> {category.englishTitle}
            </div>
            <div className="mb-2">
              <strong>توضیحات: </strong> {category.description}
            </div>
            <div className="mb-2">
              <strong>نوع: </strong>
              <span className="inline-block px-3 py-1 text-base rounded-full bg-secondary-500 text-white font-medium">
                {category.type}
              </span>
            </div>
            <div className="flex justify-start items-center gap-3">
              <Link href={`/admin/categories/${category._id}`} passHref>
                <HiEye className="w-5 h-5 text-blue-600 cursor-pointer hover:text-blue-800 transition-colors" />
              </Link>
              <button onClick={() => removeCtegoryHandler(category._id)}>
                <HiTrash className="w-5 h-5 text-red-600 cursor-pointer hover:text-red-800 transition-colors" />
              </button>
              <Link href={`/admin/categories/edit/${category._id}`} passHref>
                <RiEdit2Line className="w-5 h-5 text-green-600 cursor-pointer hover:text-green-800 transition-colors" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
