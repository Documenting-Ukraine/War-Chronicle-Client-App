import useRecordFormPropUpdate from "../../../../hooks/use-record-form-prop-update";
import FormInputs from "../../../utilityComponents/formInputs/FormInputs";

const IDPs = (): JSX.Element => {
    const updateStoreProps = useRecordFormPropUpdate();
    return (
      <>
        <FormInputs
          title={"Total Number IDPs as of published date"}
          name={"totalNumOfIdps"}
          inputType="number"
          className="record-form-input"
          required
          customValidation={(e)=>{
            updateStoreProps({
                total_num_of_idps: parseInt(e)
            })
            return {err: false, message: ""}
          }}
        />
      </>
    );
  };
  export default IDPs