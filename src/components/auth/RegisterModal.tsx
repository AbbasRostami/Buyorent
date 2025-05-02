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

export default function RegisterModal({ isOpen, setIsOpen }: any) {
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
          className="fixed inset-0 backdrop-blur-xs bg-black/20 flex justify-center items-center z-50"
        >
          <div
            className="relative  p-8 w-[722px] h-[472px] border-[3px] backdrop-blur-xs    border-[#D27700] rounded-l-[16px] rounded-r-[230px] shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute flex justify-center gap-20 items-center right-36 dark:bg-gray-900 bg-[#FFF3E3] p-3 w-[684px] h-[408px] border-[2px] border-[#D27700] rounded-r-[16px] rounded-l-[204px] shadow-lg">
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
             after:bg-red-500 after:scale-x-0 after:origin-left dark:text-amber-200"
                >
                  بستن
                </button>
              </div>

              <div className="h-full flex flex-col items-center justify-center gap-10">
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
