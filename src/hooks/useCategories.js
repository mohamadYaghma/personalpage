import { addCategory, getCategories, getOneCategoryById, updateCategory } from '@/services/categortService';
import { useMutation, useQuery } from '@tanstack/react-query';


export const useGetCategories=()=>{
    return useQuery({
        queryKey:["get-categories"],
        queryFn:getCategories,
        retry:false,
        refetchOnWindowFocus:true,
    })
}

// get by id

export const useGetCategoryById=(id)=>{
    return useQuery({
        queryKey:["get-categories" , id],
        queryFn:()=> getOneCategoryById(id),
        retry:false,
        refetchOnWindowFocus:true,
    })
}

// admin edit

export const useUpdateCategory=()=>{
    return useMutation({mutationFn:updateCategory})
}
// admin add

export const useAddCategory = () =>{
    return useMutation({mutationFn:addCategory})
}