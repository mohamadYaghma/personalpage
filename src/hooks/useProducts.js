import { addProduct, getProducts } from "@/services/productService"
import { useMutation, useQuery } from "@tanstack/react-query"

export const useGetProducts=()=>{
    return useQuery({
        queryKey:["get-user"],
        queryFn:getProducts,
        retry:false,
        refetchOnWindowFocus:true,
    })
}

export const useAddProduct = () =>{
    return useMutation({mutationFn:addProduct})
}