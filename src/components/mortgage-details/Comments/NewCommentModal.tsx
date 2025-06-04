import React from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Slider,
} from "@heroui/react";
import { Formik, Field, ErrorMessage, Form } from "formik";
import { Button } from "@heroui/react";
import { usePost } from "@/utils/hooks/useReactQueryHooks";
import { useQueryClient } from "@tanstack/react-query";
import { validationComment } from "@/utils/validation/CommentValidation";
import { CommentFormValues, Props } from "@/types/CommetTypes";
import toast from "react-hot-toast";

const NewCommentModal = ({ houseId, isOpen, onOpenChange }: Props) => {
  const queryClient = useQueryClient();
  const { mutate: postComment } = usePost(`/houses/${houseId}/comments`, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", houseId] });
      toast.success("نظر شما با موفقیت ثبت شد");
    },
    onError: () => {
      toast.error("خطا در ثبت نظر!");
    },
  });

  const handleSubmit = (values: CommentFormValues, { resetForm }: any) => {
    postComment({
      title: values?.title,
      caption: values?.caption,
      rating: values?.rating,
      parent_comment_id: null,
    });
    resetForm();
    onOpenChange();
  };

  return (
    <Modal size="md" isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col items-center gap-1 text-lg font-semibold text-gray-800 dark:text-white">
              ثبت نظر
            </ModalHeader>
            <ModalBody className="px-6 py-4">
              <Formik
                initialValues={{
                  title: "",
                  caption: "",
                  rating: 4.5,
                  parent_comment_id: null,
                }}
                validationSchema={validationComment}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting, setFieldValue, values }) => (
                  <Form className="flex flex-col gap-4 w-full items-end">
                    <div className="w-full">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        عنوان
                      </label>
                      <Field
                        name="title"
                        className="w-full rounded-md bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-color1"
                        placeholder="مثلاً: ملک عالی بود"
                      />
                      <ErrorMessage
                        name="title"
                        component="div"
                        className="text-red-500 text-xs mt-1"
                      />
                    </div>

                    <div className="w-full">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        متن کامنت
                      </label>
                      <Field
                        as="textarea"
                        name="caption"
                        rows={4}
                        className="w-full rounded-md bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-color1"
                        placeholder="نظرتان را وارد کنید..."
                      />
                      <ErrorMessage
                        name="caption"
                        component="div"
                        className="text-red-500 text-xs mt-1"
                      />
                    </div>

                    <div className="w-full">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        امتیاز: {values.rating}
                      </label>
                      <Slider
                        className="max-w-md"
                        color="warning"
                        defaultValue={4.5}
                        value={values.rating}
                        onChange={(value) => setFieldValue("rating", value)}
                        maxValue={5}
                        minValue={0}
                        showSteps={true}
                        size="md"
                        step={0.5}
                      />
                    </div>

                    <div className="flex justify-end gap-2 mt-4">
                      <Button color="warning" variant="light" onPress={onClose}>
                        لغو
                      </Button>
                      <Button
                        type="submit"
                        color="warning"
                        isDisabled={isSubmitting}
                        className=" text-white shadow-lg shadow-indigo-500/20 hover:bg-color1 transition"
                      >
                        ثبت نظر
                      </Button>
                    </div>
                  </Form>
                )}
              </Formik>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default NewCommentModal;
