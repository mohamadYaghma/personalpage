
import http from './httpService'

export function getOtp(data) {
  return http.post("/user/get-otp", data).then(({ data }) => data.data);
}

export function checkOtp(data) {
  return http.post("/user/check-otp", data).then(({ data }) => data.data);
}

export function completeProfile(data) {
  return http.post("/user/complete-profile", data).then(({ data }) => data.data);
}

export function getUserProfile() {
  return http.get("/user/profile").then(({ data }) => data.data);
}

export function updateProfile(data) {
  return http.patch("/user/update" , data).then(({ data }) => data.data);
}

export function logOut() {
  return http.post("/user/logout");
}

// admin related fetchs : 

// تابع به‌روزرسانی شده برای گرفتن لیست کاربران با امکان جستجو
export function getAllUsers(searchQuery = "") {
  const queryParam = searchQuery ? `?search=${encodeURIComponent(searchQuery)}` : ""; // استفاده از encodeURIComponent برای اطمینان از فرمت درست URL
  return http.get(`/admin/user/list${queryParam}`).then(({ data }) => data.data)
    .catch((error) => {
      console.error("Error fetching users:", error);
      throw error; // اینجا می‌توانید خطا را مدیریت کنید یا به کاربر نشان دهید
    });
}
