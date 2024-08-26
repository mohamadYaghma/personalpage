import http from "./httpService"

export function addToCart(productId) {
    return http.post("/cart/add" , {productId:productId} ).then(({ data }) => data.data);
  }