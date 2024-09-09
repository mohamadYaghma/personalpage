"use client";
import Loading from '@/common/Loading';
import TextFild from '@/common/TextFild';
import { useGetUser } from '@/hooks/useAuth';
import { updateProfile } from '@/services/autchServices';
import includeObject from '@/utils/objectUtils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function MePage() {
  const { data, isLoading } = useGetUser();
  const [formData, setFormData] = useState({});
  const queryClient = useQueryClient();
  const { mutateAsync, isLoading: isUpdating } = useMutation({ mutationFn: updateProfile });

  const { user } = data || {};
  const includesKey = ["name", "email", "phoneNumber", "biography"];

  useEffect(() => {
    if (user) setFormData(includeObject(user, includesKey));
  }, [user]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { message } = await mutateAsync(formData);
      queryClient.invalidateQueries({ queryKey: ["get-user"] });
      toast.success(message);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div className="max-w-md mx-auto p-4 sm:p-6 lg:p-8 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-6 text-center">اطلاعات کاربر</h1>
      <form onSubmit={submitHandler} className="space-y-6">
        {Object.keys(includeObject(user, includesKey)).map((key) => (
          <TextFild
            label={key}
            name={key}
            key={key}
            value={formData[key] || ""}
            onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
          />
        ))}

        <div>
          {isUpdating ? (
            <Loading />
          ) : (
            <button type="submit" className="btn btn--primary w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
              تایید و ارسال
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
