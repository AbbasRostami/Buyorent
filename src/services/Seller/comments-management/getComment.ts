import { CommentsData } from "@/types/Seller/comments-management/CommentTypes";
import { useGet } from "@/utils/hooks/useReactQueryHooks";
import { Session } from "next-auth";

export const useGetComment = (
  pagination: { pageIndex: number; pageSize: number },
  session: Session
) => {
  const { data: comments, isLoading } = useGet<{
    data: CommentsData[];
    totalCount: number;
  }>(
    "/comments",
    {
      page: pagination.pageIndex + 1,
      limit: pagination.pageSize,
      sort: "created_at",
      order: "DESC",
      user_id: session?.id,
    },
    {
      queryKey: [
        "comments",
        {
          page: pagination.pageIndex + 1,
          limit: pagination.pageSize,
          sort: "created_at",
          order: "DESC",
          user_id: session?.id,
        },
      ],
    }
  );

  return { comments, isLoading };
};
