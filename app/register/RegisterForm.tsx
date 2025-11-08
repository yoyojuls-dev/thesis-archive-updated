"use client";

import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-hot-toast";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { SafeUser } from "@/types";

interface RegisterFormProps {
  currentUser: SafeUser | null;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ currentUser }) => {
  const [isLoading, setIsLoading] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const router = useRouter();

  useEffect(() => {
    if (currentUser) {
      router.push("/cart");
      router.refresh();
    }
  }, []);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios
      .post("/api/register", data)
      .then(() => {
        toast.success("Account created");

        signIn("credentials", {
          email: data.email,
          password: data.password,
          redirect: false,
        }).then((callback) => {
          if (callback?.ok) {
            router.push("/cart");
            router.refresh();
            toast.success("Logged In");
          }

          if (callback?.error) {
            toast.error(callback.error);
          }
        });
      })
      .catch(() => toast.error("Something went wrong"))
      .finally(() => {
        setIsLoading(false);
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

      {/* Right Side - Register Form */}
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
            <p className="text-xs text-gray-500 mt-2">Create your account</p>
          </div>

          {/* Register Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Name Input */}
            <div>
              <label 
                htmlFor="name" 
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Full Name
              </label>
              <input
                id="name"
                type="text"
                disabled={isLoading}
                {...register("name", { required: "Name is required" })}
                className={`
                  w-full px-4 py-3 
                  border-2 rounded-lg
                  focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent
                  transition duration-200
                  ${errors.name ? 'border-red-500' : 'border-gray-300'}
                  ${isLoading ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}
                `}
                placeholder="Enter your full name"
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.name.message as string}
                </p>
              )}
            </div>

            {/* Email Input */}
            <div>
              <label 
                htmlFor="email" 
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                disabled={isLoading}
                {...register("email", { 
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address"
                  }
                })}
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
                  {...register("password", { 
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters"
                    }
                  })}
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

            {/* Terms and Conditions */}
            <div className="flex items-start">
              <input
                type="checkbox"
                id="terms"
                className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500 mt-1"
                required
              />
              <label htmlFor="terms" className="ml-2 text-xs text-gray-600">
                I agree to the{" "}
                <a href="/terms" className="text-red-600 hover:underline">
                  Terms and Conditions
                </a>{" "}
                and{" "}
                <a href="/privacy" className="text-red-600 hover:underline">
                  Privacy Policy
                </a>
              </label>
            </div>

            {/* Register Button */}
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
                  Creating Account...
                </span>
              ) : (
                'Create Account'
              )}
            </button>

            {/* Login Link */}
            <div className="text-center mt-6">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <a 
                  href="/login" 
                  className="text-red-600 font-semibold hover:text-red-700 hover:underline"
                >
                  Sign In
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;