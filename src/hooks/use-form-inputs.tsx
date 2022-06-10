import { useState, useEffect } from "react";
import { ActionMeta, MultiValue } from "react-select";
import { Option } from "../pages/authPage/data/OccupationList";
import removeAddedWhiteSpace from "../helperFunctions/removeWhiteSpace";
const useFormInputs = ({
  validateFunc,
  defaultDropDownValue,
  controlledDropDownValue,
  customDropdownFunc,
  required,
  isMulti,
}: {
  customDropdownFunc?: (e: MultiValue<Option> | Option | null) => void;
  validateFunc?: (str: string) => { err: boolean; message: string };
  required?: boolean;
  isMulti?: boolean;
  defaultDropDownValue?: Option;
  controlledDropDownValue?: Option;
}) => {
  const [value, setValue] = useState(
    defaultDropDownValue ? defaultDropDownValue.value : ""
  );
  const [err, setErr] = useState({ err: false, message: "" });
  const [touched, setTouched] = useState(false);
  const [multiValue, setMultiValue] = useState<Option[]>([]);
  //run validating function
  useEffect(() => {
    if (touched) {
      if (removeAddedWhiteSpace(value).length <= 0 && required) {
        setErr({ err: true, message: "Field is required" });
        if (validateFunc) validateFunc(value);
      } else if (validateFunc && validateFunc(value).err)
        setErr(validateFunc(value));
      else setErr({ err: false, message: "" });
    }
  }, [touched, value, validateFunc, required]);
  useEffect(() => {
    if (isMulti) {
      if (touched && multiValue.length <= 0) {
        setErr({ err: true, message: "Field is required" });
      } else setErr({ err: false, message: "" });
    }
  }, [touched, multiValue, isMulti]);
  useEffect(() => {
    if (controlledDropDownValue) setValue(controlledDropDownValue.value);
  }, [controlledDropDownValue]);
  const onDefaultChange = (
    e: React.ChangeEvent<HTMLInputElement & HTMLTextAreaElement>
  ) => {
    setValue(e.target.value);
  };
  const onDropdownChange = (
    option: Option | null,
    actionMeta: ActionMeta<Option>
  ) => {
    if (option && customDropdownFunc) customDropdownFunc(option);
    setValue(option ? option.value : "");
  };

  const onTouch = () => {
    setTouched(true);
  };
  const onDropdownMultiChange = (
    options: MultiValue<Option>,
    actionMeta: ActionMeta<Option>
  ) => {
    if (options && customDropdownFunc) customDropdownFunc(options);
    const copied = [...options];
    setMultiValue(copied);
  };
  return {
    value,
    err,
    touched,
    multiValue,
    onDefaultChange,
    onDropdownChange,
    onTouch,
    onDropdownMultiChange,
    setMultiValue,
  };
};
export default useFormInputs;
