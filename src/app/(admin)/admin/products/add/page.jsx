"use client"
import { useGetCategories } from '@/hooks/useCategories';
import { useState } from 'react';
import { useAddProduct } from '@/hooks/useProducts';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import ProductForm from '@/constants/ProductForm';
import http from '@/services/httpService';

export default function AddProductPage() {
    
    const { isLoading , mutateAsync } = useAddProduct();
    const { data } = useGetCategories();
    const { categories } = data || {};
    
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        slug: "",
        brand: "",
        price: "",
        discount: "",
        offPrice: "",
        countInStock: "",
        imageLink: "",
    });
    const router = useRouter();
    const [tags, setTags] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value });
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { message } = await mutateAsync({
                ...formData, 
                tags, 
                category: selectedCategory._id,
            });
            toast.success(message);
            router.push("/admin/products");
        } catch (error) {
            toast.error(error?.response?.data?.message);
        }
    }
    
    const [selectedImage, setSelectedImage] = useState(null);
    
    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append('image', file);
    
        try {
            const response = await http.post('/admin/product/add', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setFormData(prevData => ({...prevData, imageLink: response.data.imageUrl}));
            toast.success("تصویر با موفقیت آپلود شد");
        } catch (error) {
            console.error("Error uploading image:", error.response ? error.response.data : error.message);
            toast.error("خطا در آپلود تصویر");
        }
    };

    return (
        <div className='mb-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
            <h1 className='mb-6 font-bold text-2xl text-center sm:text-center'>اضافه کردن محصول</h1>
            <div className="bg-white p-6">
                <ProductForm 
                    setSelectedImage={handleImageUpload}
                    onSubmit={handleSubmit}
                    categories={categories}
                    setSelectedCategory={setSelectedCategory}
                    tags={tags}
                    setTags={setTags}
                    isLoading={isLoading}
                    productData={formData}
                    productDataOnChange={handleChange}
                />
            </div>
        </div>
    )
}
