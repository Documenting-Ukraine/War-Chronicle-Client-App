import Select from "react-select";
import { GroupedOption, Option } from "../../authPage/data/OccupationList";
import useFormInputs from "../../../hooks/use-form-inputs";
import { CSSObjectWithLabel } from "react-select";
export const customStylesErr = {
  container: (provided: CSSObjectWithLabel) => ({
    ...provided,
    border: "1px solid darkred",
  }),
};
export const CustomFormInputs = ({
  children,
  name,
  className,
  required = true
}: {
  children: JSX.Element;
  name: string;
  className?: string;
  required?: boolean
}) => {
  return (
    <div className={`form-inputs ${className ? className : ""}`}>
      <div className="d-flex flex-column w-100">
        <label data-testid={name} htmlFor={`${name}-input`}>
          {name}
          {required && <span>*</span>}
        </label>
        {children}
      </div>
    </div>
  );
};
const FormInputs = ({
  title,
  name,
  textArea,
  customValidation,
  inputType = "text",
  dropDown,
  required = true,
  isDropdownMulti = false,
  className,
}: {
  title?: string;
  name: string;
  className?: string;
  textArea?: boolean;
  customValidation?: (e: string) => { err: boolean; message: string };
  inputType?: string;
  dropDown?: GroupedOption[] | Option[];
  required?: boolean;
  isDropdownMulti?: boolean;
}) => {
  const {
    err,
    onTouch,
    onDefaultChange,
    onDropdownChange,
    onDropdownMultiChange,
  } = useFormInputs({
    validateFunc: customValidation,
    required: required,
    isMulti: isDropdownMulti,
  });
  return (
    <div className={`form-inputs ${className ? className : ""}`}>
      <div className="d-flex flex-column w-100">
        <label data-testid={name} htmlFor={`${name}-input`}>
          {title ? title : name}
          {required && <span>*</span>}
        </label>
        {textArea ? (
          <textarea
            id={`${name}-input`}
            name={name}
            onChange={onDefaultChange}
            onBlur={onTouch}
            style={required && err.err ? { border: "1.5px solid darkred" } : {}}
            required={required}
          />
        ) : dropDown ? (
          isDropdownMulti ? (
            <Select
              options={dropDown}
              className={"form-inputs-dropdown"}
              classNamePrefix={"dropdown-input"}
              name={name}
              id={`${name}-input`}
              onChange={onDropdownMultiChange}
              onBlur={onTouch}
              styles={required && err.err ? customStylesErr : undefined}
              isMulti={true}
            />
          ) : (
            <Select
              options={dropDown}
              className={"form-inputs-dropdown"}
              classNamePrefix={"dropdown-input"}
              name={name}
              id={`${name}-input`}
              onChange={onDropdownChange}
              onBlur={onTouch}
              styles={required && err.err ? customStylesErr : undefined}
            />
          )
        ) : (
          <input
            id={`${name}-input`}
            name={name}
            type={inputType}
            onChange={onDefaultChange}
            onBlur={onTouch}
            style={
              required && err.err
                ? { border: "1.5px solid darkred" }
                : undefined
            }
            required={required}
          />
        )}
      </div>
      {required && err.err && (
        <div className="row-input-error">{err.message}</div>
      )}
    </div>
  );
};
export default FormInputs;
