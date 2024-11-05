"use client"
import Button from '@/constants/Button'
import RHFTextField from '@/constants/RHFTextField';
import { useForm } from 'react-hook-form'
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import Link from 'next/link';
import { useAuth } from '../../../../context/AuthContext';

const schema = yup
  .object({
    email: yup.string().email("ایمیل نامعتبر است").required("ایمیل الزامی است"),
    password: yup.string().required("رمزعبور الزامی است"),
  }).required();



export default function SignIn() {

    const {register,
        handleSubmit,
        formState: { errors },} = useForm({
        resolver: yupResolver(schema),
        mode:"onTouched"
    });

    const { signin } = useAuth();
    const onSubmit = async (values) => {
      await signin(values);
    };


    return (
        <div>
            <h1 className="text-xl font-bold text-secondary-500 text-center mb-6">ورود</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
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
                <Button
                    type="submit"
                    className="py-3 px-4 btn btn--primary rounded-xl w-full"
                    >
                    ورود
                </Button>
            </form>
            <div className="flex justify-center align-middle items-center ">
                <Link href="/signup" className="text-secondary-500 mt-6 text-center btn border border-primary-500 w-2/4 hover:bg-primary-900 hover:text-secondary-900 transition-all ease-out duration-300">
                    ثبت نام
                </Link>
            </div>
        </div>
    )
}
