"use client"

import CouponsListTable from './couponsListTable'
import Loading from '@/common/Loading';
import { useGetCoupons } from '@/hooks/useCoupons';
import Link from 'next/link';
import { HiPlusCircle } from 'react-icons/hi';

export default function CouponsPage() {
  const { data, isLoading } = useGetCoupons();
  const { coupons } = data || {};

  if (isLoading) return <Loading />

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">کدهای تخفیف</h1>
        <Link href={`/admin/coupons/add`} className="flex items-center gap-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-500 transition-all">
          <span>اضافه کردن کد تخفیف</span>
          <HiPlusCircle className="h-6 w-6" />
        </Link>
      </div>
      <div className="bg-white overflow-hidden">
        <CouponsListTable coupons={coupons} />
      </div>
    </div>
  )
}
