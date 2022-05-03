import { useState, useEffect } from "react";
import { ActionMeta, MultiValue } from "react-select";
import { Option } from "../pages/forms/data/OccupationList";
import removeAddedWhiteSpace from "../helperFunctions/removeWhiteSpace";
const useFormInputs = ({
  validateFunc,
  required,
  isMulti,
}: {
  validateFunc?: (str: string) => { err: boolean; message: string };
  required?: boolean;
  isMulti?: boolean;
}) => {
  const [value, setValue] = useState("");
  const [err, setErr] = useState({ err: false, message: "" });
  const [touched, setTouched] = useState(false);
  const [multiValue, setMultiValue] = useState<Option[]>([]);
  //run validating function
  useEffect(() => {
    if (touched) {
      if (removeAddedWhiteSpace(value).length <= 0 && required)
        setErr({ err: true, message: "Field is required" });
      else if (validateFunc && validateFunc(value).err)
        setErr(validateFunc(value));
      else setErr({ err: false, message: "" });
    }
  }, [touched, value, validateFunc, required]);
  useEffect(() => {
    if (touched && isMulti && multiValue.length <= 0) {
      setErr({ err: true, message: "Field is required" });
    } else setErr({ err: false, message: "" });
  }, [touched, multiValue, isMulti]);
  const onDefaultChange = (
    e: React.ChangeEvent<HTMLInputElement & HTMLTextAreaElement>
  ) => {
    setValue(e.target.value);
  };
  const onDropdownChange = (
    option: Option | null,
    actionMeta: ActionMeta<Option>
  ) => {
    setValue(option ? option.value : "");
  };

  const onTouch = () => {
    setTouched(true);
  };
  const onDropdownMultiChange = (
    options: MultiValue<Option>,
    actionMeta: ActionMeta<Option>
  ) => {
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
    setMultiValue
  };
};
export default useFormInputs;
