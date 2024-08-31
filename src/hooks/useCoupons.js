import { addCoupon, getAllCoupons, getCoupons, getOneCouponById, removeCoupon, updateCoupon } from '@/services/CouponServices';
import { useMutation, useQuery } from '@tanstack/react-query';


export const useGetCoupons=()=>{
    return useQuery({
        queryKey:["get-coupons"],
        queryFn:getAllCoupons,
        retry:false,
        refetchOnWindowFocus:true,
    })
}
// get by id

export const useGetCouponById=(id)=>{
    return useQuery({
        queryKey:["get-coupons" , id],
        queryFn:()=> getOneCouponById(id),
        retry:false,
        refetchOnWindowFocus:true,
    })
}

// admin add
export const useAddCoupon = () =>{
    return useMutation({mutationFn:addCoupon})
}

// admin delete 
export const useRemoveCoupon = () =>{
    return useMutation({mutationFn:removeCoupon})
}

// admin edit

export const useUpdateCoupon=()=>{
    return useMutation({mutationFn:updateCoupon})
}