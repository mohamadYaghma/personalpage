import { getPayments } from "@/services/PaymentServices"
import { useQuery } from "@tanstack/react-query"

export const useGetPayments=()=>{
    return useQuery({
        queryKey:["payments"],
        queryFn:getPayments,
        retry:false,
        refetchOnWindowFocus:true,
    })
}