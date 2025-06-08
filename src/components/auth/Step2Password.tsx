"use client";
import { useState } from "react";
import { Spinner } from "@heroui/react";
import { HiEye, HiEyeSlash } from "react-icons/hi2";
import { usePost } from "@/utils/hooks/useReactQueryHooks";
import toast from "react-hot-toast";
import { Step2PasswordProps, Step2PasswordValues } from "@/types/AuthTypes";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { validationStepPassword } from "@/utils/validation/AuthValidation";

export const Step2Password = ({
  userId,
  onSuccess,
  goBack,
}: Step2PasswordProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const { mutate, isPending } = usePost("/auth/complete-registration", {
    onSuccess: () => {
      toast.success("ثبت نام با موفقیت تکمیل شد");
      onSuccess();
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "خطا در تکمیل ثبت نام");
    },
  });

  const handleSubmit = (values: Step2PasswordValues) => {
    mutate({
      userId: parseInt(userId),
      password: values.password,
      phoneNumber: values.phoneNumber,
    });
  };

  return (
    <Formik
      initialValues={{
        phoneNumber: "",
        password: "",
        confirmPassword: "",
      }}
      validationSchema={validationStepPassword}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue }) => (
        <Form className="flex flex-col items-center gap-6 w-full">
          <p className="font-bold text-xl">تنظیم اطلاعات نهایی</p>

          <div className="w-full space-y-4 max-w-[300px]">
            <div className="relative">
              <label className="text-[#D27700] font-bold block text-right mb-2">
                شماره تلفن همراه
              </label>
              <Field
                name="phoneNumber"
                type="tel"
                className="border-2 border-[#CCCCCC] rounded-lg p-2 w-full dark:bg-gray-800 dark:placeholder:text-amber-100"
                placeholder="09xxxxxxxxx"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFieldValue(
                    "phoneNumber",
                    e.target.value.replace(/\D/g, "").slice(0, 11)
                  )
                }
              />
              <ErrorMessage
                name="phoneNumber"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Password Field */}
            <div className="relative">
              <label className="text-[#D27700] font-bold block text-right mb-2">
                رمز عبور
              </label>
              <div className="relative">
                <Field
                  name="password"
                  type={showPassword ? "text" : "password"}
                  className="border-2 border-[#CCCCCC] rounded-lg p-2 w-full pr-10 dark:bg-gray-800 dark:placeholder:text-amber-100"
                  placeholder="حداقل ۶ کاراکتر"
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
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Confirm Password Field */}
            <div className="relative">
              <label className="text-[#D27700] font-bold block text-right mb-2">
                تکرار رمز عبور
              </label>
              <div className="relative">
                <Field
                  name="confirmPassword"
                  type={showConfirm ? "text" : "password"}
                  className="border-2 border-[#CCCCCC] rounded-lg p-2 w-full pr-10 dark:bg-gray-800 dark:placeholder:text-amber-100"
                  placeholder="تکرار رمز عبور"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-xl text-gray-500"
                >
                  {showConfirm ? <HiEyeSlash /> : <HiEye />}
                </button>
              </div>
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col-reverse lg:flex-row gap-4 w-full justify-center">
            <button
              type="button"
              onClick={goBack}
              className="bg-gray-200 text-gray-700 px-8 cursor-pointer py-2 rounded-xl hover:bg-gray-300 transition-colors"
            >
              بازگشت
            </button>

            <button
              type="submit"
              disabled={isPending}
              className="bg-gradient-to-r from-[#E89300] to-[#FFB84D] cursor-pointer text-white px-14 py-2 rounded-xl shadow-lg hover:shadow-md transition-all disabled:opacity-50"
            >
              {isPending ? <Spinner size="sm" /> : "تکمیل ثبت نام"}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
