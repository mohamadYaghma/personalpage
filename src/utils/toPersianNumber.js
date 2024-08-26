const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

export function toPersianNumbersWithComma(n){
    const numWithcommas = numberWithCommas(n);
    const persianNumber = toPersianNumbers(numWithcommas);
    return persianNumber;
}

function numberWithCommas(x){
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

export function toPersianNumbers(n){
    return n.toString()
    .replace(/\d/g, x => farsiDigits[x]);
}