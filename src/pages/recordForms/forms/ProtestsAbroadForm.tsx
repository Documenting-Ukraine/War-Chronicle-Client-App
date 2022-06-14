import { ProtestAbroadRegion } from "../../../types/dataTypes/docTypes/ProtestsAbroad";
import { transformSingleList } from "../../authPage/data/OccupationList";
import FormInputs, {
  CustomFormInputs,
} from "../../utilityComponents/formInputs/FormInputs";
const newProtestRegions = transformSingleList([...ProtestAbroadRegion]);
const ProtestsAbroad = (): JSX.Element => {
  return (
    <>
      <FormInputs
        title="Protest Location"
        name="protest_location"
        dropDown={newProtestRegions}
        required
      />
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
