import { usePost } from "@/utils/hooks/useReactQueryHooks";
import { toast } from "react-hot-toast";
import { Step2PasswordValues } from "@/types/Auth/AuthTypes";

interface CompleteRegistrationValues extends Step2PasswordValues {
  userId: number;
}

export const useCompleteRegistration = (onSuccess: () => void) => {
  const { mutate, isPending } = usePost<void, CompleteRegistrationValues>(
    "/auth/complete-registration",
    {
      onSuccess: () => {
        toast.success("ثبت نام با موفقیت تکمیل شد");
        onSuccess();
      },
      onError: (error: any) => {
        toast.error(error.response?.data?.message || "خطا در تکمیل ثبت نام");
      },
    }
  );

  return { completeRegistration: mutate, isPending };
};
