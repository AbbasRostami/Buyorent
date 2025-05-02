"use client";
import { useState } from "react";
import { Spinner } from "@heroui/react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { HiEye, HiEyeSlash } from "react-icons/hi2";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { LoginValues, Step3LoginProps } from "@/types/AuthTypes";
import { loginSchema } from "@/utils/validation/AuthValidation";

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
  );
};
