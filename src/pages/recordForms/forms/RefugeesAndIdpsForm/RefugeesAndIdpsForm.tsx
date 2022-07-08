import FormInputs from "../../../utilityComponents/formInputs/FormInputs";
import {
  isOption,
  Option,
  transformSingleList,
} from "../../../authPage/data/OccupationList";
import { MultiValue } from "react-select";
import {
  isRefugeesAndIdpsType,
  RefugeesAndIdpsTypes,
} from "../../../../types/dataTypes/docTypes/RefugeesAndIdps";
import { useEffect, useState } from "react";
import Refugees from "./RefugeesInputs";
import IDPs from "./IDPsInputs";
import useRecordFormPropUpdate from "../../../../hooks/use-record-form-prop-update";
const refugeesAndIdpsOptions = transformSingleList([...RefugeesAndIdpsTypes]);
const RefugeesAndIdpsForm = () => {
  const updateStoreProps = useRecordFormPropUpdate("Refugees And IDPs")
  const [refugeesAndIdpsType, setRefugeesAndIdpsType] = useState<
    typeof RefugeesAndIdpsTypes[number]
  >(RefugeesAndIdpsTypes[0]);
  useEffect(() => {
    updateStoreProps({
      refugees_and_idps_type: refugeesAndIdpsType
    })
  }, [refugeesAndIdpsType])
  return (
    <>
      <FormInputs
        title={"Refugees And IDPs Type"}
        name={"refugeesAndIdpsType"}
        defaultDropDownValue={refugeesAndIdpsOptions[0]}
        dropDown={refugeesAndIdpsOptions}
        className="record-form-input"
        customDropdownFunc={(e: Option | MultiValue<Option> | null) => {
          if (isOption(e) && isRefugeesAndIdpsType(e.value)){
            setRefugeesAndIdpsType(e.value);
          }
        }}
      />
      {refugeesAndIdpsType === "Refugees" && <Refugees />}
      {refugeesAndIdpsType === "IDPs" && <IDPs />}
    </>
  );
};
export default RefugeesAndIdpsForm;
