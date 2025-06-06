import React, { useEffect, useState } from "react";
import Image from "next/image";
import VerticalStepper from "./Stepper";
import RegisterBrown from "./../../assets/ModalRegister/Register-Brown.png";
import LoginGray from "./../../assets/ModalRegister/Login-Gray.png";
import Bayournt from "./../../assets/ModalRegister/Bayournt1.png";
import LoginBrown from "./../../assets/ModalRegister/Login-Brown.png";
import RegisterGray from "./../../assets/ModalRegister/Register-Gray.png";
import ReactDOM from "react-dom";
import { Step0Email } from "./Step0Email";
import { Step1Verification } from "./Step1Verification";
import { Step2Password } from "./Step2Password";
import { Step3Login } from "./Step3Login";
import { RegistrationData, Step } from "@/types/AuthTypes";

export default function AuthModal({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) {
  const [step, setStep] = useState<Step>(0);
  const [formData, setFormData] = useState<RegistrationData>({
    email: "",
    tempUserId: "",
    userId: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    verificationCode: "",
  });
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

  const renderStep = () => {
    const steps = [
      <Step0Email
        key={0}
        onSuccess={(tempUserId, email) => {
          setFormData((prev) => ({ ...prev, tempUserId, email }));
          setStep(1);
        }}
      />,
      <Step1Verification
        key={1}
        email={formData.email}
        tempUserId={formData.tempUserId}
        onSuccess={(userId) => {
          setFormData((prev) => ({ ...prev, userId }));
          setStep(2);
        }}
        goBack={() => setStep(0)}
      />,
      <Step2Password
        key={2}
        userId={formData.userId}
        onSuccess={() => setStep(3)}
        goBack={() => setStep(1)}
      />,
      <Step3Login
        key={3}
        onSuccess={() => {
          setIsOpen(false);
        }}
      />,
    ];

    return steps[step];
  };

  return ReactDOM.createPortal(
    <>
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 backdrop-blur-xs bg-black/20 flex justify-center items-center z-50 p-4 md:p-6 lg:p-8"
        >
          <div
            className="relative w-full md:w-[90%] lg:w-[722px] min-h-[472px] p-4 md:p-6 lg:p-8 border-[3px] backdrop-blur-xs border-[#D27700] rounded-[16px] md:rounded-l-[16px] md:rounded-r-[230px] shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative flex flex-col md:flex-row justify-center gap-4 md:gap-10 lg:gap-20 items-center right-0 md:right-20 lg:right-36 dark:bg-gray-900 bg-[#FFF3E3] p-3 w-full md:w-[90%] lg:w-[684px] min-h-[408px] border-[2px] border-[#D27700] rounded-[16px] md:rounded-r-[16px] md:rounded-l-[204px] shadow-lg">
              {/* Mobile Register/Login Tabs */}
              <div className="flex md:hidden justify-center  gap-4 mb-4 w-full">
                {step === 3 ? (
                  <>
                    <Image
                      className="cursor-pointer absolute -right-4 top-4"
                      src={RegisterGray}
                      alt="Register"
                      width={80}
                      height={36}
                      layout="intrinsic"
                      priority
                      placeholder="blur"
                      onClick={() => setStep(0)}
                    />
                    <Image
                      className="cursor-pointer absolute -right-4 top-14"
                      src={LoginBrown}
                      alt="Login"
                      width={80}
                      height={36}
                      layout="intrinsic"
                      priority
                      placeholder="blur"
                    />
                  </>
                ) : (
                  <>
                    <Image
                      className="cursor-pointer absolute -right-4 top-4"
                      src={LoginGray}
                      alt="Register"
                      width={80}
                      height={36}
                      layout="intrinsic"
                      priority
                      placeholder="blur"
                      onClick={() => setStep(3)}
                    />
                    <Image
                      className="cursor-pointer absolute -right-4 top-14"
                      src={RegisterBrown}
                      alt="Login"
                      width={80}
                      height={36}
                      layout="intrinsic"
                      priority
                      placeholder="blur"
                    />
                  </>
                )}
                
              </div>

              {/* Desktop Register/Login Tabs */}
              <div className="hidden md:block h-full flex flex-col justify-between">
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
             after:bg-red-500 after:scale-x-0 after:origin-left dark:text-amber-200"
                >
                  بستن
                </button>
              </div>

              <div className="h-full flex flex-col items-center justify-center gap-7 w-full ">
                {renderStep()}
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
                  className="hidden md:block"
                />
              ) : (
                <div className="w-full  hidden md:block">
                  <VerticalStepper
                    currentStep={step}
                    step={step}
                    setStep={setStep}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>,
    document.body
  );
}
