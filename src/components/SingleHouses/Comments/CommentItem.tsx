import React, { useState } from "react";
import Image from "next/image";
import { IoHeartCircleOutline } from "react-icons/io5";
import defaultAvatar from "../../../assets/Avatar1.png";
import { usePost } from "@/utils/hooks/useReactQueryHooks";
import { useQueryClient } from "@tanstack/react-query";
import moment from "moment-jalaali";
import { Formik, Field, Form, ErrorMessage, FormikHelpers } from "formik";
import { Button, Accordion, AccordionItem } from "@heroui/react";
import { validationComment } from "@/utils/validation/CommentValidation";
import {
  CommentItemProps,
  CreateReplyInput,
  CreateReplyResponse,
  ReplyFormValues,
} from "@/types/CommetTypes";

moment.loadPersian({ dialect: "persian-modern" });

const CommentItem: React.FC<CommentItemProps> = ({
  comment,
  houseId,
  depth = 0,
}) => {
  const queryClient = useQueryClient();
  const [activeReply, setActiveReply] = useState<string | null>(null);

  const { mutate: postReply } = usePost<CreateReplyResponse, CreateReplyInput>(
    `/houses/${houseId}/comments`,
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["comments", houseId] });
      },
    }
  );

  const handleSubmit = (
    values: ReplyFormValues,
    { resetForm }: FormikHelpers<ReplyFormValues>
  ) => {
    postReply({
      title: values.title,
      caption: values.caption,
      parent_comment_id: comment.id,
      rating: 4,
    });
    resetForm();
    setActiveReply(null);
  };

  return (
    <div
      className={`bg-[#f9f9f9] dark:bg-gray-800 rounded-2xl p-4 shadow-sm space-y-4 ${
        depth > 0 ? "ml-6 mt-4" : ""
      }`}
      style={{ marginLeft: `${depth * 2}rem` }}
    >
      {/* هدر کامنت */}
      <div className="flex items-center gap-3">
        <Image
          src={comment?.user?.profilePicture || defaultAvatar}
          alt={comment?.user?.fullName}
          width={40}
          height={40}
          className="w-10 h-10 rounded-full object-cover"
          loading="lazy"
          placeholder="blur"
          blurDataURL="/placeholder-avatar.png"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="text-medium font-semibold truncate">
              {comment?.user?.fullName}
            </h3>
            {comment?.title && (
              <span className="text-sm text-gray-500 dark:text-gray-400">
                ({comment?.title})
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <span
              title={moment(comment?.created_at).format(
                "jD jMMMM jYYYY - HH:mm"
              )}
            >
              {moment(comment?.created_at).fromNow()}
            </span>
            <span className="text-color2">•</span>
            <div className="flex items-center gap-1">
              <IoHeartCircleOutline className="text-color2" />
              <span>{comment?.rating}</span>
            </div>
          </div>
        </div>
      </div>

      {/* متن کامنت */}
      <p className="text-medium font-medium text-gray-800 dark:text-amber-50 leading-6">
        {comment.caption}
      </p>

      {/* دکمه پاسخ */}
      <div className="flex items-center justify-between">
        <Button
          variant="light"
          color="warning"
          size="md"
          className="text-sm"
          onClick={() =>
            setActiveReply((prev) => (prev === comment.id ? null : comment.id))
          }
        >
          {activeReply === comment.id ? "لغو پاسخ" : "پاسخ دادن"}
        </Button>
      </div>

      {/* فرم پاسخ */}
      {activeReply === comment.id && (
        <Formik
          initialValues={{ title: "", caption: "" }}
          validationSchema={validationComment}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, isValid }) => (
            <Form className="pt-4 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">عنوان</label>
                <Field
                  name="title"
                  placeholder="عنوان پاسخ..."
                  className="w-full rounded-lg border border-color2 dark:border-color1 p-3 text-sm bg-white dark:bg-gray-900"
                />
                <ErrorMessage
                  name="title"
                  component="div"
                  className="text-sm text-red-500 mt-1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  متن پاسخ
                </label>
                <Field
                  as="textarea"
                  name="caption"
                  rows={3}
                  placeholder="پاسخ خود را بنویسید..."
                  className="w-full rounded-lg border border-color2 dark:border-color1 p-3 text-sm bg-white dark:bg-gray-900"
                />
                <ErrorMessage
                  name="caption"
                  component="div"
                  className="text-sm text-red-500 mt-1"
                />
              </div>
              <div className="flex gap-2 justify-end">
                <Button
                  variant="flat"
                  color="warning"
                  onPress={() => setActiveReply(null)}
                >
                  انصراف
                </Button>
                <Button
                  type="submit"
                  color="warning"
                  isLoading={isSubmitting}
                  isDisabled={!isValid}
                >
                  ارسال پاسخ
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      )}

      {/* نمایش ریپلای‌ها */}
      {comment.replies.length > 0 && (
        <Accordion selectionMode="multiple">
          <AccordionItem
            aria-label={`پاسخ‌های ${comment.user.fullName}`}
            title={
              <span className="text-sm font-bold text-color1 cursor-pointer">
                مشاهده {comment.replies.length} پاسخ ↓
              </span>
            }
          >
            <div className="mt-4 space-y-4 pl-4 border-r-2 border-color2/80 rounded-2xl">
              {comment.replies.map((reply) => (
                <CommentItem
                  key={reply.id}
                  comment={reply}
                  depth={depth + 1}
                  houseId={houseId}
                />
              ))}
            </div>
          </AccordionItem>
        </Accordion>
      )}
    </div>
  );
};
export default React.memo(CommentItem);
