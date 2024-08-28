import { getAllUsers, getUserProfile } from '@/services/autchServices';
import { useQuery } from '@tanstack/react-query';


export const useGetUser=()=>{
    return useQuery({
        queryKey:["get-user"],
        queryFn:getUserProfile,
        retry:false,
        refetchOnWindowFocus:true,
    })
}

// for amin panel
export const useGetUsers=()=>{
    return useQuery({
        queryKey:["get-user"],
        queryFn:getAllUsers,
        retry:false,
        refetchOnWindowFocus:true,
    })
}