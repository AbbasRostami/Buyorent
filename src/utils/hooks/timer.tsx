"use client";
import { useState, useEffect } from "react";

const Timer = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  let targetTime = 2 * 24 * 60 * 60;

  useEffect(() => {
    const calculateTimeLeft = () => {
      const totalSeconds = targetTime;
      const days = Math.floor(totalSeconds / (60 * 60 * 24));
      const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
      const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
      const seconds = totalSeconds % 60;

      return { days, hours, minutes, seconds };
    };

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
      targetTime > 0 && targetTime--;
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const toPersianNumber = (num: number) => {
    const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
    return num.toString().replace(/\d/g, (d) => persianDigits[parseInt(d)]);
  };

  const addLeadingZero = (num: number) => {
    return num < 10 ? `۰${toPersianNumber(num)}` : toPersianNumber(num);
  };

  return (
    <p className="text-Winston dark:text-red-400 xl:text-3xl whitespace-nowrap font-bold">
      {addLeadingZero(timeLeft.seconds)} :{addLeadingZero(timeLeft.minutes)} :
      {addLeadingZero(timeLeft.hours)} :{addLeadingZero(timeLeft.days)}
    </p>
  );
};

export default Timer;
