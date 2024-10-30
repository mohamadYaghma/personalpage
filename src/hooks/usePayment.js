// hooks/usePayment.js
import { getPayments, getPaymentsById, searchPaymentByInvoiceNumber } from "@/services/PaymentServices";
import { useQuery } from "@tanstack/react-query";

// هوک برای دریافت پرداخت بر اساس ID
export const useGetPaymentsByIds = (id) => {
    return useQuery({
        queryKey: ["payments-by-id", id],
        queryFn: () => getPaymentsById(id),
        retry: false,
        refetchOnWindowFocus: true,
        enabled: !!id, // فقط زمانی که ID وجود دارد، کوئری اجرا می‌شود
    });
};

// هوک برای دریافت تمام پرداخت‌ها
export const useGetPayments = () => {
    return useQuery({
        queryKey: ["payments"],
        queryFn: getPayments,
        retry: false,
        refetchOnWindowFocus: true,
    });
};

// هوک برای جستجو بر اساس شماره فاکتور
export const useSearchPaymentByInvoiceNumber = (invoiceNumber) => {
    return useQuery({
        queryKey: ["payment-by-invoice-number", invoiceNumber],
        queryFn: () => searchPaymentByInvoiceNumber(invoiceNumber),
        retry: false,
        refetchOnWindowFocus: true,
        enabled: !!invoiceNumber, // کوئری فقط در صورت داشتن شماره فاکتور اجرا می‌شود
    });
};
