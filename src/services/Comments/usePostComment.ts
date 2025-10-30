import { usePost } from "@/utils/hooks/useReactQueryHooks";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

export interface NewCommentPayload {
  title?: string;
  caption?: string;
  rating?: number;
  parent_comment_id?: string | null;
}

export function usePostComment(houseId: string) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = usePost<any, NewCommentPayload>(
    `/houses/${houseId}/comments`,
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["comments", houseId] });
        toast.success("نظر شما با موفقیت ثبت شد");
      },
      onError: () => {
        toast.error("خطا در ثبت نظر!");
      },
    }
  );

  return { postComment: mutate, isPosting: isPending };
}
