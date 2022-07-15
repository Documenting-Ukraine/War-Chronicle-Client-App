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
  const responseType =
    defaultInputs?.international_response_type === "Humanitarian Aid" ||
    defaultInputs?.international_response_type === "Military Aid";
  return (
    <>
      <FormInputs
        title="Specific Aid (ex. military supplies, rations, etc)"
        name="subAidTypes"
        subCaption="Seperate each aid type with a comma"
        inputType="text"
        required={false}
        defaultValue={responseType ? defaultInputs.sub_aid_types : undefined}
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
          responseType
            ? defaultInputs?.aid_sent
              ? transformOptions(defaultInputs.aid_sent)
              : booleanDropdown[2]
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
        defaultValue={responseType ? defaultInputs?.aid_recipient : undefined}
        customValidation={(e) => {
          updateStoreProps({
            aid_recipient: e,
          });
          return { err: false, message: "" };
        }}
      />
      <FormDateInputs
        defaultValue={
          responseType
            ? defaultInputs?.date_aid_is_announced
              ? new Date(defaultInputs.date_aid_is_announced)
              : undefined
            : undefined
        }
        title="Date Aid is Announced"
        name="dateAidIsAnnounced"
        onDateChange={(e: Date) => {
          updateStoreProps({
            date_aid_is_announced: e.toString(),
          });
        }}
        required
      />
      <FormDateInputs
        defaultValue={
          responseType
            ? defaultInputs?.date_aid_is_sent
              ? new Date(defaultInputs.date_aid_is_sent)
              : undefined
            : undefined
        }
        title="Date Aid is Sent"
        name="dateAidIsSent"
        onDateChange={(e: Date) => {
          updateStoreProps({
            date_aid_is_sent: e.toString(),
          });
        }}
        required
      />
      <FormInputs
        defaultValue={
          responseType ? defaultInputs?.aid_valuation.toString() : undefined
        }
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
