import DatePicker, { DatePickerProps } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
// @ts-ignore
import transition from "react-element-popper/animations/transition";

interface PersianDatePickerProps extends DatePickerProps {}

export default function PersianDatePicker(props: PersianDatePickerProps) {
  return (
    <DatePicker
      calendar={persian}
      locale={persian_fa}
      format="YYYY/MM/DD"
      calendarPosition="bottom-right"
      portal
      animations={[transition({ duration: 800, from: 35 })]}
      inputClass="w-full form-input"
      {...props}
    />
  );
}
