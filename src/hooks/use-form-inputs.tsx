import { useState, useEffect } from "react";
import { ActionMeta } from "react-select";
import { Option } from "../pages/forms/data/OccupationList";
import removeAddedWhiteSpace from "../helperFunctions/removeWhiteSpace";
const useFormInputs = ({
    validateFunc,
    required
}: {
    validateFunc?: (str: string) => { err: boolean, message: string }
    required?: boolean
}) => {
  const [value, setValue] = useState("");
  const [err, setErr] = useState({ err: false, message: "" });
  const [touched, setTouched] = useState(false);
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
  const onDefaultChange = (e: React.ChangeEvent<HTMLInputElement & HTMLTextAreaElement>) => {
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
  return { value, err, touched, onDefaultChange, onDropdownChange, onTouch };
}
export default useFormInputs