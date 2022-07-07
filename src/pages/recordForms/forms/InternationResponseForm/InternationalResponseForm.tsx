import { useState } from "react";
import { MultiValue } from "react-select";
import useRecordFormPropUpdate from "../../../../hooks/use-record-form-prop-update";
import {
  BooleanDropdownOptions,
  Countries,
  InternationalResponseType,
  isItemInList,
} from "../../../../types/dataTypes/DataLists";
import { isInternationalType } from "../../../../types/dataTypes/docTypes/InternationalResponse";
import {
  isOption,
  Option,
  transformSingleList,
} from "../../../authPage/data/OccupationList";
import FormDateInputs from "../../../utilityComponents/formInputs/FormDateInputs";
import FormInputs from "../../../utilityComponents/formInputs/FormInputs";

const newInternationalTypes = transformSingleList([
  ...InternationalResponseType,
]);
const newCountries = transformSingleList(
  Countries.map((country) => country[1])
);
const booleanDropdown = transformSingleList([...BooleanDropdownOptions]);
const GeneralAidInputs = (): JSX.Element => {
  const updateStoreProps = useRecordFormPropUpdate();
  return (
    <>
      <FormInputs
        title="Specific Aid Sent (ex. military supplies, rations, etc)"
        name="subAidTypes"
        subCaption="Seperate each aid type with a comma"
        inputType="text"
        required={false}
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
        defaultDropDownValue={booleanDropdown[2]}
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
        customValidation={(e) => {
          updateStoreProps({
            aid_recipient: e,
          });
          return { err: false, message: "" };
        }}
      />
      <FormDateInputs
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
const InternationalResponseForm = () => {
  const [responseType, setResponseType] = useState<
    typeof InternationalResponseType[number] | undefined
  >();
  const updateStoreProps = useRecordFormPropUpdate();
  return (
    <>
      <FormInputs
        title={"Response Type"}
        name={"responseType"}
        dropDown={newInternationalTypes}
        required
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
        customDropdownFunc={(e) => {
          if (!isOption(e) && e) {
            const values = e.map((a) => a.value);
            updateStoreProps({
              participating_countries: values,
            });
          }
        }}
      />
      {responseType === "United Nations Resolution" && (
        <>
          <FormInputs
            title={"Resolution Name"}
            name={"resolution"}
            inputType={"text"}
            required
            customValidation={(e) => {
              updateStoreProps({
                resolution_name: e,
              });
              return { err: false, message: "" };
            }}
          />
        </>
      )}

      {responseType === "Combat Permission" && (
        <>
          <FormDateInputs
            title="Date Permission Granted"
            name="datePermissionGranted"
            onDateChange={(e: Date) => {
              updateStoreProps({
                date_permission_granted: e,
              });
            }}
            required
          />
          <FormInputs
            title={"Number of Volunteers"}
            name={"numberOfVolunteers"}
            inputType={"number"}
            required={false}
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
            defaultDropDownValue={booleanDropdown[2]}
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
      )}
      {responseType === "Humanitarian Aid" && (
        <>
          <GeneralAidInputs />
        </>
      )}
      {responseType === "Military Aid" && (
        <>
          <GeneralAidInputs />
        </>
      )}
    </>
  );
};
export default InternationalResponseForm;
