"use client";
import React, { useEffect, useState } from 'react'
import SendOtpForm from './SendOtpForm'
import toast from 'react-hot-toast';
import { useMutation } from "@tanstack/react-query";
import {getOtp , checkOtp} from '@/services/autchServices';
import CheckOtpForm from './CheckOtpForm';
import { useRouter } from 'next/navigation';

const RESEND_TIME = 90 ;

export default function AuthPage() {
  const router = useRouter();

  const [time , setTime] = useState(RESEND_TIME);

  const [phoneNumber , setPhoneNumber] = useState("");

  const [otp, setOtp] = useState("");

  const [step , setStep]=useState(2)

  const { data:OtpResponse , isLoading , mutateAsync:mutateGetOtp } = useMutation({mutationFn:getOtp,});

  const { mutateAsync:mutateCheckOtp , isLoading:isCheckingOtp} = useMutation({mutationFn:checkOtp,});
 
  useEffect(()=>{
    const timer = time > 0 && setInterval(()=>setTime((t)=>t-1),1000);
    return ()=>{
      if(timer) clearInterval(timer);
    }
  },[time])

  const phoneNumberHandler =(e)=>{
    setPhoneNumber(e.target.value);
  }

  const sendOtpHandler=async(e)=>{
    e.preventDefault();
    try{
      const data = await mutateGetOtp({phoneNumber});   
      toast.success(data.message);
      setStep(2);
      setTime(RESEND_TIME);
      setOtp("");
    }catch(error){

      toast.error(error?.response?.data.message)

    }
  }

  const checkOtpHandler=async(e)=>{
    e.preventDefault();

    try{
      const {message , user} = await mutateCheckOtp({phoneNumber , otp});   
      toast.success(message);
      if(user.isActive){
        router.push("/");
      }else{
        router.push("/complete-profile")
      }
    }catch(error){

      toast.error(error?.response?.data.message)

    }
  }

  const renderSteps=()=>{
    switch(step){
      case 1:
        return(
          <SendOtpForm 
              phoneNumber={phoneNumber} 
              onChange={phoneNumberHandler}
              onsubmit={sendOtpHandler}  
              isLoading={isLoading}
            />
        );
      case 2:
        return (
          <CheckOtpForm 
              onBack={()=>setStep((s)=>s-1)}
              onSubmit={checkOtpHandler} 
              otp={otp}
              setOtp={setOtp}
              time={time}
              onResendOtp={sendOtpHandler}
              OtpResponse={OtpResponse}
              isCheckingOtp={isCheckingOtp}
              />
        )
      default:
        return null;
    }
  }

  return (

    <div className='flex justify-center'>
        <div className='w-full sm:max-w-sm'>
          {renderSteps()}
        </div>
    </div>
  )
}
