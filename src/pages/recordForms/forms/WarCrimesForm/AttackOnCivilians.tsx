import { transformSingleList } from "../../../authPage/data/OccupationList";
import FormInputs from "../../../utilityComponents/formInputs/FormInputs";
import { useEffect, useState } from "react";
import { Option, isOption } from "../../../authPage/data/OccupationList";
import { MultiValue } from "react-select";
import {
  isMunitionType,
  MunitionMineList,
  munitionTypeList,
} from "../../../../types/dataTypes/docTypes/WarCrimes";
import { isItemInList } from "../../../../types/dataTypes/DataLists";
import useRecordFormPropUpdate from "../../../../hooks/use-record-form-prop-update";
const newMunitionList = transformSingleList([...munitionTypeList]);
const newMunitionMine = transformSingleList([...MunitionMineList]);
const AttacksOnCivilians = (): JSX.Element => {
  const updateStoreProps = useRecordFormPropUpdate();
  const [munitionType, setMunitionType] = useState<
    typeof munitionTypeList[number]
  >("Mine, Booby-Trap or Other Device");
  const [munitionSubType, setMunitionSubType] = useState<
    typeof MunitionMineList[number] | undefined
  >();
  useEffect(() => {
    updateStoreProps({
      munition: {
        munition_type: munitionType,
        munition_sub_types: munitionSubType,
      },
    });
  }, [munitionType, munitionSubType, updateStoreProps]);

  return (
    <>
      <FormInputs
        title="Munition"
        name={"munition"}
        className={"record-form-input"}
        dropDown={newMunitionList}
        defaultDropDownValue={newMunitionList[0]}
        customDropdownFunc={(e: Option | MultiValue<Option> | null) => {
          if (isOption(e) && isMunitionType(e.value)) setMunitionType(e.value);
        }}
        required
      />
      {munitionType === "Mine, Booby-Trap or Other Device" && (
        <FormInputs
          title={"Munition Sub Type"}
          dropDown={newMunitionMine}
          name={"munitionSubType"}
          className={"record-form-input"}
          customDropdownFunc={(e: Option | MultiValue<Option> | null) => {
            if (
              isOption(e) &&
              isItemInList<typeof MunitionMineList[number]>(
                e.value,
                MunitionMineList
              )
            )
              setMunitionSubType(e.value);
          }}
          required
        />
      )}
    </>
  );
};
export default AttacksOnCivilians;
