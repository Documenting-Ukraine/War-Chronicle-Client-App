import useRecordFormPropUpdate from "../../../../hooks/use-record-form-prop-update";
import { InternationalResponse } from "../../../../types";
import {
  BooleanDropdownOptions,
  isItemInList,
} from "../../../../types/dataTypes/DataLists";
import {
  isOption,
  transformSingleList,
  transformOptions,
} from "../../../authPage/data/OccupationList";
import FormDateInputs from "../../../utilityComponents/formInputs/FormDateInputs";
import FormInputs from "../../../utilityComponents/formInputs/FormInputs";
const booleanDropdown = transformSingleList([...BooleanDropdownOptions]);
const GeneralAidInputs = ({
  defaultInputs,
}: {
  defaultInputs?: InternationalResponse;
}): JSX.Element => {
  const updateStoreProps = useRecordFormPropUpdate("International Response");
  return (
    <>
      <FormInputs
        title="Specific Aid (ex. military supplies, rations, etc)"
        name="subAidTypes"
        subCaption="Seperate each aid type with a comma"
        inputType="text"
        required={false}
        defaultValue={defaultInputs?.sub_aid_types}
        customValidation={(e) => {
          updateStoreProps({
            sub_aid_types: e,
          });
          return { err: false, message: "" };
        }}
      />
      <FormInputs
        title={"Has Aid Been Sent?"}
        name={"aidSent"}
        defaultDropDownValue={
          defaultInputs?.aid_sent
            ? transformOptions(defaultInputs.aid_sent)
            : booleanDropdown[2]
        }
        dropDown={booleanDropdown}
        required
        customDropdownFunc={(e) => {
          if (
            isOption(e) &&
            isItemInList<typeof BooleanDropdownOptions[number]>(
              e.value,
              BooleanDropdownOptions
            )
          ) {
            updateStoreProps({
              aid_sent: e.value,
            });
          }
        }}
      />
      <FormInputs
        title={"Aid Recipient"}
        name={"recipient"}
        inputType={"text"}
        required
        defaultValue={defaultInputs?.aid_recipient}
        customValidation={(e) => {
          updateStoreProps({
            aid_recipient: e,
          });
          return { err: false, message: "" };
        }}
      />
      <FormDateInputs
        defaultValue={
          defaultInputs?.date_aid_is_announced
            ? new Date(defaultInputs.date_aid_is_announced)
            : undefined
        }
        title="Date Aid is Announced"
        name="dateAidIsAnnounced"
        onDateChange={(e: Date) => {
          updateStoreProps({
            date_aid_is_announced: e,
          });
        }}
        required
      />
      <FormDateInputs
        defaultValue={
          defaultInputs?.date_aid_is_sent
            ? new Date(defaultInputs.date_aid_is_sent)
            : undefined
        }
        title="Date Aid is Sent"
        name="dateAidIsSent"
        onDateChange={(e: Date) => {
          updateStoreProps({
            date_aid_is_sent: e,
          });
        }}
        required
      />
      <FormInputs
        defaultValue={defaultInputs?.aid_valuation}
        title={"Aid Valuation"}
        name={"aidValuation"}
        inputType={"number"}
        required
        customValidation={(e) => {
          updateStoreProps({
            aid_valuation: parseInt(e),
          });
          return { err: false, message: "" };
        }}
      />
    </>
  );
};
export default GeneralAidInputs;
