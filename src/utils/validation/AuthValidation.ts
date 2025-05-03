import * as Yup from "yup";

export const validationStepEmail = Yup.object().shape({
  email: Yup.string()
    .email("ایمیل وارد شده معتبر نیست")
    .required("وارد کردن ایمیل الزامی است")
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "فرمت ایمیل نامعتبر است"),
});

export const validationStepPassword = Yup.object({
  phoneNumber: Yup.string()
    .matches(/^09\d{9}$/, "شماره تلفن معتبر نیست")
    .required("شماره تلفن الزامی است"),
  password: Yup.string()
    .min(6, "رمز عبور باید حداقل ۶ کاراکتر باشد")
    .required("رمز عبور الزامی است"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "رمز عبور و تکرار آن مطابقت ندارند")
    .required("تکرار رمز عبور الزامی است"),
});

export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("ایمیل معتبر نیست")
    .required("وارد کردن ایمیل الزامی است"),
  password: Yup.string()
    .min(6, "رمز عبور باید حداقل ۶ کاراکتر باشد")
    .required("رمز عبور الزامی است"),
});
