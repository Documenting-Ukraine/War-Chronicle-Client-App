import { useState } from "react";
import { MultiValue } from "react-select";
import {
  isResponseType,
  ResponseType,
  RussianRecordTypes,
  SanctionType,
} from "../../../types/dataTypes/DataLists";
import {
  isRussianRecordType,
  SportsAndCultureResponses,
  isSportsResponseType,
} from "../../../types/dataTypes/docTypes/Russia";
import {
  isOption,
  Option,
  transformSingleList,
} from "../../authPage/data/OccupationList";
import FormAddressInputs from "../../utilityComponents/formInputs/FormAddressInputs";
import FormDateInputs from "../../utilityComponents/formInputs/FormDateInputs";
import FormInputs from "../../utilityComponents/formInputs/FormInputs";
const sanctionTypeOptions = transformSingleList([...SanctionType]);
const responseTypeOptions = transformSingleList([...ResponseType]);
const sportsResponseTypeOptions = transformSingleList([
  ...SportsAndCultureResponses,
]);
const Sanctions = (): JSX.Element => {
  return (
    <>
      <FormInputs
        title="Sanction Type"
        name="sanctionType"
        dropDown={sanctionTypeOptions}
        required
      />
      <FormInputs
        title="Sanction Name"
        name="sanctionName"
        inputType="text"
        required={false}
      />
    </>
  );
};
const Corporations = (): JSX.Element => {
  const [responseType, setResponseType] = useState<
    typeof ResponseType[number] | undefined
  >();
  return (
    <>
      <FormInputs
        title="Corporation Name"
        name="corporationName"
        inputType="text"
        required
      />
      <FormInputs
        title="Corporation Industry"
        name="corporationIndustry"
        inputType="text"
        required
      />
      <FormInputs
        title="Response Type"
        name="responseType"
        dropDown={responseTypeOptions}
        customDropdownFunc={(e) => {
          if (isOption(e) && isResponseType(e.value)) setResponseType(e.value);
        }}
        required
      />
      {responseType === "Other" && (
        <FormInputs
          title="Custom Response Type"
          name={"customResponseType"}
          inputType="text"
          required={true}
        />
      )}
      {responseType === "Donation" && (
        <FormInputs
          title="Donation Valuation"
          name={"donationValuation"}
          inputType="number"
          required={false}
        />
      )}
      <FormDateInputs
        title="Date of First Response"
        name={"dateOfFirstResponse"}
        timeInput={false}
        onDateChange={(e: Date) => {}}
        required
      />
      <FormDateInputs
        title="Date of Most Recent Response"
        name={"dateOfMostRecentResponse"}
        timeInput={false}
        onDateChange={(e: Date) => {}}
        required
      />
    </>
  );
};
const SportsAndCulture = (): JSX.Element => {
  const [responseType, setResponseType] = useState<
    typeof SportsAndCultureResponses[number] | undefined
  >();
  return (
    <>
      <FormInputs
        title="Organization Name"
        name="organizationName"
        inputType="text"
        required
      />
      <FormInputs
        title="Organization Type (ex. soccer, football, workers union etc)"
        name="organizationType"
        inputType="text"
        required
      />
      <FormInputs
        title="Response Type"
        name="responseType"
        dropDown={sportsResponseTypeOptions}
        customDropdownFunc={(e) => {
          if (isOption(e) && isSportsResponseType(e.value))
            setResponseType(e.value);
        }}
        required
      />
      {responseType === "Other" && (
        <FormInputs
          title="Custom Response Type"
          name={"customResponseType"}
          inputType="text"
          required={true}
        />
      )}
      {responseType === "Donation" && (
        <FormInputs
          title="Donation Valuation"
          name={"donationValuation"}
          inputType="number"
          required={false}
        />
      )}
      <FormDateInputs
        title="Date of Announcement"
        name={"dateOfAnnouncement"}
        timeInput={false}
        onDateChange={(e: Date) => {}}
        required
      />
    </>
  );
};
const Protests = (): JSX.Element => {
  return (
    <>
      <FormAddressInputs />
      <FormInputs
        title="Number of Protesters"
        name={"numOfProtesters"}
        inputType="number"
        required={false}
      />
      <FormInputs
        title="Number of Arrests"
        name={"numOfArrests"}
        inputType="number"
        required={false}
      />
      <FormInputs
        title="Number of Hospitalizations"
        name={"numOfHospitalizations"}
        inputType="number"
        required={false}
      />
      <FormInputs
        title="State Response"
        name={"stateResponse"}
        inputType="text"
        required={false}
      />
    </>
  );
};
const newRussianRecordTypes = transformSingleList([...RussianRecordTypes]);
const RussiaForm = (): JSX.Element => {
  const [russianRecordType, setRussianRecordType] = useState<
    typeof RussianRecordTypes[number] | undefined
  >();
  return (
    <>
      <FormInputs
        title="Russian Record Type"
        name="russianRecordType"
        dropDown={newRussianRecordTypes}
        customDropdownFunc={(e: Option | MultiValue<Option> | null) => {
          if (isOption(e) && isRussianRecordType(e.value))
            setRussianRecordType(e.value);
        }}
        required
      />
      {russianRecordType === "Corporation Responses" && <Corporations />}
      {russianRecordType === "Protests in Russia" && <Protests />}
      {russianRecordType === "Sanctions vs. Russia" && <Sanctions />}
      {russianRecordType === "Sports and Culture Responses" && (
        <SportsAndCulture />
      )}
      <FormInputs title={"Notes"} name={"notes"} textArea required={false} />
    </>
  );
};
export default RussiaForm;
