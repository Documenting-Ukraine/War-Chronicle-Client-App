//import { useState } from "react";
import useRecordFormPropUpdate from "../../../../hooks/use-record-form-prop-update";
import {
  isProtestAbroadRegion,
  ProtestAbroadRegion,
} from "../../../../types/dataTypes/docTypes/ProtestsAbroad";
import {
  isOption,
  transformSingleList,
} from "../../../authPage/data/OccupationList";
import FormInputs from "../../../utilityComponents/formInputs/FormInputs";
const newProtestRegions = transformSingleList(ProtestAbroadRegion);
const ProtestsAbroad = (): JSX.Element => {
  // const [protestLocation, setProtestLocation] = useState<
  //   typeof ProtestAbroadRegion[number] | undefined
  // >();
  const updateStoreProps = useRecordFormPropUpdate("Protests Abroad")
  return (
    <>
      <FormInputs
        title="Protest Location"
        name="protestLocation"
        dropDown={newProtestRegions}
        customDropdownFunc={(e) => {
          if (isOption(e) && isProtestAbroadRegion(e.value)){
            //setProtestLocation(e.value);
            updateStoreProps({
              protest_location: e.value
            })
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
        customValidation = {(e) => {
          updateStoreProps({
            num_of_protesters: parseInt(e)
          })
          return {err: false, message: ''}
        }}
      />
      <FormInputs
        title="Number of Arrests"
        name="numOfArrests"
        inputType="number"
        required={false}
        customValidation = {(e) => {
          updateStoreProps({
            num_of_arrests: parseInt(e)
          })
          return {err: false, message: ''}
        }}
      />
      <FormInputs
        title="Number of Hospitalizations"
        name="numOfHospitalizations"
        inputType="number"
        required={false}
        customValidation = {(e) => {
          updateStoreProps({
            num_of_hospitalizations: parseInt(e)
          })
          return {err: false, message: ''}
        }}
      />
    </>
  );
};
export default ProtestsAbroad;
