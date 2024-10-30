import { useState } from "react";
import { usersListTableHeads } from "@/constants/tableHeads";
import { toLocalDateStringShort } from "@/utils/toLocaleDate";
import { toPersianNumbers } from "@/utils/toPersianNumber";
import Link from "next/link";
import { HiCheckCircle } from "react-icons/hi";
import { MdDelete } from "react-icons/md";
import ProductsModal from "@/constants/ModalUser";
import { useParams } from "next/navigation";

export default function UsersTable({ users, onDeleteUser, params }) {
  const [selectedUserProducts, setSelectedUserProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { id } = useParams();
  // console.log(id);

  const handleShowProducts = (products) => {
    setSelectedUserProducts(products);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUserProducts([]);
  };

  const handleDeleteUser = (userId) => {
    // console.log(`User with ID ${userId} deleted`);
    onDeleteUser(userId);
  };

  return (
    <div className="overflow-x-auto shadow-md my-8 rounded-lg">
      <table className="table-auto w-full text-sm bg-white">
        <thead>
          <tr className="bg-gray-100">
            {usersListTableHeads.map((item) => (
              <th
                className="py-4 px-6 text-gray-700 font-semibold text-center text-base border-b border-gray-300"
                key={item.id}
              >
                {item.label}
              </th>
            ))}
            <th className="py-4 px-6 text-gray-700 font-semibold text-center text-base border-b border-gray-300">
              عملیات
            </th>
          </tr>
        </thead>
        <tbody>
          {users && users.length > 0 ? (
            users.map((user, index) => (
              <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-3 border-b border-gray-200">
                  {toPersianNumbers(index + 1)}
                </td>
                <td className="px-6 py-3 border-b border-gray-200">
                  {user.name}
                </td>
                <td className="px-6 py-3 border-b border-gray-200">
                  {user.email}
                </td>
                <td className="px-6 py-3 border-b border-gray-200">
                  <div className="flex items-center gap-x-2">
                    {user.phoneNumber}
                    {user.isVerifiedPhoneNumber && (
                      <HiCheckCircle className="h-5 w-5 text-green-600" />
                    )}
                  </div>
                </td>
                <td className="px-4 py-2 border-b border-gray-200">
                  <button
                    onClick={() => handleShowProducts(user.Products)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300"
                  >
                    مشاهده محصولات
                  </button>
                </td>
                <td className="px-4 py-2 border-b border-gray-200">
                  {toLocalDateStringShort(user.createdAt)}
                </td>
                <td className="px-4 py-2 border-b border-gray-200 text-center">
                  <Link
                    href={`/admin/users/${user._id}`}
                    className="text-blue-600 hover:underline"
                  >
                    مشاهده جزییات
                  </Link>
                </td>
                <td className="px-4 py-2 border-b border-gray-200 text-center">
                  <button
                    onClick={() => handleDeleteUser(user._id)}
                    className="p-1 text-red-500 hover:text-red-600 transition-colors duration-300"
                  >
                    <MdDelete className="h-6 w-6" aria-label="حذف کاربر" />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={8} className="text-center py-4">
                کاربری یافت نشد.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Mobile View */}
      <div className="md:hidden space-y-4">
        {users.map((user, index) => (
          <div key={user._id} className="bg-white shadow-lg rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-500 text-sm">
                ردیف: {toPersianNumbers(index + 1)}
              </span>
              <div className="flex items-center gap-x-2">
                {user.isVerifiedPhoneNumber && (
                  <HiCheckCircle className="h-5 w-5 text-green-600" />
                )}
              </div>
            </div>
            <div className="space-y-2">
              <p className="font-bold text-lg">{user.name}</p>
              <p className="text-gray-600 text-sm">ایمیل: {user.email}</p>
              <p className="text-gray-600 text-sm">تلفن: {user.phoneNumber}</p>
              <p className="text-gray-600 text-sm">محصولات:</p>
              <button
                onClick={() => handleShowProducts(user.Products)}
                className="flex items-center justify-center px-3 py-1 text-sm text-white bg-blue-500 rounded hover:bg-blue-600 transition-colors duration-300"
              >
                <span>مشاهده محصولات</span>
              </button>
              <p className="text-gray-600 text-sm">
                تاریخ ثبت: {toLocalDateStringShort(user.createdAt)}
              </p>
              <Link
                href={`/admin/users/${user._id}`}
                className="text-blue-600 hover:underline"
              >
                مشاهده جزییات
              </Link>
              <button
                onClick={() => handleDeleteUser(user._id)}
                className="mt-2 p-1 text-red-500 hover:text-red-600 transition-colors duration-300"
              >
                <MdDelete className="h-6 w-6" aria-label="حذف کاربر" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Products Modal */}
      <ProductsModal
        products={selectedUserProducts}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}
