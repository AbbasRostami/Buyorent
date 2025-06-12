import { useDelete } from "@/utils/hooks/useReactQueryHooks";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

export const useDeleteComment = () => {
  const queryClient = useQueryClient();

  return useDelete((id: number) => `/comments/${id}`, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
      toast.success("کامنت با موفقیت حذف شد");
    },
    onError: () => {
      toast.error("خطا در حذف کامنت");
    },
  });
};
