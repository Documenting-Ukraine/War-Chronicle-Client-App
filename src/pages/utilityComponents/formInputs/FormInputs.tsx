import Select, { MultiValue } from "react-select";

import {
  GroupedOption,
  Option,
  transformOptions,
} from "../../authPage/data/OccupationList";
import useFormInputs from "../../../hooks/use-form-inputs";
import { CSSObjectWithLabel } from "react-select";
export const customStylesErr = {
  container: (provided: CSSObjectWithLabel) => ({
    ...provided,
    border: "1px solid darkred",
  }),
};
export const CustomFormInputs = ({
  title,
  children,
  name,
  className,
  sectionContainer,
  sectionClassName,
  required = true,
}: {
  title?: string;
  children: JSX.Element;
  name: string;
  className?: string;
  required?: boolean;
  sectionContainer?: boolean;
  sectionClassName?: string;
}) => {
  return (
    <div className={`form-inputs ${className ? className : ""}`}>
      <div className="d-flex flex-column w-100">
        <label data-testid={name} htmlFor={`${name}-input`}>
          {title ? title : name}
          {required && <span>*</span>}
        </label>
        {sectionContainer ? (
          <section
            className={`form-inputs-section-container ${sectionClassName}`}
          >
            {children}
          </section>
        ) : (
          children
        )}
      </div>
    </div>
  );
};
const FormInputs = ({
  title,
  name,
  textArea,
  customValidation,
  customDropdownFunc,
  inputType = "text",
  dropDown,
  required = true,
  isDropdownMulti = false,
  className,
  defaultValue,
  defaultDropDownValue,
  defaultMultiDropDownValue,
  controlledDropDownValue,
  subCaption,
  isClearable,
}: {
  title?: string;
  idx?: number;
  name: string;
  className?: string;
  textArea?: boolean;
  customValidation?: (e: string) => { err: boolean; message: string };
  inputType?: string;
  dropDown?: GroupedOption[] | Option[];
  defaultValue?: string;
  defaultDropDownValue?: Option;
  defaultMultiDropDownValue?: Option[];
  controlledDropDownValue?: Option;
  required?: boolean;
  isDropdownMulti?: boolean;
  subCaption?: string;
  isClearable?: boolean;
  customDropdownFunc?: (e: MultiValue<Option> | Option | null) => void;
}) => {
  const {
    value,
    err,
    multiValue,
    onTouch,
    onDefaultChange,
    onDropdownChange,
    onDropdownMultiChange,
  } = useFormInputs({
    customDropdownFunc: customDropdownFunc,
    defaultValue: defaultDropDownValue ? defaultDropDownValue : defaultValue,
    defaultMultiDropDownValue: defaultMultiDropDownValue,
    controlledDropDownValue: controlledDropDownValue,
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
        {subCaption && (
          <div className="form-inputs-sub-caption">{subCaption}</div>
        )}
        {textArea ? (
          <textarea
            id={`${name}-input`}
            name={name}
            onChange={onDefaultChange}
            onBlur={onTouch}
            style={required && err.err ? { border: "1.5px solid darkred" } : {}}
            required={required}
            value={value}
          />
        ) : dropDown ? (
          isDropdownMulti ? (
            <Select
              options={dropDown}
              defaultValue={defaultDropDownValue}
              className={"form-inputs-dropdown"}
              classNamePrefix={"dropdown-input"}
              name={name}
              id={`${name}-input`}
              onChange={onDropdownMultiChange}
              onBlur={onTouch}
              styles={required && err.err ? customStylesErr : undefined}
              isMulti={true}
              value={multiValue}
              isClearable={isClearable}
            />
          ) : (
            <Select
              defaultValue={defaultDropDownValue}
              options={dropDown}
              className={"form-inputs-dropdown"}
              classNamePrefix={"dropdown-input"}
              name={name}
              id={`${name}-input`}
              onChange={onDropdownChange}
              onBlur={onTouch}
              styles={required && err.err ? customStylesErr : undefined}
              value={value ? transformOptions(value) : null}
              isClearable={isClearable}
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
            value={value}
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
