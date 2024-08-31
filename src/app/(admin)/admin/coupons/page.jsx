"use client"

import CouponsListTable from './couponsListTable'
import Loading from '@/common/Loading';
import { useGetCoupons } from '@/hooks/useCoupons';
import Link from 'next/link';
import { HiPlusCircle } from 'react-icons/hi';

export default function CuponsPage() {

const {data , isLoading} = useGetCoupons();
const {coupons} = data || {};

console.log(coupons);

  
  if(isLoading) return <Loading />

  return (
    <div className="mx-10">
        <div className="flex justify-between items-center">

          <h1 className="text-xl font-bold mb-5">کد های تخفیف</h1>

          <Link href={`/admin/coupons/add`} className="flex flex-row-reverse gap-x-2">
            <span>اضافه کردن کد تخفیف </span>
            <span> <HiPlusCircle className="h-6 w-6 text-primary-900"/> </span>
          </Link>

        </div>
        <CouponsListTable coupons={coupons} />
    </div>
  )
}
