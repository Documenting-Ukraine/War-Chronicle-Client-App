import { useState } from "react";
import { MultiValue } from "react-select";
import useRecordFormPropUpdate from "../../../../hooks/use-record-form-prop-update";
import {
  BooleanDropdownOptions,
  Countries,
  InternationalResponseType,
  isItemInList,
} from "../../../../types/dataTypes/DataLists";
import {
  InternationalResponse,
  isInternationalType,
} from "../../../../types/dataTypes/docTypes/InternationalResponse";
import {
  isOption,
  Option,
  transformSingleList,
  transformOptions,
} from "../../../authPage/data/OccupationList";
import FormDateInputs from "../../../utilityComponents/formInputs/FormDateInputs";
import FormInputs from "../../../utilityComponents/formInputs/FormInputs";
import GeneralAidInputs from "./GeneralAidInputs";
import InternationalResponseTemplate from "./InternationalResponseTemplate";
const newInternationalTypes = transformSingleList([
  ...InternationalResponseType,
]);
const newCountries = transformSingleList(
  Countries.map((country) => country[1])
);
const booleanDropdown = transformSingleList([...BooleanDropdownOptions]);

const InternationalResponseForm = ({
  defaultInputs,
}: {
  defaultInputs?: InternationalResponse;
}) => {
  const [responseType, setResponseType] = useState<
    typeof InternationalResponseType[number] | undefined
  >(defaultInputs?.international_response_type);
  const updateStoreProps = useRecordFormPropUpdate("International Response");
  const unResolutionEl = (
    <>
      <FormInputs
        title={"Resolution Name"}
        name={"resolution"}
        inputType={"text"}
        required
        defaultValue={responseType}
        customValidation={(e) => {
          updateStoreProps({
            resolution_name: e,
          });
          return { err: false, message: "" };
        }}
      />
    </>
  );
  const combatPermissionEl = (
    <>
      <FormDateInputs
        title="Date Permission Granted"
        name="datePermissionGranted"
        onDateChange={(e: Date) => {
          updateStoreProps({
            date_permission_granted: e,
          });
        }}
        defaultValue={
          defaultInputs?.date_permission_granted
            ? new Date(defaultInputs.date_permission_granted)
            : undefined
        }
        required
      />
      <FormInputs
        title={"Number of Volunteers"}
        name={"numberOfVolunteers"}
        inputType={"number"}
        required={false}
        defaultValue={defaultInputs?.num_of_volunteers?.toString()}
        customValidation={(e) => {
          updateStoreProps({
            number_of_volunteers: e,
          });
          return { err: false, message: "" };
        }}
      />
      <FormInputs
        title={"Permission Granted To Citizens"}
        name={"permissionGrantedToCitizens"}
        defaultDropDownValue={
          defaultInputs?.permission_granted_to_citizens
            ? defaultInputs.permission_granted_to_citizens
            : booleanDropdown[2]
        }
        dropDown={booleanDropdown}
        required={false}
        customDropdownFunc={(e) => {
          if (
            isOption(e) &&
            isItemInList<typeof BooleanDropdownOptions[number]>(
              e.value,
              BooleanDropdownOptions
            )
          ) {
            updateStoreProps({
              permission_granted_to_citizens: e.value,
            });
          }
        }}
      />
    </>
  );
  const humanitarianAidEl = (
    <>
      <GeneralAidInputs defaultInputs={defaultInputs} />
    </>
  );
  const militaryAidEl = (
    <>
      <GeneralAidInputs defaultInputs={defaultInputs} />
    </>
  );
  return (
    <InternationalResponseTemplate
      responseType={responseType}
      unResolutionEl={unResolutionEl}
      combatPermissionEl={combatPermissionEl}
      humanitarianAidEl={humanitarianAidEl}
      militaryAidEl={militaryAidEl}
    >
      <>
        <FormInputs
          title={"Response Type"}
          name={"responseType"}
          dropDown={newInternationalTypes}
          required
          defaultDropDownValue={
            responseType ? transformOptions(responseType) : undefined
          }
          customDropdownFunc={(e: Option | MultiValue<Option> | null) => {
            if (isOption(e) && isInternationalType(e.value)) {
              setResponseType(e.value);
              updateStoreProps({
                international_response_type: e.value,
              });
            }
          }}
        />
        <FormInputs
          title={"Participating Countries"}
          name={"countries"}
          dropDown={newCountries}
          isDropdownMulti
          required
          defaultMultiDropDownValue={
            defaultInputs?.participating_countries
              ? transformSingleList(defaultInputs.participating_countries)
              : undefined
          }
          customDropdownFunc={(e) => {
            if (!isOption(e) && e) {
              const values = e.map((a) => a.value);
              updateStoreProps({
                participating_countries: values,
              });
            }
          }}
        />
      </>
    </InternationalResponseTemplate>
  );
};
export default InternationalResponseForm;
