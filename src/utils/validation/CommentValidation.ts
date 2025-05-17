import * as Yup from "yup";

export const validationComment = Yup.object().shape({
  title: Yup.string()
    .required("عنوان الزامی است")
    .min(10, "عنوان باید حداقل ۱۰ کاراکتر باشد")
    .max(100, "عنوان نباید بیشتر از ۱۰۰ کاراکتر باشد"),

  caption: Yup.string()
    .required("متن پاسخ الزامی است")
    .min(10, "پاسخ باید حداقل ۱۰ کاراکتر باشد")
    .max(100, "پاسخ نباید بیشتر از ۱۰۰ کاراکتر باشد"),
});
