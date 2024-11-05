"use client";

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import SpinnerMini from "@/constants/SpinnerMini";
import RHFTextField from "@/constants/RHFTextField";
import Button from "@/constants/Button";
import { useAuth } from "../../../../context/AuthContext";

const schema = yup
  .object({
    name: yup
      .string()
      .min(5, "نام و نام خانوادگی نامعتبر است")
      .max(30)
      .required("نام و نام خانوادگی الزامی است"),
    email: yup.string().email("ایمیل نامعتبر است").required("ایمیل الزامی است"),
    password: yup.string().required("رمز عبور الزامی است"),
    phoneNumber: yup.string().required("وارد کردن تلفن همراه اجباری است"),
  })
  .required();

function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onTouched",
  });

  const { signup, error, isLoading } = useAuth(); // افزودن error و isLoading
  const onSubmit = async (values) => {
    await signup(values);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="shadow-2xl rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
          ثبت نام
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <RHFTextField
            label="نام و نام خانوادگی"
            name="name"
            register={register}
            isRequired
            errors={errors}
          />
          <RHFTextField
            label="ایمیل"
            name="email"
            register={register}
            dir="ltr"
            isRequired
            errors={errors}
          />
          <RHFTextField
            label="رمز عبور"
            name="password"
            register={register}
            type="password"
            dir="ltr"
            isRequired
            errors={errors}
          />
          <RHFTextField
            label="تلفن همراه"
            name="phoneNumber"
            register={register}
            type="text"
            isRequired
            errors={errors}
          />
          <div>
            {isLoading ? (
              <SpinnerMini />
            ) : (
              <Button type="submit" variant="primary" className="w-full">
                تایید
              </Button>
            )}
          </div>
        </form>
        {error && <p className="text-red-500">{error}</p>} {/* نمایش خطا */}
        <Link href="/auth/signin-email" className="text-blue-600 hover:text-blue-800 mt-4 text-center block">
          ورود
        </Link>
      </div>
    </div>
  );
}

export default Signup;
