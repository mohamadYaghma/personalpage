"use client";
import { getOneProductsBySlug } from '@/services/productService';
import AddToCart from './AddToCart';
import { toPersianNumbersWithComma } from '@/utils/toPersianNumber';
import Slider from "react-slick";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
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

    const relatedProductsSettings = {
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        rtl: true,
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
                                <Image 
                                    src={image} 
                                    alt={`تصویر ${index + 1}`} 
                                    className="w-full h-auto object-cover"
                                    layout="responsive"
                                    width={500}
                                    height={500}
                                    style={{ maxHeight: '500px' }}
                                />
                            </div>
                        ))}
                    </Slider>
                    <div className="mt-2">
                        <Slider {...settingsThumbs}>
                            {sampleImages.map((image, index) => (
                                <div key={index} className="p-1">
                                    <Image 
                                        src={image} 
                                        alt={`تصویر ${index + 1}`} 
                                        className="w-full h-auto object-cover rounded-lg"
                                        layout="responsive"
                                        width={100}
                                        height={100}
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

                    {/* بخش ویژگی‌های محصول */}
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

            {/* بخش سوالات متداول */}
            <div className="mt-8 p-6 bg-gray-50 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4">سوالات متداول</h2>
                <Accordion question="آیا این محصول گارانتی دارد؟" answer="بله، این محصول دارای گارانتی ۱۲ ماهه می‌باشد." />
                <Accordion question="مدت زمان ارسال چقدر است؟" answer="مدت زمان ارسال بین ۲ تا ۵ روز کاری می‌باشد." />
                <Accordion question="آیا امکان بازگشت کالا وجود دارد؟" answer="بله، امکان بازگشت کالا تا ۷ روز پس از خرید وجود دارد." />
            </div>

            {/* بخش پیشنهادات مرتبط */}
            <div className="mt-8 p-6 bg-gray-50 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4">پیشنهادات مرتبط</h2>
                <Slider {...relatedProductsSettings}>
                    <motion.div 
                        className="p-4 bg-white rounded-lg shadow text-right"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Image src="/images/sadsaltanhaee.jfif" alt="محصول مرتبط ۱" className="w-full h-auto object-cover rounded-lg" layout="responsive" width={500} height={500} style={{ height: '200px', objectFit: 'cover' }} />
                        <h3 className="mt-2 font-bold">محصول مرتبط ۱</h3>
                        <p className="mt-1 text-green-600">۲۰۰,۰۰۰ تومان</p>
                        <AddToCart product={{ price: 200000, title: "محصول مرتبط ۱" }} />
                    </motion.div>
                    <motion.div 
                        className="p-4 bg-white rounded-lg shadow text-right"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Image src="/images/ebrahim.jpg" alt="محصول مرتبط ۲" className="w-full h-auto object-cover rounded-lg" layout="responsive" width={500} height={500} style={{ height: '200px', objectFit: 'cover' }} />
                        <h3 className="mt-2 font-bold">محصول مرتبط ۲</h3>
                        <p className="mt-1 text-green-600">۲۵۰,۰۰۰ تومان</p>
                        <AddToCart product={{ price: 250000, title: "محصول مرتبط ۲" }} />
                    </motion.div>
                </Slider>
            </div>

            {/* بخش نظرات کاربران */}
            <div className="mt-8 p-6 bg-gray-50 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4">نظرات کاربران</h2>
                <div className="space-y-4">
                    {comments.map((comment, index) => (
                        <div key={index} className="p-4 bg-white rounded-lg shadow">
                            <p>{comment.text}</p>
                        </div>
                    ))}
                </div>
                <div className="mt-4">
                    <textarea 
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="نظر خود را اینجا بنویسید..."
                        rows={3}
                    />
                    <button 
                        onClick={handleAddComment}
                        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        ارسال نظر
                    </button>
                </div>
            </div>
        </div>
    );
}

function Accordion({ question, answer }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-gray-300">
            <div 
                className="flex justify-between items-center cursor-pointer py-2"
                onClick={() => setIsOpen(!isOpen)}
            >
                <h3 className="font-semibold">{question}</h3>
                <span>{isOpen ? '-' : '+'}</span>
            </div>
            {isOpen && <p className="text-gray-600">{answer}</p>}
        </div>
    );
}
