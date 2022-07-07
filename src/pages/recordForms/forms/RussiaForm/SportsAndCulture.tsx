import { useState } from "react";
import useRecordFormPropUpdate from "../../../../hooks/use-record-form-prop-update";
import {
  SportsAndCultureResponses,
  isSportsResponseType,
} from "../../../../types/dataTypes/docTypes/Russia";
import {
  isOption,
  transformSingleList,
} from "../../../authPage/data/OccupationList";
import FormDateInputs from "../../../utilityComponents/formInputs/FormDateInputs";
import FormInputs from "../../../utilityComponents/formInputs/FormInputs";
const sportsResponseTypeOptions = transformSingleList([
  ...SportsAndCultureResponses,
]);

const SportsAndCulture = (): JSX.Element => {
    const [responseType, setResponseType] = useState<
      typeof SportsAndCultureResponses[number] | undefined
    >();
    const updateStoreProps = useRecordFormPropUpdate();
    return (
      <>
        <FormInputs
          title="Organization Name"
          name="organizationName"
          inputType="text"
          required
          customValidation={(e) => {
            updateStoreProps({
              organization_name: e
            })
            return {err: false, message: ''}
          }}
        />
        <FormInputs
          title="Organization Type (ex. soccer, football, workers union etc)"
          name="organizationType"
          inputType="text"
          required
          customValidation={(e) => {
            updateStoreProps({
              organization_type: e
            })
            return {err: false, message: ''}
          }}
        />
        <FormInputs
          title="Response Type"
          name="responseType"
          dropDown={sportsResponseTypeOptions}
          customDropdownFunc={(e) => {
            if (isOption(e) && isSportsResponseType(e.value)){
              setResponseType(e.value);
              updateStoreProps({
                russian_record_response_type: e.value
              })
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
            customValidation={(e) => {
              updateStoreProps({
                russian_record_custom_response_type: e
              })
              return {err: false, message: ''}
            }}
          />
        )}
        {responseType === "Donation" && (
          <FormInputs
            title="Donation Valuation"
            name={"donationValuation"}
            inputType="number"
            required={false}
            customValidation={(e) => {
              updateStoreProps({
                donation_valuation: e
              })
              return {err: false, message: ''}
            }}
          />
        )}
        <FormDateInputs
          title="Date of Announcement"
          name={"dateOfAnnouncement"}
          timeInput={false}
          onDateChange={(e: Date) => {
            updateStoreProps({
              date_of_announcement: e
            })
          }}
          required
        />
      </>
    );
  };
  export default SportsAndCulture