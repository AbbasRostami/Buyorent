import React, { useEffect, useState } from "react";
import Image from "next/image";
import VerticalStepper from "./Stepper";
import RegisterBrown from "./../../assets/ModalRegister/Register-Brown.png";
import LoginGray from "./../../assets/ModalRegister/Login-Gray.png";
import Bayournt from "./../../assets/ModalRegister/Bayournt1.png";
import LoginBrown from "./../../assets/ModalRegister/Login-Brown.png";
import RegisterGray from "./../../assets/ModalRegister/Register-Gray.png";
import { InputOtp, Spinner } from "@heroui/react";
import { HiEyeSlash } from "react-icons/hi2";
import { IoEyeSharp } from "react-icons/io5";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import ReactDOM from "react-dom";
import { signIn } from "next-auth/react";

export default function RegisterModal({ isOpen, setIsOpen }: any) {
  const [step, setStep] = useState(0);

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 3));

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  if (!mounted || !isOpen) return null;

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("ایمیل معتبر نیست")
      .required("وارد کردن ایمیل الزامی است"),
    password: Yup.string()
      .min(6, "رمز عبور باید حداقل ۶ کاراکتر باشد")
      .required("رمز عبور الزامی است"),
  });

  const renderStepContent = () => {
    switch (step) {
      case 0:
        return (
          <>
            <p className="font-bold text-2xl">ایجاد حساب کاربری</p>
            <div className="flex flex-col">
              <label className="text-[#D27700] w-full font-bold text-right">
                ایمیل
              </label>
              <input
                type="text"
                className="border-2 border-[#CCCCCC] bg-white rounded-lg w-[300px] h-[40px] p-2"
                placeholder="ایمیل خود را وارد کنید"
              />
            </div>
            <button
              onClick={nextStep}
              className="bg-gradient-to-r from-[#E89300] to-[#FFB84D] cursor-pointer w-fit px-14 h-[40px] text-white rounded-xl shadow-lg hover:shadow-2xl hover:bg-gradient-to-r hover:from-[#FFB84D] hover:to-[#E89300] transition-all duration-500 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#E89300] focus:ring-opacity-50"
            >
              دریافت کد تایید
            </button>

            <p
              className="text-1xl font-bold cursor-pointer"
              onClick={() => setStep(3)}
            >
              ورود به حساب کاربری
            </p>
          </>
        );
      case 1:
        return (
          <>
            <p className="font-bold text-2xl">ایجاد حساب کاربری</p>
            <p className="text-md font-normal text-right leading-relaxed break-words w-[300px]">
              کد تایید به ایمیل{" "}
              <span className="text-[#D27700]">example@gmail.com</span> ارسال
              شده است، در صورت مغایرت روی{" "}
              <span className="text-[#009993]">ویرایش</span> کلیک کنید.
            </p>
            <div className="flex flex-col ">
              <label className="text-[#D27700] w-full font-bold text-right">
                کد تایید
              </label>
              <InputOtp
                color={"default"}
                variant={"faded"}
                errorMessage="Invalid OTP code"
                length={4}
                size={"lg"}
              />
            </div>
            <button
              onClick={nextStep}
              className="bg-gradient-to-r from-[#E89300] to-[#FFB84D] cursor-pointer w-fit px-14 h-[40px] text-white rounded-xl shadow-lg hover:shadow-2xl hover:bg-gradient-to-r hover:from-[#FFB84D] hover:to-[#E89300] transition-all duration-500 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#E89300] focus:ring-opacity-50"
            >
              تایید
            </button>
          </>
        );
      case 2:
        return (
          <>
            <p className="font-bold text-2xl">تنظیم رمز عبور</p>
            <div className="flex flex-col gap-4">
              <div className="relative w-[300px]">
                <label className="text-[#D27700] font-bold mb-1 block text-right">
                  رمز عبور
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  className="border-2 border-[#CCCCCC] bg-white rounded-lg w-full h-[40px] p-2 pr-10"
                  placeholder="رمز عبور را وارد کنید"
                />
                <span
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute top-[38px] right-3 text-xl text-gray-500 cursor-pointer"
                >
                  {showPassword ? <HiEyeSlash /> : <IoEyeSharp />}
                </span>
              </div>

              <div className="relative w-[300px]">
                <label className="text-[#D27700] font-bold mb-1 block text-right">
                  تایید رمز عبور
                </label>
                <input
                  type={showConfirm ? "text" : "password"}
                  className="border-2 border-[#CCCCCC] bg-white rounded-lg w-full h-[40px] p-2 pr-10"
                  placeholder="رمز عبور را دوباره وارد کنید"
                />
                <span
                  onClick={() => setShowConfirm((prev) => !prev)}
                  className="absolute top-[38px] right-3 text-xl text-gray-500 cursor-pointer"
                >
                  {showConfirm ? <HiEyeSlash /> : <IoEyeSharp />}
                </span>
              </div>
            </div>
            <button
              onClick={nextStep}
              className="bg-gradient-to-r from-[#E89300] to-[#FFB84D] cursor-pointer w-fit px-14 h-[40px] text-white rounded-xl shadow-lg hover:shadow-2xl hover:bg-gradient-to-r hover:from-[#FFB84D] hover:to-[#E89300] transition-all duration-500 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#E89300] focus:ring-opacity-50"
            >
              ایجاد حساب
            </button>
          </>
        );
      case 3:
        return (
          <>
            <p className="font-bold text-2xl text-[#444444]">
              {" "}
              ورود به حساب کاربری
            </p>
            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={validationSchema}
              onSubmit={async (values, { setSubmitting }) => {
                const res = await signIn("credentials", {
                  email: values.email,
                  password: values.password,
                  redirect: false,
                });

                if (res?.ok) {
                  setIsOpen(false);
                } else {
                  console.log("Login error", res?.error);
                }
                setSubmitting(false);
              }}
            >
              {({ errors, touched, isSubmitting }) => (
                <Form className="flex flex-col gap-4 w-[300px]">
                  <div className="flex flex-col text-right">
                    <label className="text-[#D27700] font-bold mb-1">
                      نام کاربری ( ایمیل )
                    </label>
                    <Field
                      type="email"
                      name="email"
                      className={`border-2 bg-white rounded-lg h-[40px] p-2 ${
                        errors.email && touched.email
                          ? "border-red-500"
                          : "border-[#CCCCCC]"
                      }`}
                      placeholder="ایمیل را وارد کنید"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  <div className="relative text-right">
                    <label className="text-[#D27700] font-bold mb-1 block">
                      رمز عبور
                    </label>
                    <Field
                      type={showPassword ? "text" : "password"}
                      name="password"
                      className={`border-2 bg-white rounded-lg w-full h-[40px] p-2 pr-10 ${
                        errors.password && touched.password
                          ? "border-red-500"
                          : "border-[#CCCCCC]"
                      }`}
                      placeholder="رمز عبور را وارد کنید"
                    />
                    <span
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute top-[38px] right-3 text-xl text-gray-500 cursor-pointer"
                    >
                      {showPassword ? <HiEyeSlash /> : <IoEyeSharp />}
                    </span>
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-gradient-to-r from-[#E89300] to-[#FFB84D] cursor-pointer w-full h-[40px] text-white rounded-xl shadow-lg hover:shadow-2xl hover:bg-gradient-to-r hover:from-[#FFB84D] hover:to-[#E89300] transition-all duration-500 transform hover:scale-100 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-[#E89300] focus:ring-opacity-50 flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      <Spinner size="lg" variant="wave" />
                    ) : (
                      "ورود"
                    )}
                  </button>
                </Form>
              )}
            </Formik>
          </>
        );

      default:
        return null;
    }
  };

  return ReactDOM.createPortal(
    <>
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 backdrop-blur-xs bg-black/20 flex justify-center items-center z-50"
        >
          <div
            className="relative  p-8 w-[722px] h-[472px] border-[3px] backdrop-blur-xs   border-[#D27700] rounded-l-[16px] rounded-r-[230px] shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute flex justify-center gap-20 items-center right-36 bg-[#FFF3E3] p-3 w-[684px] h-[408px] border-[2px] border-[#D27700] rounded-r-[16px] rounded-l-[204px] shadow-lg">
              <div className="h-full flex flex-col justify-between">
                <div>
                  {step === 3 ? (
                    <>
                      <Image
                        className="absolute -right-5 top-4 cursor-pointer"
                        src={RegisterGray}
                        alt="Register"
                        width={101}
                        height={46}
                        layout="intrinsic"
                        priority
                        placeholder="blur"
                        onClick={() => setStep(0)}
                      />
                      <Image
                        className="absolute -right-5 top-17 cursor-pointer"
                        src={LoginBrown}
                        alt="Login"
                        width={101}
                        height={46}
                        layout="intrinsic"
                        priority
                        placeholder="blur"
                      />
                    </>
                  ) : (
                    <>
                      <Image
                        className="absolute -right-5 top-4 cursor-pointer"
                        src={LoginGray}
                        alt="Register"
                        width={101}
                        height={46}
                        layout="intrinsic"
                        priority
                        placeholder="blur"
                        onClick={() => setStep(3)}
                      />
                      <Image
                        className="absolute -right-5 top-17 cursor-pointer"
                        src={RegisterBrown}
                        alt="Login"
                        width={101}
                        height={46}
                        layout="intrinsic"
                        priority
                        placeholder="blur"
                      />
                    </>
                  )}
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="cursor-pointer text-[#444444] text-lg font-medium self-center mb-2 
             relative pb-1 hover:after:scale-x-100 after:transition-transform after:duration-300
             after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] 
             after:bg-red-500 after:scale-x-0 after:origin-left"
                >
                  بستن
                </button>
              </div>

              <div className="h-full flex flex-col items-center justify-center gap-10">
                {renderStepContent()}
              </div>

              {step === 3 ? (
                <Image
                  src={Bayournt}
                  alt="Register"
                  width={40}
                  height={33}
                  layout="intrinsic"
                  priority
                  placeholder="blur"
                />
              ) : (
                <VerticalStepper
                  currentStep={step}
                  step={step}
                  setStep={setStep}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>,
    document.body
  );
}
