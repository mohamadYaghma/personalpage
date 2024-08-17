import { getUserProfile } from '@/services/autchServices';
import { useQuery } from '@tanstack/react-query';


export const useGetUser=()=>{
    return useQuery({
        queryKey:["get-user"],
        queryFn:getUserProfile,
        retry:false,
        refetchOnWindowFocus:true,
    })
}