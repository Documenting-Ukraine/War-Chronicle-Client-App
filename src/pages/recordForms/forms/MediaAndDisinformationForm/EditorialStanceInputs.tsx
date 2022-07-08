import { useEffect, useState } from "react";
import useRecordFormPropUpdate from "../../../../hooks/use-record-form-prop-update";
import { MediaAndDisInformation } from "../../../../types";
import FormInputs, {
  CustomFormInputs,
} from "../../../utilityComponents/formInputs/FormInputs";

const EditiorialStance = ({
  defaultInputs,
}: {
  defaultInputs?: MediaAndDisInformation;
}) => {
  const [stance, setStance] = useState(
    defaultInputs?.editorial_stance?.stance
      ? defaultInputs.editorial_stance.stance
      : ""
  );
  const [quote, setQuote] = useState(
    defaultInputs?.editorial_stance?.quote
      ? defaultInputs.editorial_stance.quote
      : ""
  );
  const updateStoreProps = useRecordFormPropUpdate("Media And Disinformation");
  useEffect(() => {
    updateStoreProps({
      editorial_stance: {
        stance: stance,
        quote: quote,
      },
    });
  }, [stance, quote, updateStoreProps]);
  return (
    <CustomFormInputs
      title={"Editorial Stance"}
      name={"editorialStance"}
      className="record-form-input"
      sectionContainer
      required
    >
      <>
        <FormInputs
          title={"Stance (ex. Neutral, Pro-Ukraine, Anti-war, etc)."}
          name={"editorialStance"}
          inputType={"text"}
          className="record-form-input"
          required
          customValidation={(e) => {
            setStance(e);
            return { err: false, message: "" };
          }}
          defaultValue={stance}
        />
        <FormInputs
          title={"Quote Supporting Stance"}
          name={"editorialQuote"}
          inputType={"text"}
          className="record-form-input"
          required
          customValidation={(e) => {
            setQuote(e);
            return { err: false, message: "" };
          }}
          defaultValue={quote}
        />
      </>
    </CustomFormInputs>
  );
};
export default EditiorialStance;
