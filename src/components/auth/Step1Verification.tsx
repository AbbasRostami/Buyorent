"use client";
import { useState, useEffect } from "react";
import { InputOtp, Spinner } from "@heroui/react";
import { usePost } from "@/utils/hooks/useReactQueryHooks";
import toast from "react-hot-toast";
import { Step1VerificationProps, VerifyEmailResponse } from "@/types/AuthTypes";

export const Step1Verification = ({
  email,
  tempUserId,
  onSuccess,
  goBack,
}: Step1VerificationProps) => {
  const [code, setCode] = useState("");
  const [isResending, setIsResending] = useState(false);

  const { mutate: verify, isPending: isVerifying } = usePost(
    "/auth/verify-email",
    {
      onSuccess: (data: VerifyEmailResponse) => {
        toast.success("ایمیل با موفقیت تایید شد");
        onSuccess(data.userId);
      },
      onError: (error: any) => {
        toast.error(error.response?.data?.message || "کد تایید نامعتبر است");
        setCode("");
      },
    }
  );

  const { mutate: resendCode } = usePost("/auth/resend-code", {
    onSuccess: () => toast.success("کد جدید ارسال شد"),
    onError: () => toast.error("خطا در ارسال مجدد کد"),
  });

  const handleVerify = () => {
    if (code.length === 6) {
      verify({
        tempUserId: parseInt(tempUserId),
        verificationCode: code,
      });
    }
    console.log("Code verified:", code);
    console.log("Temp user ID:", tempUserId);
    console.log("Email:", email);
    console.log("Is verifying:", isVerifying);
    console.log("Is resending:", isResending);
    
  };

  const handleResendCode = () => {
    setIsResending(true);
    resendCode({ email });
    setTimeout(() => setIsResending(false), 30000);
  };

  useEffect(() => {
    console.log("Email changed:", email);
  }, [email]);

  return (
    <div className="flex flex-col items-center gap-6">
      <p className="font-bold text-2xl">تایید ایمیل</p>

      <p className="text-right text-sm text-gray-600 max-w-[300px] dark:text-amber-100">
        کد ۶ رقمی به آدرس
        <span className="text-[#D27700] mx-1 font-medium">{email}</span>
        ارسال شده است
      </p>

      <div className="flex flex-col w-full items-center">
        <InputOtp
          dir="ltr"
          value={code}
          onValueChange={setCode}
          onComplete={handleVerify}
          color="default"
          variant="faded"
          errorMessage="کد نامعتبر"
          length={6}
          size="md"
          className="justify-center"
        />

        <button
          type="button"
          onClick={handleResendCode}
          disabled={isResending}
          className="text-[#12e4e0] text-medium cursor-pointer mt-4 hover:underline disabled:opacity-50"
        >
          {isResending ? "ارسال مجدد ( 10 دقیقه )" : "ارسال مجدد کد"}
        </button>
      </div>

      <div className="flex gap-4 w-full justify-center">
        <button
          type="button"
          onClick={goBack}
          className="bg-gray-200 cursor-pointer text-gray-700 px-8 py-2 rounded-xl hover:bg-gray-300 transition-colors"
        >
          بازگشت
        </button>

        <button
          type="button"
          onClick={handleVerify}
          disabled={isVerifying || code.length < 6}
          className="bg-gradient-to-r from-[#E89300] to-[#FFB84D] cursor-pointer text-white px-14 py-2 rounded-xl shadow-lg hover:shadow-md transition-all disabled:opacity-50"
        >
          {isVerifying ? <Spinner size="sm" /> : "تایید"}
        </button>
      </div>
    </div>
  );
};
