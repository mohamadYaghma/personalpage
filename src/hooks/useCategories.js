import { getCategories } from '@/services/categortService';
import { useQuery } from '@tanstack/react-query';


export const useGetCategories=()=>{
    return useQuery({
        queryKey:["get-categories"],
        queryFn:getCategories,
        retry:false,
        refetchOnWindowFocus:true,
    })
}