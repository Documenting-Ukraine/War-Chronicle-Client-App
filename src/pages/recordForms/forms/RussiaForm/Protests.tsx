import useRecordFormPropUpdate from "../../../../hooks/use-record-form-prop-update";
import FormAddressInputs from "../../../utilityComponents/formInputs/FormAddressInputs";
import FormInputs from "../../../utilityComponents/formInputs/FormInputs";

const Protests = (): JSX.Element => {
    const updateStoreProps = useRecordFormPropUpdate()
    return (
      <>
        <FormAddressInputs />
        <FormInputs
          title="Number of Protesters"
          name={"numOfProtesters"}
          inputType="number"
          required={false}
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
          customValidation={(e) => {
            updateStoreProps({
              state_response: parseInt(e),
            });
            return { err: false, message: "" };
          }}
        />
      </>
    );
  };
  export default Protests