import * as Yup from "yup";

export const validationProfileEditSeller = Yup.object().shape({
  firstName: Yup.string()
    .min(3, "نام باید حداقل 3 کاراکتر باشد")
    .max(10, "نام باید حداکثر 10 کاراکتر باشد")
    .required("نام الزامی است"),
  lastName: Yup.string()
    .min(3, "نام خانوادگی باید حداقل 3 کاراکتر باشد")
    .max(10, "نام خانوادگی باید حداکثر 10 کاراکتر باشد")
    .required("نام خانوادگی الزامی است"),
  email: Yup.string().email("ایمیل معتبر نیست").required("ایمیل الزامی است"),
  phoneNumber: Yup.string()
    .matches(/^09\d{9}$/, "شماره تلفن باید با 09 شروع شود")
    .required("شماره تلفن الزامی است"),
  profilePicture: Yup.string()
    .matches(
      /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp))$/i,
      "لینک عکس معتبر نیست"
    )
    .required("لینک عکس الزامی است"),
});
