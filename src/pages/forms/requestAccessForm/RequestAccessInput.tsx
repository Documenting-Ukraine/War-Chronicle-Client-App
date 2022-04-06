import { useEffect, useState } from "react";
import removeAddedWhiteSpace from "../../../helperFunctions/removeWhiteSpace";
import Select, { ActionMeta } from "react-select";
import { GroupedOption, Option } from "../data/OccupationList";
import useFormInputs from "../../../hooks/use-form-inputs";
const RequestAccessInput = ({
  name,
  textArea,
  customValidation,
  inputType = "text",
  dropDown,
}: {
  name: string;
  textArea?: boolean;
  customValidation?: (e: string) => { err: boolean; message: string };
  inputType?: string;
  dropDown?: GroupedOption[];
}) => {
  const { err, onTouch, onDefaultChange, onDropdownChange } = useFormInputs({
    validateFunc: customValidation,
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
            onChange={onDropdownChange}
            onBlur={onTouch}
          />
        ) : (
          <input
            id={`${name}-input`}
            name={name}
            type={inputType}
            onChange={onDefaultChange}
            onBlur={onTouch}
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
