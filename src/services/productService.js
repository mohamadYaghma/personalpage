import http from './httpService';

// تابع اصلاح شده برای دریافت محصولات
export function getProducts( qs , cookies ){
    return http
    .get(`/product/list?${qs}`,{withCredentials: true }, {
      headers: {
        Cookie: cookies,
      },
    })
    .then(({ data }) => data.data);
} 

export function getOneProductsBySlug(slug) {
    return http.get(`/product/slug/${slug}`).then(({ data }) => data.data);
}  

export function getOneProductsById(id) {
    return http.get(`/product/${id}`).then(({ data }) => data.data);
}  

export function likeProduct(id) {
    return http.post(`/product/like/${id}`).then(({ data }) => data.data);
}

export function addProduct(data) {
    return http.post(`/admin/product/add`, data).then(({ data }) => data.data);
}

export function updateProduct({ productId, data }) {
    return http.patch(`/admin/product/update/${productId}`, data).then(({ data }) => data.data);
}

export function removeProduct(id) {
    return http.delete(`/admin/product/remove/${id}`).then(({ data }) => data.data);
}

// تابع جستجوی محصولات
export const searchProducts = async (query) => {
    return http.get(`/admin/product/search?search=${query}`).then(({ data }) => data.data);
  };
  

