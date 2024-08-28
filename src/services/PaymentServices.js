import http from './httpService'

export default function createPaymnet() {
  return (
    http.post("/payment/create" ).then(({data})=>data.data)
  )
}
