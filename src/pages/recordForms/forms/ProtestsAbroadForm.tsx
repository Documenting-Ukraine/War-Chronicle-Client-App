import { useState } from "react";
import {
  isProtestAbroadRegion,
  ProtestAbroadRegion,
} from "../../../types/dataTypes/docTypes/ProtestsAbroad";
import {
  isOption,
  transformSingleList,
} from "../../authPage/data/OccupationList";
import FormInputs from "../../utilityComponents/formInputs/FormInputs";
const newProtestRegions = transformSingleList(ProtestAbroadRegion);
const ProtestsAbroad = (): JSX.Element => {
  const [protestLocation, setProtestLocation] = useState<
    typeof ProtestAbroadRegion[number] | undefined
  >();
  return (
    <>
      <FormInputs
        title="Protest Location"
        name="protestLocation"
        dropDown={newProtestRegions}
        customDropdownFunc={(e) => {
          if (isOption(e) && isProtestAbroadRegion(e.value))
            setProtestLocation(e.value);
        }}
        required
      />
      {}
      <FormInputs
        title="Number of Protesters"
        name="numOfProtesters"
        inputType="number"
        required={false}
      />
      <FormInputs
        title="Number of Arrests"
        name="numOfArrests"
        inputType="number"
        required={false}
      />
      <FormInputs
        title="Number of Hospitalizations"
        name="numOfHospitalizations"
        inputType="number"
        required={false}
      />
    </>
  );
};
export default ProtestsAbroad;
