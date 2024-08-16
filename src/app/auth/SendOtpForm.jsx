import Loading from "@/common/Loading";
import TextFild from '@/common/TextFild'


export default function SendOtpForm({phoneNumber , onChange ,onsubmit,isLoading}) {
  
  return (
    <div>
        <form className='space-y-10' onSubmit={onsubmit}>
            <div>
                <TextFild 
                  label="شماره موبایل"
                  name="phoneNumber" 
                  value={phoneNumber} 
                  onChange={onChange }
                  
                  />
            </div>
            <div>
                {
                  isLoading ? (
                  <Loading />
                ):(
                  <button type="submit" className="btn btn--primary w-full">
                    ارسال کد تایید
                  </button>
                )}
             </div>
        </form>
    </div>
  )
}
