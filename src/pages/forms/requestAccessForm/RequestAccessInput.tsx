import { useEffect, useState } from "react";
import removeAddedWhiteSpace from "../../../helperFunctions/removeWhiteSpace";
import Select, {ActionMeta} from "react-select";
import { GroupedOption, Option } from "../data/OccupationList";
const RequestAccessInput = ({
  name,
  textArea,
  customValidation,
  inputType = "text",
  dropDown
}: {
  name: string;
  textArea?: boolean,
  customValidation?: (e: string) => { err: boolean; message: string },
  inputType?: string,
  dropDown?: GroupedOption[]
}) => {
  const [value, setValue] = useState("");
  const [touched, setTouched] = useState(false);
  const [err, setErr] = useState({ err: false, message: "" });
  //run validating function
  useEffect(() => {
    if (touched) {
      if (removeAddedWhiteSpace(value).length <= 0)
        setErr({ err: true, message: "Field is required" });
      else if (customValidation && customValidation(value).err)
        setErr(customValidation(value));
      else setErr({ err: false, message: "" });
    }
  }, [touched, value, customValidation]);
  return (
    <div className="request-access-form-input">
      <div className="d-flex flex-column w-100">
        <label data-testid={name} htmlFor={`${name}-input`}>
          {name}
          <span>*</span>
        </label>
        {textArea ? (
          <textarea
            id={`${name}-input`}
            name={name}
            onChange={(e) => setValue(e.currentTarget.value)}
            onBlur={() => setTouched(true)}
            style={err.err ? { border: "1.5px solid darkred" } : undefined}
            required
          />
        ) : dropDown ? (
          <Select
            options={dropDown}
            className={"request-form-dropdown"}
            classNamePrefix={"dropdown-input"}
            name={name}
            id={`${name}-input`}
            onChange={(option: Option | null, actionMeta: ActionMeta<Option>) =>
              setValue(option ? option.value : "")
            }
            onBlur={() => setTouched(true)}
          />
        ) : (
          <input
            id={`${name}-input`}
            name={name}
            type={inputType}
            onChange={(e) => setValue(e.currentTarget.value)}
            onBlur={() => setTouched(true)}
            style={err.err ? { border: "1.5px solid darkred" } : undefined}
            required
          />
        )}
      </div>
      {err.err && <div className="row-input-error">{err.message}</div>}
    </div>
  );
};
export default RequestAccessInput;
