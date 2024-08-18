import { NextResponse } from "next/server";
import { middlewareAutch } from "./utils/middelwareAtch";

// کاربرد این  صفحه برای جدا سازی صفحه ادمین و کاربر هستش
export async function middleware(req){
    // console.log(req.url , req.nextUrl.pathname);
    const url =req.url
    const pathname=req.nextUrl.pathname;

    if(pathname.startsWith("/profile")){
        const user = await middlewareAutch(req)
        if(!user) return NextResponse.redirect(new URL("/auth" , req.url))
    }
    if(pathname.startsWith("/admin")){
        const user = await middlewareAutch(req)
        if(!user) return NextResponse.redirect(new URL("/auth" , req.url))
        if(user && user.role !== "ADMIN") return NextResponse.redirect(new URL("/" , req.url))
    }
}

// matcher دستور بالا را برای صفحات زیر اجرا میکند
// :path* => برای زیر صفحه های ادمین یا یوزر پنل پشتیبانی بشه
export const config  = {
    matcher: ["/admin/:path*" , "/profile/:path*"],
}