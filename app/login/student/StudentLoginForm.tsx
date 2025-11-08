"use client";

import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import Link from "next/link";

const StudentLoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  
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

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    signIn("credentials", {
      ...data,
      userType: "student",
      redirect: false,
    }).then((callback) => {
      setIsLoading(false);

      if (callback?.ok) {
        toast.success("Logged In Successfully");
        router.push("/");
        router.refresh();
      }

      if (callback?.error) {
        toast.error(callback.error);
      }
    });
  };

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
      
      {/* Overlay */}
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
              Student Login
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
                  ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
                `}
                placeholder="student@example.com"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message as string}</p>
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
              <input
                id="password"
                type="password"
                disabled={isLoading}
                {...register("password", { required: "Password is required" })}
                className={`
                  w-full px-4 py-3 
                  border-2 rounded-lg
                  focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent
                  transition duration-200
                  ${errors.password ? 'border-red-500' : 'border-gray-300'}
                  ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
                `}
                placeholder="••••••••"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password.message as string}</p>
              )}
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
                  Logging in...
                </span>
              ) : (
                'Login as Student'
              )}
            </button>

            {/* Links */}
            <div className="text-center mt-6">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <span className="text-red-600 font-semibold">
                  Contact your administrator
                </span>
              </p>
              <p className="text-sm text-gray-500 mt-3">
                Are you an administrator?{" "}
                <Link 
                  href="/login/admin"
                  className="text-red-600 hover:text-red-700 hover:underline font-medium"
                >
                  Login as Admin
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StudentLoginForm;