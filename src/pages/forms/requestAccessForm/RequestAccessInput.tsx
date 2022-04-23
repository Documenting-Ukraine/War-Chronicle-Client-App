import Select from "react-select";
import { GroupedOption, Option} from "../data/OccupationList";
import useFormInputs from "../../../hooks/use-form-inputs";
import { CSSObjectWithLabel } from "react-select";
const customStylesErr = {container:(provided: CSSObjectWithLabel) =>({
  ...provided,
  border: "1px solid darkred"
})} 
const RequestAccessInput = ({
  name,
  textArea,
  customValidation,
  inputType = "text",
  dropDown,
  required = true,
}: {
  name: string;
  textArea?: boolean;
  customValidation?: (e: string) => { err: boolean; message: string };
  inputType?: string;
  dropDown?: GroupedOption[] | Option[];
  required?: boolean
}) => {
  const { err, onTouch, onDefaultChange, onDropdownChange } = useFormInputs({
    validateFunc: customValidation,
    required: true
  });
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
            onChange={onDefaultChange}
            onBlur={onTouch}
            style={required && err.err ? { border: "1.5px solid darkred" } : undefined}
            required ={required}
          />
        ) : dropDown ? (
          <Select
            options={dropDown}
            className={"request-form-dropdown"}
            classNamePrefix={"dropdown-input"}
            name={name}
            id={`${name}-input`}
            onChange={onDropdownChange}
            onBlur={onTouch}
            styles={required && err.err ? customStylesErr : undefined}
          />
        ) : (
          <input
            id={`${name}-input`}
            name={name}
            type={inputType}
            onChange={onDefaultChange}
            onBlur={onTouch}
            style={required && err.err ? { border: "1.5px solid darkred" } : undefined}
            required ={required}
          />
        )}
      </div>
      {required && err.err && <div className="row-input-error">{err.message}</div>}
    </div>
  );
};
export default RequestAccessInput;
