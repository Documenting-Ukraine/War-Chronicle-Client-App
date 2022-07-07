import { transformSingleList } from "../../../authPage/data/OccupationList";
import FormInputs from "../../../utilityComponents/formInputs/FormInputs";
import { WarCrimeTypes, isWarCrime } from "../../../../types/dataTypes/DataLists";
import { useState } from "react";
import { Option, isOption } from "../../../authPage/data/OccupationList";
import { MultiValue } from "react-select";
import {
  WarCrimes,
} from "../../../../types/dataTypes/docTypes/WarCrimes";
import { useDispatch } from "react-redux";
import { updateFormProps } from "../../../../store/reducers/recordForms/recordFormSubmission/recordFormSubmissionReducer";
import DestructionOfCulture from "./DestructionOfCulture";
import AttacksOnCivilians from "./AttackOnCivilians";

const WarCrimeOptions = transformSingleList([...WarCrimeTypes]);

const WarCrimesForm = ({
  defaultInputs,
}: {
  defaultInputs?: WarCrimes;
}): JSX.Element => {
  const [warCrimeType, setWarCrimeType] = useState<
    typeof WarCrimeTypes[number]
  >(WarCrimeTypes[0]);
  const dispatch = useDispatch();
  const updateStoreProps = (e: Partial<WarCrimes>) =>
    dispatch(
      updateFormProps({
        payload: e,
      })
    );
  const updateCivilians = (e: string) => {
    updateStoreProps({
      civilian_casualties: parseInt(e),
    });
    return { err: false, message: "" };
  };
  return (
    <>
      <FormInputs
        title={"Civilian Casualties"}
        name={"civilianCasualties"}
        className="record-form-input"
        inputType="number"
        required={false}
        customValidation={updateCivilians}
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
            updateStoreProps({ war_crime: e.value });
          }
        }}
      />
      {warCrimeType === "Attacks on Civilians" && <AttacksOnCivilians />}
      {warCrimeType === "Destruction of Culture" && <DestructionOfCulture />}
    </>
  );
};
export default WarCrimesForm;
