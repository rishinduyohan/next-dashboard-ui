import Image from "next/image";
import Link from "next/link";

const SignInPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-RishlightSky via-white to-RishpurpleLight flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <Image src="/logo.png" alt="SchoolDev Logo" width={48} height={48} />
          <h1 className="text-2xl font-semibold text-gray-800">SchoolDev</h1>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-1">Welcome back</h2>
          <p className="text-sm text-gray-500 mb-8">Sign in to your account</p>

          <form className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm font-semibold text-gray-700">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="your@email.com"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-Rishsky focus:border-transparent transition-all"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="text-sm font-semibold text-gray-700">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-Rishsky focus:border-transparent transition-all"
              />
              <div className="text-right">
                <Link href="#" className="text-xs text-blue-500 hover:underline">
                  Forgot password?
                </Link>
              </div>
            </div>

            <Link href="/admin">
              <button
                type="button"
                className="w-full bg-Rishsky hover:bg-blue-200 text-gray-800 font-semibold py-3 rounded-xl transition-colors duration-200 text-sm"
              >
                Sign In
              </button>
            </Link>
          </form>

          <div className="mt-6 flex flex-col gap-2">
            <p className="text-xs text-center text-gray-400">Sign in as:</p>
            <div className="flex gap-2 justify-center flex-wrap">
              <Link href="/admin" className="px-3 py-1 bg-Rishsky rounded-full text-xs font-semibold hover:opacity-80 transition-opacity">Admin</Link>
              <Link href="/teacher" className="px-3 py-1 bg-Rishpurple rounded-full text-xs font-semibold hover:opacity-80 transition-opacity">Teacher</Link>
              <Link href="/student" className="px-3 py-1 bg-Rishyellow rounded-full text-xs font-semibold hover:opacity-80 transition-opacity">Student</Link>
              <Link href="/parent" className="px-3 py-1 bg-green-100 rounded-full text-xs font-semibold hover:opacity-80 transition-opacity">Parent</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;