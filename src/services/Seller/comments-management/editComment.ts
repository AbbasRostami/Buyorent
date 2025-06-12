import { usePut } from "@/utils/hooks/useReactQueryHooks";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

export const useEditComment = (commentId: number) => {
  const queryClient = useQueryClient();

  return usePut(`/comments/${commentId}`, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
      toast.success("کامنت با موفقیت ویرایش شد");
    },
    onError: () => {
      toast.error("خطا در ویرایش کامنت");
    },
  });
};
