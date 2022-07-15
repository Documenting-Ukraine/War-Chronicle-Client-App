import { useState } from "react";
import useRecordFormPropUpdate from "../../../../hooks/use-record-form-prop-update";
import { Russia } from "../../../../types";
import {
  isResponseType,
  ResponseType,
} from "../../../../types/dataTypes/DataLists";
import {
  isOption,
  transformSingleList,
  transformOptions,
} from "../../../authPage/data/OccupationList";
import FormDateInputs from "../../../utilityComponents/formInputs/FormDateInputs";
import FormInputs from "../../../utilityComponents/formInputs/FormInputs";
const responseTypeOptions = transformSingleList([...ResponseType]);

const Corporations = ({
  defaultInputs,
}: {
  defaultInputs?: Russia;
}): JSX.Element => {
  const corporationType =
    defaultInputs?.russian_record_type === "Corporation Responses";
  const [responseType, setResponseType] = useState<
    typeof ResponseType[number] | undefined
  >(corporationType ? defaultInputs.russian_record_response_type : undefined);
  const updateStoreProps = useRecordFormPropUpdate("Russia");
  return (
    <>
      <FormInputs
        title="Corporation Name"
        name="corporationName"
        inputType="text"
        required
        defaultValue={
          corporationType ? defaultInputs?.corporation_name : undefined
        }
        customValidation={(e) => {
          updateStoreProps({
            corporation_name: e,
          });
          return { err: false, message: "" };
        }}
      />
      <FormInputs
        title="Corporation Industry"
        name="corporationIndustry"
        inputType="text"
        required
        defaultValue={
          corporationType ? defaultInputs?.corporation_industry : undefined
        }
        customValidation={(e) => {
          updateStoreProps({
            corporation_industry: e,
          });
          return { err: false, message: "" };
        }}
      />
      <FormInputs
        title="Response Type"
        name="responseType"
        dropDown={responseTypeOptions}
        defaultDropDownValue={
          responseType ? transformOptions(responseType) : undefined
        }
        customDropdownFunc={(e) => {
          if (isOption(e) && isResponseType(e.value)) {
            setResponseType(e.value);
            updateStoreProps({
              russian_record_response_type: e.value,
            });
          }
        }}
        required
      />
      {responseType === "Other" && (
        <FormInputs
          title="Custom Response Type"
          name={"customResponseType"}
          inputType="text"
          required={true}
          defaultValue={
            corporationType
              ? defaultInputs?.russian_record_custom_response_type
              : undefined
          }
          customValidation={(e) => {
            updateStoreProps({
              russian_record_custom_response_type: e,
            });
            return { err: false, message: "" };
          }}
        />
      )}
      {responseType === "Donation" && (
        <FormInputs
          defaultValue={
            corporationType
              ? defaultInputs?.donation_valuation?.toString()
              : undefined
          }
          title="Donation Valuation"
          name={"donationValuation"}
          inputType="number"
          required={false}
          customValidation={(e) => {
            updateStoreProps({
              donation_valuation: parseInt(e),
            });
            return { err: false, message: "" };
          }}
        />
      )}
      <FormDateInputs
        title="Date of First Response"
        name={"dateOfFirstResponse"}
        timeInput={false}
        defaultValue={
          corporationType
            ? new Date(defaultInputs?.date_of_first_response)
            : undefined
        }
        onDateChange={(e: Date) => {
          updateStoreProps({
            date_of_first_response: e.toString(),
          });
        }}
        required
      />
      <FormDateInputs
        title="Date of Most Recent Response"
        name={"dateOfMostRecentResponse"}
        timeInput={false}
        defaultValue={
          corporationType
            ? new Date(defaultInputs?.date_of_most_recent_response)
            : undefined
        }
        onDateChange={(e: Date) => {
          updateStoreProps({
            date_of_most_recent_response: e.toString(),
          });
        }}
        required
      />
    </>
  );
};
export default Corporations;
