"use client"

import { useGetUser } from "@/hooks/useAuth";
import Link from "next/link";
import React from "react";
import Loading from "@/common/Loading";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";

export default function Page() {
    const { data, isLoading } = useGetUser();
    const { user, cart } = data || {};

    if (isLoading) return <Loading />;

    if (!user || !data) {
        return (
            <div className="container mx-auto p-4 max-w-screen-md">
                <p className="text-xl font-semibold mb-4 text-center text-gray-800">لطفا ابتدا وارد حساب کاربری خود بشوید</p>
                <div className="text-center">
                    <Link 
                        href="/auth" 
                        className="text-lg font-bold text-blue-600 hover:text-blue-800 underline">
                        رفتن به صفحه خرید
                    </Link>
                </div>
            </div>
        );
    }

    if (!user?.cart?.products || user.cart?.products.length === 0) {
        return (
            <div className="container mx-auto p-4 max-w-screen-md">
                <p className="text-xl font-semibold mb-4 text-center text-gray-800">سبد خرید شما خالی می‌باشد!</p>
                <div className="text-center">
                    <Link 
                        href="/products" 
                        className="text-lg font-bold text-blue-600 hover:text-blue-800 underline">
                        رفتن به صفحه محصولات
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4 max-w-screen-lg">
            <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-4/6">
                    {cart.productDetail.map((item) => (
                        <CartItem key={item.id} cartItemm={item} />
                    ))}
                </div>
                <div className="md:w-2/6">
                    <CartSummary payDetail={cart.payDetail} />
                </div>
            </div>
        </div>
    );
}
