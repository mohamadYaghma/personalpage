import http from './httpService';

// دریافت اطلاعات یک پرداخت بر اساس شناسه
export function getPaymentsById(id) {
  return http.get(`/admin/payment/${id}`)
    .then(({ data }) => data.data)
    .catch(error => {
      console.error("Error in getPaymentsById:", error);
      throw error; // ارسال خطا به سمت کلاینت
    });
}

// دریافت لیست کامل پرداخت‌ها
export function getPayments() {
  return http.get("/admin/payment/list")
    .then(({ data }) => data.data)
    .catch(error => {
      console.error("Error in getPayments:", error);
      throw error;
    });
}

// ایجاد پرداخت جدید
export function createPayment() {
  return http.post("/payment/create")
    .then(({ data }) => data.data)
    .catch(error => {
      console.error("Error in createPayment:", error);
      throw error;
    });
}

// جستجو بر اساس شماره فاکتور
export function searchPaymentByInvoiceNumber(invoiceNumber) {
  return http.get(`/admin/payment/search/invoice`, { params: { invoiceNumber } })
    .then(({ data }) => data.data)
    .catch(error => {
      console.error("Error in searchPaymentByInvoiceNumber:", error);
      throw error;
    });
}

export default {
  getPaymentsById,
  getPayments,
  createPayment,
  searchPaymentByInvoiceNumber
};
