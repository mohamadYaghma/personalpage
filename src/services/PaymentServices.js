import http from './httpService'


export function getPayments() {
  return http.get("/admin/payment/list").then(({ data }) => data.data);
}

export default function createPaymnet() {
  return (
    http.post("/payment/create" ).then(({data})=>data.data)
  )
}
