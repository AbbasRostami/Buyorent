import { usePost } from "@/utils/hooks/useReactQueryHooks";
import { toast } from "react-hot-toast";

export const useCreateHouse = (onClose?: () => void) => {
  const { mutate, isPending } = usePost("/houses", {
    onSuccess: () => {
      toast.success("آگهی با موفقیت ثبت شد");
      if (onClose) onClose();
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "خطا در ثبت آگهی");
    },
  });

  return {
    createHouse: mutate,
    isPending,
  };
};
