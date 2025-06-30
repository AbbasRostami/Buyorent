import { usePost } from "@/utils/hooks/useReactQueryHooks";
import { toast } from "react-hot-toast";
import { VerifyEmailResponse } from "@/types/Auth/AuthTypes";

interface VerifyEmailValues {
  tempUserId: number;
  verificationCode: string;
}

export const useVerifyEmail = (onSuccess: (userId: string) => void) => {
  const { mutate, isPending } = usePost<VerifyEmailResponse, VerifyEmailValues>(
    "/auth/verify-email",
    {
      onSuccess: (data) => {
        toast.success("ایمیل با موفقیت تایید شد");
        onSuccess(data.userId);
      },
      onError: (error: any) => {
        toast.error(error.response?.data?.message || "کد تایید نامعتبر است");
      },
    }
  );

  return { verifyEmail: mutate, isPending };
};

interface ResendCodeValues {
  email: string;
}

export const useResendCode = () => {
  const { mutate, isPending } = usePost<void, ResendCodeValues>(
    "/auth/resend-code",
    {
      onSuccess: () => toast.success("کد جدید ارسال شد"),
      onError: () => toast.error("خطا در ارسال مجدد کد"),
    }
  );

  return { resendCode: mutate, isPending };
};
