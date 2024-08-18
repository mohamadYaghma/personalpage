export async function middlewareAutch(req){
    
// در این صفحه کوکی ها گرفته شده - مشخصات ان شامل دیتا و ولیو ان گرفته شده تا بفهمیم یوزر رولش چیه
    let strCookies = "";
    req.cookies.getAll().forEach((item)=> {
        strCookies += `${item?.name}=${item?.value}; `;
    });
   const {data} = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/profile` ,{
        method:"GET",
        credentials:"include",
        headers:{
            Cookie: strCookies ,
        }
    }).then(data => data.json())
    const {user} = data || {};
    return user;

}