import { Pagination, useDisclosure } from "@heroui/react";
import React, { useEffect, useMemo, useState } from "react";
import { useGet } from "@/utils/hooks/useReactQueryHooks";
import moment from "moment-jalaali";
import { Button } from "@heroui/react";
import NewCommentModal from "./NewCommentModal";
import CommentItem from "./CommentItem";
import { CommentType } from "@/types/CommetTypes";
import SkeletonComments from "@/components/skeleton/SkeletonComments";

moment.loadPersian({ dialect: "persian-modern" });

const LIMIT = 5;

const CommentSingleHouses = ({ houseId }: { houseId: string }) => {
  const [page, setPage] = useState(1);

  const { data: commentsPage = [], isLoading } = useGet<CommentType[]>(
    `/houses/${houseId}/comments`,
    { page, limit: LIMIT },
    { queryKey: ["comments", houseId, page] }
  );

  const buildCommentTree = (
    comments: CommentType[],
    parentId: string | null = null
  ): CommentType[] => {
    return comments
      .filter((comment) => comment.parent_comment_id === parentId)
      .map((comment) => ({
        ...comment,
        replies: buildCommentTree(comments, comment.id),
      }));
  };

  const comments = useMemo(
    () => buildCommentTree(commentsPage),
    [commentsPage]
  );
  useEffect(() => {
    if (!isLoading && commentsPage.length === 0 && page > 1) {
      setPage((prev) => prev - 1);
    }
  }, [commentsPage, isLoading]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div className="mt-6 space-y-6">
      <div className="flex items-center gap-4 mt-8 mb-10">
        <button className="px-4 py-1.5 border border-color2 cursor-pointer dark:hover:text-black hover:bg-amber-200 text-color1 rounded-full font-semibold text-medium">
          نظرات کاربران
        </button>
        <Button
          onPress={onOpen}
          className="px-4 py-1.5 text-color2 cursor-pointer dark:hover:text-black hover:bg-amber-200 rounded-full font-medium text-semibold flex items-center gap-1"
        >
          <span className="text-2xl leading-none">+</span>
          <span>نظر شما</span>
        </Button>

        <NewCommentModal
          houseId={houseId}
          isOpen={isOpen}
          onOpenChange={onOpenChange}
        />
      </div>
      {isLoading ? (
        <SkeletonComments />
      ) : (
        comments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} houseId={houseId} />
        ))
      )}

      {commentsPage.length === LIMIT && (
        <div
          dir="ltr"
          className="w-full flex justify-center items-center mb-10"
        >
          <Pagination
            className="mt-7  cursor-pointer"
            color="warning"
            showControls
            page={page}
            onChange={setPage}
            total={page + 1}
          />
        </div>
      )}
    </div>
  );
};

export default CommentSingleHouses;
