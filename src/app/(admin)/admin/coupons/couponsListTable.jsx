import { CouponsListTableHeads } from '@/constants/tableHeads';
import { useRemoveCoupon } from '@/hooks/useCoupons';
import { toLocalDateStringShort } from '@/utils/toLocaleDate';
import { toPersianNumbers, toPersianNumbersWithComma } from '@/utils/toPersianNumber';
import { useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { HiEye, HiTrash } from 'react-icons/hi';
import { RiEdit2Line } from 'react-icons/ri';

export default function CouponsListTable({ coupons }) {
  const { mutateAsync } = useRemoveCoupon();
  const queryClient = useQueryClient();

  const removeCouponHandler = async (id) => {
    try {
      const { message } = await mutateAsync(id);
      toast.success(message);
      queryClient.invalidateQueries({ queryKey: ['get-coupons'] });
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className="shadow-lg rounded-lg my-8">
      <table className="min-w-full bg-white text-sm hidden md:table">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            {CouponsListTableHeads.map((item) => (
              <th
                className="p-4 text-center text-lg font-semibold uppercase tracking-wider whitespace-nowrap"
                key={item.id}
              >
                {item.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {coupons.map((coupon, index) => (
            <tr key={coupon._id} className="border-b last:border-none">
              <td className="p-4 text-center text-gray-800">
                {toPersianNumbers(index + 1)}
              </td>
              <td className="p-4 text-center font-bold text-gray-900 whitespace-nowrap">
                {coupon.code}
              </td>
              <td className="p-4 text-center">
                <span className="inline-block px-2 py-1 text-sm rounded-full bg-primary-500 text-white">
                  {coupon.type}
                </span>
              </td>
              <td className="p-4 text-center">
                {toPersianNumbersWithComma(coupon.amount)}
              </td>
              <td className="p-4 text-center">
                <div className="flex flex-col space-y-2">
                  {coupon.productIds.map((p) => (
                    <span
                      key={p._id}
                      className="inline-block py-1 text-base text-center text-gray-700"
                    >
                      {p.title}
                    </span>
                  ))}
                </div>
              </td>
              <td className="p-4 text-center">
                {toPersianNumbersWithComma(coupon.usageCount)}
              </td>
              <td className="p-4 text-center">
                {toPersianNumbersWithComma(coupon.usageLimit)}
              </td>
              <td className="p-4 text-center">
                {toLocalDateStringShort(coupon.expireDate)}
              </td>
              <td className="p-4 text-center">
                <div className="flex justify-center gap-x-4">
                  <button onClick={() => removeCouponHandler(coupon._id)}>
                    <HiTrash className="w-6 h-6 text-red-600 cursor-pointer hover:text-red-800 transition-colors" />
                  </button>
                  <Link href={`/admin/coupons/edit/${coupon._id}`} passHref>
                    <RiEdit2Line className="w-6 h-6 text-green-600 cursor-pointer hover:text-green-800 transition-colors" />
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Mobile View */}
      <div className="md:hidden space-y-4">
        {coupons.map((coupon, index) => (
          <div key={coupon._id} className="p-4 bg-white rounded-lg shadow flex flex-col space-y-2">
            <div className="flex justify-between">
              <span className="font-semibold text-gray-700">شماره:</span>
              <span className="flex items-center justify-center w-8 h-8 bg-blue-500 text-white rounded-full">
                {toPersianNumbers(index + 1)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-gray-700">کد:</span>
              <span>{coupon.code}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-gray-700">نوع:</span>
              <span className="inline-block">{coupon.type}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-gray-700">مقدار:</span>
              <span>{toPersianNumbersWithComma(coupon.amount)}</span>
            </div>
            <div className="flex flex-col space-y-1">
              <span className="font-semibold text-gray-700">محصولات:</span>
              {coupon.productIds.map((p) => (
                <span key={p._id} className="text-base text-gray-700 bg-primary-500 text-center mx-10 rounded-lg">
                  {p.title}
                </span>
              ))}
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-gray-700">تعداد استفاده:</span>
              <span>{toPersianNumbersWithComma(coupon.usageCount)}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-gray-700">حداکثر استفاده:</span>
              <span>{toPersianNumbersWithComma(coupon.usageLimit)}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-gray-700">تاریخ انقضا:</span>
              <span>{toLocalDateStringShort(coupon.expireDate)}</span>
            </div>
            <div className="flex justify-center pt-4 border-t">
              <button onClick={() => removeCouponHandler(coupon._id)}>
                <HiTrash className="w-6 h-6 ml-10 text-red-600 cursor-pointer hover:text-red-800 transition-colors" />
              </button>
              <Link href={`/admin/coupons/edit/${coupon._id}`} passHref>
                <RiEdit2Line className="w-6 h-6 text-green-600 cursor-pointer hover:text-green-800 transition-colors" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
