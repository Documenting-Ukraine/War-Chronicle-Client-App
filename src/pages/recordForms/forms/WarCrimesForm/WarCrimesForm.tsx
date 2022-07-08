import {
  transformSingleList,
  transformOptions,
} from "../../../authPage/data/OccupationList";
import FormInputs from "../../../utilityComponents/formInputs/FormInputs";
import {
  WarCrimeTypes,
  isWarCrime,
} from "../../../../types/dataTypes/DataLists";
import { useEffect, useState } from "react";
import { Option, isOption } from "../../../authPage/data/OccupationList";
import { MultiValue } from "react-select";
import DestructionOfCulture from "./DestructionOfCulture";
import AttacksOnCivilians from "./AttackOnCivilians";
import useRecordFormPropUpdate from "../../../../hooks/use-record-form-prop-update";
import { WarCrimes } from "../../../../types";

const WarCrimeOptions = transformSingleList([...WarCrimeTypes]);
const WarCrimesForm = ({
  defaultInputs,
}: {
  defaultInputs?: WarCrimes;
}): JSX.Element => {
  const updateStoreProps = useRecordFormPropUpdate("War Crimes");
  const [warCrimeType, setWarCrimeType] = useState<
    typeof WarCrimeTypes[number]
  >(defaultInputs?.war_crime ? defaultInputs.war_crime : WarCrimeTypes[0]);
  useEffect(() => {
    updateStoreProps({
      war_crime: warCrimeType,
    });
  }, [warCrimeType, updateStoreProps]);
  return (
    <>
      <FormInputs
        title={"Civilian Casualties"}
        name={"civilianCasualties"}
        className="record-form-input"
        inputType="number"
        required={false}
        defaultValue = {defaultInputs?.civilian_casualties?.toString()}
        customValidation={(e: string) => {
          updateStoreProps({
            civilian_casualties: parseInt(e),
          });
          return { err: false, message: "" };
        }}
      />
      <FormInputs
        title={"War Crime Type"}
        name={"warCrime"}
        defaultDropDownValue={transformOptions(warCrimeType)}
        dropDown={WarCrimeOptions}
        className="record-form-input"
        customDropdownFunc={(e: Option | MultiValue<Option> | null) => {
          if (isOption(e) && isWarCrime(e.value)) {
            setWarCrimeType(e.value);
          }
        }}
      />
      {warCrimeType === "Attacks on Civilians" && <AttacksOnCivilians defaultInputs = {defaultInputs}/>}
      {warCrimeType === "Destruction of Culture" && <DestructionOfCulture defaultInputs = {defaultInputs} />}
    </>
  );
};
export default WarCrimesForm;
