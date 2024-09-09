"use client"
import Loading from '@/common/Loading';
import { useGetUser } from '@/hooks/useAuth';
import { useAddTocart } from '@/hooks/useCart';
import { useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function AddToCart({product}) {
    const queryClient = useQueryClient();
    
    const router = useRouter();

    // گرفتن اطلاعات کاربران -نیازه که لاگین کنند تا خرید کنند
    const {data} = useGetUser();
    const {user} = data || {};
    const {isLoading , error , mutateAsync} = useAddTocart();
    // console.log(user && user.cart?.products.some( p => p.productId === product._id));

    const addToCartHandler=async ()=>{

        if(!user){
            toast.error("لطفا ابتدا وارد حساب خود بشوید");
            isLoading ? <Loading /> : router.push("/auth");
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

    const isInCart = ( user, product) =>{
        if(!user) return false;
        return(user.cart?.products.some((p)=>p.productId === product._id));
    }

    return (
    <div>
        {
        isInCart(user , product) ? (
         <Link href={"/cart"} className='text-primary-900 font-bold '>ادمه خرید</Link>
        ):isLoading ? (
            <Loading />
        ) : (
            <button onClick={addToCartHandler} className='btn btn--primary py-2 px-4 rounded'>افزودن به سبد</button>
        )}
    </div>
  )
}
