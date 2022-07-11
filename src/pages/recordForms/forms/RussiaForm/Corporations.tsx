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
  const [responseType, setResponseType] = useState<
    typeof ResponseType[number] | undefined
  >(defaultInputs?.russian_record_response_type);
  const updateStoreProps = useRecordFormPropUpdate("Russia");
  return (
    <>
      <FormInputs
        title="Corporation Name"
        name="corporationName"
        inputType="text"
        required
        defaultValue={defaultInputs?.corporation_name}
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
        defaultValue={defaultInputs?.corporation_industry}
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
          defaultValue={defaultInputs?.russian_record_custom_response_type}
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
          defaultValue={defaultInputs?.donation_valuation}
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
        defaultValue={new Date(defaultInputs?.date_of_first_response)}
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
        defaultValue={new Date(defaultInputs?.date_of_most_recent_response)}
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
