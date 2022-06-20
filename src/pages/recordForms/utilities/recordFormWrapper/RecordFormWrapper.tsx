import { useParams } from "react-router";
import { grabRecordFormType } from "../../data/recordFormRoutes";
import RecordFormBox from "./RecordFormBox";
import RecordItem, { RecordProperties } from "./RecordItem";
import React, { useState } from "react";
import FormInputs, {
  CustomFormInputs,
} from "../../../utilityComponents/formInputs/FormInputs";
import FormDropZone from "../../../utilityComponents/formInputs/FormDropZone";
import FormListInputs from "../../../utilityComponents/formInputs/FormListInputs";
import FormDateInputs from "../../../utilityComponents/formInputs/FormDateInputs";
import FormAddressInputs from "../../../utilityComponents/formInputs/FormAddressInputs";
import useWindowWidth from "../../../../hooks/use-window-width";
import {
  GeneralEventType,
  GeneralRecordType,
} from "../../../../types/dataTypes/GeneralRecordType";
const guidelines = [
  "Be concise and specific. Avoid non-objective language",
  "No duplicate records. Reference our similar records to prevent duplicate creation",
  "Submit one entry at a time. Entries with multiple data sets will be removed",
];
export type SubmitCallbackProps = {
  recordType: string;
  generalProps: GeneralRecordType | GeneralEventType;
  additionalProps: {
    [key: string]: any;
  };
  event: React.FormEvent<HTMLFormElement>;
};
interface RecordFormWrapperProps {
  children: JSX.Element;
  callback?: (e: SubmitCallbackProps) => void;
  dateFirstPublished?: boolean;
  generalEventType?: boolean;
}
const RecordFormBoxes = ({
  similarRecords,
}: {
  similarRecords: RecordProperties[];
}): JSX.Element => {
  return (
    <div className="record-form-pg-boxes">
      <RecordFormBox title={"Guidelines"} className="record-form-guidelines">
        <ol>
          {guidelines.map((str) => {
            const [bolded, nonBolded] = str.split(".");
            return (
              <li key={bolded}>
                <b>{bolded}.</b>
                {nonBolded}
              </li>
            );
          })}
        </ol>
      </RecordFormBox>
      <RecordFormBox
        title={"Similar Records"}
        className="record-form-similar-records"
      >
        <>
          {similarRecords.map((record) => (
            <RecordItem
              key={record._id}
              id={record._id}
              title={record.record_title}
              recordType={record.record_type}
              description={record.description}
              creationDate={record.record_creation_date}
            />
          ))}
          {similarRecords.length <= 0 && (
            <div className="d-flex w-100 h-100 justify-content-center align-items-center">
              No records found.
            </div>
          )}
        </>
      </RecordFormBox>
    </div>
  );
};
const RecordFormWrapper = ({
  generalEventType = false,
  dateFirstPublished = false,
  children,
  callback,
}: RecordFormWrapperProps): JSX.Element => {
  const params = useParams();
  const route = params["*"];
  const formType = route ? grabRecordFormType(route) : "Form";
  const mediumWindowWidth = useWindowWidth(992);
  const [similarRecords, setSimilarRecords] = useState<RecordProperties[]>([]);
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget)
    const fieldValues = Object.fromEntries(formData.entries());
    console.log(fieldValues)
    // const generalProps 
    // const additionalProps = 
    // const submitProps: SubmitCallbackProps = {
    //   generalProps: generalProps,
    //   additionalProps: 
    //   event: e,
    // }
    // if (callback) callback(e);
  };
  return (
    <div className="record-form-pg-wrapper">
      {!mediumWindowWidth && (
        <RecordFormBoxes similarRecords={similarRecords} />
      )}

      <RecordFormBox
        title={`New ${formType} Record`}
        className="record-form-pg-form"
      >
        <form onSubmit={onSubmit}>
          <FormInputs
            title="Record Title"
            name="title"
            className="record-form-input"
            required
            inputType="text"
          />
          <FormInputs
            textArea
            title={"General Description"}
            name={"description"}
            className="record-form-input"
            required
          />
          <CustomFormInputs
            title="Media Files"
            name={"mediaFiles"}
            className="record-form-input"
          >
            <>
              <FormDropZone
                name={"images"}
                mediaType={"images"}
                description={"Upload Images"}
                maxFiles={10}
                className={"media-form-input"}
                maxSize={Math.pow(10, 6) * 5}
              />
              <FormDropZone
                name={"videos"}
                mediaType={"videos"}
                description={"Upload Videos"}
                maxFiles={10}
                maxSize={Math.pow(10, 8) * 5}
              />
            </>
          </CustomFormInputs>
          <CustomFormInputs
            name="Evidence"
            className="record-form-input"
            required
          >
            <FormListInputs />
          </CustomFormInputs>

          {dateFirstPublished && !generalEventType && (
            <FormDateInputs
              className="record-form-input"
              title="Date First Published"
              name="dateFirstPublished"
              onDateChange={(e: Date) => {}}
              timeInput
              required
            />
          )}
          {generalEventType && (
            <>
              <FormAddressInputs />
              <FormDateInputs
                className="record-form-input"
                title="Date First Published"
                name="dateFirstPublished"
                onDateChange={(e: Date) => {}}
                timeInput
                required
              />
              <FormDateInputs
                className="record-form-input"
                title="Date Event Occurred"
                name="dateEventOccurred"
                onDateChange={(e: Date) => {}}
                timeInput
                required
              />
            </>
          )}
          {children}
          <button
            className={"record-form-submit-btn"}
            type="submit"
            aria-label={"submit-new-record"}
          >
            <span>Submit</span>
          </button>
        </form>
      </RecordFormBox>
      {mediumWindowWidth && <RecordFormBoxes similarRecords={similarRecords} />}
    </div>
  );
};
export default RecordFormWrapper;
