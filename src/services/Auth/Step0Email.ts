import { usePost } from "@/utils/hooks/useReactQueryHooks";
import { toast } from "react-hot-toast";
import { StartRegistrationResponse } from "@/types/Auth/AuthTypes";
import { ApiError } from "@/types/api/ErrorTypes";

interface StartRegistrationValues {
  email: string;
}

export const useStartRegistration = (
  onSuccess: (tempUserId: string, email: string) => void
) => {
  const { mutate, isPending } = usePost<
    StartRegistrationResponse,
    StartRegistrationValues
  >("/auth/register", {
    onSuccess: (data, values) => {
      toast.success("کد تایید با موفقیت ارسال شد");
      onSuccess(data.tempUserId, values.email);
    },
    onError: (error: ApiError) => {
      const errorMessage =
        error.response?.data?.message || "خطا در ارسال کد تایید";
      toast.error(errorMessage);
    },
  });

  return { startRegistration: mutate, isPending };
};
