"use client"

import Loading from '@/common/Loading';
import { useGetPayments } from '@/hooks/usePayment';
import PayentsListTable from './paymentListTable';

export default function Page() {

    const {data , isLoading} = useGetPayments();
    const {payments} = data || {};

    
    
    
    if(isLoading) return <Loading />
  return (
    <div className="mx-10">
        <div className="flex justify-between items-center">

          <h1 className="text-xl font-bold mb-5">اطلاعات پرداخت ها</h1>

        </div>
        <PayentsListTable payments={payments} />
    </div>
  )
}
