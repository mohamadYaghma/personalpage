import { motion } from 'framer-motion';
import Slider from "react-slick"; // اگر از react-slick استفاده می‌کنید

export default function offProductSlider() {
  return (
    <div className="mt-8 p-6 bg-gray-50 rounded-lg shadow-md">
    <h2 className="text-2xl font-bold mb-4">پیشنهادات مرتبط</h2>
    <Slider {...relatedProductsSettings}>
        <motion.div 
            className="p-4 bg-white rounded-lg shadow"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
        >
            <img src="/images/sadsaltanhaee.jfif" alt="محصول مرتبط ۱" className="w-full h-auto object-cover rounded-lg" style={{ height: '200px', objectFit: 'cover' }} />
            <h3 className="mt-2 font-bold">محصول مرتبط ۱</h3>
            <p className="mt-1 text-green-600">۲۰۰,۰۰۰ تومان</p>
        </motion.div>
        <motion.div 
            className="p-4 bg-white rounded-lg shadow"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
        >
            <img src="/images/ebrahim.jpg" alt="محصول مرتبط ۲" className="w-full h-auto object-cover rounded-lg" style={{ height: '200px', objectFit: 'cover' }} />
            <h3 className="mt-2 font-bold">محصول مرتبط ۲</h3>
            <p className="mt-1 text-green-600">۳۵۰,۰۰۰ تومان</p>
        </motion.div>
        <motion.div 
            className="p-4 bg-white rounded-lg shadow"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
        >
            <img src="/images/1.jfif" alt="محصول مرتبط ۳" className="w-full h-auto object-cover rounded-lg" style={{ height: '200px', objectFit: 'cover' }} />
            <h3 className="mt-2 font-bold">محصول مرتبط ۳</h3>
            <p className="mt-1 text-green-600">۴۵۰,۰۰۰ تومان</p>
        </motion.div>
        <motion.div 
            className="p-4 bg-white rounded-lg shadow"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
        >
            <img src="/images/2.jfif" alt="محصول مرتبط ۴" className="w-full h-auto object-cover rounded-lg" style={{ height: '200px', objectFit: 'cover' }} />
            <h3 className="mt-2 font-bold">محصول مرتبط ۴</h3>
            <p className="mt-1 text-green-600">۴۰۰,۰۰۰ تومان</p>
        </motion.div>
    </Slider>
</div>
  )
}
