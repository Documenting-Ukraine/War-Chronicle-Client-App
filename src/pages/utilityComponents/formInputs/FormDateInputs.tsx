import { isBefore } from "date-fns";
import { useEffect, useState, useRef } from "react";
import { unstable_batchedUpdates } from "react-dom";
import { CustomFormInputs } from "./FormInputs";
export const transformDate = (date: Date) => date.toISOString().split("T")[0];
export const transformTime = (date: Date) => date.toISOString().slice(11, 16);
const defaultDate = transformDate(new Date());
const defaultTime = transformTime(new Date());
export const onDateChangeWrapper = (
  e: React.ChangeEvent<HTMLInputElement>,
  onDateChange: (inputValue: string, currDate: Date) => void,
  onTimeChange: (inputValue: string, currDate: Date) => void
) => {
  const value = e.currentTarget.value;
  const inputType = e.currentTarget.type;
  const currDate = new Date();
  switch (inputType) {
    case "date":
      onDateChange(value, currDate);
      break;
    case "time":
      onTimeChange(value, currDate);
      break;
    default:
      return;
  }
};
const FormDateInputs = ({
  name,
  required,
  className,
  defaultValue,
  timeInput = true,
  title,
  onDateChange,
  controlledDate,
  onControlledChange,
}: {
  name: string;
  title?: string;
  required: boolean;
  className?: string;
  defaultValue?: Date | string;
  onDateChange?: (e: Date) => void;
  timeInput?: boolean;
  controlledDate?: Date;
  onControlledChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  const [date, setDate] = useState(
    defaultValue
      ? transformDate(new Date(defaultValue))
      : controlledDate
      ? transformDate(new Date(controlledDate))
      : defaultDate
  );
  const [time, setTime] = useState(
    defaultValue
      ? transformTime(new Date(defaultValue))
      : controlledDate
      ? transformTime(new Date(controlledDate))
      : defaultTime
  );
  const mounted = useRef(false);
  useEffect(() => {
    if (onDateChange && !mounted.current)
      onDateChange(new Date(`${date}T${time}`));
  }, [date, time, onDateChange]);
  useEffect(() => {
    mounted.current = true;
  }, []);

  const [err, setErr] = useState({ err: false, message: "" });
  const onDateTypeChange = (value: string, currDate: Date) => {
    let newDate = new Date(`${value}T${time}`);
    if (isBefore(newDate, currDate)) {
      unstable_batchedUpdates(() => {
        setDate(value);
        setErr({ err: false, message: "" });
      });
      return onDateChange ? onDateChange(newDate) : null;
    } else return setErr({ err: true, message: "Invalid Date" });
  };
  const onTimeTypeChange = (value: string, currDate: Date) => {
    let newDate = new Date(`${date}T${value}`);
    if (isBefore(newDate, currDate)) {
      unstable_batchedUpdates(() => {
        setTime(value);
        setErr({ err: false, message: "" });
      });
      return onDateChange ? onDateChange(newDate) : null;
    } else return setErr({ err: true, message: "Invalid Date" });
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    onDateChangeWrapper(e, onDateTypeChange, onTimeTypeChange);
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
            name={`${name}Date`}
            className={timeInput ? "add-right-spacing" : ""}
            type="date"
            onChange={onControlledChange ? onControlledChange : onChange}
            value={controlledDate ? transformDate(controlledDate) :date}
            max={new Date().toISOString().split("T")[0]}
          />
          {timeInput && (
            <input
              type="time"
              name={`${name}Time`}
              onChange={onControlledChange ? onControlledChange : onChange}
              value={controlledDate ? transformTime(controlledDate) : time}
            />
          )}
        </div>
        {err.err && <div className="form-inputs-time-err">{err.message}</div>}
      </>
    </CustomFormInputs>
  );
};
export default FormDateInputs;
