"use client";
import { useState } from "react";
import { Spinner } from "@heroui/react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { HiEye, HiEyeSlash } from "react-icons/hi2";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { LoginValues, Step3LoginProps } from "@/types/AuthTypes";
import { loginSchema } from "@/utils/validation/AuthValidation";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
export const Step3Login = ({ onSuccess }: Step3LoginProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (values: LoginValues) => {
    try {
      const res = await signIn("credentials", {
        ...values,
        redirect: false,
      });

      if (res?.ok) {
        toast.success("ورود با موفقیت انجام شد");
        onSuccess();
      } else {
        toast.error(res?.error || "خطا در ورود. لطفاً مجدداً تلاش کنید");
      }
    } catch (error) {
      toast.error("خطایی در ارتباط با سرور رخ داد");
    }
  };

  return (
    <>
      <div className="w-full max-w-[300px]">
        <h2 className="font-bold text-2xl text-[#444444] dark:text-amber-100 mb-6 text-center">
          ورود به حساب کاربری
        </h2>

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={loginSchema}
          onSubmit={handleLogin}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form className="space-y-4">
              <div className="space-y-2">
                <label className="text-[#D27700] font-bold block text-right">
                  ایمیل
                </label>
                <Field
                  name="email"
                  type="email"
                  className={`w-full p-2 border-2 rounded-lg ${
                    errors.email && touched.email
                      ? "border-red-500"
                      : "border-[#CCCCCC]"
                  } dark:bg-gray-800 dark:placeholder:text-amber-100`}
                  placeholder="example@example.com"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm text-right"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[#D27700] font-bold block text-right">
                  رمز عبور
                </label>
                <div className="relative">
                  <Field
                    name="password"
                    type={showPassword ? "text" : "password"}
                    className={`w-full p-2 border-2 rounded-lg pr-10 ${
                      errors.password && touched.password
                        ? "border-red-500"
                        : "border-[#CCCCCC]"
                    } dark:bg-gray-800 dark:placeholder:text-amber-100`}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-xl text-gray-500"
                  >
                    {showPassword ? <HiEyeSlash /> : <HiEye />}
                  </button>
                </div>
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm text-right"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full cursor-pointer mt-2 bg-gradient-to-r from-[#E89300] to-[#FFB84D] text-white py-2 rounded-xl shadow-lg hover:shadow-md transition-all disabled:opacity-50"
              >
                {isSubmitting ? <Spinner size="sm" /> : "ورود"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
      <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 w-full">
        <button
          onClick={() => signIn("github", { callbackUrl: "/" })}
          className="w-full cursor-pointer sm:w-auto flex-1 flex justify-center items-center gap-2 bg-white dark:bg-slate-800 text-gray-800 dark:text-white py-2 px-4 rounded-xl shadow-md hover:bg-gray-100 dark:hover:bg-slate-700 transition-all duration-300 transform hover:scale-105"
        >
          <FaGithub size={22} />
          <span className="text-sm sm:text-base font-medium">ورود گیتهاب</span>
        </button>

        <button
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="w-full cursor-pointer sm:w-auto flex-1 flex justify-center items-center gap-2 bg-white dark:bg-slate-800 text-black dark:text-white py-2 px-4 rounded-xl shadow-md hover:bg-amber-100 dark:hover:bg-amber-300/10 transition-all duration-300 transform hover:scale-105"
        >
          <FcGoogle size={22} />
          <span className="text-sm sm:text-base font-medium">ورود گوگل</span>
        </button>
      </div>
    </>
  );
};
