"use client";

import Loading from '@/common/Loading';
import CategoryForm, { categoryTypes } from '@/constants/CategoryForm';
import { useGetCategoryById, useUpdateCategory } from '@/hooks/useCategories';
import includeObject from '@/utils/objectUtils';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const includesCategoryKey = [
  'title',
  'englishTitle',
  'description',
  'type',
];

export default function CategoryEditPage() {
  const { id } = useParams();
  const { isLoading, data: categoryData } = useGetCategoryById(id);
  const { category } = categoryData || {};

  const [formData, setFormData] = useState({});
  const { isLoading: isLoadingUpdate, mutateAsync } = useUpdateCategory();

  const router = useRouter();
  const [selectedType, setSelectedType] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { message } = await mutateAsync({
        categoryId: category._id,
        data: {
          ...formData,
          type: selectedType.value,
        },
      });
      toast.success(message);
      router.push('/admin/categories');
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    if (category) {
      setSelectedType(categoryTypes.find((c) => c.value === category.type));
      setFormData(includeObject(category, includesCategoryKey));
    }
  }, [category, categoryData]);  // افزودن category به وابستگی‌ها

  

  if (isLoading) return <Loading />;

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-screen-lg mx-auto">
      <h1 className="text-secondary-700 font-bold text-lg mb-4 text-center lg:text-left">
        ویرایش دسته‌بندی: {category?.title}
      </h1>
      <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-md shadow-md">
        <CategoryForm
          onSubmit={handleSubmit}
          categoryDataOnChange={handleChange}
          isLoading={isLoadingUpdate}
          categoryData={formData}
          selectedType={selectedType}
          setSelectedType={setSelectedType}
        />
      </div>
    </div>
  );
}
