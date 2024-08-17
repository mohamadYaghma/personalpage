import React from 'react'
import OTPInput from 'react-otp-input'
import {HiArrowNarrowRight} from 'react-icons/hi'
import {CiEdit} from 'react-icons/ci'
import Loading from '@/common/Loading'

export default function CheckOtpForm({onSubmit , otp , setOtp,  onBack , time  , onResendOtp , OtpResponse , isCheckingOtp}) {
  return (
    <div>
        <button onClick={onBack} className="mb-4">
          <HiArrowNarrowRight  className='w-6 h-6 text-secondary-500'/>
        </button>
        {
          OtpResponse && (
            <p>{OtpResponse?.message}
              <button onClick={onBack} className="mb-4">
                <CiEdit  className='w-6 h-6 text-primary-900'/>
              </button>
            </p>
        
          )
        }
        
        <form className='space-y-10' onSubmit={onSubmit}>
            <h2 className="text-primary-900 font-bold flex justify-center">کد تایید را وارد کنید</h2>
            <OTPInput
                value={otp}
                onChange={setOtp}
                numInputs={6}
                renderSeparator={<span>-</span>}
                inputStyle={{
                  width:"2.5rem",
                  padding:"0.5rem 0.2rem",
                  border:"1px solid rgb(var(--color-primary-300))",
                  borderRadius:".5rem",
                }}
                containerStyle="flex flex-row-reverse gap-x-2 justify-center"
                renderInput={(props) => <input {...props} />          
              }
    />
    <div className="mb-4 flex flex-row-reverse">
          { time > 0 ? (
            <p className="text-purple-600">{time}ثانیه تا ارسال مجدد کد </p> ) : ( 
            <button onClick={onResendOtp}>ارسال مجدد کد</button> 
            )}
        </div>
            <div>
            {(
                isCheckingOtp ? (<Loading />): (
                <button type="submit" className="btn btn--primary w-full">
                    تایید
                </button>
          ))}
             </div>
        </form>
    </div>
  )
}
