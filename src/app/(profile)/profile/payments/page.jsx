"use client"
import Loading from '@/common/Loading';
import { useGetUser } from '@/hooks/useAuth'
import PaymentTable from './PaymentTable';
import { FaShoppingCart, FaCoins, FaRegSmileWink } from 'react-icons/fa'; // آیکون‌های جذاب

export default function Payments() {
  const { data, isLoading } = useGetUser();
  const { user, payments } = data || {};

  if (isLoading) return <Loading />;

  // محاسبه تعداد خریدها و مبلغ کل پرداختی
  const totalPayments = payments?.length || 0;
  const totalAmount = payments?.reduce((sum, payment) => sum + payment.amount, 0) || 0;

  return (
    <div className="p-4 md:p-8 bg-white shadow rounded-lg">
      {/* پیام خوش‌آمدگویی شخصی‌سازی‌شده */}
      <div className="mb-6 flex items-center">
        <FaRegSmileWink size={28} className="text-yellow-400 mx-2" />
        <h1 className="text-2xl font-bold text-gray-800">سلام، {user?.name || 'کاربر عزیز'}!</h1>
      </div>

      {/* خلاصه اطلاعات کاربری */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-100 p-4 rounded-lg shadow flex items-center justify-between">
          <div>
            <FaShoppingCart size={32} className="text-blue-500" />
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">تعداد خریدها</p>
            <p className="text-lg font-bold text-blue-600">{totalPayments} خرید</p>
          </div>
        </div>

        <div className="bg-green-100 p-4 rounded-lg shadow flex items-center justify-between">
          <div>
            <FaCoins size={32} className="text-green-500" />
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">مبلغ کل پرداختی</p>
            <p className="text-lg font-bold text-green-600">{totalAmount.toLocaleString()} تومان</p>
          </div>
        </div>

        <div className="bg-yellow-100 p-4 rounded-lg shadow flex items-center justify-between">
          <div>
            <FaRegSmileWink size={32} className="text-yellow-500" />
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">وضعیت عضویت</p>
            <p className="text-lg font-bold text-yellow-600">{user?.status || 'عادی'}</p>
          </div>
        </div>
      </div>

      {/* جدول محصولات خریداری شده */}
      <h1 className='font-bold text-xl border-b-2 border-gray-300 mb-6 pb-2'>محصولات خریداری شده</h1>
      {payments && payments.length > 0 ? (
        <PaymentTable payments={payments} />
      ) : (
        <p className="text-gray-500 text-center">هنوز خریدی انجام نداده‌اید.</p>
      )}
    </div>
  );
}
