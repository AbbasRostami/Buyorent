import { Button, Slider } from "@heroui/react";
import { Modal, ModalContent } from "@heroui/react";
import React, { useMemo } from "react";
import { IoMdClose } from "react-icons/io";
import { Field, Form, Formik, ErrorMessage } from "formik";
import { FaEdit } from "react-icons/fa";
import { useEditComment } from "@/services/Seller/comments-management/editComment";
import { validationEditComment } from "@/utils/validation/Seller/comments-management/editComment";
import { CommentsData } from "@/types/Seller/comments-management/CommentTypes";

export const FilterComment = ({
  isOpen,
  onOpenChange,
  commentId,
  data,
}: {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  commentId: number;
  data: CommentsData[];
}) => {
  const selectedComment = useMemo(() => {
    return data?.find((comment) => comment.id === commentId);
  }, [data, commentId]);

  const editComment = useEditComment(commentId);

  return (
    <Modal
      hideCloseButton
      size="lg"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        {(onClose) => (
          <div className="bg-[#F9F9F9] rounded-2xl p-6 dark:bg-gray-800">
            <div className="flex items-center justify-between border-b border-dashed border-amber-500 pb-4 mb-4">
              <h2 className="text-base md:text-2xl font-bold text-right flex items-center gap-2">
                <FaEdit className="dark:text-amber-200" size={20} />
                ویرایش کامنت
              </h2>
              <button
                className="flex items-center gap-2 border border-red-400 text-red-500 rounded-full px-6 py-2 text-lg font-bold hover:bg-red-50 dark:hover:bg-red-400 dark:text-white transition"
                onClick={onClose}
              >
                بستن <IoMdClose size={24} />
              </button>
            </div>
            <Formik
              enableReinitialize
              initialValues={{
                title: selectedComment?.title || "",
                caption: selectedComment?.caption || "",
                rating: selectedComment?.rating || 0,
              }}
              onSubmit={editComment.mutate}
              validationSchema={validationEditComment}
            >
              {({ values, setFieldValue }) => (
                <Form>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-7">
                    <div className="flex flex-col col-span-2 gap-2">
                      <label className="text-sm font-bold">عنوان</label>
                      <Field
                        name="title"
                        className="w-full form-input"
                        placeholder="عنوان را وارد کنید"
                      />
                      <ErrorMessage
                        name="title"
                        component="div"
                        className="text-sm text-red-500 mt-1"
                      />
                    </div>
                    <div className="flex flex-col col-span-2 gap-2">
                      <label className="text-sm font-bold">توضیحات</label>
                      <Field
                        as="textarea"
                        rows={4}
                        name="caption"
                        className="w-full form-input"
                        placeholder="توضیحات را وارد کنید"
                      />
                      <ErrorMessage
                        name="caption"
                        component="div"
                        className="text-sm text-red-500 mt-1"
                      />
                    </div>
                    <div className="w-full col-span-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        امتیاز: {values.rating}
                      </label>
                      <Slider
                        className="max-w-md w-full "
                        aria-label="امتیاز"
                        color="warning"
                        value={values.rating}
                        maxValue={5}
                        minValue={0}
                        step={0.5}
                        size="md"
                        onChange={(val) => setFieldValue("rating", val)}
                        showSteps
                      />
                      <ErrorMessage
                        name="rating"
                        component="div"
                        className="text-sm text-red-500 mt-1"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end mt-8">
                    <Button
                      type="submit"
                      variant="shadow"
                      color="warning"
                      className="max-w-xs"
                      isLoading={editComment.isPending}
                    >
                      ویرایش کامنت
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        )}
      </ModalContent>
    </Modal>
  );
};
