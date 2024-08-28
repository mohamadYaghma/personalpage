"use client"
import Loading from '@/common/Loading';
import { useGetUser } from '@/hooks/useAuth'
import PaymentTable from './PaymentTable';

export default function Payments() {
    const {data , isloading} = useGetUser();
    const { user, payments } = data || {};

    if(isloading) return <Loading />

  return (
    <div>
        <h1 className='font-bold  border-b my-10'>محصولات خریداری شده</h1>
        <PaymentTable payments={payments}/>
    </div>
  )
}
