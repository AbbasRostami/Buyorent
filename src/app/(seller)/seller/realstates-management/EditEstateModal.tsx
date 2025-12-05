import React from "react";
import { Modal, Button, Input, ModalHeader, ModalContent } from "@heroui/react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { usePut } from "@/utils/hooks/useReactQueryHooks";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

interface EditEstateModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  estateData: any;
  onSuccess?: () => void;
}

const EstateSchema = Yup.object().shape({
  title: Yup.string().required("عنوان الزامی است"),
  address: Yup.string().required("آدرس الزامی است"),
  price: Yup.number().required("مبلغ الزامی است"),
  capacity: Yup.number().required("ظرفیت الزامی است"),
  bathrooms: Yup.number().required("تعداد سرویس بهداشتی الزامی است"),
  parking: Yup.number().required("پارکینگ الزامی است"),
  rooms: Yup.number().required("تعداد اتاق الزامی است"),
  yard_type: Yup.string().required("نوع حیاط الزامی است"),
  transaction_type: Yup.string().required("نوع معامله الزامی است"),
  caption: Yup.string(),
});

const EditEstateModal: React.FC<EditEstateModalProps> = ({
  isOpen,
  onOpenChange,
  estateData,
  onSuccess,
}) => {
  const queryClient = useQueryClient();
  const { mutate: putEstate, isPending } = usePut<any, any>(
    `/houses/${estateData?.id}`,
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["house"] });
        toast.success("ملک با موفقیت ویرایش شد");
        onOpenChange(false);
        if (onSuccess) onSuccess();
      },
    }
  );

  return (
    <Modal
      scrollBehavior="inside"
      isOpen={isOpen}
      onClose={() => onOpenChange(false)}
      size="4xl"
    >
      <ModalContent className="p-0">
        <ModalHeader className="sticky top-0 z-10 bg-white border-b border-gray-200">
          ویرایش ملک
        </ModalHeader>
        <Formik
          enableReinitialize
          initialValues={{
            title: estateData?.title || "",
            address: estateData?.address || "",
            photos: estateData?.photos || [""],
            price: estateData?.price || "",
            tags: estateData?.tags || [],
            capacity: estateData?.capacity || 1,
            location: estateData?.location || { lat: 0, lng: 0 },
            categories: estateData?.categories || { id: 0, name: "" },
            bathrooms: estateData?.bathrooms || 1,
            parking: estateData?.parking || 0,
            rooms: estateData?.rooms || 1,
            yard_type: estateData?.yard_type || "",
            transaction_type: estateData?.transaction_type || "",
            caption: estateData?.caption || "",
          }}
          validationSchema={EstateSchema}
          onSubmit={async (values, { setSubmitting }) => {
            putEstate(values);
            setSubmitting(false);
          }}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form className="flex flex-col h-full">
              <div className="flex-1 overflow-y-auto px-4 py-2 max-h-[60vh]">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <label className="text-right text-sm font-bold">
                      عنوان
                    </label>
                    <Field className="w-full mt-2" name="title" as={Input} />
                    {typeof errors.title === "string" && touched.title && (
                      <div className="text-red-500 text-xs">{errors.title}</div>
                    )}
                  </div>
                  <div>
                    <label className="text-right text-sm font-bold">آدرس</label>
                    <Field className="w-full mt-2" name="address" as={Input} />
                    {typeof errors.address === "string" && touched.address && (
                      <div className="text-red-500 text-xs">
                        {errors.address}
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="text-right text-sm font-bold">مبلغ</label>
                    <Field
                      className="w-full mt-2"
                      name="price"
                      as={Input}
                      type="number"
                    />
                    {typeof errors.price === "string" && touched.price && (
                      <div className="text-red-500 text-xs">{errors.price}</div>
                    )}
                  </div>
                  <div>
                    <label className="text-right text-sm font-bold">
                      ظرفیت
                    </label>
                    <Field
                      className="w-full mt-2"
                      name="capacity"
                      as={Input}
                      type="number"
                    />
                    {typeof errors.capacity === "string" &&
                      touched.capacity && (
                        <div className="text-red-500 text-xs">
                          {errors.capacity}
                        </div>
                      )}
                  </div>
                  <div>
                    <label className="text-right text-sm font-bold">
                      تعداد سرویس بهداشتی
                    </label>
                    <Field
                      className="w-full mt-2"
                      name="bathrooms"
                      as={Input}
                      type="number"
                    />
                    {typeof errors.bathrooms === "string" &&
                      touched.bathrooms && (
                        <div className="text-red-500 text-xs">
                          {errors.bathrooms}
                        </div>
                      )}
                  </div>
                  <div>
                    <label className="text-right text-sm font-bold">
                      پارکینگ
                    </label>
                    <Field
                      className="w-full mt-2"
                      name="parking"
                      as={Input}
                      type="number"
                    />
                    {typeof errors.parking === "string" && touched.parking && (
                      <div className="text-red-500 text-xs">
                        {errors.parking}
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="text-right text-sm font-bold">
                      تعداد اتاق
                    </label>
                    <Field
                      className="w-full mt-2"
                      name="rooms"
                      as={Input}
                      type="number"
                    />
                    {typeof errors.rooms === "string" && touched.rooms && (
                      <div className="text-red-500 text-xs">{errors.rooms}</div>
                    )}
                  </div>
                  <div>
                    <label className="text-right text-sm font-bold">
                      نوع حیاط
                    </label>
                    <Field
                      className="w-full mt-2"
                      name="yard_type"
                      as={Input}
                    />
                    {typeof errors.yard_type === "string" &&
                      touched.yard_type && (
                        <div className="text-red-500 text-xs">
                          {errors.yard_type}
                        </div>
                      )}
                  </div>
                  <div>
                    <label className="text-right text-sm font-bold">
                      نوع معامله
                    </label>
                    <Field
                      className="w-full mt-2"
                      name="transaction_type"
                      as={Input}
                    />
                    {typeof errors.transaction_type === "string" &&
                      touched.transaction_type && (
                        <div className="text-red-500 text-xs">
                          {errors.transaction_type}
                        </div>
                      )}
                  </div>
                  <div className="col-span-3">
                    <label className="text-right text-sm font-bold ">
                      توضیحات
                    </label>
                    <Field
                      className="w-full mt-2"
                      name="caption"
                      as={Input}
                      multiline
                      rows={3}
                      area-label="توضیحات"
                    />
                    {typeof errors.caption === "string" && touched.caption && (
                      <div className="text-red-500 text-xs">
                        {errors.caption}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="sticky bottom-0 z-10 bg-white border-t border-gray-200 flex justify-end gap-2 p-4 mt-0">
                <Button
                  variant="light"
                  color="danger"
                  onPress={() => onOpenChange(false)}
                  type="button"
                >
                  انصراف
                </Button>
                <Button
                  color="warning"
                  type="submit"
                  isLoading={isSubmitting || isPending}
                >
                  ذخیره تغییرات
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </ModalContent>
    </Modal>
  );
};

export default EditEstateModal;
