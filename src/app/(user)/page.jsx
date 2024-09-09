"use client"
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation, Pagination } from 'swiper/modules';

export default function Home() {
  return (
    <div className="bg-gray-50">
      {/* بخش بنر با پس زمینه مرتبط */}
      <section className="relative h-[75vh] md:h-screen text-center flex flex-col justify-center items-center text-white">
        <img
          src="https://via.placeholder.com/1920x1080" // لینک جایگزین تصویر پس‌زمینه
          alt="Jewelry Background"
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-40 z-10"></div>
        <div className="relative z-20">
          <h2 className="text-4xl md:text-6xl font-bold mb-4 text-gray-100">جواهرات لوکس</h2>
          <p className="text-lg md:text-xl mb-6 text-gray-300">مجموعه‌ای از جواهرات نفیس را کشف کنید.</p>
          <a href="#collections" className="bg-primary text-white px-6 py-3 md:px-8 md:py-4 rounded-full shadow-lg hover:bg-gray-800 transition duration-300">
            مشاهده محصولات
          </a>
        </div>
      </section>

      {/* مجموعه‌های ویژه به صورت اسلایدی */}
      <section id="collections" className="py-12 md:py-16 container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12 text-primary">مجموعه‌های ویژه</h2>
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={10} 
          slidesPerView={4}
          navigation
          pagination={{ clickable: true }}
          loop={true}
          breakpoints={{
            640: { slidesPerView: 1, spaceBetween: 10 }, // فاصله کمتر در موبایل
            768: { slidesPerView: 2, spaceBetween: 15 }, // فاصله کمتر در تبلت
            1024: { slidesPerView: 4, spaceBetween: 20 }, // فاصله کمتر در دسکتاپ
          }}
        >
          <SwiperSlide>
            <div className="bg-white p-4 md:p-6 md:mb-3 shadow-lg rounded-lg hover:shadow-2xl transition duration-300 hover:scale-105 max-w-sm md:max-w-xs mx-auto">
              <img src="https://via.placeholder.com/400x400" alt="گردنبند طلا" className="w-full h-48 md:h-64 object-cover mb-4 rounded-lg" />
              <h3 className="text-xl md:text-2xl font-bold text-primary hover:text-gray-500">گردنبندهای طلا</h3>
              <p className="mt-2 text-gray-600 hover:text-primary">گردنبندهای طلای شیک و زیبا برای هر مناسبت.</p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="bg-white p-4 md:p-6 shadow-lg rounded-lg hover:shadow-2xl transition duration-300 hover:scale-105 max-w-sm md:max-w-xs mx-auto">
              <img src="https://via.placeholder.com/400x400" alt="گردنبند طلا" className="w-full h-48 md:h-64 object-cover mb-4 rounded-lg" />
              <h3 className="text-xl md:text-2xl font-bold text-primary hover:text-gray-500">گردنبندهای طلا</h3>
              <p className="mt-2 text-gray-600 hover:text-primary">گردنبندهای طلای شیک و زیبا برای هر مناسبت.</p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="bg-white p-4 md:p-6 shadow-lg rounded-lg hover:shadow-2xl transition duration-300 hover:scale-105 max-w-sm md:max-w-xs mx-auto">
              <img src="https://via.placeholder.com/400x400" alt="گردنبند طلا" className="w-full h-48 md:h-64 object-cover mb-4 rounded-lg" />
              <h3 className="text-xl md:text-2xl font-bold text-primary hover:text-gray-500">گردنبندهای طلا</h3>
              <p className="mt-2 text-gray-600 hover:text-primary">گردنبندهای طلای شیک و زیبا برای هر مناسبت.</p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="bg-white p-4 md:p-6 shadow-lg rounded-lg hover:shadow-2xl transition duration-300 hover:scale-105 max-w-sm md:max-w-xs mx-auto">
              <img src="https://via.placeholder.com/400x400" alt="گردنبند طلا" className="w-full h-48 md:h-64 object-cover mb-4 rounded-lg" />
              <h3 className="text-xl md:text-2xl font-bold text-primary hover:text-gray-500">گردنبندهای طلا</h3>
              <p className="mt-2 text-gray-600 hover:text-primary">گردنبندهای طلای شیک و زیبا برای هر مناسبت.</p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="bg-white p-4 md:p-6 shadow-lg rounded-lg hover:shadow-2xl transition duration-300 hover:scale-105 max-w-sm md:max-w-xs mx-auto">
              <img src="https://via.placeholder.com/400x400" alt="گردنبند طلا" className="w-full h-48 md:h-64 object-cover mb-4 rounded-lg" />
              <h3 className="text-xl md:text-2xl font-bold text-primary hover:text-gray-500">گردنبندهای طلا</h3>
              <p className="mt-2 text-gray-600 hover:text-primary">گردنبندهای طلای شیک و زیبا برای هر مناسبت.</p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="bg-white p-4 md:p-6 shadow-lg rounded-lg hover:shadow-2xl transition duration-300 hover:scale-105 max-w-sm md:max-w-xs mx-auto">
              <img src="https://via.placeholder.com/400x400" alt="حلقه‌های الماس" className="w-full h-48 md:h-64 object-cover mb-4 rounded-lg" />
              <h3 className="text-xl md:text-2xl font-bold text-primary hover:text-gray-500">حلقه‌های الماس</h3>
              <p className="mt-2 text-gray-600 hover:text-primary">حلقه‌های الماس خیره‌کننده برای لحظات ویژه.</p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="bg-white p-4 md:p-6 shadow-lg rounded-lg hover:shadow-2xl transition duration-300 hover:scale-105 max-w-sm md:max-w-xs mx-auto">
              <img src="https://via.placeholder.com/400x400" alt="دستبندهای طلا" className="w-full h-48 md:h-64 object-cover mb-4 rounded-lg" />
              <h3 className="text-xl md:text-2xl font-bold text-primary hover:text-gray-500">دستبندهای طلا</h3>
              <p className="mt-2 text-gray-600 hover:text-primary">دستبندهای طلای زیبا برای تکمیل استایل شما.</p>
            </div>
          </SwiperSlide>
        </Swiper>
      </section>

      {/* پیشنهادات ویژه */}
      <section id="offers" className="bg-gray-100 py-12 md:py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-8 text-gray-600 hover:text-gray-400">پیشنهادات ویژه</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 shadow-lg rounded-lg hover:bg-primary hover:text-white transition duration-300 hover:scale-105">
              <h3 className="text-lg md:text-xl font-bold text-gray-600 hover:text-gray-400">۲۰٪ تخفیف حلقه‌های طلا</h3>
              <p className="mt-2 text-gray-600 hover:text-gray-400">تخفیف محدود بر روی حلقه‌های طلای منتخب.</p>
            </div>
            <div className="bg-white p-6 shadow-lg rounded-lg hover:bg-primary hover:text-white transition duration-300 hover:scale-105">
              <h3 className="text-lg md:text-xl font-bold text-gray-600 hover:text-gray-400">خرید یک جفت گوشواره و دریافت یک جفت رایگان</h3>
              <p className="mt-2 text-gray-600 hover:text-gray-400">فرصت استثنایی برای خرید گوشواره.</p>
            </div>
            <div className="bg-white p-6 shadow-lg rounded-lg hover:bg-primary hover:text-white transition duration-300 hover:scale-105">
              <h3 className="text-lg md:text-xl font-bold text-gray-600 hover:text-gray-400">ارسال رایگان برای خریدهای بالای ۱۰۰ دلار</h3>
              <p className="mt-2 text-gray-600 hover:text-gray-400">با خرید بالای ۱۰۰ دلار از ارسال رایگان بهره‌مند شوید.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
