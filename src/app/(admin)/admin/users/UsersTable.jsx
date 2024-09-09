import { usersListTableHeads } from '@/constants/tableHeads';
import { toLocalDateStringShort } from '@/utils/toLocaleDate';
import { toPersianNumbers } from '@/utils/toPersianNumber';
import Link from 'next/link';
import { HiCheckCircle } from 'react-icons/hi';

export default function UsersTable({ users }) {
  return (
    <div className='overflow-x-auto shadow-md my-8 rounded-lg'>
      {/* Desktop Table */}
      <table className='hidden md:table table-auto w-full text-sm min-w-[900px] bg-white'>
        <thead>
          <tr className='bg-gray-100'>
            {usersListTableHeads.map((item) => (
              <th className='py-4 px-6 text-gray-700 font-semibold text-center text-base border-b border-gray-300' key={item.id}>
                {item.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user._id} className='hover:bg-gray-50 transition-colors'>
              <td className='px-6 py-3 border-b border-gray-200'>
                {toPersianNumbers(index + 1)}
              </td>
              <td className='px-6 py-3 border-b border-gray-200'>
                {user.name}
              </td>
              <td className='px-6 py-3 border-b border-gray-200'>
                {user.email}
              </td>
              <td className='px-6 py-3 border-b border-gray-200'>
                <div className='flex items-center gap-x-2'>
                  {user.phoneNumber}
                  {user.isVerifiedPhoneNumber && (
                    <HiCheckCircle className='h-5 w-5 text-green-600' />
                  )}
                </div>
              </td>
              <td className='px-4 py-2 border-b border-gray-200'>
                <div className='flex flex-col gap-y-2'>
                  {user.Products.map((product, index) => (
                    <span
                      key={index}
                      className='px-2 py-1 rounded-lg bg-secondary-500 text-white whitespace-nowrap text-xs'
                    >
                      {product.title}
                    </span>
                  ))}
                </div>
              </td>
              <td className='px-4 py-2 border-b border-gray-200'>
                {toLocalDateStringShort(user.createdAt)}
              </td>
              <td className='px-4 py-2 border-b border-gray-200 text-center'>
                <Link href={`/admin/users/${user._id}`} className='text-blue-600 hover:underline'>
                  مشاهده جزییات
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Mobile View */}
      <div className='md:hidden space-y-4'>
        {users.map((user, index) => (
          <div key={user._id} className='bg-white shadow-lg rounded-lg p-4'>
            <div className='flex justify-between items-center mb-4'>
              <span className='text-gray-500 text-sm'>ردیف: {toPersianNumbers(index + 1)}</span>
              <div className='flex items-center gap-x-2'>
                {user.isVerifiedPhoneNumber && (
                  <HiCheckCircle className='h-5 w-5 text-green-600' />
                )}
              </div>
            </div>
            <div className='space-y-2'>
              <p className='font-bold text-lg'>{user.name}</p>
              <p className='text-gray-600 text-sm'>ایمیل: {user.email}</p>
              <p className='text-gray-600 text-sm'>تلفن: {user.phoneNumber}</p>
              <p className='text-gray-600 text-sm'>محصولات:</p>
              <div className='flex flex-wrap gap-2'>
                {user.Products.map((product, index) => (
                  <span
                    key={index}
                    className='px-2 py-1 rounded-lg bg-secondary-500 text-white text-xs'
                  >
                    {product.title}
                  </span>
                ))}
              </div>
              <p className='text-gray-600 text-sm'>تاریخ ثبت: {toLocalDateStringShort(user.createdAt)}</p>
              <Link href={`/admin/users/${user._id}`} className='text-blue-600 hover:underline'>
                مشاهده جزییات
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
