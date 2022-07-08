import useRecordFormPropUpdate from "../../../../hooks/use-record-form-prop-update";
import {
  isItemInList,
  SanctionType,
} from "../../../../types/dataTypes/DataLists";

import {
  isOption,
  transformSingleList,
} from "../../../authPage/data/OccupationList";
import FormInputs from "../../../utilityComponents/formInputs/FormInputs";
const sanctionTypeOptions = transformSingleList([...SanctionType]);

const Sanctions = (): JSX.Element => {
  const updateStoreProps = useRecordFormPropUpdate("Russia");
  return (
    <>
      <FormInputs
        title="Sanction Type"
        name="sanctionType"
        dropDown={sanctionTypeOptions}
        required
        customDropdownFunc={(e) => {
          if (
            isOption(e) &&
            isItemInList<typeof SanctionType[number]>(e.value, SanctionType)
          )
            updateStoreProps({
              sanction_type: e.value,
            });
        }}
      />
      <FormInputs
        title="Sanction Name"
        name="sanctionName"
        inputType="text"
        required={false}
        customValidation={(e) => {
            updateStoreProps({
                sanction_name: e
            })
            return {err: false, message: ""}
        }}
      />
    </>
  );
};
export default Sanctions;
