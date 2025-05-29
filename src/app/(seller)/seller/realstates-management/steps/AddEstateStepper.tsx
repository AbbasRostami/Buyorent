import { useState } from "react";
import { Formik, Form } from "formik";
import {
  IoArrowBackCircleOutline,
  IoArrowForwardCircleOutline,
} from "react-icons/io5";
import { GiConfirmed } from "react-icons/gi";

interface Step {
  title: string;
  icon: React.ReactNode;
  component: React.ComponentType<any>;
}

interface AddEstateStepperProps {
  steps: Step[];
  onClose: () => void;
}

const initialValues = {
  title: "اقامتگاه",
  capacity: "1",
  price: "10000000",
  dealType: "فروش",
  estateType: "آپارتمان",
  subType: "سوئیت",
  description:
    "آپارتمانی دنج و آرام در قلب شهر، جایی که زندگی روزمره راحت و سبک‌تر است. فضایی مدرن با طراحی منحصربه‌فرد، یادآور خانه‌های دنج و دل‌نشین. محلی برای لحظه‌های خوش، آرامش و شروعی نو در زندگی روزمره‌تان.  آپارتمانی دنج و آرام در قلب شهر، جایی که زندگی روزمره راحت و سبک‌تر است. فضایی مدرن با طراحی منحصربه‌فرد، یادآور خانه‌های دنج و دل‌نشین. محلی برای لحظه‌های خوش، آرامش و شروعی نو در زندگی روزمره‌تان. آپارتمانی دنج و آرام در قلب شهر، جایی که زندگی روزمره راحت و سبک‌تر است. فضایی مدرن با طراحی منحصربه‌فرد، یادآور خانه‌های دنج و دل‌نشین. محلی برای لحظه‌های خوش، آرامش و شروعی نو در زندگی روزمره‌تان. محلی برای لحظه‌های خوش، آرامش و شروعی نو در زندگی روزمره‌تان. محلی برای لحظه‌های خوش، آرامش و شروعی نو در زندگی روزمره‌تان.",
  address: "خیابان ولیعصر، تهران، منطقه مرکزی",
  location: [],
  roomCount: "1",
  bathCount: "1",
  parkingCount: "1",
  bathType: "شومینه",
  parkingType: "شومینه",
  tags: ["آپارتمان", "مدرن", "آسانسوردار"],
  images: [
    "https://4kwallpapers.com/images/walls/thumbs_3t/21958.jpg",
    "https://4kwallpapers.com/images/walls/thumbs_3t/22438.jpg",
    "https://4kwallpapers.com/images/walls/thumbs_3t/22473.jpg",
  ],
};

export default function AddEstateStepper({
  steps,
  onClose,
}: AddEstateStepperProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const isLastStep = currentStep === steps.length - 1;
  const isFirstStep = currentStep === 0;

  const handleNext = () =>
    setCurrentStep((s) => Math.min(s + 1, steps.length - 1));
  const handlePrev = () => setCurrentStep((s) => Math.max(s - 1, 0));

  return (
    <div className="flex flex-col items-center justify-center ">
      <div className=" w-full mx-auto  relative">





        {/* Stepper */}
        <div className="flex  flex-wrap items-start gap-3 bg-[#D9D9D9] dark:bg-gray-500 rounded-xl px-6 py-3 mb-8">
          {steps.map((step, idx) => (
            <div key={step.title} className="flex items-center gap-2">
              <div
                className={`w-8 h-8 flex items-center justify-center rounded-full border-2 transition-all duration-200
                  ${
                    idx < currentStep
                      ? "border-amber-500 bg-amber-500 text-white"
                      : idx === currentStep
                      ? "border-amber-500 bg-white text-amber-500"
                      : "border-gray-400 bg-white text-gray-400"
                  }
                `}
              >
                {step.icon}
              </div>
              <span
                className={`text-medium font-bold  ${
                  idx <= currentStep ? "text-amber-600 " : "text-black"
                }`}
              >
                {step.title}
              </span>
              {idx < steps.length - 1 && (
                <span
                  className={`mx-2 w-24 rounded-full border-t-4 ${
                    idx < currentStep
                      ? "border-amber-400"
                      : "border-gray-500 dark:border-gray-700"
                  } border-dashed`}
                ></span>
              )}
            </div>
          ))}
        </div>




        <Formik
          initialValues={initialValues}
          onSubmit={(values) => {
            if (!isLastStep) {
              handleNext();
            } else {
              console.log(values);
              onClose();
            }
          }}
        >
          {(formik) => {
            const StepComponent = steps[currentStep].component;
            return (
              <Form>
                <StepComponent formik={formik} />
                <div className="flex justify-center md:justify-end mt-8 gap-4 items-center">
                  {!isFirstStep && (
                    <button
                      type="button"
                      onClick={handlePrev}
                      className="border border-gray-400 dark:hover:bg-gray-700 dark:text-amber-50 text-gray-700 px-4 py-2 rounded-lg font-bold hover:bg-gray-100 transition flex items-center gap-2"
                    >
                      <IoArrowForwardCircleOutline size={20} />
                      مرحله قبل
                    </button>
                  )}
                  {!isLastStep ? (
                    <button
                      type="submit"
                      className="bg-amber-500 text-gray-700 px-4 py-2 rounded-lg font-bold hover:bg-amber-600 transition flex items-center gap-2"
                    >
                      مرحله بعد
                      <IoArrowBackCircleOutline size={20} />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="bg-amber-500 text-gray-700 px-8 py-2 rounded font-bold hover:bg-amber-600 transition flex items-center gap-2"
                    >
                      ثبت آگهی
                      <GiConfirmed size={20} />
                    </button>
                  )}
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
}
