// components/Tour.tsx
"use client";

import Joyride from "react-joyride";
import { useState } from "react";
import { useTheme } from "next-themes";

export default function Tour() {
  const [run, setRun] = useState(true);

  const steps = [
    {
      target: ".step-1",
      content:
        " بخش هدر سایت مربوط به دسترسی سریع به صفحات و ثبت نام و ورود است",
    },
    {
      target: ".step-2",
      content: "اینجا می‌تونی فیلترهای جستجو رو تنظیم کنی.",
    },
    {
      target: ".step-3",
      content: "از اینجا میتونی جشنواره تخفیف به صورت هفتگی رو مشاهده کنی",
    },
    {
      target: ".step-4",
      content: " از اینجا میتونی در مورد سایت اطلاعات بیشتری کسب کنی.",
    },
    {
      target: ".step-5",
      content: "اجاره های محبوب ماه رو از اینجا مشاهده کنی",
    },
    {
      target: ".step-6",
      content: "داغ ترین معامله رو به صورت هفتگی از اینجا مشاهده کنی",
    },
    {
      target: ".step-7",
      content: " از اینجا میتونی نظرات کاربران رو مشاهده کنی",
    },
    {
      target: ".step-8",
      content: "شبکه های اجتماعی سایت رو از اینجا مشاهده کنی",
    },
  ];

  const { theme } = useTheme();

  return (
    <Joyride
      steps={steps}
      run={run}
      continuous
      showSkipButton
      showProgress
      locale={{
        back: "قبلی",
        close: "بستن",
        last: "پایان",
        next: "بعدی" ,
        skip: "رد کردن",
      }}
      styles={{
        options: {
          zIndex: 10000,
          primaryColor: theme === "dark" ? "#d27700" : "#d27700",
          backgroundColor: theme === "dark" ? "#0a192f" : "#fff",
          textColor: theme === "dark" ? "#fff" : "#1e293b",
          arrowColor: theme === "dark" ? "#fff" : "#1e293b",
        },
        tooltipContainer: {
          textAlign: "right",
          borderRadius: "1rem",
          padding: "0.2rem",
        },
        tooltip: {
          fontSize: "16px",
          lineHeight: "1.8",
        },
        buttonNext: {
          backgroundColor: theme === "dark" ? "#22c55e" : "#22c55e",
          color: "#fff",
          fontWeight: "bold",
        },
        buttonBack: {
          marginRight: 10,
          color: theme === "dark" ? "#fff" : "#334155",
        },
        buttonSkip: {
          color: theme === "dark" ? "#ef4444" : "#ef4444",
        },
      }}
    />
  );
}
