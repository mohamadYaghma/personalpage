import Link from 'next/link';

export default function AuthPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-primary-500 to-primary-400 p-6">
      <h2 className="text-2xl font-bold text-secondary-900 mb-6">روش ورود خود را انتخاب کنید</h2>
      <div className="space-y-4 w-full max-w-sm">
        <Link href="/auth/signin-phone">
          <button className="btn w-full bg-white text-primary-600 hover:bg-primary-600 hover:text-white transition duration-200 rounded-lg py-3 shadow-md">
            ورود با شماره تلفن
          </button>
        </Link>
        <Link href="/auth/signin-email">
          <button className="btn w-full bg-white text-primary-600 hover:bg-primary-600 hover:text-white transition duration-200 rounded-lg py-3 shadow-md">
            ورود با ایمیل و رمز عبور
          </button>
        </Link>
        <Link href="/auth/signup">
          <button className="btn w-full bg-white text-primary-600 hover:bg-primary-600 hover:text-white transition duration-200 rounded-lg py-3 shadow-md">
            ثبت نام
          </button>
        </Link>
      </div>
    </div>
  );
}
