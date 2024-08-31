import { addCoupon, getAllCoupons, getCoupons } from '@/services/CouponServices';
import { useMutation, useQuery } from '@tanstack/react-query';


export const useGetCoupons=()=>{
    return useQuery({
        queryKey:["get-coupons"],
        queryFn:getAllCoupons,
        retry:false,
        refetchOnWindowFocus:true,
    })
}


// admin add

export const useAddCoupon = () =>{
    return useMutation({mutationFn:addCoupon})
}