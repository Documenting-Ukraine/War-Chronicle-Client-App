import { useState } from "react";
import { MultiValue } from "react-select";
import { Countries } from "../../../types/dataTypes/DataLists";
import {
  InternationalResponseType,
  isInternationalType,
} from "../../../types/dataTypes/docTypes/InternationalResponse";
import {
  isOption,
  Option,
  transformSingleList,
} from "../../authPage/data/OccupationList";
import FormDateInputs from "../../utilityComponents/formInputs/FormDateInputs";
import FormInputs from "../../utilityComponents/formInputs/FormInputs";

const newInternationalTypes = transformSingleList([
  ...InternationalResponseType,
]);
const newCountries = transformSingleList(
  Countries.map((country) => country[1])
);
const booleanDropdownOptions = transformSingleList(["Yes", "No", "N/A"]);
const generalAidTypes = transformSingleList(["Military", "Humanitarian"])
const GeneralAidInputs = (): JSX.Element => {
  return (
    <>
      <FormInputs
        title={"Has Aid Been Sent?"}
        name={"aidSent"}
        defaultDropDownValue={booleanDropdownOptions[2]}
        dropDown={booleanDropdownOptions}
        required
      />
      <FormInputs
        title={"Aid Recipient"}
        name={"recipient"}
        inputType={"text"}
        required
      />
      <FormDateInputs
        title="Date Aid is Announced"
        name="dateAidIsAnnounced"
        onDateChange={(e: Date) => {}}
        required
      />
      <FormDateInputs
        title="Date Aid is Sent"
        name="dateAidIsSent"
        onDateChange={(e: Date) => {}}
        required
      />
      <FormInputs
        title={"Aid Valuation"}
        name={"aidValuation"}
        inputType={"number"}
        required
      />
    </>
  );
};
const InternationalResponseForm = () => {
  const [responseType, setResponseType] = useState<
    typeof InternationalResponseType[number] | undefined
  >();
  return (
    <>
      <FormInputs
        title={"Response Type"}
        name={"responseType"}
        dropDown={newInternationalTypes}
        required
        customDropdownFunc={(e: Option | MultiValue<Option> | null) => {
          if (isOption(e) && isInternationalType(e.value))
            setResponseType(e.value);
        }}
      />
      <FormInputs
        title={"Participating Countries"}
        name={"countries"}
        dropDown={newCountries}
        isDropdownMulti
        required
      />
      {responseType === "United Nations Resolution" && (
        <>
          <FormInputs
            title={"Resolution Name"}
            name={"resolution"}
            inputType={"text"}
            required
          />
        </>
      )}

      {responseType === "Combat Permission" && (
        <>
          <FormDateInputs
            title="Date Permission Granted"
            name="datePermissionGranted"
            onDateChange={(e: Date) => {}}
            required
          />
          <FormInputs
            title={"Number of Volunteers"}
            name={"numberOfVolunteers"}
            inputType={"number"}
            required={false}
          />
          <FormInputs
            title={"Permission Granted To Citizens"}
            name={"permissionGrantedToCitizens"}
            defaultDropDownValue={booleanDropdownOptions[2]}
            dropDown={booleanDropdownOptions}
            required={false}
          />
        </>
      )}
      {responseType === "Humanitarian Aid" && <> <GeneralAidInputs /></>}
      {responseType === "Military Aid" && <> <GeneralAidInputs /> </>}
    </>
  );
};
export default InternationalResponseForm;
