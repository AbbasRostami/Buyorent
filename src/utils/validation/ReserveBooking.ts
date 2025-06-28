import * as Yup from "yup";

export const travelerSchema = Yup.object().shape({
  travelers: Yup.array().of(
    Yup.object().shape({
      firstName: Yup.string().required("نام الزامی است"),
        lastName: Yup.string().required("نام خانوادگی الزامی است"),
        gender: Yup.string()
          .oneOf(["male", "female"])
          .required("جنسیت الزامی است"),
        birthDate: Yup.string().required("تاریخ تولد الزامی است"),
        nationalId: Yup.string().required("کد ملی الزامی است"),
      })
    ),
  });