// utils/convertDate.js

import moment from "moment-jalaali"; // اطمینان از نصب این کتابخانه

export const convertShamsiToGregorian = (shamsiDate) => {
    // تبدیل تاریخ شمسی به میلادی
    const year = parseInt(shamsiDate.substring(0, 4), 10);
    const month = parseInt(shamsiDate.substring(4, 6), 10);
    const day = parseInt(shamsiDate.substring(6, 8), 10);
    
    // استفاده از moment برای ایجاد تاریخ
    return moment(`${year}/${month}/${day}`, 'jYYYY/jMM/jDD').format('YYYY/MM/DD');
};
