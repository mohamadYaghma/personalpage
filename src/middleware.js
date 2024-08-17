export function middleware(req){
    // console.log(req.url , req.nextUrl.pathname);
    const url =req.url
    const pathname=req.nextUrl.pathname;

    if(pathname.startsWith("/profile")){
        console.log("this is profile req!!");
    }
    if(pathname.startsWith("/admin")){
        console.log("this is admin req!!");
    }
}

export const config  = {
    matcher: ["/admin" , "/profile"],
}