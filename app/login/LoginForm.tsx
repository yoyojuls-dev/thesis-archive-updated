"use client";

import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-hot-toast";
import { SafeUser } from "@/types";

interface LoginFormProps {
  currentUser: SafeUser | null;
}

const LoginForm: React.FC<LoginFormProps> = ({ currentUser }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  
  const searchParams = useSearchParams();
  const userType = searchParams ? (searchParams.get('type') || 'student') : 'student';
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();

  useEffect(() => {
    if (currentUser) {
      // Redirect based on user role
      if (currentUser.role === 'ADMIN') {
        router.push("/admin");
      } else {
        router.push("/");
      }
      router.refresh();
    }
  }, [currentUser, router]);

 const onSubmit: SubmitHandler<FieldValues> = (data) => {
  setIsLoading(true);
  signIn("credentials", {
    ...data,
    userType: userType, // Pass the expected user type for validation
    redirect: false,
  }).then((callback) => {
    setIsLoading(false);

    if (callback?.ok) {
      window.location.reload();
      toast.success("Logged In");
    }

    if (callback?.error) {
      toast.error(callback.error);
    }
  });
};

  if (currentUser) {
    return <p className="text-center">Logged in. Redirecting...</p>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/images/thesis-bg.gif')",
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
        }}
      />
      
      {/* Overlay for better readability */}
      <div className="absolute inset-0 bg-white/30 z-0" />

      {/* Left Side - Title */}
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center relative z-10 px-12">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-red-600 leading-tight mb-4">
            THESIS<br/>
            ARCHIVE<br/>
            MANAGEMENT<br/>
            SYSTEM
          </h1>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center relative z-10 px-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
          {/* Header with Logo */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center">
                <img 
                  src="/images/department-logo.png" 
                  alt="Department Logo"
                  className="w-14 h-14 object-contain"
                />
              </div>
            </div>
            <h2 className="text-sm text-gray-600 uppercase tracking-wide">
              Computer Studies Department
            </h2>
            <p className="text-lg font-semibold text-gray-900 mt-3">
              Sign in as {userType === 'admin' ? 'Administrator' : 'Student'}
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email Input */}
            <div>
              <label 
                htmlFor="email" 
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                disabled={isLoading}
                {...register("email", { required: "Email is required" })}
                className={`
                  w-full px-4 py-3 
                  border-2 rounded-lg
                  focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent
                  transition duration-200
                  ${errors.email ? 'border-red-500' : 'border-gray-300'}
                  ${isLoading ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}
                `}
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message as string}
                </p>
              )}
            </div>

            {/* Password Input */}
            <div>
              <label 
                htmlFor="password" 
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type="password"
                  disabled={isLoading}
                  {...register("password", { required: "Password is required" })}
                  className={`
                    w-full px-4 py-3 pr-12
                    border-2 rounded-lg
                    focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent
                    transition duration-200
                    ${errors.password ? 'border-red-500' : 'border-gray-300'}
                    ${isLoading ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}
                  `}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" 
                    />
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" 
                    />
                  </svg>
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password.message as string}
                </p>
              )}
            </div>

            {/* Remember Me and Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                />
                <span className="ml-2 text-sm text-gray-600">Remember me</span>
              </label>
              <a 
                href="/forgot-password" 
                className="text-sm text-red-600 hover:text-red-700 hover:underline"
              >
                Forgot password?
              </a>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`
                w-full py-3 px-4 
                bg-red-600 hover:bg-red-700 
                text-white font-semibold rounded-lg
                transition duration-200
                focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2
                ${isLoading ? 'opacity-50 cursor-not-allowed' : 'transform hover:scale-[1.02]'}
              `}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg 
                    className="animate-spin h-5 w-5 mr-3" 
                    viewBox="0 0 24 24"
                  >
                    <circle 
                      className="opacity-25" 
                      cx="12" 
                      cy="12" 
                      r="10" 
                      stroke="currentColor" 
                      strokeWidth="4"
                    />
                    <path 
                      className="opacity-75" 
                      fill="currentColor" 
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Loading...
                </span>
              ) : (
                'Login'
              )}
            </button>

            {/* Contact Admin */}
            <div className="text-center mt-6">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <span className="text-red-600 font-semibold">
                  Contact your administrator
                </span>
              </p>
              <p className="text-sm text-gray-500 mt-3">
                Logging in as {userType === 'admin' ? 'Administrator' : 'Student'}?{" "}
                <a 
                  href={`/login?type=${userType === 'admin' ? 'student' : 'admin'}`}
                  className="text-red-600 hover:text-red-700 hover:underline font-medium"
                >
                  Switch to {userType === 'admin' ? 'Student' : 'Admin'} Login
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;