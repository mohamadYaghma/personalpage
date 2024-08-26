"use client"


import { useGetUser } from "@/hooks/useAuth"
import Link from "next/link";
import React from "react";
import Loading from "@/common/Loading";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";


export default function page() {

    const {data , isLoading } = useGetUser();
    const { user , cart } = data || {};

    if(isLoading) return <Loading />;

    if(!user || !data)
        return (
            <div className="container lg:max-w-screen-lg">
            <p className="font-bold mb-4">لطفا ابتدا وارد حساب کاربری خود بشوید</p>
            <Link 
                href={"/auth"}
                className="text-lg font-bold text-primary-900"
                >رفتن به صفحه خرید </Link>
        </div>)
    
  if(!user?.cart?.products || user.cart?.products.length === 0)
    return (
        <div className="container lg:max-w-screen-lg">
            <p className="font-bold mb-4">سبد خرید شما خالی می‌باشد!</p>
            <Link 
                href={"/products"}
                className="text-lg font-bold text-primary-900"
                >رفتن به صفحه محصولات </Link>
        </div>
    )

    return(
        <div className="grid grid-cols-4 gap-4">
            <div className="col-span-3">
                {cart.productDetail.map((item)=>{
                    return <CartItem cartItemm={item}/>
                })}
        </div>
        <div className="col-span-1">
            <CartSummary payDetail={cart.payDetail}/>
        </div>
        </div>
    )
}
