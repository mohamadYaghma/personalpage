import { addProduct, getOneProductsById, getProducts, removeProduct, updateProduct, searchProducts } from "@/services/productService";
import { useMutation, useQuery } from "@tanstack/react-query";

// Get all products
export const useGetProducts = (qs = "", cookies = "") => {
    return useQuery({
        queryKey: ["get-products", qs, cookies],
        queryFn: () => getProducts(qs, cookies),
        retry: false,
        refetchOnWindowFocus: true,
    });
};

// Admin add product
export const useAddProduct = () => {
    return useMutation({
        mutationFn: addProduct,
        onSuccess: () => {
            // ممکن است بخواهید محصولات را مجدداً بارگذاری کنید یا کار دیگری انجام دهید
        },
        onError: (error) => {
            console.error("Error adding product:", error);
        },
    });
};

// Get product by ID (for admin panel)
export const useGetProductById = (id) => {
    return useQuery({
        queryKey: ["get-product-by-id", id], // تغییر نام کلید برای وضوح بیشتر
        queryFn: () => getOneProductsById(id),
        retry: false,
        refetchOnWindowFocus: true,
        enabled: !!id, // Only fetch if id is provided
    });
};

// Admin edit product
export const useUpdateProduct = () => {
    return useMutation({
        mutationFn: updateProduct,
        onSuccess: () => {
            // مشابه به useAddProduct، ممکن است بخواهید محصولات را مجدداً بارگذاری کنید یا کار دیگری انجام دهید
        },
        onError: (error) => {
            console.error("Error updating product:", error);
        },
    });
};

// Delete product
export const useRemoveProduct = () => {
    return useMutation({
        mutationFn: removeProduct,
        onSuccess: () => {
            // مشابه به useAddProduct، ممکن است بخواهید محصولات را مجدداً بارگذاری کنید یا کار دیگری انجام دهید
        },
        onError: (error) => {
            console.error("Error removing product:", error);
        },
    });
};

// Search products
// Search products
export const useSearchProducts = (query) => {
    return useQuery({
        queryKey: ["search-products", query],
        queryFn: () => searchProducts(query),
        enabled: !!query, // Only fetch when query exists
        retry: false,
        refetchOnWindowFocus: false,
        onSuccess: (data) => {
            console.log("Search Results:", data); // ثبت نتایج جستجو
        },
        onError: (error) => {
            console.error("Search Error:", error); // ثبت خطای جستجو
            // می‌توانید خطای خاصی را به کاربر نمایش دهید یا حالت خاصی را مدیریت کنید
        },
    });
};
