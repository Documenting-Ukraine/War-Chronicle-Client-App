import { transformSingleList } from "../../../authPage/data/OccupationList";
import FormInputs from "../../../utilityComponents/formInputs/FormInputs";
import {
  WarCrimeTypes,
  isWarCrime,
} from "../../../../types/dataTypes/DataLists";
import { useEffect, useState } from "react";
import { Option, isOption } from "../../../authPage/data/OccupationList";
import { MultiValue } from "react-select";
import { WarCrimes } from "../../../../types/dataTypes/docTypes/WarCrimes";
import DestructionOfCulture from "./DestructionOfCulture";
import AttacksOnCivilians from "./AttackOnCivilians";
import useRecordFormPropUpdate from "../../../../hooks/use-record-form-prop-update";

const WarCrimeOptions = transformSingleList([...WarCrimeTypes]);

const WarCrimesForm = ({
  defaultInputs,
}: {
  defaultInputs?: WarCrimes;
}): JSX.Element => {
  const updateStoreProps = useRecordFormPropUpdate("War Crimes");
  const [warCrimeType, setWarCrimeType] = useState<
    typeof WarCrimeTypes[number]
  >(WarCrimeTypes[0]);
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
        defaultDropDownValue={WarCrimeOptions[0]}
        dropDown={WarCrimeOptions}
        className="record-form-input"
        customDropdownFunc={(e: Option | MultiValue<Option> | null) => {
          if (isOption(e) && isWarCrime(e.value)) {
            setWarCrimeType(e.value);
          }
        }}
      />
      {warCrimeType === "Attacks on Civilians" && <AttacksOnCivilians />}
      {warCrimeType === "Destruction of Culture" && <DestructionOfCulture />}
    </>
  );
};
export default WarCrimesForm;
