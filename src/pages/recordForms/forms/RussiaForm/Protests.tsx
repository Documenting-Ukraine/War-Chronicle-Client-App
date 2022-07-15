import useRecordFormPropUpdate from "../../../../hooks/use-record-form-prop-update";
import FormAddressInputs from "../../../utilityComponents/formInputs/FormAddressInputs";
import FormInputs from "../../../utilityComponents/formInputs/FormInputs";
import { Russia } from "../../../../types";
const Protests = ({
  defaultInputs,
}: {
  defaultInputs?: Russia;
}): JSX.Element => {
  const protestType =
    defaultInputs?.russian_record_type === "Protests in Russia";
  const updateStoreProps = useRecordFormPropUpdate("Russia");
  return (
    <>
      <FormAddressInputs
        defaultAddress={protestType ? defaultInputs?.address : undefined}
      />
      <FormInputs
        title="Number of Protesters"
        name={"numOfProtesters"}
        inputType="number"
        required={false}
        defaultValue={
          protestType ? defaultInputs?.num_of_protesters?.toString() : undefined
        }
        customValidation={(e) => {
          updateStoreProps({
            num_of_protesters: parseInt(e),
          });
          return { err: false, message: "" };
        }}
      />
      <FormInputs
        title="Number of Arrests"
        name={"numOfArrests"}
        inputType="number"
        required={false}
        defaultValue={
          protestType ? defaultInputs?.num_of_arrests?.toString() : undefined
        }
        customValidation={(e) => {
          updateStoreProps({
            num_of_arrests: parseInt(e),
          });
          return { err: false, message: "" };
        }}
      />
      <FormInputs
        title="Number of Hospitalizations"
        name={"numOfHospitalizations"}
        inputType="number"
        required={false}
        defaultValue={
          protestType
            ? defaultInputs?.num_of_hospitalizations?.toString()
            : undefined
        }
        customValidation={(e) => {
          updateStoreProps({
            num_of_hospitalizations: parseInt(e),
          });
          return { err: false, message: "" };
        }}
      />
      <FormInputs
        title="State Response"
        name={"stateResponse"}
        inputType="text"
        required={false}
        defaultValue={protestType ? defaultInputs?.state_response : undefined}
        customValidation={(e) => {
          updateStoreProps({
            state_response: e,
          });
          return { err: false, message: "" };
        }}
      />
    </>
  );
};
export default Protests;
