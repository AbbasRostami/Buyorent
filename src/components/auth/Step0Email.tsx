"use client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Spinner } from "@heroui/react";
import { usePost } from "@/utils/hooks/useReactQueryHooks";
import toast from "react-hot-toast";
import { StartRegistrationResponse, Step0EmailProps } from "@/types/AuthTypes";
import { validationStepEmail } from "@/utils/validation/AuthValidation";

export const Step0Email = ({ onSuccess }: Step0EmailProps) => {
  const { mutate, isPending } = usePost<StartRegistrationResponse>(
    "/auth/start-registration",
    {
      onSuccess: (data, values) => {
        toast.success("کد تایید با موفقیت ارسال شد");
        onSuccess(data.tempUserId, values.email);
        console.log("Email sent to Step1Verification:", data.email);
      },
      onError: (error: any) => {
        toast.error(error.response?.data?.message || "خطا در ارسال کد تایید");
      },
    }
  );
  const handleSubmit = (values: { email: string }) => {
    mutate({ email: values.email });
  };

  return (
    <Formik
      initialValues={{ email: "" }}
      validationSchema={validationStepEmail}
      onSubmit={handleSubmit}
    >
      {({ touched, errors }) => (
        <Form className="flex flex-col items-center gap-6">
          <p className="font-bold text-2xl">ایجاد حساب کاربری</p>

          <div className="flex flex-col w-full items-center">
            <label className="text-[#D27700] w-full font-bold text-right">
              ایمیل
            </label>

            <Field
              name="email"
              type="email"
              placeholder="ایمیل خود را وارد کنید"
              className={`border-2 dark:bg-gray-800 dark:placeholder:text-amber-100 border-[#CCCCCC] bg-white rounded-lg w-[300px] h-[40px] p-2 ${
                touched.email && errors.email ? "border-red-500" : ""
              }`}
            />

            <ErrorMessage
              name="email"
              component="div"
              className="text-red-500 text-sm text-right mt-1 w-[300px]"
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="bg-gradient-to-r from-[#E89300] to-[#FFB84D] cursor-pointer w-fit px-14 h-[40px] text-white rounded-xl shadow-lg hover:shadow-2xl hover:bg-gradient-to-r hover:from-[#FFB84D] hover:to-[#E89300] transition-all duration-500 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#E89300] focus:ring-opacity-50"
          >
            {isPending ? <Spinner size="sm" /> : "دریافت کد تایید"}
          </button>
        </Form>
      )}
    </Formik>
  );
};
