import { ErrorMessage, Field, Form, Formik } from "formik";

const ProfileEditForm = ({
  isEditing,
  setIsEditing,
}: {
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
}) => {
  return (
    <div
      className={`transition-all duration-[2500ms] ease-in-out overflow-hidden ${
        isEditing ? "max-h-[3000px] opacity-100" : "max-h-0 opacity-0"
      }`}
    >
      {isEditing && (
        <div className="w-full mt-6 mb-7 bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <Formik
            enableReinitialize={true}
            initialValues={{
              Gender: false,
              FName: "Abbas",
              LName: "Rostami",
              UserAbout: "I am a software engineer",
              LinkdinProfile: "http://linkden.com/",
              TelegramLink: "http://t.me/",
              HomeAdderess: "Tehran, Iran",
              phoneNumber: "09123456789",
              NationalCode: "1234567890",
              email: "abbas@gmail.com",
              BirthDay: "1990/01/01",
            }}
            onSubmit={(e) => {
              console.log(e);
            }}
          >
            <Form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-400">
                  نام
                </label>
                <Field type="text" name="FName" className="form-input w-full" />
                <ErrorMessage
                  name="FName"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-400">
                  نام خانوادگی
                </label>
                <Field type="text" name="LName" className="form-input w-full" />
                <ErrorMessage
                  name="LName"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="col-span-1">
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

              <div className="col-span-1">
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

              <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-400">
                  کد ملی
                </label>
                <Field
                  type="text"
                  name="NationalCode"
                  className="form-input w-full"
                />
              </div>

              <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-400">
                  تاریخ تولد
                </label>
                <Field
                  name="BirthDay"
                  type="date"
                  className="form-input w-full"
                />
              </div>

              <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-400">
                  جنسیت
                </label>
                <Field
                  as="select"
                  name="Gender"
                  className="form-input w-full rtl"
                >
                  <option value="">انتخاب کنید</option>
                  <option value="true">مرد</option>
                  <option value="false">زن</option>
                </Field>
              </div>

              <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-400">
                  آدرس خانه
                </label>
                <Field
                  type="text"
                  name="HomeAdderess"
                  className="form-input w-full"
                />
              </div>

              <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-400">
                  لینک تلگرام
                </label>
                <Field
                  type="text"
                  name="TelegramLink"
                  className="form-input w-full"
                />
              </div>

              <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-400">
                  لینک لینکدین
                </label>
                <Field
                  type="text"
                  name="LinkdinProfile"
                  className="form-input w-full"
                />
              </div>

              <div className="col-span-1 md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-400">
                  درباره من
                </label>
                <Field
                  as="textarea"
                  name="UserAbout"
                  rows={1}
                  className="form-input w-full"
                />
              </div>

              <div className="col-span-full">
                <button
                  type="submit"
                  className="w-full bg-amber-500 text-gray-900 font-bold py-2 rounded-lg hover:bg-amber-600 transition-all duration-300"
                >
                  ذخیره تغییرات
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
