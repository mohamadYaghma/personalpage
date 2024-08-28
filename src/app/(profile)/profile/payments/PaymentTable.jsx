import { userPaymentTheads } from '@/constants/tableHeads';
import toLocalDateStringShort from '@/utils/toLocaleDate';
import { toPersianNumbersWithComma } from '@/utils/toPersianNumber';



export default function PaymentTable({payments}) {
  return (
    <div className='overflow-auto shadow-sm my-8'>
            <table className='border-collapse table-auto w-full text-sm min-w-[800px]'>
                <thead>
                    <tr>
                        {
                            userPaymentTheads.map((item)=>{
                                return <th className='whitespace-nowrap table__th' key={item.id}>{item.label}</th>
                            })
                        }
                    </tr>
                </thead>
                <tbody>
                    {payments.map((pay , index)=>{
                        return (
                        <tr key={pay._id}>
                            <td className='table__td'>{index}</td>
                            <td className='table__td whitespace-nowrap truncate'>
                                {pay.invoiceNumber}
                            </td>
                            <td className='table__td max-w-[280px] whitespace-nowrap truncate'>
                                {pay.description}
                            </td>
                            <td className='table__td'>
                                <div className='flex flex-col gap-y-2 items-start'>
                                    {
                                    pay.cart.productDetail.map((product)=>{
                                    return (
                                    <span 
                                        className='px-2 py-1 rounded-xl bg-secondary-500 text-white whitespace-nowrap'
                                        key={product._id}>
                                        {product.title}
                                    </span>
                                )
                                })}
                                </div>
                            </td>
                            <td className='table__td font-bold text-lg'>{toPersianNumbersWithComma(pay.amount)}</td>
                            <td className='table__td'>{toLocalDateStringShort(pay.createdAt)}</td>
                            <td className='table__td'>{pay.status === "COMPLETED" ? <span className='bg-success text-white px-2 py-0.5 rounded-xl'>موفق</span> : <span className='bg-error text-white px-2 py-0.5 rounded-xl'>ناموفق</span>}</td>

                        </tr>)
                    })}
                </tbody>
            </table>
        </div>
  )
}
