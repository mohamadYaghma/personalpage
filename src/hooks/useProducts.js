import { getProducts } from "@/services/productService"
import { useQuery } from "@tanstack/react-query"

export const useGetProducts=()=>{
    return useQuery({
        queryKey:["get-user"],
        queryFn:getProducts,
        retry:false,
        refetchOnWindowFocus:true,
    })
}