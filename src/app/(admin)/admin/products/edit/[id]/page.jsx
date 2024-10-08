"use client"

import Loading from "@/common/Loading";
import ProductForm from "@/constants/ProductForm";
import { useGetCategories } from "@/hooks/useCategories";
import { useGetProductById, useUpdateProduct } from "@/hooks/useProducts";
import includeObject from "@/utils/objectUtils";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const includesProductKey = [
  "title",
  "description",
  "slug", 
  "brand", 
  "price", 
  "offPrice",
  "discount",
  "countInStock",
  "imageLink",
];

export default function EditProductPage() {
  const { id } = useParams();
  const { isLoading: isLoadingProduct, data: productData } = useGetProductById(id);
  const { product } = productData || {};

  const { data: categoryData } = useGetCategories();
  const { categories } = categoryData || {};

  const [formData, setFormData] = useState({});
  const router = useRouter();
  const [tags, setTags] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const { isLoading: isLoadingUpdate, mutateAsync: muUpdate } = useUpdateProduct();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { message } = await muUpdate({
        productId: product._id,
        data: {
          ...formData,
          tags,
          category: selectedCategory._id,
        },
      });
      toast.success(message);
      router.push("/admin/products");
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    if (product) {
       setTags(product.tags);
       setSelectedCategory(product.category);
       setFormData(includeObject(product, includesProductKey));
    }
 }, [product]);
 

  if (isLoadingProduct) return <Loading />;

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="max-w-3xl w-full mx-auto bg-white">
        <h1 className="font-bold mb-6 text-center text-xl">
          ویرایش اطلاعات محصول
        </h1>
        <ProductForm
          onSubmit={handleSubmit}
          categories={categories}
          setSelectedCategory={setSelectedCategory}
          tags={tags}
          setTags={setTags}
          isLoading={isLoadingUpdate}
          productData={formData}
          productDataOnChange={handleChange}
          selectedCategory={selectedCategory}
        />
      </div>
    </div>
  );
}
