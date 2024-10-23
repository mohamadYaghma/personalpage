import { getAllUsers, getUserProfile } from '@/services/autchServices';
import { useQuery } from '@tanstack/react-query';

// برای دریافت اطلاعات یک کاربر
export const useGetUser = () => {
    return useQuery({
        queryKey: ["get-user"],
        queryFn: getUserProfile,
        retry: false,
        refetchOnWindowFocus: true,
    });
};

// برای دریافت لیست کاربران با پشتیبانی از جستجو در پنل ادمین
export const useGetUsers = (searchQuery = "") => {
    return useQuery({
        queryKey: ["get-users", searchQuery], // جستجو را به عنوان queryKey اضافه می‌کنیم
        queryFn: () => getAllUsers(searchQuery), // تابعی که با پارامتر جستجو صدا زده می‌شود
        retry: false,
        refetchOnWindowFocus: true,
    });
};
