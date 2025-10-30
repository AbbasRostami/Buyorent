import DatePicker, { DatePickerProps } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
// @ts-ignore
import transition from "react-element-popper/animations/transition";
import "react-multi-date-picker/styles/backgrounds/bg-dark.css";

interface PersianDatePickerProps extends DatePickerProps {
  disablePortal?: boolean;
}

export default function PersianDatePicker(props: PersianDatePickerProps) {
  const { disablePortal = false, ...restProps } = props;

  return (
    <DatePicker
      id={props.id}
      name={props.name}
      placeholder={props.placeholder}
      required={props.required}
      calendar={persian}
      locale={persian_fa}
      format="YYYY/MM/DD"
      calendarPosition="bottom-right"
      portal={!disablePortal}
      animations={[transition({ duration: 800, from: 35 })]}
      inputClass="w-full form-input"
      {...restProps}
    />
  );
}
