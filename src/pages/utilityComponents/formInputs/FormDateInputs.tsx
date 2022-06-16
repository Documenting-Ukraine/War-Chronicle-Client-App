import { isBefore } from "date-fns";
import { useEffect, useState } from "react";
import { unstable_batchedUpdates } from "react-dom";
import { CustomFormInputs } from "./FormInputs";
const transformDate = (date: Date) => date.toISOString().split("T")[0];
const transformTime = (date: Date) => date.toISOString().slice(11, 16);
const defaultDate = transformDate(new Date());
const defaultTime = transformTime(new Date());
const FormDateInputs = ({
  name,
  required,
  className,
  onDateChange,
  defaultValue,
  timeInput = true,
  title,
}: {
  name: string;
  title?: string;
  required: boolean;
  className?: string;
  defaultValue?: Date | string;
  onDateChange: (e: Date) => void;
  timeInput?: boolean;
}) => {
  const [date, setDate] = useState(
    defaultValue ? transformDate(new Date(defaultValue)) : defaultDate
  );
  const [time, setTime] = useState(
    defaultValue ? transformTime(new Date(defaultValue)) : defaultTime
  );
  useEffect(() =>{
    onDateChange(new Date(`${date}T${time}`))
  }, [date, time, onDateChange])
  const [err, setErr] = useState({ err: false, message: "" });
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    const inputType = e.currentTarget.type;
    let newDate: Date;
    const currDate = new Date();
    switch (inputType) {
      case "date":
        newDate = new Date(`${value}T${time}`);
        if (isBefore(newDate, currDate)) {
          unstable_batchedUpdates(() => {
            setDate(value);
            setErr({ err: false, message: "" });
          });
          return onDateChange(newDate);
        } else return setErr({ err: true, message: "Invalid Date" });
      case "time":
        newDate = new Date(`${date}T${value}`);
        if (isBefore(newDate, currDate)) {
          unstable_batchedUpdates(() => {
            setTime(value);
            setErr({ err: false, message: "" });
          });
          return onDateChange(newDate);
        } else return setErr({ err: true, message: "Invalid Date" });
      default:
        return;
    }
  };
  return (
    <CustomFormInputs
      title={title}
      name={name}
      required={required}
      className={className}
    >
      <>
        <div className="form-inputs-time-inputs">
          <input
            className={timeInput ? "add-right-spacing" : ""}
            type="date"
            onChange={onChange}
            value={date}
            max={new Date().toISOString().split("T")[0]}
          />
          {timeInput && <input type="time" onChange={onChange} value={time} />}
        </div>
        {err.err && <div className="form-inputs-time-err">{err.message}</div>}
      </>
    </CustomFormInputs>
  );
};
export default FormDateInputs;
