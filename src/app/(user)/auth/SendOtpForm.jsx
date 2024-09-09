import Loading from "@/common/Loading";
import TextFild from '@/common/TextFild'

export default function SendOtpForm({ phoneNumber, onChange, onsubmit, isLoading }) {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-md px-4 py-8 bg-white shadow-lg rounded-lg">
        <form className="space-y-6" onSubmit={onsubmit}>
          <div>
            <TextFild
              label="شماره موبایل"
              name="phoneNumber"
              value={phoneNumber}
              onChange={onChange}
            />
          </div>
          <div>
            {isLoading ? (
              <Loading />
            ) : (
              <button
                type="submit"
                className="btn btn--primary w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-full transition duration-300 hover:-translate-y-1 shadow-xl"
              >
                ارسال کد تایید
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
