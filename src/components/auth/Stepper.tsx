"use client";
import { Step, StepperProps } from "@/types/Auth/AuthTypes";
import { BsArrowDown } from "react-icons/bs";

const steps = [
  { id: 1, title: "ثبت‌نام" },
  { id: 2, title: "تکمیل پروفایل" },
  { id: 3, title: "پایان" },
];

export default function VerticalStepper({
  currentStep,
  step,
  setStep,
}: StepperProps) {
  return (
    <div className="flex flex-col justify-center items-center gap-6 h-full">
      {steps.map((step, index) => (
        <div key={step.id} className="flex flex-col items-center gap-4">
          <div
            className={`flex h-9 w-9 items-center justify-center cursor-pointer rounded-full ${
              currentStep >= index
                ? "bg-[#009993] text-white"
                : "bg-gray-200 text-gray-600"
            }`}
            onClick={() => setStep(index as Step)}
          >
            <span className="text-lg font-bold">{step.id}</span>
          </div>
          {index < steps.length - 1 && (
            <BsArrowDown className="h-8 w-8 text-gray-400" />
          )}
        </div>
      ))}
    </div>
  );
}
