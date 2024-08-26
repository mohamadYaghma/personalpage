"use client"
import Loading from '@/common/Loading';
import { useGetUser } from '@/hooks/useAuth';
import { addToCart } from '@/services/CartService';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function AddToCart({product}) {
    const queryClient = useQueryClient();
    
    const router = useRouter();

    // گرفتن اطلاعات کاربران -نیازه که لاگین کنند تا خرید کنند
    const {data} = useGetUser();
    const {user} = data || {};
    const {isLoading , error , mutateAsync} = useMutation({mutationFn:addToCart});

    const addToCartHandler=async ()=>{
        if(!user){
            toast.error("لطفا ابتدا وارد حساب خود بشوید");
            router.push("/auth");
            return ;
        } 
        try {
            const {message} = await mutateAsync(product._id);
            toast.success(message);
            queryClient.invalidateQueries({queryKey:["get-user"]});

        } catch (error) {
            if(error?.response?.data){
                toast.error(error.response.data.message);
            }
        }        
    }
    return (
    <div>
        {isLoading ? (
            <Loading />
        ) : (
            <button onClick={addToCartHandler} className='btn btn--primary'>اضافه کردن به سبد خرید </button>
        )}
    </div>
  )
}
