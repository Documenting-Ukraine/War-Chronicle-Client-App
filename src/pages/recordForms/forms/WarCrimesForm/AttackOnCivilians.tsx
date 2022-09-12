import {
  transformSingleList,
  transformOptions,
} from "../../../authPage/data/OccupationList";
import FormInputs from "../../../utilityComponents/formInputs/FormInputs";
import { useEffect, useState } from "react";
import { Option, isOption } from "../../../authPage/data/OccupationList";
import { MultiValue } from "react-select";
import {
  isMunitionType,
  MunitionMineList,
  munitionTypeList,
  WarCrimes,
} from "../../../../types/dataTypes/docTypes/WarCrimes";
import { isItemInList } from "../../../../types/dataTypes/DataLists";
import useRecordFormPropUpdate from "../../../../hooks/use-record-form-prop-update";
const newMunitionList = transformSingleList([...munitionTypeList]);
const newMunitionMine = transformSingleList([...MunitionMineList]);
const AttacksOnCivilians = ({
  defaultInputs,
}: {
  defaultInputs?: WarCrimes;
}): JSX.Element => {
  const attackOnCiviliansType =
    defaultInputs?.war_crime === "Attacks on Civilians";
  const updateStoreProps = useRecordFormPropUpdate("War Crimes");
  const [munitionType, setMunitionType] = useState<
    typeof munitionTypeList[number]
  >(
    attackOnCiviliansType && defaultInputs?.munition?.munition_type
      ? defaultInputs?.munition?.munition_type
      : "Mine, Booby-Trap or Other Device"
  );
  const [munitionSubType, setMunitionSubType] = useState<string | undefined>(
    attackOnCiviliansType
      ? defaultInputs?.munition?.munition_sub_types
      : undefined
  );
  const [customMunitionSubType, setCustomMunitionSubType] = useState("");
  useEffect(() => {
    updateStoreProps({
      munition: {
        munition_type: munitionType,
        munition_sub_types:
          munitionSubType === "Other type of device"
            ? customMunitionSubType
            : munitionSubType,
      },
    });
  }, [munitionType, munitionSubType, updateStoreProps, customMunitionSubType]);

  return (
    <>
      <FormInputs
        title="Munition Type"
        name={"munitionType"}
        className={"record-form-input"}
        dropDown={newMunitionList}
        defaultDropDownValue={
          attackOnCiviliansType && defaultInputs?.munition?.munition_type
            ? transformOptions(defaultInputs?.munition?.munition_type)
            : newMunitionList[0]
        }
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
          defaultDropDownValue={
            attackOnCiviliansType && defaultInputs?.munition?.munition_sub_types
              ? transformOptions(defaultInputs?.munition?.munition_sub_types)
              : undefined
          }
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
      {munitionSubType === "Other type of device" && (
        <FormInputs
          title={"Custom Sub Type"}
          name="custom-munition-sub-type"
          defaultValue={customMunitionSubType}
          customValidation={(e) => {
            setCustomMunitionSubType(e);
            return {
              err: false,
              message: "",
            };
          }}
        />
      )}
    </>
  );
};
export default AttacksOnCivilians;
