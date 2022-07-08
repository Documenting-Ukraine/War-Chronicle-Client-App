import useRecordFormPropUpdate from "../../../../hooks/use-record-form-prop-update";
import FormInputs from "../../../utilityComponents/formInputs/FormInputs";
import { RefugeesAndIdps } from "../../../../types";
const IDPs = ({
  defaultInputs,
}: {
  defaultInputs?: RefugeesAndIdps;
}): JSX.Element => {
  const updateStoreProps = useRecordFormPropUpdate("Refugees And IDPs");
  return (
    <>
      <FormInputs
        defaultValue={defaultInputs?.total_num_of_idps}
        title={"Total Number IDPs as of published date"}
        name={"totalNumOfIdps"}
        inputType="number"
        className="record-form-input"
        required
        customValidation={(e) => {
          updateStoreProps({
            total_num_of_idps: parseInt(e),
          });
          return { err: false, message: "" };
        }}
      />
    </>
  );
};
export default IDPs;
