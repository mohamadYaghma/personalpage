import { addProduct, getOneProductsById, getProducts, removeProduct, updateProduct } from "@/services/productService"
import { useMutation, useQuery } from "@tanstack/react-query"

export const useGetProducts=()=>{
    return useQuery({
        queryKey:["get-products"],
        queryFn:getProducts,
        retry:false,
        refetchOnWindowFocus:true,
    })
}

export const useAddProduct = () =>{
    return useMutation({mutationFn:addProduct})
}


// admin panel product

export const useGetProductById=(id)=>{
    return useQuery({
        queryKey:["get-products" , id],
        queryFn:()=> getOneProductsById(id),
        retry:false,
        refetchOnWindowFocus:true,
    })
}

// admin edit

export const useUpdateProduct=()=>{
    return useMutation({mutationFn:updateProduct})
}

// delete product


export const useRemoveProduct=()=>{
    return useMutation({mutationFn: removeProduct})
}