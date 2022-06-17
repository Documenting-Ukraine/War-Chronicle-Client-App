import { transformSingleList } from "../../authPage/data/OccupationList";
import FormInputs, {
  CustomFormInputs,
} from "../../utilityComponents/formInputs/FormInputs";
import { WarCrimeTypes, isWarCrime } from "../../../types/dataTypes/DataLists";
import { useState } from "react";
import { Option, isOption } from "../../authPage/data/OccupationList";
import { MultiValue } from "react-select";
import {
  isMunitionType,
  isObjectOfCulture,
  KeyActor,
  LandmarkSignificance,
  LandmarksTypes,
  MunitionMineList,
  munitionTypeList,
  ObjectsOfCulture,
  WarCrimes,
} from "../../../types/dataTypes/docTypes/WarCrimes";
const WarCrimeOptions = transformSingleList([...WarCrimeTypes]);
const newMunitionList = transformSingleList([...munitionTypeList]);
const newMunitionMine = transformSingleList([...MunitionMineList]);
const newObjectsOfCultureList = transformSingleList([...ObjectsOfCulture]);
const newLandmarkSignficance = transformSingleList([...LandmarkSignificance]);
const newLandmarkTypes = transformSingleList([...LandmarksTypes]);
const newKeyActors = transformSingleList([...KeyActor]);
const AttacksOnCivilians = (): JSX.Element => {
  const [munitionType, setMunitionType] = useState<
    typeof munitionTypeList[number]
  >("Mine, Booby-Trap or Other Device");
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
          required
        />
      )}
    </>
  );
};

const DestructionOfCulture = (): JSX.Element => {
  const [objectOfCulture, setObjectOfCulture] = useState<
    typeof ObjectsOfCulture[number] | undefined
  >();
  return (
    <>
      <FormInputs
        title="Key Actor Name"
        inputType="text"
        required
        className={"record-form-input"}
        name={"keyActorName"}
      />
      <FormInputs
        title={"Key Actor Type"}
        name={"keyActorType"}
        dropDown={newKeyActors}
        className={"record-form-input"}
        required
      />
      <CustomFormInputs
        title="Object of Cultural Heritage"
        name={"objectOfHeritageCulture"}
        className={"record-form-input"}
        sectionContainer
        required={true}
      >
        <>
          <FormInputs
            title="Object Name"
            inputType="text"
            required={true}
            name={"objectOfCultureName"}
          />
          <FormInputs
            title="Type"
            name={"landmarkType"}
            required={true}
            dropDown={newObjectsOfCultureList}
            customDropdownFunc={(e: Option | MultiValue<Option> | null) => {
              if (isOption(e)) {
                const value = e.value;
                if (isObjectOfCulture(value)) setObjectOfCulture(value);
              }
            }}
          />
          {objectOfCulture === "Landmark" && (
            <>
              <FormInputs
                title="Landmark Type"
                name={"landmarkType"}
                required={true}
                dropDown={newLandmarkTypes}
              />
              <FormInputs
                title="Landmark Significance"
                name={"landmarkSignificance"}
                dropDown={newLandmarkSignficance}
                required={true}
              />
            </>
          )}
        </>
      </CustomFormInputs>
    </>
  );
};

const WarCrimesForm = ({
  defaultInputs,
}: {
  defaultInputs?: WarCrimes;
}): JSX.Element => {
  const [warCrimeType, setWarCrimeType] = useState<
    typeof WarCrimeTypes[number]
  >(WarCrimeTypes[0]);
  return (
    <>
      <FormInputs
        title={"Civilian Casualties"}
        name={"civilianCasualties"}
        className="record-form-input"
        inputType="number"
        required={false}
      />
      <FormInputs
        title={"War Crime Type"}
        name={"warCrime"}
        defaultDropDownValue={WarCrimeOptions[0]}
        dropDown={WarCrimeOptions}
        className="record-form-input"
        customDropdownFunc={(e: Option | MultiValue<Option> | null) => {
          if (isOption(e) && isWarCrime(e.value)) setWarCrimeType(e.value);
        }}
      />
      {warCrimeType === "Attacks on Civilians" && <AttacksOnCivilians />}
      {warCrimeType === "Destruction of Culture" && <DestructionOfCulture />}
    </>
  );
};
export default WarCrimesForm;
