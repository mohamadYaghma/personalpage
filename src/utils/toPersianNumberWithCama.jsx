const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

export function toPersianNumbersWithComma(n) {
    const numWithCommas = numberWithCommas(n);
    const persianNumber = toPersianNumbers(numWithCommas);
    return persianNumber;
}

function numberWithCommas(x) {
    // تبدیل عدد به رشته و افزودن ویرگول بین هر سه رقم
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function toPersianNumbers(n) {
    // تبدیل هر رقم به معادل فارسی خود
    return n.toString().replace(/\d/g, x => farsiDigits[parseInt(x)]);
}

// تست کد
const number = 1234567; // عددی که می‌خواهید نمایش دهید
const persianNumber = toPersianNumbersWithComma(number);
console.log(persianNumber); // خروجی: "۱,۲۳۴,۵۶۷"
