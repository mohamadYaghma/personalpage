import http from "./httpService"

export function addToCart(productId) {
    return http.post("/cart/add" , {productId:productId} ).then(({ data }) => data.data);
  }

  export function decrementFromCart(productId) {
    return http.post("/cart/remove" , {productId:productId} ).then(({ data }) => data.data);
  }


