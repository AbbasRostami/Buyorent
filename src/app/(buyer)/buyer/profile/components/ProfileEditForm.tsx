"use client";
import { useProfile } from "@/services/Profile/getProfile";
import { useUpdateProfile } from "@/services/Profile/putProfile";
import { validationProfileEditBuyer } from "@/utils/validation/Buyer/Profile/ProfileEditForm";
import { Skeleton, Spinner } from "@heroui/react";
import { ErrorMessage, Field, Form, Formik } from "formik";

const ProfileEditForm = ({
  isEditing,
  setIsEditing,
}: {
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
}) => {
  const { user, isLoading, error } = useProfile();

  const userData = user?.user;

  const { updateProfile, isUpdating } = useUpdateProfile();
  if (isLoading)
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:gap-5">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="relative overflow-hidden rounded-xl border border-gray-100 bg-white p-5 dark:border-gray-700/60 dark:bg-gray-800/50"
          >
            <div className="flex items-start gap-4">
              <Skeleton className="mt-1 h-10 w-10 rounded-lg bg-indigo-200 dark:bg-indigo-900/30" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-3 w-24 rounded-md" />
                <Skeleton className="h-4 w-32 rounded-md" />
              </div>
            </div>
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-indigo-100/20 dark:bg-indigo-900/20 opacity-30" />
          </div>
        ))}
      </div>
    );

  if (error) return <div>خطا در بارگذاری اطلاعات: {error.message}</div>;

  return (
    <div
      className={`transition-all duration-500 ease-in-out overflow-hidden ${
        isEditing ? "max-h-[3000px] opacity-100" : "max-h-0 opacity-0"
      }`}
    >
      {isEditing && (
        <div className="w-full mt-6 mb-7 bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <Formik
            enableReinitialize
            initialValues={{
              firstName: userData?.firstName || "",
              lastName: userData?.lastName || "",
              phoneNumber: userData?.phoneNumber || "",
              email: userData?.email || "",
              profilePicture: userData?.profilePicture || "",
            }}
            onSubmit={(values) => {
              updateProfile(values);
            }}
            validationSchema={validationProfileEditBuyer}
          >
            <Form className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-400">
                  نام
                </label>
                <Field
                  type="text"
                  name="firstName"
                  className="form-input w-full"
                />
                <ErrorMessage
                  name="firstName"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-400">
                  نام خانوادگی
                </label>
                <Field
                  type="text"
                  name="lastName"
                  className="form-input w-full"
                />
                <ErrorMessage
                  name="lastName"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-400">
                  ایمیل
                </label>
                <Field
                  type="email"
                  name="email"
                  className="form-input w-full"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-400">
                  شماره تلفن
                </label>
                <Field
                  type="text"
                  name="phoneNumber"
                  className="form-input w-full"
                />
                <ErrorMessage
                  name="phoneNumber"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-400">
                  لینک عکس پروفایل
                </label>
                <Field
                  type="text"
                  name="profilePicture"
                  className="form-input w-full"
                />
                <ErrorMessage
                  name="profilePicture"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="col-span-full">
                <button
                  type="submit"
                  disabled={isUpdating}
                  className="w-full bg-gradient-to-r from-[#e89300] to-[#ffe848] text-gray-900 font-bold py-5 rounded-lg hover:bg-gray-600 transition-all duration-300"
                >
                  {isUpdating ? (
                    <>
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-gray-900 text-lg font-bold">
                          ذخیره تغییرات...
                        </span>
                        <Spinner color="primary" size="md" />
                      </div>
                    </>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-gray-900 text-lg font-bold">
                        ذخیره تغییرات
                      </span>
                    </div>
                  )}
                </button>
              </div>
            </Form>
          </Formik>
        </div>
      )}
    </div>
  );
};

export default ProfileEditForm;
