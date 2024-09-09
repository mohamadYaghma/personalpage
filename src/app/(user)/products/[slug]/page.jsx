"use client";
import { getOneProductsBySlug, getProducts } from '@/services/productService';
import AddToCart from './AddToCart';
import { toPersianNumbersWithComma } from '@/utils/toPersianNumber';
import Slider from "react-slick";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

export const dynamic = "force-static"; // تبدیل صفحه به SSG

export default function ProductPage({ params }) {
    const { slug } = params;
    const [product, setProduct] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [nav1, setNav1] = useState(null);
    const [nav2, setNav2] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const { product } = await getOneProductsBySlug(slug);
            setProduct(product);
            // بارگذاری نظرات مرتبط با محصول
            setComments(product.comments || []);
        }

        fetchData();
    }, [slug]);

    const handleAddComment = () => {
        if (newComment.trim() !== '') {
            const updatedComments = [...comments, { text: newComment }];
            setComments(updatedComments);
            setNewComment('');
        }
    };

    if (!product) {
        return <div>در حال بارگذاری...</div>;
    }

    const sampleImages = [
        '/images/sadsaltanhaee.jfif',
        '/images/ebrahim.jpg',
        '/images/1.jfif'
    ];

    const settingsMain = {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        asNavFor: nav2,
        ref: slider => setNav1(slider)
    };

    const settingsThumbs = {
        slidesToShow: sampleImages.length,
        slidesToScroll: 1,
        asNavFor: nav1,
        focusOnSelect: true,
        variableWidth: false,
        ref: slider => setNav2(slider),
    };

    // تنظیمات اسلایدر محصولات مرتبط
    const relatedProductsSettings = {
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        rtl: true, // جهت اسلایدر راست‌چین
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    };

    return (
        <div className="container mx-auto px-4 py-8 text-right">
            <motion.div
                className="flex flex-col md:flex-row items-start md:space-x-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
            >
                {/* تصاویر محصول */}
                <div className="w-full md:w-1/2 lg:w-1/3 mb-2 relative">
                    <Slider {...settingsMain}>
                        {sampleImages.map((image, index) => (
                            <div key={index} className="overflow-hidden rounded-lg shadow-lg">
                                <img 
                                    src={image} 
                                    alt={`تصویر ${index + 1}`} 
                                    className="w-full h-auto object-cover"
                                    style={{ maxHeight: '500px' }}
                                />
                            </div>
                        ))}
                    </Slider>
                    <div className="mt-2">
                        <Slider {...settingsThumbs}>
                            {sampleImages.map((image, index) => (
                                <div key={index} className="p-1">
                                    <img 
                                        src={image} 
                                        alt={`تصویر ${index + 1}`} 
                                        className="w-full h-auto object-cover rounded-lg"
                                        style={{ maxHeight: '100px' }}
                                    />
                                </div>
                            ))}
                        </Slider>
                    </div>
                </div>

                {/* توضیحات و اطلاعات محصول */}
                <div className="w-full md:w-1/2 lg:w-2/3 flex flex-col space-y-4">
                    <motion.h1 
                        className="font-bold text-2xl md:text-4xl mb-4 text-left"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        {product.title}
                    </motion.h1>

                    <div className="p-6 bg-white rounded-lg shadow-md">
                        <motion.p 
                            className="text-lg mb-4 text-justify"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            {product.description}
                        </motion.p>

                        <motion.p 
                            className="text-xl mb-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                        >
                            قیمت محصول : {" "}
                            <span className={`${product.discount ? "line-through" : "font-bold"} text-rose-600`}>
                                {toPersianNumbersWithComma(product.price)} تومان
                            </span>
                        </motion.p>

                        {!!product.discount && (
                            <motion.div 
                                className="flex items-center gap-x-2 mb-4"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.6 }}
                            >
                                <p className="text-2xl font-bold text-green-600">
                                    قیمت با تخفیف : {toPersianNumbersWithComma(product.offPrice)} تومان
                                </p>
                                <div className="bg-rose-500 px-2 py-0.5 rounded-xl text-white text-sm">
                                    {product.discount}%
                                </div>
                            </motion.div>
                        )}

                        {/* افزودن به سبد خرید */}
                        <div>
                            <AddToCart product={product} />
                        </div>
                    </div>

                    {/* بخش ویژگی‌های محصول - منتقل شده به زیر توضیحات */}
                    <div className="mt-8 p-6 bg-gray-50 rounded-lg shadow-md">
                        <h2 className="text-2xl font-bold mb-4">ویژگی‌های محصول</h2>
                        <ul className="list-disc list-inside space-y-2">
                            <li>وزن: {product.weight} گرم</li>
                            <li>ابعاد: {product.dimensions}</li>
                            <li>رنگ: {product.color}</li>
                            <li>جنس: {product.material}</li>
                            <li>گارانتی: {product.warranty}</li>
                        </ul>
                    </div>
                </div>
            </motion.div>

            {/* بخش سوالات متداول با انیمیشن */}
            <div className="mt-8 p-6 bg-gray-50 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4">سوالات متداول</h2>
                <Accordion question="آیا این محصول گارانتی دارد؟" answer="بله، این محصول دارای گارانتی ۱۲ ماهه می‌باشد." />
                <Accordion question="مدت زمان ارسال چقدر است؟" answer="مدت زمان ارسال بین ۲ تا ۵ روز کاری می‌باشد." />
                <Accordion question="آیا امکان بازگشت کالا وجود دارد؟" answer="بله، امکان بازگشت کالا تا ۷ روز پس از خرید وجود دارد." />
            </div>

            {/* بخش پیشنهادات مرتبط با اسکرول */}
            <div className="mt-8 p-6 bg-gray-50 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4">پیشنهادات مرتبط</h2>
                <Slider {...relatedProductsSettings}>
                    <motion.div 
                        className="p-4 bg-white rounded-lg shadow text-right"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                    >
                        <img src="/images/sadsaltanhaee.jfif" alt="محصول مرتبط ۱" className="w-full h-auto object-cover rounded-lg" style={{ height: '200px', objectFit: 'cover' }} />
                        <h3 className="mt-2 font-bold">محصول مرتبط ۱</h3>
                        <p className="mt-1 text-green-600">۲۰۰,۰۰۰ تومان</p>
                        <AddToCart product={{ price: 200000, title: "محصول مرتبط ۱" }} />
                    </motion.div>
                    <motion.div 
                        className="p-4 bg-white rounded-lg shadow text-right"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                    >
                        <img src="/images/ebrahim.jpg" alt="محصول مرتبط ۲" className="w-full h-auto object-cover rounded-lg" style={{ height: '200px', objectFit: 'cover' }} />
                        <h3 className="mt-2 font-bold">محصول مرتبط ۲</h3>
                        <p className="mt-1 text-green-600">۳۰۰,۰۰۰ تومان</p>
                        <AddToCart product={{ price: 300000, title: "محصول مرتبط ۲" }} />
                    </motion.div>
                    <motion.div 
                        className="p-4 bg-white rounded-lg shadow text-right"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                    >
                        <img src="/images/1.jfif" alt="محصول مرتبط ۳" className="w-full h-auto object-cover rounded-lg" style={{ height: '200px', objectFit: 'cover' }} />
                        <h3 className="mt-2 font-bold">محصول مرتبط ۳</h3>
                        <p className="mt-1 text-green-600">۴۵۰,۰۰۰ تومان</p>
                        <AddToCart product={{ price: 450000, title: "محصول مرتبط ۳" }} />
                    </motion.div>
                    <motion.div 
                        className="p-4 bg-white rounded-lg shadow text-right"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                    >
                        <img src="/images/2.jfif" alt="محصول مرتبط ۴" className="w-full h-auto object-cover rounded-lg" style={{ height: '200px', objectFit: 'cover' }} />
                        <h3 className="mt-2 font-bold">محصول مرتبط ۴</h3>
                        <p className="mt-1 text-green-600">۴۰۰,۰۰۰ تومان</p>
                        <AddToCart product={{ price: 400000, title: "محصول مرتبط ۴" }} />
                    </motion.div>
                </Slider>
            </div>

            {/* بخش نظرات */}
            <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4">نظرات کاربران</h2>
                <div className="mb-4">
                    {comments.length > 0 ? (
                        comments.map((comment, index) => (
                            <div key={index} className="p-4 mb-2 bg-gray-100 rounded-lg">
                                {comment.text}
                            </div>
                        ))
                    ) : (
                        <p>هنوز نظری برای این محصول ثبت نشده است.</p>
                    )}
                </div>

                <div className="mt-4">
                    <textarea 
                        className="w-full p-2 border rounded-lg mb-2" 
                        rows="4" 
                        placeholder="نظر خود را بنویسید..." 
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                    />
                    <button 
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                        onClick={handleAddComment}
                    >
                        ثبت نظر
                    </button>
                </div>
            </div>
        </div>
    );
}

function Accordion({ question, answer }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="mb-4 text-right">
            <motion.div 
                className="p-4 bg-white rounded-lg shadow cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
            >
                <p className="font-bold">{question}</p>
            </motion.div>
            <motion.div
                initial={{ height: 0 }}
                animate={{ height: isOpen ? 'auto' : 0 }}
                transition={{ duration: 0.5 }}
                className="overflow-hidden"
            >
                <p className="p-4 bg-gray-50">{answer}</p>
            </motion.div>
        </div>
    );
}
