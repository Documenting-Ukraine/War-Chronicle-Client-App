import useRecordFormPropUpdate from "../../../../hooks/use-record-form-prop-update";
import {
  isProtestAbroadRegion,
  ProtestAbroadRegion,
  ProtestsAbroad as ProtestAbroadType,
} from "../../../../types/dataTypes/docTypes/ProtestsAbroad";
import {
  isOption,
  transformSingleList,
  transformOptions,
} from "../../../authPage/data/OccupationList";
import FormInputs from "../../../utilityComponents/formInputs/FormInputs";
import ProtestsAbroadTemplate from "./ProtestAbroadTemplate";
const newProtestRegions = transformSingleList(ProtestAbroadRegion);
const ProtestsAbroad = ({
  defaultInputs,
}: {
  defaultInputs?: ProtestAbroadType;
}): JSX.Element => {
  const updateStoreProps = useRecordFormPropUpdate("Protests Abroad");
  return (
    <ProtestsAbroadTemplate>
      <>
        <FormInputs
          title="Protest Location"
          name="protestLocation"
          dropDown={newProtestRegions}
          defaultDropDownValue={
            defaultInputs?.protest_location
              ? transformOptions(defaultInputs.protest_location)
              : undefined
          }
          customDropdownFunc={(e) => {
            if (isOption(e) && isProtestAbroadRegion(e.value)) {
              updateStoreProps({
                protest_location: e.value,
              });
            }
          }}
          required
        />
        {}
        <FormInputs
          title="Number of Protesters"
          name="numOfProtesters"
          inputType="number"
          required={false}
          defaultValue={defaultInputs?.num_of_protesters?.toString()}
          customValidation={(e) => {
            updateStoreProps({
              num_of_protesters: parseInt(e),
            });
            return { err: false, message: "" };
          }}
        />
        <FormInputs
          defaultValue={defaultInputs?.num_of_arrests?.toString()}
          title="Number of Arrests"
          name="numOfArrests"
          inputType="number"
          required={false}
          customValidation={(e) => {
            updateStoreProps({
              num_of_arrests: parseInt(e),
            });
            return { err: false, message: "" };
          }}
        />
        <FormInputs
          defaultValue={defaultInputs?.num_of_hospitalizations?.toString()}
          title="Number of Hospitalizations"
          name="numOfHospitalizations"
          inputType="number"
          required={false}
          customValidation={(e) => {
            updateStoreProps({
              num_of_hospitalizations: parseInt(e),
            });
            return { err: false, message: "" };
          }}
        />
      </>
    </ProtestsAbroadTemplate>
  );
};
export default ProtestsAbroad;
